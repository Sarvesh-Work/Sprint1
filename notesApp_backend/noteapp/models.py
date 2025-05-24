# models.py
from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User

class CustomUserManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(name=name, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email




class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    CATEGORY_CHOICES = [
        ('BUSINESS', 'Business'),
        ('PERSONAL', 'Personal'),
        ('IMPORTANT', 'Important'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='PERSONAL')
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        slug_base = slugify(self.title)

        # Generate a new slug only if it's not already set (for new note creation)
        if not self.slug:
            new_slug = slug_base
            while Note.objects.filter(slug=new_slug).exists():
                random_suffix = get_random_string(5)
                new_slug = f'{slug_base}-{random_suffix}'
            self.slug = new_slug

        # Call the parent class's save method to persist the note
        super().save(*args, **kwargs)



