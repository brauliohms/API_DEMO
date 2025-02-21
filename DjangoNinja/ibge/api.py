from django.http import HttpRequest
from ninja import Router

from ibge.models import Cidade, Uf
from ibge.schemas import CidadeCollectionSchema, CidadeSchema, UfSchema

uf_router = Router()
cidade_router = Router()


@uf_router.get("/", response=list[UfSchema], tags=["UF"])
def list_ufs(request: HttpRequest):
    # se conctar ao banco e trazer todos os ufs
    ufs = Uf.objects.all()
    return ufs


@uf_router.get(
    "/{uf_sigla}/cidades", response=list[CidadeCollectionSchema], tags=["UF"]
)
def list_cities(request, uf_sigla: str):
    cities = Cidade.objects.filter(sigla_uf=uf_sigla.upper()).values("codigo", "nome")
    return cities


@cidade_router.get("/", response=list[CidadeSchema], tags=["CIDADE"])
def find_cities_by_parcial_name(request, parcial_name: str):
    cities = Cidade.objects.filter(nome__icontains=parcial_name)
    return cities


@cidade_router.get("/{id}", tags=["CIDADE"])
def find_city_by_id(request, id: int):
    city = Cidade.objects.get(codigo=id)
    if city.nome == "São Paulo":
        print("É São Paulo")
    else:
        print("Não é São Paulo")
    return city.nome
