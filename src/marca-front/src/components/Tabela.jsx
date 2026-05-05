import Button from "./Button"

export default function Tabela() {

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-[70%] min-h-[412px] m-5 flex justify-self-center flex-col mt-10 border border-white/40 overflow-hidden">

            <table className="w-full border-collapse ">

                <thead>
                    <tr className="text-white text-sm uppercase tracking-wide 
                                   bg-gradient-to-tr from-blue-500 to-violet-800 ">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">Especialidade</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Observações</th>
                        <th className="p-4 text-center">Ações</th>
                    </tr>
                </thead>

                <tbody className="text-gray-700">

                    <tr className="border-b hover:bg-blue-50 transition">
                        <td className="p-4">10/05/2026</td>
                        <td className="p-4">Cardiologia</td>
                        <td className="p-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                                Confirmado
                            </span>
                        </td>
                        <td className="p-4">Tudo certo</td>
                        <td className="p-4 text-center">
                            <button className="text-white bg-gradient-to-tr from-blue-500 to-violet-800 
                                               hover:opacity-90 rounded-lg px-3 py-2 text-sm shadow-md">
                                Detalhes
                            </button>
                        </td>
                    </tr>

                    <tr className="border-b hover:bg-blue-50 transition">
                        <td className="p-4">12/05/2026</td>
                        <td className="p-4">Dermatologia</td>
                        <td className="p-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                                Pendente
                            </span>
                        </td>
                        <td className="p-4"></td>
                        <td className="p-4 text-center">
                            <button className="text-white bg-gradient-to-tr from-blue-500 to-violet-800 
                                               hover:opacity-90 rounded-lg px-3 py-2 text-sm shadow-md">
                                Detalhes
                            </button>
                        </td>
                    </tr>

                    <tr className="border-b hover:bg-blue-50 transition">
                        <td className="p-4">17/05/2026</td>
                        <td className="p-4">Infectologia</td>
                        <td className="p-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 font-semibold">
                                Recusado
                            </span>
                        </td>
                        <td className="p-4">Faltando assinatura</td>
                        <td className="p-4 text-center">
                            <button className="text-white bg-gradient-to-tr from-blue-500 to-violet-800 
                                               hover:opacity-90 rounded-lg px-3 py-2 text-sm shadow-md">
                                Detalhes
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}