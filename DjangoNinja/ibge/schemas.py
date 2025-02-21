from ninja import Schema


class UfSchema(Schema):
    codigo: int
    sigla: str
    nome: str


class CidadeCollectionSchema(Schema):
    codigo: int
    nome: str


class CidadeSchema(CidadeCollectionSchema):
    microrregiao: int
    regiao_imediata: int
    codigo_tom: int
    sigla_uf: str
    codigo_uf: int
    nome_uf: str
