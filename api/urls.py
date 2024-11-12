from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

urlpatterns = [
    
   path('faculty/', faculty_list,  name='faculty_list'),
   path('register/user/', register, name='register'),
  #  path('login/', login, name='login'),
   
   path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', logout_view, name='auth_logout'),
   
   
   path('users/', get_users, name='get_users'),
   path('users/<str:pk>/', get_user, name='get_user'),
   path('users/<str:pk>/update/', update_user, name='update_user'),
   path('users/<str:pk>/delete/', delete_user, name='delete_user'),
   
   
   path('departments/', get_departments, name='get_departments'),
   path('departments/<str:pk>/', get_department, name='get_department'),
   path('departments/create/', create_department, name='create_department'),
   path('departments/<str:pk>/update/', update_department, name='update_department'),
   path('departments/<str:pk>/delete/', delete_department, name='delete_department'),

   

   
 ]

