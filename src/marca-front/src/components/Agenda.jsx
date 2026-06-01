import Button from "./basicos/Button";

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

  async function confirmarAgendamento() {
    try {
      const dataConsulta = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(diaSelecionado).padStart(2, "0")}`;

      const formData = new FormData();

      formData.append("pacienteId", String(usuario?.id));

      formData.append("clinica", clinica);

      formData.append("especialidade", especialidade);

      formData.append("data", dataConsulta);

      if (arquivo) {
        formData.append("arquivo", arquivo);
      }

      const response = await fetch(
        "http://localhost:8080/api/paciente/agendar",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      if (!response.ok) {
        const textoErro = await response.text();

        console.error(textoErro);

        throw new Error(textoErro);
      }

      alert("Consulta agendada com sucesso!");

      setModalAberto(false);

      setDiasLiberados((prev) => prev.filter((d) => d !== dataConsulta));

      navigate("/home");
    } catch (erro) {
      console.error(erro);

      alert(erro.message);
    }
  }

  function toggleDia(dia) {
    const chave = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

    setDiasLiberados((prev) =>
      prev.includes(chave) ? prev.filter((d) => d !== chave) : [...prev, chave],
    );
  }

  function handleClickDia(dia, ocupado, lotado) {
    if (dia === "") return;

    if (tipoAgenda === "agendarConsulta") {
      if (!ocupado) {
        setDiaSelecionado(dia);
        setDiaLotadoSelecionado(lotado);
        setModalAberto(true);
      }
    } else if (tipoAgenda === "liberarDias") {
      toggleDia(dia);
    }
  }

  async function enviarDias() {
    try {
      if (!clinica) {
        alert("Selecione uma clínica");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/funcionario/liberarDias",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            dias: diasLiberados,
            clinica: clinica,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar dias");
      }

      alert("Dias enviados com sucesso!");
      setDiasLiberados([]);
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
          setDiasLiberados(
            data.map((dia) => dia.data)
          );

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

          const liberado = diasLiberados.includes(chave);
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
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              {diaLotadoSelecionado
                ? "Entrar na fila de espera"
                : "Confirmar Consulta"}
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

            <div className="flex justify-center gap-4">
              <Button onClick={() => setModalAberto(false)} cor="vazado">
                Cancelar
              </Button>

              <Button onClick={confirmarAgendamento} cor="fundo">
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
