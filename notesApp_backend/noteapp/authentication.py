from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('notes_app_token')  # Match the cookie name
        if not token:
            return None

        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = User.objects.get(id=user_id)
            return (user, None)
        except Exception:
            raise AuthenticationFailed('Invalid or expired token')