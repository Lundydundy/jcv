# Generated by Django 4.1.7 on 2023-06-06 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jcv', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Statement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
    ]
