from django.shortcuts import render

# Create your views here.
def mainFuncbb(request):
    contextz={}
    return render(request,'chaty/mainy.html',context=contextz)