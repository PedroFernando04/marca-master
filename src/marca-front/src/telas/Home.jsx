import Header from "../components/Header";
import Card from "../components/Card";
import SlideButton from "../components/SlideButton";
import CardConsulta from "../components/CardConsulta";
import Tabela from "../components/Tabela";
import Agenda from "../components/Agenda";
import { useState } from "react";
import UsuarioLogado from "../config/UsuarioLogado";

export default function Home(){

    const [aba, setAba] = useState ("agendamento");

    const usuario = UsuarioLogado().usuario;

    return(
        <div className="min-h-screen">

            <Header></Header>

            {usuario?.tipo === "Paciente" && (
                <div>
                    <SlideButton onChange={setAba} texto1={"Agendamento"} texto2={"Minhas consultas"}></SlideButton>

                    {aba === "agendamento" && (
                        <div>
                            <h1 className="flex justify-center p-2 text-3xl font-bold">Qual tipo de atendimento você precisa?</h1>

                                <div className="flex justify-center">
                                    <Card tipo = "geral"></Card>

                                    <Card tipo = "especialista"></Card>
                                </div>
                        </div>
                    )}

                    {aba === "consultas" && (
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="p-10"></h1>

                            <CardConsulta></CardConsulta>
                        </div>
                    )}

                </div>
            )}

           { usuario?.tipo === "Funcionario" && (
                <div >
                    <SlideButton onChange={setAba} texto1={"Encaminhamentos"} texto2={"Calendário"}></SlideButton>
    
                    {aba === "agendamento" && (
                        <div>
    
                                <div className="flex justify-center">
                                    <Tabela tipo = "encaminhamento"></Tabela>
                                </div>
                        </div>
                    )}
    
                    {aba === "consultas" && (
                        <div>
                                <div className="flex justify-center mt-8">
                                    <Agenda ajuste={"w-[67%]"} tipoAgenda={"liberarDias"} clinica={usuario?.clinica}></Agenda>
                                </div>
                        </div>
                    )}
    
                </div>        
           )}
        </div>
    );
}