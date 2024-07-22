from dotenv import load_dotenv, find_dotenv
import os
load_dotenv()
from langchain_openai import ChatOpenAI
from graphviz import Digraph
from langchain.prompts import PromptTemplate
import tempfile
import json

llm = ChatOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
template = """You are a helpful assistant that converts natural language descriptions into structured flowchart representations.

Input: {input}

Output: Provide a structured representation for a flowchart, using JSON format, remember the flowchart is not always linear it might include loops. One key of the JSON-object should be "nodes" which is a array of "id": "1", "label": "Start", the other key of the JSON-object should be "edges" which is an array of "from": "1", "to": "2". 
"""
prompt = PromptTemplate.from_template(template)

def read_question():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Construct the full path to the prompt.txt file
    file_path = os.path.join(current_dir, 'question.txt')
    with open(file_path, 'r') as file:
        question = file.read()
    return question

def get_flowchart_structure(natural_language_description):
    formatted_prompt = prompt.format(input=natural_language_description)
    response = llm.invoke(formatted_prompt)
    content = response.content
    metadata = response.response_metadata# response_metadata={'token_usage': {'completion_tokens': 76, 'prompt_tokens': 11, 'total_tokens': 87}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} 
    id = response.id
    usage_metadata = response.usage_metadata # usage_metadata={'input_tokens': 11, 'output_tokens': 76, 'total_tokens': 87}
    
    return content, metadata, id, usage_metadata

question = read_question()
print(question)
answer, metadata, id, usage_metadata = get_flowchart_structure(question)
print(answer)

def create_flowchart(json_data):
    dot = Digraph()

    for node in json_data['nodes']:
        dot.node(node['id'], node['label'])

    # Add edges
    for edge in json_data['edges']:
        dot.edge(edge['from'], edge['to'])

    return dot

json_data = json.loads(answer)
flowchart = create_flowchart(json_data)
flowchart.render('flowchart', format='png', cleanup=True)


"""
Create a flowchart for this code. 

arr = [1, 2, 1, 1, 3]
def main(): 
    for x in arr: 
        if x == 1:
            foundOne()
        
"""

"""
Create a flowchart based on the user authentication below. 

Once program starts users should enter their credentials and the backend validates their credentials. If credentials are valid access is granted else access is denied and they are prompt to enter their credentials again. Make sure there is a loop back to the enter credentials block. 
"""

"""

"""