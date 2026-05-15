import {useState } from "react";
import Button from "./Button";

export default function Tabela({
    agendamentos,
    setAgendamentos,

    pagina,
    setPagina,
    totalPaginas,

    especialidade,
    setEspecialidade,

    statusEncaminhamento,
    setStatusEncaminhamento,

    especialidades,

    statusEncaminhamentos,

    atualizarStatus
}) {

    function formatarData(data){

        return new Date(data)
            .toLocaleDateString("pt-BR");
    }

    function corStatus(status){

        if(status === "APROVADO" || status === "CONFIRMADO"){
            return "bg-green-100 text-green-700";
        }

        if(status === "REPROVADO" || status === "CANCELADO"){
            return "bg-red-100 text-red-700";
        }

        return "bg-yellow-100 text-yellow-700";
    }

    function descricaoEspecialidade(codigo){

        const especialidadeEncontrada =
            especialidades.find(
                e => e.codigo === codigo
            );

        return especialidadeEncontrada
            ? especialidadeEncontrada.descricao
            : codigo;
    }

    const [modalAberto, setModalAberto] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

    const [observacao, setObservacao] = useState("");

    async function atualizarEncaminhamento(
        status
    ){

        try{

            const response = await fetch(

                `http://localhost:8080/api/agendamento/${agendamentoSelecionado.id}/encaminhamento`,

                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({

                        status: status,

                        descricao: observacao
                    })
                }
            );

            if(!response.ok){

                throw new Error(
                    "Erro ao atualizar encaminhamento"
                );
            }

            setAgendamentos((prev) =>

                prev.map((agendamento) => {

                    if(
                        agendamento.id ===
                        agendamentoSelecionado.id
                    ){

                        return {

                            ...agendamento,

                            statusEncaminhamento:
                                status,

                            descricaoEncaminhamento:
                                observacao
                        };
                    }

                    return agendamento;
                })
            );

            setModalAberto(false);

        } catch(error){

            console.log(error);

            alert(
                "Erro ao atualizar encaminhamento"
            );
        }
    }

    const urlEncaminhamento = agendamentoSelecionado ? `http://localhost:8080/api/agendamento/${agendamentoSelecionado.id}/encaminhamento/arquivo`: "";

    function ehImagem(path){

        if(!path) return false;

        return (
            path.endsWith(".png") ||
            path.endsWith(".jpg") ||
            path.endsWith(".jpeg") ||
            path.endsWith(".webp")
        );
    }

    return (

        <div className="w-[70%]">

            <div
                className="flex flex-wrap items-end gap-5 mt-8 mb-5 
                        bg-white/60 backdrop-blur-md rounded-2xl 
                        border border-white/40 shadow-lg p-5"
            >

                <div className="flex flex-col gap-2 min-w-[240px]">

                    <label
                        className="text-sm font-semibold text-gray-700 ml-1"
                    >
                        Especialidade
                    </label>

                    <select
                        value={especialidade}

                        onChange={(e) => {

                            setEspecialidade(e.target.value);

                            setPagina(0);
                        }}

                        className="
                            bg-white/80
                            border border-gray-200
                            rounded-xl
                            px-4 py-3
                            shadow-sm
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-violet-400
                            focus:border-violet-400
                            hover:border-violet-300
                            text-gray-700
                            font-medium
                        "
                    >

                        <option value="">
                            Todas especialidades
                        </option>

                        {especialidades.map((especialidade) => (

                            <option
                                key={especialidade.codigo}
                                value={especialidade.codigo}
                            >

                                {especialidade.descricao}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="flex flex-col gap-2 min-w-[220px]">

                    <label
                        className="text-sm font-semibold text-gray-700 ml-1"
                    >
                        Status do Encaminhamento
                    </label>

                    <select
                        value={statusEncaminhamento}

                        onChange={(e) => {

                            setStatusEncaminhamento(
                                e.target.value
                            );

                            setPagina(0);
                        }}

                        className="
                            bg-white/80
                            border border-gray-200
                            rounded-xl
                            px-4 py-3
                            shadow-sm
                            outline-none
                            transition
                            focus:ring-2
                            focus:ring-blue-400
                            focus:border-blue-400
                            hover:border-blue-300
                            text-gray-700
                            font-medium
                        "
                    >

                        <option value="">
                            Todos status
                        </option>

                        {statusEncaminhamentos.map((status) => (

                            <option
                                key={status.codigo}
                                value={status.codigo}
                            >

                                {status.descricao}

                            </option>

                        ))}

                    </select>

                </div>

            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl min-h-[412px] border border-white/40 overflow-hidden">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="text-white text-sm uppercase tracking-wide 
                                       bg-gradient-to-tr from-blue-500 to-violet-800">

                            <th className="p-4 text-left">
                                Data
                            </th>

                            <th className="p-4 text-left">
                                Paciente
                            </th>

                            <th className="p-4 text-left">
                                Especialidade
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Observações
                            </th>

                            <th className="p-4 text-center">
                                Ações
                            </th>

                        </tr>

                    </thead>

                    <tbody className="text-gray-700">

                        {agendamentos.length === 0 && (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-8"
                                >
                                    Nenhum agendamento encontrado.
                                </td>

                            </tr>
                        )}

                        {agendamentos.map((agendamento) => (

                            <tr
                                key={agendamento.id}

                                className="border-b hover:bg-blue-50 transition"
                            >

                                <td className="p-4">

                                    {formatarData(
                                        agendamento.data
                                    )}

                                </td>

                                <td className="p-4">

                                    {agendamento.nomePaciente}

                                </td>

                                <td className="p-4">

                                    {descricaoEspecialidade(agendamento.especialidade)}

                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 text-xs rounded-full font-semibold ${corStatus(
                                            agendamento.statusEncaminhamento
                                        )}`}
                                    >
                                        {agendamento.statusEncaminhamento}

                                    </span>

                                </td>

                                <td className="p-4">

                                    {
                                        agendamento
                                            .descricaoEncaminhamento
                                    }

                                </td>

                                <td className="p-4 text-center">

                                    <Button 
                                        cor = "fundo" 
                                        onClick={() => {
                                            setAgendamentoSelecionado(agendamento);
                                            setObservacao(agendamento.descricaoEncaminhamento || "");
                                            setModalAberto(true);
                                        }}>
                                        Detalhes
                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {pagina > 0 && (
                <div className="flex justify-center items-center gap-4 mt-5">

                    <button
                        disabled={pagina === 0}

                        onClick={() =>
                            setPagina(pagina - 1)
                        }

                        className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-40"
                    >
                        Anterior
                    </button>

                    <span>

                        Página {pagina + 1} de {totalPaginas}

                    </span>

                    <button
                        disabled={pagina + 1 >= totalPaginas}

                        onClick={() =>
                            setPagina(pagina + 1)
                        }

                        className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-40"
                    >
                        Próxima
                    </button>

                </div>
            )}

            {modalAberto && agendamentoSelecionado && (

                <div
                    className="
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/40 backdrop-blur-sm
                        p-4
                    "
                >

                    <div
                        className="
                            bg-white rounded-3xl
                            shadow-2xl

                            w-full
                            max-w-4xl

                            max-h-[95vh]

                            overflow-hidden
                            flex flex-col
                        "
                    >

                        <div
                            className="
                                flex justify-between items-start
                                p-6 pb-4
                                border-b
                            "
                        >

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">

                                    Detalhes do Encaminhamento

                                </h2>

                                <p className="text-gray-500 mt-1">

                                    Analise as informações abaixo

                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setModalAberto(false)
                                }

                                className="
                                    text-gray-400 hover:text-gray-700
                                    text-2xl font-bold
                                "
                            >
                                ×
                            </button>

                        </div>

                        <div
                            className="
                                overflow-y-auto
                                p-6
                                flex-1
                            "
                        >

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    lg:grid-cols-2
                                    gap-8
                                "
                            >

                                <div
                                    className="
                                        grid grid-cols-1 sm:grid-cols-2
                                        gap-6 content-start
                                    "
                                >

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Paciente
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {agendamentoSelecionado.nomePaciente}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Especialidade
                                        </p>

                                        <p className="font-semibold text-gray-800">

                                            {descricaoEspecialidade(
                                                agendamentoSelecionado.especialidade
                                            )}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Data
                                        </p>

                                        <p className="font-semibold text-gray-800">

                                            {formatarData(
                                                agendamentoSelecionado.data
                                            )}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>

                                        <span
                                            className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${corStatus(
                                                agendamentoSelecionado.statusEncaminhamento
                                            )}`}
                                        >

                                            {
                                                agendamentoSelecionado.statusEncaminhamento
                                            }

                                        </span>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Status do Agendamento
                                        </p>

                                        <span
                                            className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${corStatus(
                                                agendamentoSelecionado.statusAgendamento
                                            )}`}
                                        >

                                            {
                                                agendamentoSelecionado.statusAgendamento
                                            }

                                        </span>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Clínica
                                        </p>

                                        <p className="font-semibold text-gray-800">

                                            {agendamentoSelecionado.clinica}

                                        </p>

                                    </div>

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500 mb-2">

                                        Encaminhamento

                                    </p>

                                    <button
                                        onClick={() =>
                                            window.open(
                                                urlEncaminhamento,
                                                "_blank"
                                            )
                                        }

                                        className="
                                            w-full

                                            h-[180px]
                                            sm:h-[220px]

                                            border
                                            rounded-2xl
                                            overflow-hidden

                                            bg-gray-50
                                            hover:opacity-90
                                            transition

                                            flex items-center
                                            justify-center
                                        "
                                    >

                                        {ehImagem(
                                            agendamentoSelecionado
                                                .encaminhamentoMedicoPath
                                        ) ? (

                                            <img
                                                src={urlEncaminhamento}

                                                alt="Encaminhamento"

                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                                            />

                                        ) : (

                                            <div
                                                className="
                                                    flex flex-col
                                                    items-center
                                                    justify-center
                                                    gap-3
                                                    text-gray-600
                                                "
                                            >

                                                <span className="text-5xl">
                                                    📄
                                                </span>

                                                <span className="text-sm font-medium">

                                                    Abrir PDF

                                                </span>

                                            </div>

                                        )}

                                    </button>

                                </div>

                            </div>

                            <div className="mt-8">

                                <p className="text-sm text-gray-500 mb-2">

                                    Observações

                                </p>

                                <textarea
                                    value={observacao}

                                    onChange={(e) =>
                                        setObservacao(e.target.value)
                                    }

                                    placeholder="Digite observações sobre o encaminhamento"

                                    className="
                                        w-full
                                        bg-gray-50 border
                                        rounded-2xl p-4
                                        text-gray-700
                                        min-h-[140px]
                                        outline-none
                                        resize-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />

                            </div>

                        </div>

                        <div
                            className="
                                flex justify-end gap-4
                                p-6 pt-4
                                border-t
                                bg-white
                            "
                        >

                            <Button
                                cor="excluir"

                                onClick={async () => {

                                    await atualizarEncaminhamento(
                                        "REPROVADO"
                                    );

                                    await atualizarStatus(
                                        agendamentoSelecionado.id,
                                        "CANCELADO"
                                    );
                                }}
                            >
                                Reprovar
                            </Button>

                            <Button
                                cor="fundo"

                                onClick={async () => {

                                    await atualizarEncaminhamento(
                                        "APROVADO"
                                    );

                                    await atualizarStatus(
                                        agendamentoSelecionado.id,
                                        "AGUARDANDO"
                                    );
                                }}
                            >
                                Aprovar
                            </Button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}