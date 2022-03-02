from django.urls import path

from . import views

app_label = 'diabetes'
urlpatterns = [
    # Doctor Views
    path('user/:username/', views.UserDetailDoctorView.as_view()),

    path('user/:username/insulin/', views.ListCreateDeleteInsulinPrescriptionDoctorView.as_view()),
    path('user/:username/medicine/', views.ListCreateMedicinePrescriptionDoctorView.as_view()),
    path('user/:username/medicine/:pk/', views.UpdateDeleteMedicinePrescriptionDoctorView.as_view()),

    path('user/:username/logs/insulin/', views.ListInsulinLogDoctorView.as_view()),
    path('user/:username/logs/sugar-level/', views.ListBloodSugarLogDoctorView.as_view()),

    # User Views
    path('me/insulin/', views.ListCreateDeleteInsulinPrescriptionUserView.as_view()),
    path('me/medicine/', views.ListCreateMedicinePrescriptionUserView.as_view()),
    path('me/medicine/:pk/', views.UpdateDeleteMedicinePrescriptionUserView.as_view()),

    path('me/logs/insulin/', views.ListCreateInsulinLogUserView.as_view()),
    path('me/logs/insulin/:pk/', views.UpdateDeleteInsulinLogUserView.as_view()),
    path('me/logs/sugar-level/', views.ListCreateBloodSugarLogUserView.as_view()),
    path('me/logs/sugar-level/:pk/', views.UpdateDeleteSugarLevelLogUserView.as_view()),
]
