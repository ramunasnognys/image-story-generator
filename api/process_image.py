from http.server import BaseHTTPRequestHandler
from urllib import parse
import json
from groq import Groq
import os
import base64

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
llava_model = 'llava-v1.5-7b-4096-preview'
llama31_model = 'llama-3.1-70b-versatile'

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

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        if not data or 'image' not in data:
            self.send_error(400, 'No image data provided')
            return

        base64_image = data['image']
        if not base64_image:
            self.send_error(400, 'Empty image data')
            return

        try:
            prompt = 'Describe this image.'
            image_description = image_to_text(client, llava_model, base64_image, prompt)
            story = short_story_generation(client, image_description)

            response = {
                'description': image_description,
                'storyTitle': 'The Adventure Begins',
                'story': story
            }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except Exception as e:
            self.send_error(500, str(e))