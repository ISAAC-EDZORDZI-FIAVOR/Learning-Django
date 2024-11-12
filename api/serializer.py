from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer()
    class Meta:
        model = Department
        fields = '__all__'
        
class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = '__all__'
        
        
class UserSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'department']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password'],
            department=validated_data.get('department')
        )
        return user

class UserSerializerReadlOnly(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'department']



# Serializer for the custom token and login view
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            data['user'] = {
                'id': str(self.user.id),
                'email': self.user.email,
                'name': self.user.name,
                'department': {
                    'id': str(self.user.department.id),
                    'name': self.user.department.name,
                    'faculty': {
                        'id': str(self.user.department.faculty.id),
                        'name': self.user.department.faculty.name
                    }
                } if self.user.department else None
            }
            return {
                'status': 'success',
                'message': 'Login successful',
                'data': data
            }
        except:
            return {
                'status': 'error',
                'message': 'Invalid credentials',
                'data': None
            }
