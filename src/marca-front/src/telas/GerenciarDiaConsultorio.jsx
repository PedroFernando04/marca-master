import { useEffect, useState } from "react";

import Header from "../components/utilitarios/Header";
import Button from "../components/basicos/Button";
import Select from "../components/basicos/Select";
import TabelaDiaConsultorio from "../components/TabelaDiaConsultorio";

import UsuarioLogado from "../config/UsuarioLogado";

export default function GerenciarDiaConsultorio() {
  const { usuario, carregando } = UsuarioLogado();

  const [registros, setRegistros] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [turnos, setTurnos] = useState([]);

  const [clinica, setClinica] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoClinica, setNovoClinica] = useState("");
  const [novoDiaSemana, setNovoDiaSemana] = useState("");
  const [novoEspecialidade, setNovoEspecialidade] = useState("");
  const [novoTurno, setNovoTurno] = useState("");
  const [salvandoNovo, setSalvandoNovo] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/especialidades", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setEspecialidades(data))
      .catch((error) => console.log(error));

    fetch("http://localhost:8080/api/enum/clinicas", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setClinicas(data))
      .catch((error) => console.log(error));

    fetch("http://localhost:8080/api/enum/diasSemana", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setDiasSemana(data))
      .catch((error) => console.log(error));

    fetch("http://localhost:8080/api/enum/turnos", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTurnos(data))
      .catch((error) => console.log(error));
  }, []);

  function buscarRegistros() {
    const params = new URLSearchParams();

    if (clinica) params.set("clinica", clinica);
    if (diaSemana) params.set("diaSemana", diaSemana);
    if (especialidade) params.set("especialidade", especialidade);
    params.set("pagina", pagina);

    fetch(`http://localhost:8080/api/diaConsultorio?${params.toString()}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setRegistros(data.content);
        setTotalPaginas(data.totalPages);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    buscarRegistros();
  }, [clinica, diaSemana, especialidade, pagina]);

  function limparFiltros() {
    setClinica("");
    setDiaSemana("");
    setEspecialidade("");
    setPagina(0);
  }

  function abrirModalCriacao() {
    setNovoClinica("");
    setNovoDiaSemana("");
    setNovoEspecialidade("");
    setNovoTurno("");
    setModalAberto(true);
  }

  async function criarDiaConsultorio() {
    if (!novoClinica || !novoDiaSemana || !novoEspecialidade || !novoTurno) {
      alert("Preencha todos os campos.");
      return;
    }

    setSalvandoNovo(true);

    try {
      const response = await fetch("http://localhost:8080/api/diaConsultorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          clinica: novoClinica,
          diaSemana: novoDiaSemana,
          especialidade: novoEspecialidade,
          turno: novoTurno,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar registro");
      }

      setModalAberto(false);
      buscarRegistros();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar registro");
    } finally {
      setSalvandoNovo(false);
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  const podeAcessar =
    usuario?.tipo === "Funcionario" && usuario?.tipoFuncionario === "RESPONSAVEL";

  if (!podeAcessar) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <p className="text-center mt-10 text-lg text-gray-600">
          Você não tem permissão para acessar esta tela.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <div className="mt-5 mb-[-30px] flex justify-end">
        <Button cor="fundo" rota="/home">
            Voltar
        </Button>
      </div>

      <div className="flex justify-center mb-5">
        <div
          className="
            flex flex-col lg:flex-row
            lg:justify-between
            lg:items-end
            gap-5
            mt-8 mb-5
            bg-white
            backdrop-blur-md
            rounded-2xl
            border border-white/40
            shadow-lg
            p-5
            overflow-hidden
            w-full max-w-6xl
          "
        >

          
          <div className="flex flex-col gap-2 min-w-[220px]">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Clínica
            </label>

            <Select
              tipo="clinica"
              value={clinica}
              onChange={(valor) => {
                setClinica(valor);
                setPagina(0);
              }}
              opcoesFiltradas={clinicas}
              ajuste=""
            />
          </div>

          <div className="flex flex-col gap-2 min-w-[220px]">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Dia da Semana
            </label>

            <Select
              tipo="diaSemana"
              value={diaSemana}
              onChange={(valor) => {
                setDiaSemana(valor);
                setPagina(0);
              }}
              opcoesFiltradas={diasSemana}
              ajuste=""
            />
          </div>

          <div className="flex flex-col gap-2 min-w-[220px]">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Especialidade
            </label>

            <Select
              tipo="especialidade"
              value={especialidade}
              onChange={(valor) => {
                setEspecialidade(valor);
                setPagina(0);
              }}
              opcoesFiltradas={especialidades}
              ajuste=""
            />
          </div>

          <div className="w-full lg:w-auto flex justify-center lg:justify-end gap-2">
            <Button cor="vazado" onClick={limparFiltros}>
              Limpar filtro
            </Button>

            <Button cor="fundo" onClick={abrirModalCriacao}>
              Novo
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4 px-2 overflow-x-auto">
        <div className="w-full max-w-6xl">
          <TabelaDiaConsultorio
            registros={registros}
            setRegistros={setRegistros}
            especialidades={especialidades}
            onAlterado={buscarRegistros}
          />
        </div>
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mb-8 bg-white/80 p-3 rounded-3xl shadow-lg mx-auto w-fit">
          <Button
            disabled={pagina === 0}
            onClick={() => setPagina(pagina - 1)}
            cor="fundo"
            ajuste="px-4 py-2 rounded-lg disabled:opacity-40"
          >
            Anterior
          </Button>

          <span>
            Página {pagina + 1} de {totalPaginas}
          </span>

          <Button
            disabled={pagina + 1 >= totalPaginas}
            onClick={() => setPagina(pagina + 1)}
            cor="fundo"
            ajuste="px-4 py-2 rounded-lg disabled:opacity-40"
          >
            Próxima
          </Button>
        </div>
      )}

      {modalAberto && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            p-4
          "
        >
          <div
            className="
              bg-white rounded-3xl
              shadow-2xl
              w-full
              max-w-lg
              p-6
            "
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Novo Dia de Consultório
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Clínica
                </label>
                <Select
                  tipo="clinica"
                  value={novoClinica}
                  onChange={setNovoClinica}
                  opcoesFiltradas={clinicas}
                  ajuste="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Dia da Semana
                </label>
                <Select
                  tipo="diaSemana"
                  value={novoDiaSemana}
                  onChange={setNovoDiaSemana}
                  opcoesFiltradas={diasSemana}
                  ajuste="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Especialidade
                </label>
                <Select
                  tipo="especialidade"
                  value={novoEspecialidade}
                  onChange={setNovoEspecialidade}
                  opcoesFiltradas={especialidades}
                  ajuste="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Turno
                </label>
                <Select
                  tipo="turno"
                  value={novoTurno}
                  onChange={setNovoTurno}
                  opcoesFiltradas={turnos}
                  ajuste="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button cor="vazado" onClick={() => setModalAberto(false)}>
                Cancelar
              </Button>

              <Button
                cor="fundo"
                disabled={salvandoNovo}
                onClick={criarDiaConsultorio}
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