import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : '/api';

/**
 * Handles POST requests to process an image.
 * @param {NextRequest} req - The incoming request object containing the image data.
 * @returns {NextResponse} JSON response with processed data or error message.
 */
export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    // Remove the data URL prefix to get the base64 string
    const base64Image = image.split(',')[1];

    if (!base64Image) {
      return NextResponse.json({ error: 'Invalid image data format' }, { status: 400 });
    }

    console.log('Sending request to backend...');
    const response = await fetch(`${API_URL}/process-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend response not OK:', response.status, errorText);
      return NextResponse.json({ error: `Backend responded with ${response.status}: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log('Received response from backend');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}