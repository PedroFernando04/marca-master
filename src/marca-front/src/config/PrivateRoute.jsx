import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {

    const [usuario, setUsuario] = useState(null);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        fetch(
            "http://localhost:8080/api/usuarios/usuarioLogado",
            {
                credentials: "include"
            }
        )
            .then(res => {

                if(!res.ok){

                    setUsuario(null);

                    return;
                }

                return res.json();
            })

            .then(data => {

                if(data){

                    setUsuario(data);
                }
            })

            .catch(() => {

                setUsuario(null);
            })

            .finally(() => {

                setCarregando(false);
            });

    }, []);

    if(carregando){
        return <p>Carregando...</p>;
    }

    if(!usuario){
        return <Navigate to="/recepcao" />;
    }

    return children;
}