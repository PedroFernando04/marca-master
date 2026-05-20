import Button from "../basicos/Button";

import { useNavigate } from "react-router-dom";

import UsuarioLogado from "../../config/UsuarioLogado";

export default function Header() {
  const navigate = useNavigate();

  async function logout() {
    if (usuario) {
      await fetch("http://localhost:8080/api/usuarios/logout", {
        method: "POST",
        credentials: "include",
      });
    }

    navigate("/recepcao");
  }

  const usuario = UsuarioLogado().usuario;

  return (
    <div>
      <header className=" text-white bg-gradient-to-tr from-blue-600 to-violet-800 p-2 flex justify-between shadow-md">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold ml-5 ">{usuario?.nome}</h1>
          <p className="ml-6 text-sm">Bem vindo ao Marcá</p>
        </div>

        <Button ajuste="text-bold" cor="texto" rota="/" onClick={logout}>
          Sair
        </Button>
      </header>
    </div>
  );
}
