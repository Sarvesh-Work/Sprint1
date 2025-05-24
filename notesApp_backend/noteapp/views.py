from django.conf import settings
from datetime import timedelta
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from noteapp.models import Note
from noteapp.serializers import NoteSerializer
from django.shortcuts import get_object_or_404
from .serializers import UserSignupSerializer, UserLoginSerializer

def generate_token(user):
    access = AccessToken.for_user(user)
    access.set_exp(lifetime=timedelta(days=7))
    return str(access)

def attach_token_cookie(response, token):
    response.set_cookie(
        key='notes_app_token',
        value=token,
        httponly=True,
        max_age=7 * 24 * 60 * 60,
        secure=False,  
        samesite='Lax',  
    )
    return response

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signup(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = generate_token(user)
        response = Response({
            'user': {
                'name': user.name,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)
        return attach_token_cookie(response, token)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signin(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            token = generate_token(user)
            response = Response({
                'user': {
                    'name': user.name,
                    'email': user.email,
                }
            }, status=status.HTTP_200_OK)
            return attach_token_cookie(response, token)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    response = Response({'detail': 'Logged out successfully'}, status=status.HTTP_200_OK)
    response.delete_cookie('notes_app_token')
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'name': user.name,
        'email': user.email
    })

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def notes(request):
    if request.method == 'GET':
        notes = Note.objects.filter(user=request.user).order_by('-created_at')  # optional: ordering
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def note_detail(request, slug):
    try:
        note = Note.objects.get(slug=slug, user=request.user)
    except Note.DoesNotExist:
        return Response({'detail': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        return Response(NoteSerializer(note).data)
    
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_note_by_title(request):
    print("SEARCH VIEW HIT")  
    query = request.query_params.get('q')
    print("QUERY:", query)

    if not query:
        return Response(
            {"detail": "Search query parameter 'q' is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    notes = Note.objects.filter(title__icontains=query, user=request.user)

    if not notes.exists():
        return Response({"detail": "No notes found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note_by_slug(request, slug):
    note = get_object_or_404(Note, slug=slug, user=request.user)
    note.delete()
    return Response({'detail': 'Note deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_note_by_slug(request, slug):
    note = get_object_or_404(Note, slug=slug, user=request.user)
    serializer = NoteSerializer(note, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()  # This triggers Note.save() with slug logic
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

