import Input from "../components/basicos/Input";
import Button from "../components/basicos/Button";
import Select from "../components/basicos/Select";

import SlideButton from "../components/utilitarios/SlideButton";

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
        senha:"",
        matricula:"",
        clinica:"",
        tipoFuncionario:""
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

    function handleSubmit(e, tipoUsuario){
        e.preventDefault();

        if(!validarEmail(form.email)){
            alert("Email inválido!")
            return;
        }

        cadastrar(tipoUsuario);
    }
    
    async function cadastrar(tipoUsuario) {
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
                linkCadastrar = "http://localhost:8080/api/funcionario/cadastrar";
            }


            const res = await fetch(linkCadastrar, {
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
                        <div className=" flex flex-row justify-between items-center">
                            <h1 className="text-4xl font-bold m-5">
                                Criar Conta
                            </h1>
                            
                            <Button cor = "fundo" rota = "/recepcao">
                                Voltar
                            </Button>
                        </div>
                        <p className="ml-5">Preencha seus dados para começar</p>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, "paciente")} method="POST">
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
                        <div className=" flex flex-row justify-between items-center">
                            <h1 className="text-4xl font-bold m-5">
                                Criar Conta
                            </h1>
                            
                            <Button cor = "fundo" rota = "/recepcao">
                                Voltar
                            </Button>
                        </div>
                        <p className="ml-5">Preencha seus dados para começar</p>
                    </div>

                    <form onSubmit = {(e) => handleSubmit(e, "responsavel")} method="POST">
                        <Input tipo="nome" onChange={(valor) => handleChange("nome", valor)}></Input>
                        <Input tipo="matricula" onChange={(valor) => handleChange("matricula", valor)}></Input>
                        <Input tipo="email" onChange={(valor) => handleChange("email", valor)}></Input>
                        {erroEmail && (
                            <span className="text-red-500 text-sm m-5">
                                {erroEmail}
                            </span>
                        )}
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold ml-5 mt-5">Clínica</label>
                            <Select 
                                tipo={"clinica"} 
                                ajuste={"ml-5 w-[90%]"} 
                                value={form.clinica} 
                                onChange={(valor) => handleChange("clinica", valor)}>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold ml-5 mt-5">Tipo</label>
                            <Select 
                                tipo={"tipoFuncionario"} 
                                ajuste={"ml-5 w-[90%]"} 
                                value={form.tipoFuncionario} 
                                onChange={(valor) => handleChange("tipoFuncionario", valor)}>
                            </Select>
                        </div>
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