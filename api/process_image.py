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

def handler(event, context):
    try:
        # Parse the incoming JSON body
        body = json.loads(event['body'])
        base64_image = body.get('image')

        if not base64_image:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No image data provided'})
            }

        prompt = 'Describe this image.'
        image_description = image_to_text(client, llava_model, base64_image, prompt)
        story = short_story_generation(client, image_description)

        response = {
            'description': image_description,
            'storyTitle': 'The Adventure Begins',
            'story': story
        }

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Adjust this for production
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps(response)
        }
    except Exception as e:
        print(f"Error in handler: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Adjust this for production
            },
            'body': json.dumps({'error': str(e)})
        }

# This is to handle CORS preflight requests
def handle_options(event, context):
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',  # Adjust this for production
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
    }

# Main entry point for Vercel
def main(event, context):
    if event['httpMethod'] == 'OPTIONS':
        return handle_options(event, context)
    return handler(event, context)