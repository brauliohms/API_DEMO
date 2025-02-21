from django.db import models


class Cidade(models.Model):
    codigo = models.IntegerField(primary_key=True)
    nome = models.CharField(max_length=50)
    microrregiao = models.IntegerField(blank=True, null=True)
    regiao_imediata = models.IntegerField(blank=True, null=True)
    codigo_tom = models.SmallIntegerField(blank=True, null=True)
    sigla_uf = models.CharField(max_length=2)
    codigo_uf = models.SmallIntegerField()
    nome_uf = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = "cidade"


class Uf(models.Model):
    codigo = models.SmallIntegerField(primary_key=True)
    sigla = models.CharField(max_length=2)
    nome = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = "uf"
