export default function PrivateRoute ({
    children,
    usuario,
    carregando
}){

    if(carregando){
        return <p>Carregando...</p>;
    }

    if(!usuario){
        return <Navigate to="/recepcao" />;
    }

    return children;
}