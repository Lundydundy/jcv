# Generated by Django 4.1.7 on 2023-06-22 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jcv', '0009_alter_customize_background_colour_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customize',
            name='align',
            field=models.CharField(default='left', max_length=180),
            preserve_default=False,
        ),
    ]