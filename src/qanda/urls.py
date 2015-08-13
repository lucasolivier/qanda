"""qanda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from perguntas import views
from user_profile import views as user_profile_views
from user_profile import urls as profile_urls
from notifications import urls as notifications_urls

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^pergunta/(?P<slug>.*)$', views.pergunta, name='pergunta'),
    url(r'^perguntar/$', views.perguntar, name='perguntar'),
    url(r'^responder/(?P<pk>.*)$', views.responder, name='responder'),
    url(r'^upvote/$', views.upvote, name='upvote'),
    url(r'^downvote/$', views.downvote, name='downvote'),
    url(r'^resp-upvote/$', views.resp_upvote, name='resp_upvote'),
    url(r'^resp-downvote/$', views.resp_downvote, name='resp_downvote'),
    url(r'^categoria/(?P<slug>.*)$', views.categoria, name='categoria'),
    url(r'^membros/$', user_profile_views.members, name='members'),
    url(r'sugest-topic/$', views.suggest_topic, name='suggest_topic'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^conta/', include('allauth.urls')),
    url(r'^perfil/', include(profile_urls)),
    url(r'^notificacoes/', include(notifications_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
