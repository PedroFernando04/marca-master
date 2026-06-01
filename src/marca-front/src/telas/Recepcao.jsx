import Button from "../components/basicos/Button";
import { Link } from "react-router-dom";

export default function Recepcao() {
  return (
    <div className="p-4 sm:p-11 flex flex-col items-center gap-5 min-h-screen">
      <div className="flex flex-col items-center mt-10">
        <div className="bg-gradient-to-br from-blue-500 to-violet-800 w-24 h-24 rounded-full">
          <div></div>
        </div>

        <h1 className="text-5xl font-bold my-5">
          Marcá
        </h1>

        <p className="text-gray-600 text-center">
          ❤️ Seu agendamento médico simplificado
        </p>
      </div>

      <div
        className="
          w-full
          max-w-[500px]
          h-[180px]
          text-center
          bg-white
          rounded-xl
          flex
          flex-col
          justify-center
          gap-3
          shadow-lg
          mt-5
          px-4
        "
      >
        <Button cor="fundo" rota="/entrar">
          Entrar
        </Button>

        <Button cor="vazado" rota="/cadastrar">
          Criar Conta
        </Button>
      </div>
    </div>
  );
}