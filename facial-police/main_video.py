import cv2
import os
import glob
import numpy as np
import face_recognition
import websockets
import asyncio
import base64
from io import BytesIO
from PIL import Image

class SimpleFacerec:
    def __init__(self):
        self.known_face_encodings = []
        self.known_face_names = []
        self.frame_resizing = 0.25  # Resize frame for faster processing

    def load_encoding_images(self, images_path):
        images_path = glob.glob(os.path.join(images_path, "*.*"))
        print(f"{len(images_path)} encoding images found.")

        for img_path in images_path:
            img = cv2.imread(img_path)
            rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            basename = os.path.basename(img_path)
            filename, _ = os.path.splitext(basename)

            img_encoding = face_recognition.face_encodings(rgb_img)
            if img_encoding:  # Check if encoding was found
                self.known_face_encodings.append(img_encoding[0])
                self.known_face_names.append(filename)
            else:
                print(f"No face found in the image: {basename}")

        print("Encoding images loaded")

    def detect_known_faces(self, frame):
        small_frame = cv2.resize(frame, (0, 0), fx=self.frame_resizing, fy=self.frame_resizing)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
            name = "Unknown"

            if matches:
                face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = self.known_face_names[best_match_index]

            face_names.append(name)

        face_locations = np.array(face_locations) / self.frame_resizing
        return face_locations.astype(int), face_names

async def video_stream(websocket, path):
    sfr = SimpleFacerec()
    sfr.load_encoding_images("images")  # Load encoding images from the images folder

    video_capture = cv2.VideoCapture(0)  # Webcam

    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        # Detect known faces
        face_locations, face_names = sfr.detect_known_faces(frame)

        # Draw the results on the frame
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

        # Encode the frame as an image and convert it to base64 to send over WebSockets
        img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        buffered = BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        await websocket.send(img_str)  # Send the frame to the frontend

        await asyncio.sleep(0.1)  # To control frame rate

    video_capture.release()

start_server = websockets.serve(video_stream, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
