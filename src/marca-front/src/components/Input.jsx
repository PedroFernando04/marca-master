import { useState } from "react";

export default function Input({tipo, onChange}){

    function MascaraCPF(texto){
        texto = texto.replace(/\D/g, "");
        texto = texto.replace(/(\d{3})(\d)/, "$1.$2");
        texto = texto.replace(/(\d{3})(\d)/, "$1.$2");
        texto = texto.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return texto;
    }

    function MascaraTelefone(texto){
        texto = texto.replace(/\D/g, "");
        texto = texto.replace(/^(\d{2})(\d)/g, "($1) $2");
        texto = texto.replace(/(\d{5})(\d)/, "$1-$2");
        return texto;
    }

    const[texto, setTexto] = useState("");

    const baseLabel = "text-base font-bold ml-5 mt-5"
    const baseInput = "border rounded-xl shadow-lg place-content-center pl-4 p-2 ml-5 w-[90%]"
   
    const config  = {
        telefone: {
            maxLength: 15,
            placeholder: "(XX) XXXXX-XXXX",
            label: "Telefone",
            type: "text",
            mascara: MascaraTelefone
        },

        cpf: {
            maxLength: 14,
            placeholder: "XXX.XXX.XXX-XX",
            label: "CPF",
            type: "text",
            mascara: MascaraCPF
        },

        nome: {
            maxLength: 255,
            placeholder: "Digite seu nome Completo",
            label: "Nome Completo",
            type: "text"
        },

        email: {
            maxLength: 255,
            placeholder: "email@email.com",
            label: "E-mail",
            type: "text"
        },

        senha: {
            maxLength: 255,
            placeholder: "Crie uma senha segura",
            label: "Senha",
            type: "password"
        },

        arquivo: {
            placeholder: "Envie seu arquivo",
            label: "Encaminhamento",
            type: "file"
        }
    };

    const cfg = config[tipo] || {};

    function handleChange(e){
        const texto = e.target.value;
        const textoFormatado = cfg.mascara ? cfg.mascara(texto) : texto;
        setTexto(textoFormatado)

        if(onChange){
            onChange(textoFormatado)
        }
    }
    
    return(
        <div className="flex flex-col gap-2">
            <label className={baseLabel}>{cfg.label}</label>
            <input 
                type={cfg.type} 
                className={baseInput} 
                placeholder={cfg.placeholder}
                value={texto}
                onChange={handleChange}
                maxLength={cfg.maxLength}
            />
        </div>
        
    );
}