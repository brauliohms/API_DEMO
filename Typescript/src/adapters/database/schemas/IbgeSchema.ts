export interface Uf {
  codigo: number;
  sigla: string;
  nome: string;
}

export interface Cidade {
  codigo: number;
  nome: string;
  microrregiao: string;
  regiao_imediata: string;
  codigo_tom: number;
  sigla_uf: string;
  codigo_uf: number;
  nome_uf: string;
}
