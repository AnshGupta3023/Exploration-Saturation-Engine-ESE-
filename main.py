import os
import google.generativeai as genai
from dotenv import load_dotenv

# This tells the computer to look at your secret .env file
load_dotenv()
my_secret_key = os.getenv("GEMINI_KEY")

# This sets up the Gemini AI model
genai.configure(api_key=my_secret_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# Example: Ask Gemini a question
response = model.generate_content("What is the capital of France?")
print(response.text)
