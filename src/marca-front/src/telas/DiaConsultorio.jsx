import { useEffect, useState } from "react";

import Select from "../components/basicos/Select";
import Button from "../components/basicos/Button";

import Header from "../components/utilitarios/Header";

const API_URL = "http://localhost:8080/api/diaConsultorio";

const FORM_VAZIO = {
    clinica: "",
    diaSemana: "",
    especialidade: "",
    turno: ""
};

export default function DiasConsultorio() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [mostrarForm, setMostrarForm] = useState(false);
    const [form, setForm] = useState(FORM_VAZIO);
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        buscarRegistros();
    }, []);

    async function buscarRegistros() {
        setCarregando(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setRegistros(data);
        } catch (err) {
            console.error(err);
            setErro("Não foi possível carregar os registros.");
        } finally {
            setCarregando(false);
        }
    }

    function abrirNovo() {
        setForm(FORM_VAZIO);
        setIdEditando(null);
        setErro("");
        setMostrarForm(true);
    }

    function abrirEdicao(registro) {
        setForm({
            clinica: registro.clinica,
            diaSemana: registro.diaSemana,
            especialidade: registro.especialidade,
            turno: registro.turno
        });
        setIdEditando(registro.id);
        setErro("");
        setMostrarForm(true);
    }

    function fecharForm() {
        setMostrarForm(false);
        setForm(FORM_VAZIO);
        setIdEditando(null);
        setErro("");
    }

    function handleChange(campo, valor) {
        setForm({
            ...form,
            [campo]: valor
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.clinica || !form.diaSemana || !form.especialidade || !form.turno) {
            setErro("Preencha todos os campos.");
            return;
        }

        const metodo = idEditando ? "PUT" : "POST";
        const url = idEditando ? `${API_URL}/${idEditando}` : API_URL;

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (res.status === 201 || res.status === 200) {
                await buscarRegistros();
                fecharForm();
            } else {
                const mensagem = await res.text();
                setErro(mensagem || "Erro ao salvar registro.");
            }
        } catch (err) {
            console.error(err);
            setErro("Erro na requisição.");
        }
    }

    async function handleExcluir(id) {
        const confirmar = window.confirm("Deseja realmente excluir este registro?");
        if (!confirmar) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

            if (res.status === 204) {
                setRegistros(registros.filter((r) => r.id !== id));
            } else {
                alert("Erro ao excluir registro.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro na requisição.");
        }
    }

    return (
        <div className="p-4 sm:p-11 flex flex-col items-center min-h-screen">

            <Header />

            <div className="w-full max-w-[900px]">
                <div className="flex flex-row justify-between items-center mb-5">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Dias de Consultório
                    </h1>

                    <Button cor="fundo" onClick={abrirNovo}>
                        + Novo
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="p-4">Clínica</th>
                                <th className="p-4">Dia</th>
                                <th className="p-4">Especialidade</th>
                                <th className="p-4">Turno</th>
                                <th className="p-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carregando && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        Carregando...
                                    </td>
                                </tr>
                            )}

                            {!carregando && registros.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        Nenhum registro cadastrado.
                                    </td>
                                </tr>
                            )}

                            {!carregando && registros.map((r) => (
                                <tr key={r.id} className="border-b border-gray-100">
                                    <td className="p-4">{r.clinicaDescricao}</td>
                                    <td className="p-4">{r.diaSemanaDescricao}</td>
                                    <td className="p-4">{r.especialidadeDescricao}</td>
                                    <td className="p-4">{r.turnoDescricao}</td>
                                    <td className="p-4 text-right whitespace-nowrap">
                                        <Button cor="vazado" ajuste="mx-1" onClick={() => abrirEdicao(r)}>
                                            Editar
                                        </Button>
                                        <Button cor="excluir" ajuste="mx-1" onClick={() => handleExcluir(r.id)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {mostrarForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
                    <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-[500px] p-5">
                        <h2 className="text-2xl font-bold mb-1">
                            {idEditando ? "Editar Atendimento" : "Novo Atendimento"}
                        </h2>
                        <p className="text-gray-500 mb-5">
                            Defina em qual clínica, dia e turno a especialidade é atendida.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-bold">Clínica</label>
                                <Select
                                    tipo="clinica"
                                    value={form.clinica}
                                    onChange={(valor) => handleChange("clinica", valor)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base font-bold">Especialidade</label>
                                <Select
                                    tipo="especialidade"
                                    value={form.especialidade}
                                    onChange={(valor) => handleChange("especialidade", valor)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base font-bold">Dia da Semana</label>
                                <Select
                                    tipo="diaSemana"
                                    value={form.diaSemana}
                                    onChange={(valor) => handleChange("diaSemana", valor)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base font-bold">Turno</label>
                                <Select
                                    tipo="turno"
                                    value={form.turno}
                                    onChange={(valor) => handleChange("turno", valor)}
                                />
                            </div>

                            {erro && (
                                <span className="text-red-500 text-sm">{erro}</span>
                            )}

                            <div className="flex flex-row justify-end mt-3">
                                <Button cor="texto" onClick={fecharForm} type="button">
                                    Cancelar
                                </Button>
                                <Button cor="fundo" type="submit">
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}