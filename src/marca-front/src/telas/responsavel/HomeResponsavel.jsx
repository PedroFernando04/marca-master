import Header from "../../components/Header";
import Tabela from "../../components/Tabela";
import SlideButton from "../../components/SlideButton";
import Agenda from "../../components/Agenda";
import { useState } from "react";

export default function HomeResp(){

    const [aba, setAba] = useState ("agendamento");

    return(
        <div className="min-h-screen">
        
            <Header></Header>

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
                                <Agenda ajuste={"w-[67%]"} tipoAgenda={"liberarDias"}></Agenda>
                            </div>
                    </div>
                )}


            </div>
        </div>
    );
}