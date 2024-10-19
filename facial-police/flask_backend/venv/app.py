# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import some_ml_model  # Import your ML model here

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process-video', methods=['POST'])
def process_video():
    video_url = request.json.get('videoUrl')
    if not video_url:
        return jsonify({'error': 'No video URL provided'}), 400
    
    # Call your ML model processing function here
    result = some_ml_model.process(video_url)  # Replace with your model's function

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
