import { useState } from "react";

export default function SlideButton({onChange, texto1, texto2}){

    const [ativo, setAtivo] = useState("agendamento");
    const baseAtivo = "bg-gradient-to-tr from-blue-500 to-violet-800 text-white shadow";
    const baseDesativado = "text-gray-600";

    function handleClick(opcao){
        setAtivo(opcao);
        if(onChange) onChange(opcao);
    }

    return(
        <div className="bg-white flex justify-self-center p-3 m-3 rounded-lg w-[1150px] justify-around gap-2 shadow-md">
            <div
                onClick={() => handleClick("agendamento")}
                className={`px-6 py-2 rounded-lg  cursor-pointer transition-all duration-300 w-[50%] font-bold text-lg text-center  
                    ${ativo === "agendamento"
                        ? baseAtivo
                        : baseDesativado
                    }`}>
                    {texto1}
                </div>
            <div
                onClick={() => handleClick("consultas")}
                className={`px-6 py-2 rounded-lg  cursor-pointer transition-all duration-300 w-[50%] font-bold text-lg text-center
                    ${ativo === "consultas"
                        ? baseAtivo
                        : baseDesativado
                    }`}>
                    {texto2}
                </div>
        </div>
    );
}