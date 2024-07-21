from dotenv import load_dotenv, find_dotenv
import os
load_dotenv()
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = dict(llm.invoke("what is a dog"))

answer = response["content"] #  content='answer'
metadata = response["response_metadata"] # response_metadata={'token_usage': {'completion_tokens': 76, 'prompt_tokens': 11, 'total_tokens': 87}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} 
id = response["id"]
usage_metadata = response["usage_metadata"]  # usage_metadata={'input_tokens': 11, 'output_tokens': 76, 'total_tokens': 87}

print(f"\n{answer}")
print(f"\n{metadata}")
print(f"\n{id}")
print(f"\n{usage_metadata}")