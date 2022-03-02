from django.db import models

from apps.user.models import User


class UserMedicinePrescription(models.Model):
    MEDICINE_TYPE = (
        ('SYRUP', 'Syrup'),
        ('TABLET', 'Tablet')
    )

    user = models.ForeignKey(User, on_delete=models.CharField, related_name='medicine_prescription_set')
    name = models.CharField(max_length=255)
    type = models.CharField(choices=MEDICINE_TYPE, max_length=10, blank=True, null=True)
    quantity = models.DecimalField(default=1, decimal_places=1, max_digits=4, help_text='Quantity per Dosage')
    dosage_count = models.IntegerField(default=3, help_text='Dosage count per day')

    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserInsulinPrescription(models.Model):
    FREQ_CHOICE = (
        ("SECONDLY", "Second"),
        ("MINUTELY", "Minute"),
        ("HOURLY", "Hour"),
        ("DAILY", "Day"),
        ("WEEKLY", "Week"),
        ("MONTHLY", "Month"),
        ("YEARLY", "Year"),
    )

    user = models.ForeignKey(User, on_delete=models.CharField, related_name='insulin_prescription_set')
    frequency = models.CharField(max_length=10, choices=FREQ_CHOICE)
    count = models.IntegerField(default=1)
    interval = models.IntegerField(default=1)
    quantity = models.IntegerField()

    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class InsulinDosageLog(models.Model):
    TYPE_CHOICE = (
        ('BASAL', 'Basal'),
        ('BOLUS', 'Bolus'),
    )

    user = models.ForeignKey(User, on_delete=models.CharField)
    type = models.CharField(choices=TYPE_CHOICE, max_length=10)
    quantity = models.IntegerField()

    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SugarLevelLog(models.Model):
    TYPE_CHOICE = (
        ('BEFORE_MEAL', 'Before Meal'),
        ('AFTER_MEAL', 'After Meal'),
        ('OTHER', 'Other'),
    )

    user = models.ForeignKey(User, on_delete=models.CharField)
    type = models.CharField(choices=TYPE_CHOICE, max_length=20)
    level = models.IntegerField(help_text='mg/dL')

    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
