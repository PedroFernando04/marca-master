import Header from "../components/Header";
import Agenda from "../components/Agenda";
import Button from "../components/Button";
import Select from "../components/Select";
import { useState, useEffect } from "react";

export default function Agendar() {

    const [clinica, setClinica] = useState("");
    const [especialidade, setEspecialidade] = useState("");

    const [clinicas, setClinicas] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

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
                    <div>
                        
                    </div>
                    <Select tipo={"clinica"} value={clinica} onChange={setClinica}>
                        <option value="">Selecione a clínica</option>

                        {clinicas.map(c => (
                            <option key={c.codigo} value={c.codigo}>
                                {c.descricao}
                            </option>
                        ))}
                    </Select>
                    
                    {clinica && (
                        <p className="text-sm text-gray-500 mt-2">
                            {
                                clinicas.find(c => c.codigo === clinica)?.endereco
                            }
                        </p>
                    )}

                    <Select tipo={"especialidade"} value={especialidade} onChange={setEspecialidade}>
                        <option value="">Selecione a especialidade</option>

                        {especialidades.map(e => (
                            <option key={e.codigo} value={e.codigo}>
                                {e.descricao}
                            </option>
                        ))}
                    </Select>

                    {(!clinica || !especialidade) && (
                        <div className="text-center mt-10 text-gray-500">
                            Selecione a clínica e a especialidade para visualizar os dias disponíveis
                        </div>
                    )}

                    {clinica && especialidade && (
                        <Agenda 
                            tipoAgenda="agendarConsulta" 
                            clinica={clinica}
                            especialidade={especialidade}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}