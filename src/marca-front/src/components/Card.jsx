import Button from "./basicos/Button";

export default function Card({ tipo }) {
  const tipoCard = {
    geral: {
      h1: "Clínico Geral",
      p: "Para consultas de rotina, check-ups e sintomas gerais.",
      requerimento: "Não requer encaminhamento",
      rota: "/agendar",
      geral: true,
    },

    especialista: {
      h1: "Especialista",
      p: "Cardiologia, Dermatologia, Pediatria, etc.",
      requerimento: "Requer encaminhamento médico",
      rota: "/agendar",
      geral: false,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-[550px] min-h-[400px] flex flex-col mt-4 mb-6">
      <div className="bg-gradient-to-br from-blue-200 to-blue-100 w-28 h-28 rounded-full mx-auto mt-10 mb-6">
        <div></div>
      </div>

      <div className="flex  flex-col">
        <h1 className="flex justify-center m-2 text-2xl font-bold">{`${tipoCard[tipo].h1}`}</h1>

        <div className="flex justify-center px-4 flex-row flex-wrap text-lg text-center">
          <p className="">{`${tipoCard[tipo].p}`}</p>
          <p className="font-bold">{`${tipoCard[tipo].requerimento}`}</p>
        </div>
      </div>

      <Button
        rota={`${tipoCard[tipo].rota}`}
        cor="vazado"
        ajuste="mt-auto mb-6"
        especialidadeGeral={tipoCard[tipo].geral}
      >
        Selecionar
      </Button>
    </div>
  );
}
