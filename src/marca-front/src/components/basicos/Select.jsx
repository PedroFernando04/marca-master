import { useEffect, useState } from "react";

export default function Select({tipo, ajuste, value, onChange, opcoesFiltradas, busca = false}){
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
        },

        paciente: {
            link: "/pacientes",
            texto: "Digite o nome do paciente"
        }
    }

    const cfg = config[tipo] || {};

    const [opcoes, setOpcao] = useState([]);
    
    const [mostrarLista, setMostrarLista] = useState(false);

    const [textoBusca, setTextoBusca] = useState("");

    const opcoesExibidas =
        busca && textoBusca.length < 2
            ? []
            : opcoes;

    useEffect(() => {
        if (busca) {
            return;
        }

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

    }, [cfg.link, opcoesFiltradas, busca]);

    useEffect(() => {
        if (!busca || textoBusca.length < 2) {
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${linkPadrao}${cfg.link}?nome=${encodeURIComponent(textoBusca)}`
                );

                const data = await response.json();

                setOpcao(data);
            } catch (err) {
                console.error(err);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [textoBusca, busca, cfg.link]);

    console.log("textoBusca:", textoBusca);
console.log("opcoes:", opcoes);
console.log("opcoesExibidas:", opcoesExibidas);
console.log("mostrarLista:", mostrarLista);



    if(busca){
        return(
            <div className={`relative ${ajuste}`}>
                <input
                    type="text"
                    value={textoBusca}
                    onChange={(e) => {
                        setTextoBusca(e.target.value);

                        if(value){
                            onChange?.("");
                        }
                    }}
                    placeholder={cfg.texto || "Digite para buscar"}
                    className="border border-gray-300 rounded-xl p-2 shadow-sm w-full"
                    onFocus={() => setMostrarLista(true)}
                    onBlur={() => {
                        setTimeout(() => setMostrarLista(false), 150);
                    }}
                />
                {mostrarLista && opcoesExibidas.length > 0 && (
                    <div className="absolute w-full bg-white border rounded-xl mt-1 max-h-60 overflow-y-auto z-10">
                        {opcoesExibidas.map((opcao) => (
                            <div
                                key={opcao.id}
                                onClick={() => {
                                    onChange(opcao.id);
                                    setTextoBusca(opcao.nome);
                                    setMostrarLista(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {opcao.nome}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

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