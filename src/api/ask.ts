import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    const prompt = `You are an AI assistant that answers questions about a person's resume. 
    Use the following resume content to answer questions accurately and concisely.
    If you're not sure about something, say so. Don't make up information.
    Keep your answers brief and to the point.

    Resume Content:
    ${JSON.stringify(context, null, 2)}

    Question: ${question}

    Answer:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that answers questions about a person's resume. Be concise and accurate."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content?.trim() || 'Sorry, I could not generate an answer.';

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process the question' });
  }
} 