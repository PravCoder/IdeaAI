from django.urls import path
from . import views

urlpatterns = [
    
    path("create-lecture-link/", views.create_lecture_link, name="create-lecture-link"),
    path("get-user-lectures/", views.get_user_lectures, name="get-user-lectures"),
    
    path("create-flowchart/", views.create_flowchart, name="create-flowchart"),
    path("get-user-flowcharts/", views.get_user_flowcharts, name="get-user-flowcharts"),
    path("generate-flowchart/<str:pk>/", views.generate_flowchart, name="get-user-flowcharts"),
    path("get-chart-image-url/<str:pk>/", views.get_chart_image_url, name="get-chart-image-url"),


    # TESTING STUFF BELOW
    path("get-foo/", views.get_foo, name="get-foo"),
    path("create-foo/", views.create_foo, name="create-foo"),
]