"use client";

import { CidadeInterface, EstadoInterface } from "@/types/IbgeInterfaces";
import { useEffect, useState } from "react";

export function Formulario() {
  const [estados, setEstados] = useState<EstadoInterface[]>([]);
  const [cidades, setCidades] = useState<CidadeInterface[]>([]);

  useEffect(() => {
    obterEstados();
  }, []);

  async function obterEstados() {
    const response = await fetch("http://127.0.0.1:8000/v1/estados/", {
      method: "GET",
    });
    if (!response.ok) {
      console.error("Erro ao consultar a API de Estados");
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setEstados(data);
  }

  async function obterCidades(siglaUf: string) {
    const response = await fetch(
      `http://127.0.0.1:8000/v1/estados/${siglaUf}/cidades`
    );
    if (!response.ok) {
      console.error("Erro ao consultar a API de Cidades");
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setCidades(data);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    await fetch("http://127.0.0.1:8000/v1/cidades/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <form
      className="flex flex-col gap-4 justify-center w-full items-center"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="nome">Nome</label>
        <input
          name="nome"
          type="text"
          id="nome"
          autoFocus
          className="bg-gray-50 border border-gray300 rounded ml-2"
        />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          type="email"
          id="email"
          className="bg-gray-50 border border-gray300 rounded ml-2"
        />
      </div>
      <div>
        <label htmlFor="estados">Estado:</label>
        <select
          name="estados"
          id="estados"
          className="bg-gray-50 border border-gray300 rounded p-2 ml-2"
          onChange={(event) => {
            obterCidades(event.target.value);
          }}
        >
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.codigo} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cidades">Cidade:</label>
        <select
          name="cidades"
          id="cidades"
          className="bg-gray-50 border border-gray300 rounded p-2 ml-2"
          disabled={cidades.length === 0}
        >
          {cidades.length === 0 ? (
            <option value="">Selecione um estado primeiro</option>
          ) : (
            <option value="">Selecione uma cidade</option>
          )}
          {cidades.map((cidade) => (
            <option key={cidade.codigo} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>
      </div>
      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded text-white transition-all">
        Cadastrar
      </button>
    </form>
  );
}
