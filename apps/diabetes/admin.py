from django.contrib import admin
from . import models


@admin.register(models.SugarLevelLog)
class Model1(admin.ModelAdmin):
    pass


@admin.register(models.InsulinDosageLog)
class Model2(admin.ModelAdmin):
    pass


@admin.register(models.UserMedicinePrescription)
class Model2(admin.ModelAdmin):
    pass


@admin.register(models.UserInsulinPrescription)
class Model2(admin.ModelAdmin):
    pass
