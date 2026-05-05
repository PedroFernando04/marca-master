import Input from "../components/Input";
import Button from "../components/Button";
import SlideButton from "../components/SlideButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro(){

    const navigate = useNavigate();

    const [erroEmail, setErroEmail] = useState("");

    const [form, setForm] = useState({
        nome:"",
        cpf:"",
        telefone:"",
        email:"",
        senha:""
    });

    function validarEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handleChange(campo, valor){
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

    function limparNumero(valor) {
        return valor.replace(/\D/g, "");
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!validarEmail(form.email)){
            alert("Email inválido!")
            return;
        }

        cadastrar();
    }
    
    async function cadastrar({tipoUsuario}) {
        try{
            const formLimpo = {
                ...form,
                cpf: limparNumero(form.cpf),
                telefone: limparNumero(form.telefone)
            }

            let linkCadastrar;

            if(tipoUsuario === "paciente"){
                linkCadastrar = "http://localhost:8080/api/paciente/cadastrar";
            } else if (tipoUsuario === "responsavel"){
                linkCadastrar = "http://localhost:8080/api/responsavel/cadastrar";
            }


            const res = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formLimpo)
            });

            if (res.status === 201){
                alert("Usuário Cadastrado!");
                navigate("/entrar");
            } else {
                alert("Erro ao cadastrar!");
            }
        } catch (err){
            console.error(err);
            alert(`Erro na requisição ${err}`);
        }
    }

    const [aba, setAba] = useState ("agendamento");

    return(
        <div className="min-h-screen flex-col items-center justify-center">

            <SlideButton onChange={setAba} texto1={"Paciente"} texto2={"Responsável"}></SlideButton>

            <div className="flex justify-center">
            {aba === "agendamento" && (
                <div className="bg-white rounded-xl shadow-lg w-[500px] h-fit m-5 flex justify-items-around flex-col mt-10">
                    <div>
                        <h1 className="text-3xl font-bold m-5">Criar Conta</h1>
                        <p className="ml-5">Preencha seus dados para começar</p>
                    </div>

                    <form onSubmit = {handleSubmit} method="POST">
                        <Input tipo="nome" onChange={(valor) => handleChange("nome", valor)}></Input>
                        <Input tipo="cpf" onChange={(valor) => handleChange("cpf", valor)}></Input>
                        <Input tipo="telefone" onChange={(valor) => handleChange("telefone", valor)}></Input>
                        <Input tipo="email" onChange={(valor) => handleChange("email", valor)}></Input>
                        {erroEmail && (
                            <span className="text-red-500 text-sm m-5">
                                {erroEmail}
                            </span>
                        )}
                        <Input tipo="senha" onChange={(valor) => handleChange("senha", valor)}></Input>

                        <Button cor="fundo" ajuste="m-5 w-[90%]" type="submit">
                            Cadastrar
                        </Button>
                    </form>
                    
                </div>
            )}

            {aba === "consultas" && (
                <div className="bg-white rounded-xl shadow-lg w-[500px] h-fit m-5 flex justify-items-around flex-col mt-10">
                    <div>
                        <h1 className="text-3xl font-bold m-5">Criar Conta</h1>
                        <p className="ml-5">Preencha seus dados para começar</p>
                    </div>

                    <form onSubmit = {handleSubmit} method="POST">
                        <Input tipo="nome" onChange={(valor) => handleChange("nome", valor)}></Input>
                        <Input tipo="cpf" onChange={(valor) => handleChange("cpf", valor)}></Input>
                        <Input tipo="telefone" onChange={(valor) => handleChange("telefone", valor)}></Input>
                        <Input tipo="email" onChange={(valor) => handleChange("email", valor)}></Input>
                        {erroEmail && (
                            <span className="text-red-500 text-sm m-5">
                                {erroEmail}
                            </span>
                        )}
                        <Input tipo="senha" onChange={(valor) => handleChange("senha", valor)}></Input>

                        <Button cor="fundo" ajuste="m-5 w-[90%]" type="submit">
                            Cadastrar
                        </Button>
                    </form>
                    
                </div>
            )}

            </div>
     
        </div>
    );
}