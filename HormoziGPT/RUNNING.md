# How to Run HormoziGPT with Ollama

This guide provides step-by-step instructions on how to set up and run the HormoziGPT application using Ollama.

## Prerequisites

1. **Python 3.7+** - Make sure you have Python installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

2. **Ollama** - You need to have Ollama installed and running locally. Ollama is an application that lets you run large language models locally.

## Step 1: Install Ollama

1. Download and install Ollama from [ollama.ai](https://ollama.ai/download).
   - For Windows: Download the installer and follow the installation instructions.
   - For macOS: Use `curl -fsSL https://ollama.ai/install.sh | sh`
   - For Linux: Follow the instructions on the Ollama website.

2. After installation, start Ollama. It will run as a service in the background.

## Step 2: Pull the Llama3 Model

1. Open a terminal or command prompt.
2. Run the following command to download the Llama3 model:
   ```
   ollama pull llama3
   ```
   This might take some time depending on your internet connection as it downloads the model.

## Step 3: Install Python Dependencies

1. Navigate to the HormoziGPT directory in your terminal or command prompt:
   ```
   cd path\to\HormoziGPT
   ```

2. Install the required Python packages:
   ```
   pip install requests
   ```

## Step 4: Run the Application

1. Make sure Ollama is running in the background. You should see it in your system tray or process list.

2. From the HormoziGPT directory, run the example CLI script:
   ```
   python HormoziGPT\example_cli.py
   ```

3. You should see a welcome message and a prompt where you can start chatting with the Alex Hormozi chatbot.

4. Type your business-related questions and receive responses in the style of Alex Hormozi.

5. Type `exit` when you want to end the chat session.

## Troubleshooting

- **Connection Error**: If you see an error about connecting to the Ollama API, make sure Ollama is running. You can check by opening a browser and navigating to `http://localhost:11434/`. You should see a message indicating that Ollama is running.

- **Model Not Found**: If you get an error about the model not being found, make sure you've successfully pulled the Llama3 model using the command in Step 2.

- **Slow Responses**: The first response might take longer as the model loads into memory. Subsequent responses should be faster.

## Additional Information

- The Ollama API runs locally at `http://localhost:11434/api/generate` by default.
- The chatbot is configured to use the "llama3" model, but you can modify the code to use other models available in Ollama.
- All processing happens locally on your machine, so no data is sent to external servers.