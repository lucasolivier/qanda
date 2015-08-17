#!/usr/bin/env python
# -*- coding: utf-8 -*-

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Fieldset, HTML, Field, Button, Div

from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User

from .models import UserProfile



class SignupForm(forms.Form):
    first_name = forms.CharField(max_length=30, label='Nome')
    last_name = forms.CharField(max_length=30, label='Sobrenome')

    def signup(self, request, user):
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
        perfil = UserProfile(user=user, first_name=user.first_name,
                        last_name=user.last_name, email=user.email)
        perfil.save()

        
class EditUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')
        
    def __init__(self, *args, **kwargs):
        super(EditUserForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            
        )
        
        
        

class EditProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('about', 'twitter', 'facebook', 'linkedin', 'picture')
        
    def __init__(self, *args, **kwargs):
        super(EditProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            
        )


        
