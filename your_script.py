import os
import anthropic

api_key = "your_api_key_here"  # Replace with your actual API key
client = anthropic.Anthropic(api_key=api_key)

response = client.completions.create(
    prompt="Hello, Claude! How can you assist me today?",
    model="claude-v1",
    max_tokens_to_sample=100
)
print(response['completion'])
