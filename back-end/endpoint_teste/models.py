from django.db import models

# Create your models here.
class EndpointTesteModel(models.Model):
    teste = models.CharField(blank=False, max_length=300)
    
    def __str__(self):
        return self.teste