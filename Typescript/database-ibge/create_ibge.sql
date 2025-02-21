CREATE TABLE IF NOT EXISTS uf (
  codigo smallint primary key,
  sigla varchar(2) not null,
  nome varchar(30) not null
);

CREATE TABLE IF NOT EXISTS cidade (
  codigo int primary key,
  nome varchar(50) not null,
  microrregiao int,
  regiao_imediata int,
  codigo_tom smallint,
  sigla_uf varchar(2) not null,
  codigo_uf smallint not null,
  nome_uf varchar(30) not null
);
