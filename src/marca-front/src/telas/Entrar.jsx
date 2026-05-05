import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Entrar(){

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:"",
        senha:""
    });

    const [erroEmail, setErroEmail] = useState("");

    function validarEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handleChange (campo, valor) {
        setForm({
            ...form,
            [campo]: valor
        });

        if (campo === "email"){
            if(!validarEmail(valor)){
                setErroEmail("Email Inválido!\nO email deve conter @ e .")
            } else{
                setErroEmail("")
            }
        }
    }

    function handleSubmit (e){
        e.preventDefault();

        if(!validarEmail(form.email)){
            alert("Email inválido!")
            return;
        }

        entrar();
    }

    async function entrar() {
        try{
            const api = await fetch("http://localhost:8080/api/usuarios/entrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(form)
            });

            if(api.status === 200){
                navigate("/home");
            } else {
                alert("Erro! \nLogin ou senha incorreto");
            }
            
        } catch (err){
            console.error(err);
            alert("Erro na requisição");
        }
    }
    return(
            <div className="h-screen flex justify-center items-center">
                <div className="bg-white rounded-xl shadow-lg w-[500px] h-fit">
                    <h1 className="text-4xl font-bold m-5">Entrar</h1>
                    <p className="ml-5">Acesse sua conta</p>

                    <form method="POST" onSubmit={handleSubmit}>
                        <Input tipo="email" onChange={(valor) => handleChange("email", valor)}></Input>
                        {erroEmail && (
                            <span className="text-red-500 text-sm m-5">
                                {erroEmail}
                            </span>
                        )}
                        <Input tipo="senha" onChange={(valor) => handleChange("senha", valor)}></Input>

                        <Button cor="fundo" ajuste="mt-6 mb-6 w-[90%]" type="submit">
                            Entrar
                        </Button>
                    </form>
                    
                </div>  
            </div>
    );
}