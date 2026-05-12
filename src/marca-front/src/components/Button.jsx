import { Link } from "react-router-dom";

export default function Button({children, cor, ajuste = "", rota, onClick, type, especialidadeGeral}) {

    const base = "inline-flex items-center justify-center rounded-lg mx-5 px-4 py-2";

    const estilos = {
        fundo: "text-white bg-gradient-to-tr from-blue-500 to-violet-800 hover:opacity-90",
        vazado: "text-violet-800 bg-white border-2 border-violet-500 hover:opacity-65",
        texto: "font-bold hover:opacity-75",
        excluir: "text-red-800 bg-white border-2 border-red-500 hover:opacity-65"
    };

    if (rota){
        return (
            <Link to={rota} 
                  state={{clinicoGeral: especialidadeGeral}}
                  className={`${base} ${ajuste} ${estilos[cor]}`}>
                {children}
            </Link>
        );
    }

    else{
        return(
            <button 
                className={`${base} ${ajuste} ${estilos[cor]}`} 
                onClick = {onClick}
                type={type || "button"}
            >
                    {children}
            </button>
        );
        
    };
    
}