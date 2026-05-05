import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";

export default function AgendarEspecialista(){

    const [arquivo, setArquivo] = useState(null);

    function handleFileChange(e){
        setArquivo(e.target.files[0]);
    }

    return(
    <div className="min-h-screen bg-gradient-to-tr from-white to-blue-200 flex flex-col">

        <Header />

        <main className="flex-1 flex justify-center items-center px-4 py-10">
        
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-[500px] p-6 border border-white/40">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Agendar
                </h1>

                <p className="text-gray-600 mb-6">
                    Selecione sua especialidade e envie o encaminhamento
                </p>

                <form className="flex flex-col items-center">

                    {/* INPUT FILE CUSTOM */}
                    <label className="w-[90%] cursor-pointer">
                        <div className="flex flex-col items-center justify-center 
                                        border-2 border-dashed border-blue-400 
                                        rounded-xl p-6 text-center
                                        hover:bg-blue-50 transition">

                            <span className="text-blue-700 font-semibold">
                                {arquivo ? arquivo.name : "Clique para enviar seu encaminhamento"}
                            </span>

                            <span className="text-sm text-gray-500 mt-1">
                                PDF, JPG ou PNG
                            </span>
                        </div>

                        <input 
                            type="file" 
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {/* SELECT MELHORADO */}
                    <div className="w-[90%] mt-5 relative">
                        <select 
                            className="w-full appearance-none border border-gray-300 rounded-xl 
                                    p-3 pl-4 pr-10 shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-400
                                    bg-white"
                        >
                            <option value="">Selecione uma especialidade</option>
                            <option value="cardio">Cardiologia</option>
                            <option value="dermato">Dermatologia</option>
                            <option value="pediatria">Pediatria</option>
                        </select>

                        {/* SETINHA CUSTOM */}
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                            ▼
                        </span>
                    </div>

                    {/* BOTÃO */}
                    <Button cor="fundo" rota="/agendar" ajuste="mt-8 mb-4 w-[90%] py-3 text-lg shadow-md hover:scale-[1.02] transition">
                        Agendar Consulta
                    </Button>

                </form>
            </div>  
        </main>
    </div>
    );
}