import Button from "../components/basicos/Button";

import { Link } from "react-router-dom";

export default function Recepcao(){

    return(
        
      <div className=" p-11 flex justify-self-center flex-col gap-5 h-screen">
        <div className="flex-col justify-items-center mt-10">

          <div className=" bg-gradient-to-br from-blue-500 to-violet-800 w-24 h-24 rounded-full">
            <div></div>
          </div>

          <h1 className="text-5xl font-bold my-5 w-">
            Marcá
          </h1> 

          <p className="text-gray-600">
            ❤️ Seu agendamento médico simplificado
          </p>
        </div>
           
        <div className="w-[500px] h-[180px] text-center bg-white rounded-xl flex flex-col justify-center gap-3 shadow-lg mt-5" >
            
          <Button cor="fundo" rota="/entrar">Entrar</Button>
          <Button cor="vazado" rota="/cadastrar">Criar Conta</Button>
          
        </div>
      </div>
    );
}