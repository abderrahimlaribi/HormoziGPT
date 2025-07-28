import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Encode the prompt in base64 to safely pass it to the Python script
    const base64Prompt = Buffer.from(prompt).toString('base64');

    // Execute the Python script with the base64-encoded prompt
    const { stdout, stderr } = await execPromise(
      `python -c "import sys, base64; sys.path.append('HormoziGPT'); from ollama_chatbot import OllamaHormoziChatbot; chatbot = OllamaHormoziChatbot(); decoded_prompt = base64.b64decode('${base64Prompt}').decode('utf-8'); print(chatbot.chat(decoded_prompt))"`,
      { encoding: 'utf8' }
    );

    if (stderr) {
      console.error('Python script error:', stderr);
      return NextResponse.json(
        { error: 'Error executing Python script', details: stderr },
        { status: 500 }
      );
    }

    // Return the response
    return NextResponse.json({ response: stdout.trim() });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
