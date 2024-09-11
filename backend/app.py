# 1. Imports and API setup
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import base64
import os

app = Flask(__name__)
CORS(app)

# Ensure you have set the GROQ_API_KEY environment variable
client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
llava_model = 'llava-v1.5-7b-4096-preview'
llama31_model = 'llama-3.1-70b-versatile'

# 2. Image to text function
def image_to_text(client, model, base64_image, prompt):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model=model
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error in image_to_text: {str(e)}")
        raise

# 3. Short story generation function
def short_story_generation(client, image_description):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a children's book author. Write a short story about the scene depicted in this image or images.",
                },
                {
                    "role": "user",
                    "content": image_description,
                }
            ],
            model=llama31_model
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error in short_story_generation: {str(e)}")
        raise

@app.route('/process-image', methods=['POST'])
def process_image():
    try:
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        base64_image = data['image']
        if not base64_image:
            return jsonify({'error': 'Empty image data'}), 400

        prompt = '''
        Describe this image.
        '''
        
        image_description = image_to_text(client, llava_model, base64_image, prompt)
        story = short_story_generation(client, image_description)
        
        return jsonify({
            'description': image_description,
            'storyTitle': 'The Adventure Begins',
            'story': story
        })
    except Exception as e:
        print(f"Error in process_image: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)