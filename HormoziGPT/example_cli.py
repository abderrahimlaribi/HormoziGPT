#!/usr/bin/env python
"""
Example command-line interface for interacting with the OllamaHormoziChatbot.
Run this script to start a chat session with the Alex Hormozi chatbot.
Type 'exit' to quit the session.
"""

from ollama_chatbot import OllamaHormoziChatbot

def main():
    print("=" * 50)
    print("Alex Hormozi Business Advice Chatbot")
    print("Type 'exit' to quit the chat")
    print("=" * 50)
    
    # Initialize the chatbot
    chatbot = OllamaHormoziChatbot()
    
    # Main chat loop
    while True:
        # Get user input
        user_input = input("\nYou: ").strip()
        
        # Check if user wants to exit
        if user_input.lower() == "exit":
            print("\nThank you for chatting! Goodbye.")
            break
        
        # Skip empty inputs
        if not user_input:
            continue
        
        # Get response from chatbot
        print("\nAlex Hormozi: ", end="")
        response = chatbot.chat(user_input)
        print(response)

if __name__ == "__main__":
    main()