import { useState, useEffect } from "react";
import Button from "./Button";
import Select from "./Select";

    function gerarCalendario(ano, mes){

        const primeiroDia = new Date(ano, mes, 1).getDay(); 
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        const dias = [];

        for(let i = 0; i < primeiroDia; i++){
            dias.push("");
        }

        for(let i = 1; i <= diasNoMes; i++){
            dias.push(i);
        }

        return dias;
    }


export default function Agenda({ajuste, tipoAgenda, clinica}){
    const hoje = new Date();
    const [mes, setMes] = useState(hoje.getMonth());
    const [ano, setAno] = useState(hoje.getFullYear());

    const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    const mesesAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const diasMes = gerarCalendario(ano, mes);

    function mudarMes(direcao){
        let novoMes = mes + direcao;
        let novoAno = ano;

        if(novoMes < 0){
            novoMes = 11;
            novoAno--;
        }

        if(novoMes > 11){
            novoMes = 0;
            novoAno++;
        }

        setMes(novoMes);
        setAno(novoAno);
    }

    const [modalAberto, setModalAberto] = useState(false);
    const [diaSelecionado, setDiaSelecionado] = useState(null);

    function confirmarAgendamento() {
        alert(`Agendamento confirmado para o dia ${diaSelecionado} de ${mesesAno[mes]} de ${ano}!`);
        toggleDia(diaSelecionado);
        setModalAberto(false);
    }


    const [diasOcupados, setDiasOcupados] = useState([]);

    function toggleDia(dia) {
        const chave = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        if (diasOcupados.includes(chave)) {
            setDiasOcupados(diasOcupados.filter(d => d !== chave));
        } else {
            setDiasOcupados([...diasOcupados, chave]);
        }
    }

    function handleClickDia(dia, ocupado) {
        if (dia === "") return;

        if (tipoAgenda === "agendarConsulta") {
            if (!ocupado) {
                setDiaSelecionado(dia);
                setModalAberto(true);
            }
        } else if (tipoAgenda === "liberarDias") {
            toggleDia(dia);
        }
    }


    async function enviarDias() {
        try {
            if (!clinica) {
                alert("Selecione uma especialidade");
                return;
            }

            const response = await fetch("http://localhost:8080/api/funcionario/liberarDias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    dias: diasOcupados,
                    clinica: clinica
                })
            });

            
            if (!response.ok) {
                throw new Error("Erro ao enviar dias");
            }

            alert("Dias enviados com sucesso!");
            setDiasOcupados([]);

        } catch (erro) {
            console.error(erro);
            alert("Erro ao enviar para o servidor");
        }
    }

    useEffect(() => {
    async function buscarDias() {
        if (!clinica) {
            setDiasOcupados([]); 
            return;
        }
        
        let tipoBusca;
        if(tipoAgenda === "agendarConsulta"){
            tipoBusca = "especialidade"
        }

        if(tipoAgenda === "liberarDias"){
            tipoBusca = "clinica"
        }
        
        try {
            const response = await fetch(
                `http://localhost:8080/api/diasLiberados/${tipoBusca}?${tipoBusca}=${clinica}&ano=${ano}&mes=${mes + 1}`,
                {
                    credentials: "include"
                }
            );

            if (!response.ok) throw new Error();

            const data = await response.json();

            setDiasOcupados(data);

        } catch (err) {
            console.error("Erro ao buscar dias:", err);
          }
        }

        buscarDias();
    }, [mes, ano, clinica]);

    return(
        <div className={` ${ajuste} max-w-6xl mx-auto p-5 bg-white rounded-lg shadow-lg mb-10`}>

            <div className="flex justify-between items-center mb-7">
                <Button onClick={() => mudarMes(-1)} cor="vazado">Voltar</Button>

                <h1 className="text-3xl font-bold">
                    {mesesAno[mes]} - {ano}
                </h1>

                <Button onClick={() => mudarMes(1)} cor="vazado">Avançar</Button>
            </div>

            <div className="grid grid-cols-7 gap-2">

                {diasSemana.map((dia, i) => (
                    <div key={i} className={`text-center font-bold text-white 
                                            p-2 rounded-md bordershadow-lg mb-3 bg-gradient-to-tr
                                            ${(i === 0 || i === 6) ? "from-violet-600 to-violet-800" : "from-blue-600 to-blue-800 "}`}>
                        {dia}
                    </div>
                ))}

                {diasMes.map((dia, i) => {
                
                    if (dia === "") {
                        return <div key={i} className="h-16" />;
                    }

                    const fimDeSemana = (i % 7 == 0 || (i + 1) % 7 == 0);
                    const chave = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

                    let ocupado;

                    if (tipoAgenda === "liberarDias") {
                        ocupado = dia !== "" && (fimDeSemana || !diasOcupados.includes(chave));
                    } else {
                        ocupado = dia !== "" && (fimDeSemana || diasOcupados.includes(chave));
                    }

                    return (
                        <div
                            key={i}
                            onClick={() => handleClickDia(dia, ocupado)}
                            className={`
                                h-16 flex items-center justify-center rounded-md border text-bold
                                ${dia === "" && "border-none"}
                                ${ocupado 
                                    ? "bg-gray-200 text-gray-500 hover:bg-gray-300 shadow-sm shadow-gray-500"
                                    : dia !== "" && "bg-blue-600 text-white border-blue-600 shadow-sm shadow-gray-500 hover:bg-blue-500 "
                                }
                                ${fimDeSemana
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }
                            `}
                        >
                            {dia}
                            
                        </div>

                    );
                })}

            </div>

            <div className="flex justify-end mt-6">

                <Button onClick={enviarDias} cor="fundo">
                    Salvar dias
                </Button>
            </div>

            {modalAberto && tipoAgenda === "agendarConsulta" && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center transform transition-all">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Confirmar Consulta</h2>
                        <p className="text-gray-600 mb-6">
                            Você deseja agendar para o dia <strong>{diaSelecionado} de {mesesAno[mes]}</strong>?
                        </p>

                        
                        <div className="w-full text-left mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Informe o horário
                            </label>

                            <div className="relative">
                                <select 
                                    className="w-full appearance-none border border-gray-300 rounded-xl 
                                            p-3 pl-4 pr-10 shadow-sm bg-white
                                            focus:outline-none focus:ring-2 focus:ring-blue-400
                                            text-gray-700"
                                >
                                    <option value="">Selecione um período</option>
                                    <option value="manha">Manhã (07:00)</option>
                                    <option value="tarde">Tarde (13:00)</option>
                                </select>

                                
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                    ▼
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setModalAberto(false)} cor="vazado">Cancelar</Button>
                            <Button onClick={confirmarAgendamento} cor="fundo">Confirmar</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}