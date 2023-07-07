import json
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import JsonResponse,  HttpResponseRedirect


from .models import Statement, Job, Education, Customize

# Create your views here.

def index(request):
    
    fonts = [
    "Arial, sans-serif",
    "Helvetica, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Impact, Charcoal, sans-serif",
    "Comic Sans MS, cursive",
    "Trebuchet MS, sans-serif",
    "Arial Black, Gadget, sans-serif",
    "Lucida Sans Unicode, Lucida Grande, sans-serif",
    "Palatino Linotype, Book Antiqua, Palatino, serif",
    "Arial Narrow, sans-serif",
    "Century Gothic, sans-serif",
    "Garamond, serif",
    "Bookman Old Style, serif",
    "Consolas, monospace",
    "Franklin Gothic Medium, sans-serif",
    "Copperplate, Copperplate Gothic Light, sans-serif",
    "Calibri, sans-serif",
    "Cambria, serif"
    ]


    colors = [
    "black",
    "white",
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "gray",
    "pink",
    "brown",
    "teal",
    "navy",
    "maroon",
    "olive",
    "silver",
    "gold",
    "cyan",
    "lime",
    "indigo",
    "aqua",
    "coral",
    "darkgreen",
    "firebrick",
    "fuchsia",
    "lightblue",
    "magenta",
    "lightgreen",
    "orchid",
    "plum",
    "royalblue",
    "salmon",
    "seagreen",
    "sienna",
    "skyblue",
    "tan",
    "tomato",
    "violet",
    "wheat",
    "yellowgreen"
    ]
    
    difficult_colors = [color for color in colors if color not in ["white", "yellow", "lightgreen", "lightblue", "silver", "cyan", "pink","gold", "lime", "aqua", "wheat" ]]
    
    alignment = [
        "left",
        "right",
        "center"
    ]

    text_style = [
        "paragraph",
        "list"
    ]
    statement = Statement.objects.get()
    jobs = Job.objects.all()
    jobs = jobs.order_by('-start_date')
    education = Education.objects.all()
    return render(request, "jcv/index.html",{
        'statement': statement.text,
        'jobs': jobs,
        'education': education,
        'fonts': fonts,
        'colours': colors,
        'coloursd': difficult_colors,
        'alignment': alignment,
        'textstyle': text_style
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
        jobs = jobs.order_by('-start_date')
        serialized_jobs = [job.serialize() for job in jobs]
        return JsonResponse({'jobs': serialized_jobs}, safe=False)
    
def customise(request, custom):
    if request.method == 'PUT':
        if custom != 'all':
            data = json.loads(request.body)
            div = Customize.objects.get(name= custom)
            div.font = data.get("font", "")
            div.font_colour = data.get("fontcolour", "")
            div.background_colour = data.get("backgroundcolour", "")
            div.align = data.get("alignment", "")
            div.style = data.get("textstyle", "")
            div.save()
            if custom == 'statement':
                statement = Statement.objects.get()
                return JsonResponse({"font": div.font, "fontcolour": div.font_colour , "backgroundcolour": div.background_colour, "alignment": div.align, "textstyle": div.style, "text": statement.text})
            else:
                return JsonResponse({"font": div.font, "fontcolour": div.font_colour , "backgroundcolour": div.background_colour, "alignment": div.align, "textstyle": div.style})
    else:
        divs = Customize.objects.all()
        seralized_divs = [div.serialize_div() for div in divs]
        return JsonResponse([seralized_divs], safe=False)

def edit_text(request, text):
    if request.method == 'POST':
        text = Statement.objects.get()
        data = json.loads(request.body)
        newtext = data.get("text", "")
        text.text = newtext
        text.save()
        return JsonResponse({"text": text.text})
    
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "jcv/index.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "jcv/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))
