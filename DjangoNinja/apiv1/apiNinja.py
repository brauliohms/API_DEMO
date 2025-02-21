from ninja import NinjaAPI

from ibge.api import cidade_router, uf_router

api = NinjaAPI(version="1.1", title="API IBGE")

api.add_router("/estados", uf_router)
api.add_router("/cidades", cidade_router)


@api.get("/ping")
def pont(request):
    return "pong"
