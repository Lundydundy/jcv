# Generated by Django 4.1.7 on 2023-06-07 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jcv', '0003_job_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='end_date',
            field=models.DateField(blank=True, default='Present', null=True),
        ),
    ]