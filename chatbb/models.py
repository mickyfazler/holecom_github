from django.db import models

# Create your models here.
class RomUserNameTablebb(models.Model):
    room_namedb=models.CharField(max_length=70)
    user_namedb=models.CharField(max_length=70)

class RatingsTablebb(models.Model):
    ratingsdb=models.IntegerField()
    fdbkdb=models.CharField(max_length=70)