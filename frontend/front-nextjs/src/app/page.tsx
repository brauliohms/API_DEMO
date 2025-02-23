import { Formulario } from "@/components/Formulario";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center w-full h-screen p-8">
      <h1 className="w-full text-center font-black text-2xl">
        Cadastro de Usuário
      </h1>
      <Formulario />
    </main>
  );
}
