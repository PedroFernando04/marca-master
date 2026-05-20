import Header from "../components/utilitarios/Header";

import Agenda from "../components/Agenda";

import Button from "../components/basicos/Button";
import Select from "../components/basicos/Select";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Agendar() {
    const [clinica, setClinica] = useState("");
    const [especialidade, setEspecialidade] = useState("");

    const [clinicas, setClinicas] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const location = useLocation();
    const somenteClinico = location.state?.clinicoGeral;
    const especialidadesFiltradas = somenteClinico
    ? especialidades.filter(
          e => e.codigo === "GERAL"
      )
    : especialidades.filter(
          e => e.codigo !== "GERAL"
      );

    useEffect(() => {
        async function carregarEnums() {
            try {
                const [resClinicas, resEspecialidades] = await Promise.all([
                    fetch("http://localhost:8080/api/enum/clinicas"),
                    fetch("http://localhost:8080/api/enum/especialidades")
                ]);

                const clinicasData = await resClinicas.json();
                const especialidadesData = await resEspecialidades.json();

                setClinicas(clinicasData);
                setEspecialidades(especialidadesData);

            } catch (erro) {
                console.error("Erro ao carregar enums:", erro);
            }
        }

        carregarEnums();
    }, []);

    useEffect(() => {
    async function apenasClinico (){
        try{
            if(somenteClinico){
                setEspecialidade("GERAL");
            }
        } catch (erro) {
                console.error("Erro ao carregar enums:", erro);
            }
    }
        apenasClinico();
    }, [somenteClinico]);

    const [arquivo, setArquivo] = useState(null);

    function handleFileChange(e){
        setArquivo(e.target.files[0]);
    }

    return (
        <div className="min-h-screen">

            <Header />

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* HEADER DA PÁGINA */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-white/40">

                    <div>
                        <h1 className="font-bold text-3xl text-gray-800">
                            Agendar com <span className="bg-gradient-to-tr from-blue-500 to-violet-800 bg-clip-text text-transparent">
                                Dr. Cleiton
                            </span>
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Selecione um dia disponível na agenda abaixo
                        </p>
                    </div>

                    <div>
                        <Button cor="fundo" rota="/home">
                            Retornar
                        </Button>
                    </div>
                </div>

                {/* LEGENDA */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-6 bg-white/70 backdrop-blur-md px-6 py-3 rounded-xl shadow border border-white/40">

                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-violet-800"></div>
                            <span className="text-sm text-gray-700 font-medium">Disponível</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span className="text-sm text-gray-700 font-medium">Ocupado</span>
                        </div>

                    </div>
                </div>

                {/* AGENDA */}
                <div className="mt-8">

                    {/* CAMPOS */}
                    <div className="flex flex-col gap-6 mb-5">

                        {/* LINHA DOS SELECTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* CLÍNICA */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">
                                    Clínica
                                </label>

                                <Select
                                    tipo={"clinica"}
                                    value={clinica}
                                    onChange={setClinica}
                                >
                                    <option value="">Selecione a clínica</option>

                                    {clinicas.map(c => (
                                        <option key={c.codigo} value={c.codigo}>
                                            {c.descricao}
                                        </option>
                                    ))}
                                </Select>

                                <div className="h-6 mt-2">
                                    {clinica && (
                                        <p className="text-sm text-gray-500">
                                            📍 {clinicas.find(c => c.codigo === clinica)?.endereco}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ESPECIALIDADE */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">
                                    Especialidade
                                </label>

                                <Select
                                    tipo={"especialidade"}
                                    value={especialidade}
                                    onChange={setEspecialidade}
                                    opcoesFiltradas={especialidadesFiltradas}
                                >
                                    {!somenteClinico && (
                                        <option value="">Selecione a especialidade</option>
                                    )}

                                    {especialidadesFiltradas.map(e => (
                                        <option key={e.codigo} value={e.codigo}>
                                            {e.descricao}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                        </div>

                        {/* UPLOAD */}
                        {especialidade !== "GERAL" && (
                            <div className="flex flex-col">

                                <label className="text-sm font-semibold text-gray-700 mb-2">
                                    Encaminhamento Médico
                                </label>

                                <label className="cursor-pointer">

                                    <div className="w-full border-2 border-dashed border-blue-300 
                                                    rounded-2xl p-6
                                                    hover:bg-blue-50 transition-all duration-200
                                                    bg-gradient-to-br from-white to-blue-50/40">

                                        <div className="flex flex-col items-center justify-center text-center">

                                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr 
                                                            from-blue-500 to-violet-700
                                                            flex items-center justify-center mb-4">

                                                <span className="text-white text-2xl">
                                                    📄
                                                </span>

                                            </div>

                                            <span className="text-blue-700 font-semibold text-base">
                                                {arquivo
                                                    ? arquivo.name
                                                    : "Clique para enviar seu encaminhamento"}
                                            </span>

                                            <span className="text-sm text-gray-500 mt-1">
                                                PDF, JPG ou PNG
                                            </span>

                                        </div>

                                    </div>

                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                </label>

                            </div>
                        )}

                    </div>

                    {(!clinica || !especialidade || !arquivo) && (
                        <div className="text-lg text-center mt-10 text-gray-500">
                            Selecione a clínica, especialidade e envie seu encaminhamento para visualizar os dias disponíveis
                        </div>
                    )}

                    {clinica &&
                    especialidade &&
                    arquivo && 
                    (
                        <Agenda 
                            tipoAgenda="agendarConsulta"
                            clinica={clinica}
                            especialidade={especialidade}
                            arquivo={arquivo}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}