import {Navigate} from "react-router-dom"

export default function PrivateRoute ({children, usuario}){
    if(!usuario){
        return <Navigate to="/recepcao" />;
    }

    return children;
}