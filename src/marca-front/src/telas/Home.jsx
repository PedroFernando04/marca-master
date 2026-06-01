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

    const [especialidade, setEspecialidade] = useState("");
    const [statusEncaminhamento, setStatusEncaminhamento] =useState("");
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
        filaDeEspera
    ]);

    const [especialidades, setEspecialidades] = useState([]);

    const [statusEncaminhamentos, setStatusEncaminhamentos] = useState([]);

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

    }, []);

    useEffect(() => {

        if(usuario?.tipo !== "Paciente"){
            return;
        }

        fetch(
            "http://localhost:8080/api/agendamento/paciente",
            {
                credentials: "include"
            }
        )
            .then(response => response.json())
            .then(data => setAgendamentos(data))
            .catch(error => console.log(error));

    }, [usuario]);

    async function atualizarStatus(id, status){
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
                        status
                    })
                }
            );

            if(!response.ok){

                const erro = await response.text();

                throw new Error(erro);
            }

            setAgendamentos((prev) =>

                prev.map((agendamento) => {

                    if(agendamento.id === id){

                        return {
                            ...agendamento,
                            statusAgendamento: status
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
                                        cancelarConsulta={cancelarConsulta}
                                    />

                                ))}

                            </div>

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
                        texto2={"Calendário"}
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

                                    dataConsulta={dataConsulta}
                                    setDataConsulta={setDataConsulta}

                                    especialidades={especialidades}
                                    statusEncaminhamentos={statusEncaminhamentos}

                                    atualizarStatus={atualizarStatus}

                                    filaDeEspera={filaDeEspera}
                                    setFilaDeEspera={setFilaDeEspera}
                                />
                            </div>

                        </div>
                    )}

                    {aba === "consultas" && (
                        <div>

                            <div className="flex justify-center mt-8 px-4">
                                <Agenda
                                    ajuste={"w-full md:w-[67%]"}
                                    tipoAgenda={"liberarDias"}
                                    clinica={usuario?.clinica}
                                />
                            </div>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}