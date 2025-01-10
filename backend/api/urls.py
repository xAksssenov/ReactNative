from django.urls import path
from .views import LoginView, LogoutView, RegisterView, CalculatorResultView, CalculatorResultListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('calculator/', CalculatorResultView.as_view(), name='add_result'),
    path('calculator/results/', CalculatorResultListView.as_view(), name='list_results'),
]
