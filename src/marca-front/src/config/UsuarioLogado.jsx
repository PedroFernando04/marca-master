import { useState, useEffect } from "react";

export default function UsuarioLogado(){

    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:8080/api/usuarios/usuarioLogado",{
            credentials: "include"
        })
        .then(res => {
            if(!res.ok){
                setUsuario(null);
                return;
            }
            return res.json();
        })
        .then(data => {
            if (data)setUsuario(data)
        })
        .catch(err => {
            console.error(err);
            setUsuario(null);
        })
        .finally(() => {
            setCarregando(false);
        });
    }, []);

    return {usuario, carregando};
}