import Button from "./basicos/Button";
import Select from "./basicos/Select";

import UsuarioLogado from "../config/UsuarioLogado";

import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function gerarCalendario(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const dias = [];

  for (let i = 0; i < primeiroDia; i++) {
    dias.push("");
  }

  for (let i = 1; i <= diasNoMes; i++) {
    dias.push(i);
  }

  return dias;
}

export default function Agenda({
  ajuste,
  tipoAgenda,
  clinica,
  especialidade,
  arquivo,
  pacienteId
}) {
  const navigate = useNavigate();

  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());

  const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const mesesAno = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const diasMes = gerarCalendario(ano, mes);

  function mudarMes(direcao) {
    let novoMes = mes + direcao;
    let novoAno = ano;

    if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    }

    if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    }

    setMes(novoMes);
    setAno(novoAno);
  }

  const [diasLiberados, setDiasLiberados] = useState([]);
  const [diasLotados, setDiasLotados] = useState([]);
  const [diaLotadoSelecionado, setDiaLotadoSelecionado] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const usuario = UsuarioLogado().usuario;

  const [modalTurnoAberto, setModalTurnoAberto] = useState(false);
  const [diaTurnoSelecionado, setDiaTurnoSelecionado] = useState(null);
  const [turnoManhaSelecionado, setTurnoManhaSelecionado] = useState(true);
  const [turnoTardeSelecionado, setTurnoTardeSelecionado] = useState(true);
  const [turnoEscolhido, setTurnoEscolhido] = useState(null);

  function getChave(dia) {
    return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  }

  function getDiaLiberadoObj(chave) {
    return diasLiberados.find((d) =>
      typeof d === "string" ? d === chave : d.data === chave
    );
  }

  async function confirmarAgendamento() {
    try {
      if (!turnoEscolhido) {
        alert("Selecione um turno");
        return;
      }

      const dataConsulta = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(diaSelecionado).padStart(2, "0")}`;

      const formData = new FormData();

      const idPaciente =
        usuario?.tipoFuncionario === "ATENDENTE"
            ? pacienteId
            : usuario?.id;

      formData.append(
          "pacienteId",
          String(idPaciente)
      );

      formData.append("clinica", clinica);
      formData.append("especialidade", especialidade);
      formData.append("data", dataConsulta);
      formData.append("turno", turnoEscolhido);

      if (arquivo) {
        formData.append("arquivo", arquivo);
      }

      const endpoint =
        usuario?.tipoFuncionario === "ATENDENTE"
            ? "http://localhost:8080/api/funcionario/encaixarConsulta"
            : "http://localhost:8080/api/paciente/agendar";

      const response = await fetch(
        endpoint,
        {
            method: "POST",
            credentials: "include",
            body: formData
        }
      );

      if (!response.ok) {
        const textoErro = await response.text();
        console.error(textoErro);
        throw new Error(textoErro);
      }

      alert("Consulta agendada com sucesso!");
      setModalAberto(false);
      setDiasLiberados((prev) => prev.filter((d) => d.data !== dataConsulta));
      navigate("/home");
    } catch (erro) {
      console.error(erro);
      alert(erro.message);
    }
  }

  function toggleDia(dia) {
    const chave = getChave(dia);

    setDiasLiberados((prev) => {
      const existente = prev.find((d) =>
        typeof d === "string" ? d === chave : d.data === chave
      );

      if (existente) {
        return prev.filter((d) =>
          typeof d === "string" ? d !== chave : d.data !== chave
        );
      }

      return [...prev, { data: chave, turnoManha: true, turnoTarde: true }];
    });
  }

  function abrirModalTurnos(dia) {
  const chave = getChave(dia);
  const diaObj = getDiaLiberadoObj(chave);

  setDiaTurnoSelecionado(dia);
  setTurnoManhaSelecionado(diaObj?.turnoManha ?? true);
  setTurnoTardeSelecionado(diaObj?.turnoTarde ?? true);
  setModalTurnoAberto(true);
}

async function atualizarTurno(turnoManha, turnoTarde) {
  try {
    const chave = getChave(diaTurnoSelecionado);

    const params = new URLSearchParams({
      clinica,
      data: chave,
      turnoManha,
      turnoTarde,
    });

    const response = await fetch(
      `http://localhost:8080/api/diasLiberados/turno?${params}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar turno");
    }

    if (!turnoManha && !turnoTarde) {
      setDiasLiberados((prev) =>
        prev.filter((d) => (typeof d === "string" ? d !== chave : d.data !== chave))
      );
    } else {
      setDiasLiberados((prev) =>
        prev.map((d) => {
          const dataD = typeof d === "string" ? d : d.data;
          if (dataD !== chave) return d;
          return { data: chave, turnoManha, turnoTarde };
        })
      );
    }

    setModalTurnoAberto(false);
    } catch (erro) {
      console.error(erro);
      alert(erro.message);
    }
  }

  function desliberarDiaCompleto() {
    const chave = getChave(diaTurnoSelecionado);

    setDiasLiberados((prev) =>
      prev.filter((d) => (typeof d === "string" ? d !== chave : d.data !== chave))
    );

    setModalTurnoAberto(false);
  }

  function handleClickDia(dia, ocupado, lotado) {
    if (dia === "") return;

    if (tipoAgenda === "agendarConsulta") {
      if (!ocupado) {
        setDiaSelecionado(dia);
        setDiaLotadoSelecionado(lotado);
        setTurnoEscolhido(null);
        setModalAberto(true);
      }
    } else if (tipoAgenda === "liberarDias") {
      const chave = getChave(dia);
      const jaLiberado = !!getDiaLiberadoObj(chave);

      if (jaLiberado) {
        abrirModalTurnos(dia);
      } else {
        toggleDia(dia);
      }
    }
  }

  async function enviarDias() {
    try {
      if (!clinica) {
        alert("Selecione uma clínica");
        return;
      }

      const datasParaEnviar = diasLiberados.map((d) =>
        typeof d === "string" ? d : d.data
      );

      const response = await fetch(
        "http://localhost:8080/api/funcionario/liberarDias",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            dias: datasParaEnviar,
            clinica: clinica,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar dias");
      }

      alert("Dias enviados com sucesso!");
      setDiasLiberados([]);
      window.location.reload();

    } catch (erro) {
      console.error(erro);
      alert("Erro ao enviar para o servidor");
    }
  }

  useEffect(() => {
    async function buscarDias() {
      if (!clinica) {
        setDiasLiberados([]);
        return;
      }

      let linkBusca = "";

      if (tipoAgenda === "agendarConsulta") {
        linkBusca = `http://localhost:8080/api/diasLiberados/especialidade?clinica=${clinica}&especialidade=${especialidade}&ano=${ano}&mes=${mes + 1}`;
      }

      if (tipoAgenda === "liberarDias") {
        linkBusca = `http://localhost:8080/api/diasLiberados/clinica?clinica=${clinica}&ano=${ano}&mes=${mes + 1}`;
      }

      try {
        const response = await fetch(linkBusca, {
          credentials: "include",
        });

        if (!response.ok) throw new Error();

        const data = await response.json();
        console.log(data);

        if (tipoAgenda === "agendarConsulta") {
          setDiasLiberados(data);

          setDiasLotados(
            data
              .filter((dia) => dia.lotado)
              .map((dia) => dia.data)
          );

        } else {
          setDiasLiberados(data);
          setDiasLotados([]);

        }

      } catch (err) {
        console.error("Erro ao buscar dias:", err);
      }
    }

    buscarDias();
  }, [mes, ano, clinica, especialidade, tipoAgenda]);


  return (
    <div
      className={`${ajuste} max-w-6xl mx-auto p-5 bg-white rounded-lg shadow-lg mb-10`}
    >
      <div className="flex justify-between items-center mb-7">
        <Button onClick={() => mudarMes(-1)} cor="vazado">
          Voltar
        </Button>

        <h1 className="text-lg md:text-3xl font-bold text-center">
          {mesesAno[mes]} - {ano}
        </h1>

        

        <Button onClick={() => mudarMes(1)} cor="vazado">
          Avançar
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {diasSemana.map((dia, i) => (
          <div
            key={i}
            className="text-center font-bold text-white p-1 md:p-2 text-xs md:text-base rounded-md bg-gradient-to-tr from-blue-600 to-blue-800"
          >
            {dia}
          </div>
        ))}

        {diasMes.map((dia, i) => {
          if (dia === "") {
            return <div key={i} className="h-10 md:h-16" />;
          }

          const fimDeSemana = i % 7 === 0 || (i + 1) % 7 === 0;

          const chave = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

          const diaLiberadoObj = getDiaLiberadoObj(chave);

          const liberado = !!diaLiberadoObj;

          const lotado = diasLotados.includes(chave);

          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);

          const dataAtual = new Date(ano, mes, dia);

          const passado = dataAtual < hoje;

          const ocupado = !liberado || fimDeSemana || passado;

          return (
            <div
              key={i}
              onClick={() => handleClickDia(dia, ocupado, lotado)}
              className={`
                h-10 md:h-16 flex items-center justify-center rounded-md border
                ${fimDeSemana || passado ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"}
                ${
                  fimDeSemana || passado
                    ? "bg-gray-300 text-gray-500"
                    : lotado
                      ? "bg-violet-700 text-white"
                      : liberado
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "bg-gray-200 text-gray-500"
                }
            `}
            >
              {dia}
            </div>
          );
        })}
      </div>

      {tipoAgenda === "liberarDias" && (
        <div className="flex justify-end mt-6">
          <Button onClick={enviarDias} cor="fundo">
            Salvar dias
          </Button>
        </div>
      )}

      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              {diaLotadoSelecionado ? "Entrar na fila de espera" : "Confirmar Consulta"}
            </h2>

            <p className="mb-6">
              {diaLotadoSelecionado ? (
                <>
                  Este dia já atingiu o limite de agendamentos.
                  <br />
                  Seu atendimento ficará em <strong>fila de espera</strong>.
                </>
              ) : (
                <>
                  Dia {diaSelecionado} de {mesesAno[mes]}
                </>
              )}
            </p>

            {(() => {
              const chave = getChave(diaSelecionado);
              const diaObj = getDiaLiberadoObj(chave);

              return (
                <div className="flex flex-col gap-3 mb-6 text-left">
                  <p className="text-sm font-semibold text-gray-600">Escolha o turno:</p>

                  {diaObj?.turnoManha && (
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <input
                        type="radio"
                        name="turno"
                        value="MANHA"
                        checked={turnoEscolhido === "MANHA"}
                        onChange={() => setTurnoEscolhido("MANHA")}
                        className="h-4 w-4 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        Manhã - 07:30
                      </span>
                    </label>
                  )}

                  {diaObj?.turnoTarde && (
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <input
                        type="radio"
                        name="turno"
                        value="TARDE"
                        checked={turnoEscolhido === "TARDE"}
                        onChange={() => setTurnoEscolhido("TARDE")}
                        className="h-4 w-4 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        Tarde - 13:00
                      </span>
                    </label>
                  )}
                </div>
              );
            })()}

            <div className="flex justify-center gap-4">
              <Button onClick={() => setModalAberto(false)} cor="vazado">
                Cancelar
              </Button>

              <Button
                onClick={confirmarAgendamento}
                cor="fundo"
                disabled={!turnoEscolhido}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {modalTurnoAberto && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">

            {/* Botão fechar */}
            <button
              onClick={() => setModalTurnoAberto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-1 mt-2">
              Gerenciar dia liberado
            </h2>

            <p className="text-gray-500 mb-6">
              Dia {diaTurnoSelecionado} de {mesesAno[mes]}
            </p>

            <div className="flex flex-col gap-3 mb-8 text-left">
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <span className="relative flex items-center justify-center h-5 w-5 shrink-0">
                  <input
                    type="checkbox"
                    checked={turnoManhaSelecionado}
                    onChange={(e) => setTurnoManhaSelecionado(e.target.checked)}
                    className="peer appearance-none h-5 w-5 rounded-md border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute h-3.5 w-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  Turno da manhã
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <span className="relative flex items-center justify-center h-5 w-5 shrink-0">
                  <input
                    type="checkbox"
                    checked={turnoTardeSelecionado}
                    onChange={(e) => setTurnoTardeSelecionado(e.target.checked)}
                    className="peer appearance-none h-5 w-5 rounded-md border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute h-3.5 w-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  Turno da tarde 
                </span>
              </label>
            </div>

            <div className="flex justify-center gap-3">
              <Button onClick={desliberarDiaCompleto} cor="excluir">
                Cancelar dia
              </Button>

              <Button
                onClick={() => atualizarTurno(turnoManhaSelecionado, turnoTardeSelecionado)}
                cor="fundo"
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
