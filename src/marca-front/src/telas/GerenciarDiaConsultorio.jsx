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
  const [clinica, setClinica] = useState("");

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
  }, []);

  useEffect(() => {
    const url = clinica
      ? `http://localhost:8080/api/diaConsultorio?clinica=${clinica}`
      : "http://localhost:8080/api/diaConsultorio";

    fetch(url, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setRegistros(data))
      .catch((error) => console.log(error));
  }, [clinica]);

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

      <div className="flex justify-center">
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
          "
        >
          <div className="flex flex-col gap-2 min-w-[220px]">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Clínica
            </label>

            <Select
              tipo="clinica"
              value={clinica}
              onChange={(valor) => setClinica(valor)}
              opcoesFiltradas={clinicas}
              ajuste=""
            />
          </div>

          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <Button cor="vazado" onClick={() => setClinica("")}>
              Limpar filtro
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8 px-2 overflow-x-auto">
        <TabelaDiaConsultorio
          registros={registros}
          setRegistros={setRegistros}
          especialidades={especialidades}
        />
      </div>
    </div>
  );
}