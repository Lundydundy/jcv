from django.db import models

# Create your models here.

class Statement(models.Model):
    text = models.TextField()
    def __str__(self):
        return "Statement"

class Job(models.Model):
    job_title = models.CharField(max_length=180)
    company_name = models.CharField(max_length=180)
    start_date = models.DateField()
    end_date = models.DateField(blank=True,null=True, default='Present')
    responsiblilties = models.TextField()
    img = models.ImageField(blank=True, null=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"
    
    def serialize(self):
        return{
            'id': self.id,
            'fulljob': f"{self.job_title} at {self.company_name}",
            'jobtitle': self.job_title,
            'companyname': self.company_name,
            'startdate': self.start_date,
            'enddate': self.end_date,
            'responsibilities': self.responsiblilties
        }

class Education(models.Model):
    institute = models.CharField(max_length=180, null=True)
    certification = models.CharField(max_length=180)

    def __str__(self):
        return f"{self.institute} - {self.certification}"
