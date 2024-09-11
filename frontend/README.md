This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your Groq API key:

1. Sign up for a Groq account at [https://console.groq.com/](https://console.groq.com/) if you haven't already.
2. Generate an API key in your Groq console.
3. Create a `.env` file in the `backend` directory of this project.
4. Add your Groq API key to the `.env` file:

```
GROQ_API_KEY=your_api_key_here 
```

5. Make sure to add `.env` to your `.gitignore` file to keep your API key secret.

Next, run the development server: s

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features 

- Image upload
- Image description generation
- Story generation based on the image

## Technologies Usedd

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

## AI Models

This project utilizes the Groq API with the following models:

- `llava-v1.5-7b-4096-preview` for image description generation
- `llama-3.1-70b-versatile` for short story generation based on the image description

## Project Structure

The main backend functionality is implemented in:

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
