from django.shortcuts import render
from .models import Statement, Job

# Create your views here.

def index(request):
    statement = Statement.objects.get()
    jobs = Job.objects.all()
    return render(request, "jcv/index.html",{
        'statement': statement.text,
        'jobs': jobs
    })