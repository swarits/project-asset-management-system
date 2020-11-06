from django.db import models

class User(models.Model):
    """
    ams User Model
    :model:`user.User`
    """
    email = models.CharField(max_length=50, unique=True)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    password = models.CharField(max_length=15)
    # 0-admin group, 1-general group
    group = models.IntegerField()
    client_id = models.IntegerField(default=101)

    def __str__(self):
        return self.email
