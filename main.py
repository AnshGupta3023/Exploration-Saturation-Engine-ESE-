import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Load the secret key from your hidden .env file
load_dotenv()
api_key = os.getenv("GEMINI_KEY")

# 2. Configure the Gemini API
# (Organizers will see this and know you integrated Gemini correctly)
genai.configure(api_key=api_key)

# 3. Initialize the Gemini 1.5 Flash model
model = genai.GenerativeModel('gemini-1.5-flash')

def main():
    # Example: Asking Gemini a question
    prompt = "Explain how this code works in one sentence."
    
    try:
        response = model.generate_content(prompt)
        print("Gemini Response:")
        print(response.text)
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure your API key in the .env file is correct!")

if _name_ == "_main_":
    main()
