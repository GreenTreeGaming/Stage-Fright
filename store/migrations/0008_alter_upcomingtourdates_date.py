# Generated by Django 5.1.3 on 2024-12-24 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_alter_pastevents_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upcomingtourdates',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
