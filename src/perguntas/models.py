#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.db import models


# Create your models here.


class Tag(models.Model):
    nome = models.CharField(max_length=70, unique=True)
    slug = models.SlugField(unique=True)
    views = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    classe = models.CharField(max_length=100, default='tag')
    
    def __unicode__(self):
        return self.nome
    
    def get_absolute_url(self, ):
        return reverse('tag', args=[self.slug])
    
    def perguntas(self,):
        perg = self.pergunta_set.all()
        return perg
    
    def num_perguntas(self, ):
        perg = self.pergunta_set.all()
        return len(perg)


class Pergunta(models.Model):
    autor = models.ForeignKey(User)
    data = models.DateField(default=datetime.now)
    titulo = models.CharField(max_length=300, verbose_name='Título')
    slug = models.SlugField(unique=True)
    descricao = models.TextField(verbose_name='Descrição', max_length=5000)
    views = models.IntegerField(default=0)
    votes = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    classe = models.CharField(max_length=100, default='pergunta')
    
    def __unicode__(self):
        return self.titulo
    
    def get_absolute_url(self, ):
        return reverse('pergunta', args=[self.slug])
    
    def num_respostas(self,):
        resp = self.resposta_set.all()
        return len(resp)
    
    def respostas(self,):
        resp = self.resposta_set.all()
        return resp
    

class Resposta(models.Model):
    pergunta = models.ForeignKey(Pergunta)
    autor = models.ForeignKey(User)
    data = models.DateField(default=datetime.now)
    resposta = models.TextField(max_length=5000)
    votes = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    classe = models.CharField(max_length=100, default='resposta')
    
    def __unicode__(self):
        return 'Por %s em %s' % (self.autor, self.data)