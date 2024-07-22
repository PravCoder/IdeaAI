from django.urls import path
from . import views

urlpatterns = [
    
    path("create-flowchart/", views.create_flowchart, name="create-flowchart"),
    path("get-user-flowcharts/", views.get_user_flowcharts, name="get-user-flowcharts"),

    # TESTING STUFF BELOW
    path("get-foo/", views.get_foo, name="get-foo"),
    path("create-foo/", views.create_foo, name="create-foo"),
]