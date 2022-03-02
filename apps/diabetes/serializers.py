from rest_framework import serializers
from . import models
from apps.user.models import User


class UserMedicinePrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserMedicinePrescription
        fields = ('name', 'type', 'quantity', 'dosage_count', 'note', 'created_at', 'updated_at')
        read_only_fields = ('updated_at',)


class UserInsulinPrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserInsulinPrescription
        fields = ('frequency', 'count', 'interval', 'quantity', 'note', 'created_at', 'updated_at')
        read_only_fields = ('updated_at',)


class InsulinLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InsulinDosageLog
        fields = ('type', 'quantity', 'note', 'created_at', 'updated_at')
        read_only_fields = ('updated_at',)


class SugarLevelLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SugarLevelLog
        fields = ('type', 'level', 'note', 'created_at', 'updated_at')
        read_only_fields = ('updated_at',)


class UserDoctorSerializer(serializers.ModelSerializer):
    medicine_prescription_set = UserMedicinePrescriptionSerializer(many=True)
    insulin_prescription_set = UserInsulinPrescriptionSerializer(many=True)

    class Meta:
        model = User
        fields = (
            'username', 'first_name', 'last_name', 'avatar', 'display_name', 'gender', 'age',
            'medicine_prescription_set', 'insulin_prescription_set'
        )
