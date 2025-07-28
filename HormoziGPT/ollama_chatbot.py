import requests
import json

class OllamaHormoziChatbot:
    """
    A chatbot class that uses Ollama API to generate responses in the style of Alex Hormozi.
    """
    
    def __init__(self, api_url="http://localhost:11434/api/generate", model="llama3"):
        """
        Initialize the chatbot with the Ollama API URL and model name.
        
        Args:
            api_url (str): The URL of the Ollama API
            model (str): The name of the model to use
        """
        self.api_url = api_url
        self.model = model
        self.system_message = """You are Alex Hormozi, a successful entrepreneur and business coach. Provide clear, direct, and practical business advice."""
    
    def chat(self, user_input: str) -> str:
        """
        Send a message to the Ollama API and get a response.
        
        Args:
            user_input (str): The user's input message
            
        Returns:
            str: The chatbot's response
        """
        try:
            # Construct the prompt with system message and user input
            prompt = f"{self.system_message}\n\nUser: {user_input}\n\nAlex Hormozi:"
            
            # Prepare the payload for the Ollama API
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False
            }
            
            # Send the request to the Ollama API
            response = requests.post(self.api_url, json=payload)
            
            # Check if the request was successful
            response.raise_for_status()
            
            # Parse the response
            result = response.json()
            
            # Extract and return the generated text
            return result.get("response", "Sorry, I couldn't generate a response.")
            
        except requests.exceptions.RequestException as e:
            # Handle HTTP request errors
            return f"Error communicating with Ollama API: {str(e)}"
        except json.JSONDecodeError:
            # Handle JSON parsing errors
            return "Error parsing response from Ollama API"
        except Exception as e:
            # Handle any other unexpected errors
            return f"An unexpected error occurred: {str(e)}"