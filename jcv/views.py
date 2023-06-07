import json
from django.shortcuts import render
from .models import Statement, Job, Education
from django.http import JsonResponse

# Create your views here.

def index(request):
    statement = Statement.objects.get()
    jobs = Job.objects.all()
    education = Education.objects.all()
    return render(request, "jcv/index.html",{
        'statement': statement.text,
        'jobs': jobs,
        'education': education
    })

def job_modal_info(request):
    if request.method =='POST':
        data = json.loads(request.body)
        job_id = data.get("id", "")
        job = Job.objects.get(id = int(job_id))
        serialized_job = job.serialize()
        return JsonResponse({'job': serialized_job}, safe=False)
    else:
        jobs = Job.objects.all()
        serialized_jobs = [job.serialize() for job in jobs]
        return JsonResponse({'jobs': serialized_jobs}, safe=False)