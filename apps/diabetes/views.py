from rest_framework.generics import (
    RetrieveAPIView, ListCreateAPIView, ListAPIView,
    RetrieveUpdateDestroyAPIView, DestroyAPIView, get_object_or_404
)
from rest_framework.mixins import UpdateModelMixin

from diabetes.core.views import GenericAPIView
from . import serializers
from . import models


################
# Doctor Views

class ListCreateDeleteInsulinPrescriptionDoctorView(ListCreateAPIView, UpdateModelMixin, DestroyAPIView,
                                                    GenericAPIView):
    serializer_class = serializers.UserInsulinPrescriptionSerializer

    def get_queryset(self):
        username = self.kwargs.get(self.lookup_url_kwarg)
        return models.UserInsulinPrescription.objects.filter(user__username=username)

    def get_object(self):
        return self.queryset()[0]

    def post(self, request, *args, **kwargs):
        prescription = self.get_queryset()
        if len(prescription) > 0:
            return self.update(request, *args, **kwargs)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        username = self.kwargs.get(self.lookup_url_kwarg)
        user = get_object_or_404(models.User, username=username)
        serializer.save(user=user)


class ListCreateMedicinePrescriptionDoctorView(ListCreateAPIView, GenericAPIView):
    serializer_class = serializers.UserMedicinePrescriptionSerializer
    lookup_url_kwarg = 'username'

    def get_queryset(self):
        username = self.kwargs.get(self.lookup_url_kwarg)
        return models.UserMedicinePrescription.objects.filter(user__username=username)

    def perform_create(self, serializer):
        username = self.kwargs.get(self.lookup_url_kwarg)
        user = get_object_or_404(models.User, username=username)
        serializer.save(user=user)


class UpdateDeleteMedicinePrescriptionDoctorView(RetrieveUpdateDestroyAPIView, GenericAPIView):
    serializer_class = serializers.UserMedicinePrescriptionSerializer

    def get_queryset(self):
        username = self.kwargs.get(self.lookup_url_kwarg)
        return models.UserMedicinePrescription.objects.filter(user__username=username)


class UserDetailDoctorView(RetrieveAPIView, GenericAPIView):
    serializer_class = serializers.UserDoctorSerializer
    lookup_field = 'username'


################
# Doctor Log Views

class ListInsulinLogDoctorView(ListAPIView, GenericAPIView):
    serializer_class = serializers.InsulinLogSerializer

    def get_queryset(self):
        username = self.kwargs.get(self.lookup_url_kwarg)
        return models.InsulinDosageLog.objects.filter(user__username=username)


class ListBloodSugarLogDoctorView(ListAPIView, GenericAPIView):
    serializer_class = serializers.SugarLevelLogSerializer

    def get_queryset(self):
        username = self.kwargs.get(self.lookup_url_kwarg)
        return models.SugarLevelLog.objects.filter(user__username=username)


################
# User Views

class ListCreateDeleteInsulinPrescriptionUserView(ListCreateAPIView, UpdateModelMixin, DestroyAPIView, GenericAPIView):
    serializer_class = serializers.UserInsulinPrescriptionSerializer

    def get_queryset(self):
        return models.UserInsulinPrescription.objects.filter(user=self.request)

    def get_object(self):
        return self.get_queryset()[0]

    def post(self, request, *args, **kwargs):
        prescription = self.get_queryset()
        if len(prescription) > 0:
            return self.update(request, *args, **kwargs)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ListCreateMedicinePrescriptionUserView(ListCreateAPIView, GenericAPIView):
    serializer_class = serializers.UserMedicinePrescriptionSerializer

    def get_queryset(self):
        return models.UserMedicinePrescription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateDeleteMedicinePrescriptionUserView(RetrieveUpdateDestroyAPIView, GenericAPIView):
    serializer_class = serializers.UserMedicinePrescriptionSerializer

    def get_queryset(self):
        return models.UserMedicinePrescription.objects.filter(user=self.request.user)


################
# User Log Views

class ListCreateInsulinLogUserView(ListCreateAPIView, DestroyAPIView, GenericAPIView):
    serializer_class = serializers.InsulinLogSerializer

    def get_queryset(self):
        return models.InsulinDosageLog.objects.filter(user=self.request.user).order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateDeleteInsulinLogUserView(RetrieveUpdateDestroyAPIView, GenericAPIView):
    serializer_class = serializers.InsulinLogSerializer

    def get_queryset(self):
        return models.InsulinDosageLog.objects.filter(user=self.request.user)


class ListCreateBloodSugarLogUserView(ListCreateAPIView, GenericAPIView):
    serializer_class = serializers.SugarLevelLogSerializer

    def get_queryset(self):
        return models.SugarLevelLog.objects.filter(user=self.request.user).order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateDeleteSugarLevelLogUserView(RetrieveUpdateDestroyAPIView, GenericAPIView):
    serializer_class = serializers.SugarLevelLogSerializer

    def get_queryset(self):
        return models.SugarLevelLog.objects.filter(user=self.request.user)
