import { useEffect, useState } from "react";

export default function Select({tipo, ajuste, value, onChange, opcoesFiltradas}){
    const linkPadrao = "http://localhost:8080/api/enum";

    const config = {
        especialidade: {
            link: "/especialidades",
            texto: "Selecione a especialidade"
        },

        clinica: {
            link: "/clinicas",
            texto: "Selecione sua clínica"
        },

        consultorio: {
            link: "/consultorios",
            texto: "Informe o consultório"
        },

        diaSemana: {
            link: "/diasSemana",
            texto: "Informe o dia da semana"
        },

        tipoAgendamento: {
            link: "/tiposAgendamento",
            texto: "Informe se é um retorno"
        },

        tipoFuncionario: {
            link: "/tiposFuncionario",
            texto: "Informe seu cargo"
        },

        turno: {
            link: "/turnos",
            texto: "Informe o turno"
        }
    }

    const cfg = config[tipo] || {};

    const [opcoes, setOpcao] = useState([]);

    useEffect(() => {
        async function buscarOpcoes() {
            if(opcoesFiltradas){
            setOpcao(opcoesFiltradas);
            return;
            }
            try {
                const response = await fetch(linkPadrao + cfg.link);
                const data = await response.json();
                setOpcao(data);
            } catch (err) {
                console.error("Erro ao buscar opções:", err);
            }
        }

        buscarOpcoes();

    }, [cfg.link, opcoesFiltradas]);

    return(
        <select
            value={value}
            onChange={(e) => {
                onChange && onChange(e.target.value);
            }}
            className={`${ajuste} border border-gray-300 rounded-xl p-2 shadow-sm  cursor-pointer`}
        >
            <option value="">{cfg.texto}</option>

            {opcoes.map((esp, i) => (
                <option key={i} value={esp.codigo}>
                    {esp.descricao}
                </option>
            ))}
        </select>
    )
}