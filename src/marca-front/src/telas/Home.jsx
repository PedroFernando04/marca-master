import Button from "../components/basicos/Button";
import Select from "../components/basicos/Select";

import Header from "../components/utilitarios/Header";
import SlideButton from "../components/utilitarios/SlideButton";

import Card from "../components/Card";
import CardConsulta from "../components/CardConsulta";
import Tabela from "../components/Tabela";
import Agenda from "../components/Agenda";

import UsuarioLogado from "../config/UsuarioLogado";

import { useEffect, useState } from "react";

export default function Home(){

    const [aba, setAba] = useState ("agendamento");

    const usuario = UsuarioLogado().usuario;

    const [agendamentos, setAgendamentos] = useState([]);

    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaPaciente, setPaginaPaciente] = useState(0);
    const [totalPaginasPaciente, setTotalPaginasPaciente] = useState(0);

    const [especialidade, setEspecialidade] = useState("");
    const [statusEncaminhamento, setStatusEncaminhamento] = useState("");
    const [statusAgendamento, setStatusAgendamento] = useState("");
    const [dataConsulta, setDataConsulta] = useState("");
    const [filaDeEspera, setFilaDeEspera] = useState("");

    

    useEffect(() => {

        if(usuario?.tipo !== "Funcionario"){
            return;
        }

        let url = `http://localhost:8080/api/agendamento?pagina=${pagina}`;

        if(especialidade !== ""){
            url += `&especialidade=${especialidade}`;
        }

        if(statusEncaminhamento !== ""){
            url += `&statusEncaminhamento=${statusEncaminhamento}`;
        }

        if(statusAgendamento !== ""){
            url += `&statusAgendamento=${statusAgendamento}`;
        }

        if (dataConsulta !== "") {
            url += `&data=${dataConsulta}`;
        }

        if (filaDeEspera !== "") {
            url += `&filaDeEspera=${filaDeEspera}`;
        }

        fetch(url, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {

                setAgendamentos(data.content);
                setTotalPaginas(data.totalPages);

            })
            .catch(error => console.log(error));

    }, [
        pagina,
        especialidade,
        statusEncaminhamento,
        usuario,
        dataConsulta,
        filaDeEspera,
        statusAgendamento
    ]);

    const [especialidades, setEspecialidades] = useState([]);

    const [statusEncaminhamentos, setStatusEncaminhamentos] = useState([]);

    const [statusAgendamentos, setStatusAgendamentos] = useState([]);

    useEffect(() => {
        fetch(
            "http://localhost:8080/api/enum/especialidades",
            {
                credentials: "include"
            }
        )
            .then(response => response.json())
            .then(data => setEspecialidades(data))
            .catch(error => console.log(error));

        fetch(
            "http://localhost:8080/api/enum/statusEncaminhamento",
            {
                credentials: "include"
            }
        )
            .then(response => response.json())
            .then(data => setStatusEncaminhamentos(data))
            .catch(error => console.log(error));

        fetch(
            "http://localhost:8080/api/enum/statusAgendamento",
            {
                credentials: "include"
            }
        )
            .then(response => response.json())
            .then(data => setStatusAgendamentos(data))
            .catch(error => console.log(error));


    }, []);

    useEffect(() => {

        if(usuario?.tipo !== "Paciente"){
            return;
        }

        fetch(
            `http://localhost:8080/api/agendamento/paciente?pagina=${paginaPaciente}`,
            {
                credentials: "include"
            }
        )
            .then(response => response.json())
            .then(data => {
                setAgendamentos(data.content);
                setTotalPaginasPaciente(data.totalPages);
            })
            .catch(error => console.log(error));

    }, [usuario, paginaPaciente]);

    async function confirmarConsulta(id){

        try{

            const response = await fetch(
                `http://localhost:8080/api/agendamento/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                    status: "CONFIRMADO"
                    })
                }
            );

            if(!response.ok){

                throw new Error(
                    "Erro ao confirmar consulta"
                );
            }

            setAgendamentos((prev) =>

                prev.map((agendamento) => {

                    if(agendamento.id === id){

                        return {
                            ...agendamento,
                            statusAgendamento: "CONFIRMADO"
                        };
                    }

                    return agendamento;
                })
            );

        } catch(error){

            console.log(error);

            alert(error.message);
        }
    }

    async function aguardarConsulta(id){

        try{

            const response = await fetch(
                `http://localhost:8080/api/agendamento/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                    status: "AGUARDANDO"
                    })
                }
            );

            if(!response.ok){

                throw new Error(
                    "Erro ao aguardar consulta"
                );
            }

            setAgendamentos((prev) =>

                prev.map((agendamento) => {

                    if(agendamento.id === id){

                        return {
                            ...agendamento,
                            statusAgendamento: "AGUARDANDO"
                        };
                    }

                    return agendamento;
                })
            );

        } catch(error){

            console.log(error);

            alert(error.message);
        }
    }

    async function cancelarConsulta(id){

        try{

            const response = await fetch(
                `http://localhost:8080/api/agendamento/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            if(!response.ok){

                throw new Error(
                    "Erro ao cancelar consulta"
                );
            }

            setAgendamentos((prev) =>

                prev.filter(agendamento => agendamento.id !== id)
            );

        } catch(error){

            console.log(error);

            alert(error.message);
        }
    }

    
    const [clinica, setClinica] = useState("");
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

    return(
        <div className="min-h-screen overflow-x-hidden">

            <Header />

            {usuario?.tipo === "Paciente" && (
                <div>
                    <SlideButton
                        onChange={setAba}
                        texto1={"Agendamento"}
                        texto2={"Minhas consultas"}
                    />

                    {aba === "agendamento" && (
                        <div>
                            <h1 className="flex justify-center p-2 text-2xl md:text-3xl font-bold text-center">
                                Qual tipo de atendimento você precisa?
                            </h1>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4">
                                <Card tipo="geral" />
                                <Card tipo="especialista" />
                            </div>
                        </div>
                    )}

                    {aba === "consultas" && (
                        <div className="flex flex-col justify-center items-center px-4">
                            <h1 className="p-3"></h1>

                            <div className="w-full max-w-6xl flex flex-col gap-6">

                                {agendamentos.map((agendamento) => (

                                    <CardConsulta
                                        key={agendamento.id}
                                        agendamento={agendamento}
                                        setAgendamentos={setAgendamentos}
                                        especialidades={especialidades}
                                        confirmarConsulta={confirmarConsulta}
                                        aguardarConsulta={aguardarConsulta}
                                        cancelarConsulta={cancelarConsulta}
                                    />

                                ))}

                            </div>

                            {totalPaginasPaciente > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-6 bg-white p-3 rounded-3xl shadow-lg ">
                                    <Button
                                        disabled={paginaPaciente === 0}
                                        onClick={() => setPaginaPaciente(paginaPaciente - 1)}
                                        cor="fundo"
                                        ajuste="px-4 py-2 rounded-lg disabled:opacity-40"
                                    >
                                        Anterior
                                    </Button>

                                    <span>
                                        Página {paginaPaciente + 1} de {totalPaginasPaciente}
                                    </span>

                                    <Button
                                        disabled={paginaPaciente + 1 >= totalPaginasPaciente}
                                        onClick={() => setPaginaPaciente(paginaPaciente + 1)}
                                        cor="fundo"
                                        ajuste="px-4 py-2 rounded-lg disabled:opacity-40"
                                    >
                                        Próxima
                                    </Button>
                                </div>
                            )}

                            <h1 className="p-6"></h1>

                        </div>
                    )}

                </div>
            )}

            {usuario?.tipo === "Funcionario" && (
                <div>

                    <SlideButton
                        onChange={setAba}
                        texto1={"Encaminhamentos"}
                        texto2={usuario?.tipoFuncionario === "RESPONSAVEL" ? "Calendário" : "Encaixar Consulta"}
                    />

                    {aba === "agendamento" && (
                        <div>

                            <div className="flex justify-center mb-8 px-2 overflow-x-auto">
                                <Tabela
                                    agendamentos={agendamentos}
                                    setAgendamentos={setAgendamentos}
                                    pagina={pagina}
                                    setPagina={setPagina}
                                    totalPaginas={totalPaginas}

                                    especialidade={especialidade}
                                    setEspecialidade={setEspecialidade}

                                    statusEncaminhamento={statusEncaminhamento}
                                    setStatusEncaminhamento={setStatusEncaminhamento}

                                    statusAgendamento={statusAgendamento}
                                    setStatusAgendamento={setStatusAgendamento}

                                    dataConsulta={dataConsulta}
                                    setDataConsulta={setDataConsulta}

                                    especialidades={especialidades}
                                    statusEncaminhamentos={statusEncaminhamentos}
                                    statusAgendamentos={statusAgendamentos}

                                    filaDeEspera={filaDeEspera}
                                    setFilaDeEspera={setFilaDeEspera}
                                />
                            </div>

                        </div>
                    )}

                    {aba === "consultas" && usuario?.tipoFuncionario === "RESPONSAVEL" &&(

                            <div>
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
                                            >
                                                <option value="">Selecione a clínica</option>

                                                {clinicas.map((c) => (
                                                    <option key={c.codigo} value={c.codigo}>
                                                        {c.descricao}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>

                                        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                                            <Button
                                                cor="vazado"
                                                onClick={() => {
                                                    setClinica("");
                                                }}
                                            >
                                                Limpar filtro
                                            </Button>

                                            <Button cor="fundo" rota="/gerenciar-consultorio">
                                                Gerenciar Consultório
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                

                                <div className="flex justify-center mt-8 px-4">
                                    <Agenda
                                        ajuste={"w-full md:w-[67%]"}
                                        tipoAgenda={"liberarDias"}
                                        clinica={clinica}
                                    />
                                </div>

                            </div>
                    )}

                    {aba === "consultas" && usuario?.tipoFuncionario === "ATENDENTE" &&(

                        <div>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4">
                                <Card tipo="geral" />
                                <Card tipo="especialista" />
                            </div>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}