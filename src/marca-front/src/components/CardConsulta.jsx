import { useState, useEffect } from "react";

import Button from "./basicos/Button";

export default function CardConsulta({
  agendamento,

  especialidades,

  confirmarConsulta,
  aguardarConsulta,
  cancelarConsulta
}) {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function descricaoEspecialidade(codigo) {
    const especialidadeEncontrada = especialidades.find(
      (e) => e.codigo === codigo,
    );

    return especialidadeEncontrada ? especialidadeEncontrada.descricao : codigo;
  }

  const urlEncaminhamento = `http://localhost:8080/api/agendamento/${agendamento.id}/encaminhamento/arquivo`;

  function ehImagem(path) {
    if (!path) return false;

    return (
      path.endsWith(".png") ||
      path.endsWith(".jpg") ||
      path.endsWith(".jpeg") ||
      path.endsWith(".webp")
    );
  }

  function podeAlterarConsulta() {
    const agora = new Date();

    const dataConsulta = new Date(`${agendamento.data}T00:00:00`);

    const diferencaMs = dataConsulta - agora;

    const horas = diferencaMs / (1000 * 60 * 60);

    return horas >= 0 && agendamento.statusEncaminhamento !== "REPROVADO" && agendamento.filaDeEspera === false && horas <= 24;
  }

  
    const [clinicas, setClinicas] = useState([]);
    const somenteClinico = location.state?.clinicoGeral;

    useEffect(() => {
            async function carregarEnums() {
                try {
                    const endpoint = somenteClinico
                        ? "http://localhost:8080/api/enum/clinicas/clinico-geral"
                        : "http://localhost:8080/api/enum/clinicas";
    
                    const resClinicas = await fetch(endpoint, {
                        credentials: "include"
                    });
                    const clinicasData = await resClinicas.json();
                    setClinicas(clinicasData);
                } catch (erro) {
                    console.error("Erro ao carregar enums:", erro);
                }
            }
    
            carregarEnums();
        }, [somenteClinico]);

  return (
    <>
      <div
        className="
          bg-white
          w-full
          max-w-6xl

          rounded-3xl
          shadow-lg

          border border-gray-100

          p-6

          flex flex-col
          lg:flex-row

          gap-6
          items-center
        "
      >

        
        <div className="flex-1 w-full ">
          <div className="flex items-center gap-4 ">
            <div
              className="
                bg-gradient-to-br
                from-blue-200
                to-violet-200

                w-16 h-16
                rounded-2xl
              "
            />

            <div>
              <div className="flex row-span gap-2">
                  <p className="font-semibold">{agendamento.clinica}</p>
                  <span className={`
                      inline-block
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      w-fit
                      mb-1
                      ${
                        agendamento.turno === "MANHA"
                          ? "bg-blue-100 text-blue-700"
                          :  "bg-purple-100 text-purple-700"
                      }
                    `}>
                      {agendamento.turno === "MANHA"
                        ? "Manhã - 07:30"
                        : "Tarde - 13:00"
                      }
                  </span>
                </div>

              <p className="text-sm text-violet-600 font-semibold">
                {descricaoEspecialidade(agendamento.especialidade)}
              </p>

              <p className="text-sm text-gray-500">
                  📍{clinicas.find(c => c.codigo === agendamento.clinica)?.endereco}
              </p>
            </div>
          </div>

          <div
            className="
              flex flex-wrap
              gap-4
              mt-5
              items-center
            "
          >
            <p className="text-sm text-gray-500">
              📅 {formatarData(agendamento.data)}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">
                Consulta:
              </span>

              <span
                className={`
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      agendamento.statusAgendamento ===
                      "CONFIRMADO"
                        ? "bg-green-100 text-green-700"
                        : agendamento.statusAgendamento ===
                            "CANCELADO"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                `}
              >
                {agendamento.statusAgendamento}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">
                Encaminhamento:
              </span>

              <span
                className={`
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      agendamento.statusEncaminhamento ===
                      "APROVADO"
                        ? "bg-green-100 text-green-700"
                        : agendamento.statusEncaminhamento ===
                            "REPROVADO"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                `}
              >
                {agendamento.statusEncaminhamento}
              </span>
            </div>

            {agendamento.filaDeEspera && (
              <div className="flex items-center gap-2">

                  <span
                      className="
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-semibold

                        bg-purple-100
                        text-purple-700
                      "
                  >
                    FILA DE ESPERA
                  </span>
              </div>
          )}
          </div>
        </div>

        <button
          onClick={() => window.open(urlEncaminhamento, "_blank")}
          className="
            w-full
            lg:w-[220px]

            h-[140px]

            border
            rounded-2xl

            overflow-hidden

            bg-gray-50
            hover:opacity-90

            transition
            flex-shrink-0
          "
        >
          {ehImagem(agendamento.encaminhamentoMedicoPath) ? (
            <img
              src={urlEncaminhamento}
              alt="Encaminhamento"
              className="
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-full
                h-full

                flex flex-col
                items-center
                justify-center

                text-gray-600
                gap-2
              "
            >
              <span className="text-4xl">📄</span>

              <span className="text-sm font-medium">Abrir PDF</span>
            </div>
          )}
        </button>

        <div
          className="
            flex
            lg:flex-col

            gap-3

            w-full
            lg:w-auto

            mr-3
          "
        >
          <Button
            cor="vazado"
            ajuste="
              text-sm
              px-3
              py-1.5
              mx-0
              w-full
            "
            onClick={() => setModalAberto(true)}
          >
            Detalhes
          </Button>

          {agendamento.statusAgendamento === "CONFIRMADO" && (
            <Button
              cor="fundo"
              ajuste="
                text-sm
                px-3
                py-1.5
                mx-0
                w-full
              "
              onClick={() => aguardarConsulta(agendamento.id)}
              disabled={!podeAlterarConsulta()}
            >
              Desconfirmar
            </Button>
          )}

          {agendamento.statusAgendamento !== "CONFIRMADO" &&(
            <Button
              cor="fundo"
              ajuste="
                text-sm
                px-3
                py-1.5
                mx-0
                w-full
              "
              onClick={() => confirmarConsulta(agendamento.id)}
              disabled={!podeAlterarConsulta()}
            >
              Confirmar
            </Button>
          )}
          <Button
            cor="excluir"
            ajuste="
              text-sm
              px-3
              py-1.5
              mx-0
              w-full
            "
            onClick={() => setModalCancelar(true)}
          >

            {agendamento.statusAgendamento === "CANCELADO" ?
            (
              "Excluir"
            ) : (
              "Cancelar"
            )}
            
          </Button>
        </div>
      </div>

      {modalAberto && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40

            flex items-center
            justify-center

            p-4
          "
        >
          <div
            className="
              bg-white
              rounded-3xl

              w-full
              max-w-4xl

              p-8
            "
          >
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Detalhes da Consulta</h2>

                <p className="text-gray-500">Visualização do encaminhamento</p>
              </div>

              <button
                onClick={() => setModalAberto(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <div 
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-8
                ">
              <div >
                <p className="text-gray-500 text-sm">Clínica</p>

                <div className="flex row-span gap-2">
                  <p className="font-semibold">{agendamento.clinica}</p>
                  <span className={`
                      inline-block
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      w-fit

                      ${
                        agendamento.turno === "MANHA"
                          ? "bg-blue-100 text-blue-700"
                          :  "bg-purple-100 text-purple-700"
                      }
                    `}>
                      {agendamento.turno === "MANHA"
                        ? "Manhã - 07:30"
                        : "Tarde - 13:00"
                      }
                  </span>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Especialidade</p>

                <p className="font-semibold">
                  {descricaoEspecialidade(agendamento.especialidade)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Endereço</p>

                <p className="font-semibold">
                  📍{clinicas.find(c => c.codigo === agendamento.clinica)?.endereco}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Data</p>

                <p className="font-semibold">
                  {formatarData(agendamento.data)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status Encaminhamento</p>

                <div className="flex flex-col gap-1 mt-1">
                  <span
                    className={`
                      inline-block
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      w-fit

                      ${
                        agendamento.statusEncaminhamento === "APROVADO"
                          ? "bg-green-100 text-green-700"
                          : agendamento.statusEncaminhamento === "REPROVADO"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {agendamento.statusEncaminhamento}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status Consulta</p>

                <div className="flex flex-col gap-1 mt-1">
                  <span
                    className={`
                      inline-block
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      w-fit

                      ${
                        agendamento.statusAgendamento === "CONFIRMADO"
                          ? "bg-green-100 text-green-700"
                          : agendamento.statusAgendamento === "CANCELADO"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {agendamento.statusAgendamento}
                  </span>

                  {agendamento.filaDeEspera && (
                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-semibold
                        w-fit

                        bg-purple-100
                        text-purple-700
                      "
                    >
                      FILA DE ESPERA
                    </span>
                  )}
                </div>
              </div>
              

              {agendamento.encaminhamentoMedicoPath && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Encaminhamento</p>

                    <button
                      onClick={() => window.open(urlEncaminhamento, "_blank")}
                      className="
                        w-full

                        h-[180px]
                        sm:h-[220px]

                        border
                        rounded-2xl
                        overflow-hidden

                        bg-gray-50
                        hover:opacity-90
                        transition

                        flex items-center
                        justify-center
                      "
                    >
                      {ehImagem(
                        agendamento.encaminhamentoMedicoPath,
                      ) ? (
                        <img
                          src={urlEncaminhamento}
                          alt="Encaminhamento"
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex flex-col
                            items-center
                            justify-center
                            gap-3
                            text-gray-600
                          "
                        >
                          <span className="text-5xl">📄</span>

                          <span className="text-sm font-medium">Abrir PDF</span>
                        </div>
                      )}
                    </button>
                  </div>
                )}

              <div className="
                  mt-4">
              <p className="text-gray-500 text-sm mb-2">Observações</p>

              <div
                className="
                  bg-gray-50
                  border
                  rounded-2xl
                  break-words
                  p-4
                "
              >
                {agendamento.descricaoEncaminhamento || "Nenhuma observação."}
              </div>
            </div>

          </div>
        </div>
      </div>
    )}

      {modalCancelar && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40 backdrop-blur-sm

            flex items-center
            justify-center

            p-4
          "
        >
          <div
            className="
              bg-white
              rounded-3xl
              shadow-2xl

              w-full
              max-w-md

              p-8
            "
          >
            <div className="text-center">
              <div
                className="
                  w-16 h-16
                  mx-auto mb-5

                  rounded-full

                  bg-red-100
                  text-red-600

                  flex items-center
                  justify-center

                  text-3xl
                "
              >
                !
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Cancelar consulta?
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Ao cancelar, o agendamento será removido permanentemente e não
                poderá ser recuperado.
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                cor="vazado"
                ajuste="
                  px-5 py-2
                  mx-0
                "
                onClick={() => setModalCancelar(false)}
              >
                Voltar
              </Button>

              <Button
                cor="excluir"
                ajuste="
                  px-5 py-2
                  mx-0
                "
                onClick={() => {
                  cancelarConsulta(agendamento.id);

                  setModalCancelar(false);
                }}
              >
                Confirmar cancelamento
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
