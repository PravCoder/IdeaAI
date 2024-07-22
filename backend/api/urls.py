from django.urls import path
from . import views

urlpatterns = [
    

    
    # TESTING STUFF BELOW
    path("get-foo/", views.get_foo, name="get-foo"),
    path("create-foo/", views.create_foo, name="create-foo"),
]