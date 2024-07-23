from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, FlowchartSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Flowchart
from rest_framework.response import Response
from datetime import datetime
from django.core.files import File
from django.conf import settings
from django.core.files.base import ContentFile


from dotenv import load_dotenv, find_dotenv
import os
load_dotenv()
from langchain_openai import ChatOpenAI
from graphviz import Digraph
from langchain.prompts import PromptTemplate
import tempfile
import json

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(["POST"])
def create_flowchart(request):
    user = request.user
    print(request.data)
    name = request.data["content"]
    description = request.data["description"]
    chart = Flowchart(name=name, description=description, date_created=datetime.now())
    chart.save()

    user.flowcharts.add(chart)
    user.save()

    context = {"msg":"yoooo"}
    return Response(context)


@api_view(["GET"])
def get_user_flowcharts(request):
    user = request.user
    serialized_flowcharts  =[]
    for chart in list(user.flowcharts.all()):
        chart_serializer = FlowchartSerializer(chart)
        serialized_flowcharts.append(chart_serializer.data)

    return Response({"user_flowcharts":serialized_flowcharts})

@api_view(["POST"])
def generate_flowchart(request, pk):
    description = request.data["description"]
    flowchart = Flowchart.objects.get(id=int(pk))

    answer, metadata, id, usage_metadata = get_flowchart_structure(description)
    
    print(f"QUESTION: {description}")
    print(f"ANSWER: {answer} + {usage_metadata}")

    json_data = json.loads(answer)
    image_path = create_flowchart(json_data)

    # Save the flowchart image to the model
    with open(image_path, 'rb') as f:
        flowchart.image.save(f'flowchart_{flowchart.id}.png', File(f), save=True)
    
    print(f"URL: {flowchart.image.url}")
    return JsonResponse({'image_url': flowchart.image.url})


def get_flowchart_structure(natural_language_description):
    llm = ChatOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    template = """You are a helpful assistant that converts natural language descriptions into structured flowchart representations.

    Input: {input}

    Output: Provide a structured representation for a flowchart, using JSON format. One key of the JSON-object should be "nodes" which is a array of "id": "1", "label": "Start", the other key of the JSON-object should be "edges" which is an array of "from": "1", "to": "2". 
    """
    prompt = PromptTemplate.from_template(template)

    formatted_prompt = prompt.format(input=natural_language_description)
    response = llm.invoke(formatted_prompt)
    content = response.content
    metadata = response.response_metadata# response_metadata={'token_usage': {'completion_tokens': 76, 'prompt_tokens': 11, 'total_tokens': 87}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} 
    id = response.id
    usage_metadata = response.usage_metadata # usage_metadata={'input_tokens': 11, 'output_tokens': 76, 'total_tokens': 87}
    
    return content, metadata, id, usage_metadata


def create_flowchart(json_data):
    dot = Digraph()

    for node in json_data['nodes']:
        dot.node(node['id'], node['label'])

    # Add edges
    for edge in json_data['edges']:
        dot.edge(edge['from'], edge['to'])

    flowcharts_dir = os.path.join(settings.MEDIA_ROOT, 'flowcharts')
    image_path = os.path.join(flowcharts_dir, 'flowchart')
    dot.format = 'png'
    rendered_image_path = dot.render(image_path, cleanup=True)
    

    return rendered_image_path


@api_view(["GET"])
def get_chart_image_url(request, pk):
    id = int(pk)
    flowchart = Flowchart.objects.get(id=id)
    print(f"\nGET CHART IMAGE URL: {flowchart.image.url}")
    return Response({"image_url": flowchart.image.url})



# TESTING STUFF BELOW
foo_db = ["foo1","foo1","foo1","foo1","foo1" ]
@api_view(["GET"]) # his view function will respond to HTTP GET requests. When a GET request is made to the corresponding URL (e.g., /api/hello-world/), this function will be invoked
def get_foo(request):
    print(f"USER: {request.user}")
    for user in User.objects.all():
        print(user)

    user_serializer = UserSerializer(request.user)
    return Response({'foo_list': foo_db, "user":user_serializer.data["email"]})

@api_view(["POST"]) # his view function will respond to HTTP GET requests. When a GET request is made to the corresponding URL (e.g., /api/hello-world/), this function will be invoked
def create_foo(request):
    print("HELLOasdasdasdasdasdasdasdasdas")
    content = request.data["content"]
    foo_db.append(content)
    return Response({'foo_list': foo_db})