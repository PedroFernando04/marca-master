import { useState } from "react";

import Select from "./basicos/Select";
import Button from "./basicos/Button";

export default function TabelaDiaConsultorio({
  registros,
  setRegistros,
  especialidades,
}) {
  const [editandoId, setEditandoId] = useState(null);
  const [novaEspecialidade, setNovaEspecialidade] = useState("");
  const [salvando, setSalvando] = useState(false);

  function iniciarEdicao(registro) {
    setEditandoId(registro.id);
    setNovaEspecialidade(registro.especialidade);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setNovaEspecialidade("");
  }

  async function salvarEdicao(id) {
    if (!novaEspecialidade) {
      return;
    }

    setSalvando(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/diaConsultorio/${id}/especialidade?especialidade=${novaEspecialidade}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar especialidade");
      }

      const atualizado = await response.json();

      setRegistros((prev) =>
        prev.map((registro) =>
          registro.id === id ? atualizado : registro
        )
      );

      cancelarEdicao();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar especialidade");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="bg-white/80 rounded-2xl shadow-xl border border-white/40 overflow-hidden w-full">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-gradient-to-tr from-blue-500 to-violet-800">
          <tr className="text-white text-sm uppercase tracking-wide">
            <th className="p-4 text-center">Clínica</th>
            <th className="p-4 text-center">Dia da Semana</th>
            <th className="p-4 text-center">Turno</th>
            <th className="p-4 text-center">Especialidade</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {registros.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-8">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}

          {registros.map((registro) => (
            <tr
              key={registro.id}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="p-4 text-center">{registro.clinicaDescricao}</td>
              <td className="p-4 text-center">{registro.diaSemanaDescricao}</td>
              <td className="p-4 text-center">{registro.turnoDescricao}</td>

              <td className="p-4 text-center">
                {editandoId === registro.id ? (
                  <Select
                    tipo="especialidade"
                    value={novaEspecialidade}
                    onChange={setNovaEspecialidade}
                    opcoesFiltradas={especialidades}
                    ajuste="min-w-[200px]"
                  />
                ) : (
                  registro.especialidadeDescricao
                )}
              </td>

              <td className="p-4 text-center">
                {editandoId === registro.id ? (
                  <>
                    <Button
                      cor="fundo"
                      disabled={salvando}
                      onClick={() => salvarEdicao(registro.id)}
                    >
                      Salvar
                    </Button>

                    <Button cor="vazado" onClick={cancelarEdicao}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button cor="vazado" onClick={() => iniciarEdicao(registro)}>
                    Editar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}