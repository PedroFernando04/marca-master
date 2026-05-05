import Recepcao from "./telas/Recepcao";
import Cadastro from "./telas/Cadastro";
import { Routes, Route } from "react-router-dom";
import Entrar from "./telas/Entrar";
import Home from "./telas/Home";
import Agendar from "./telas/Agendar";
import UsuarioLogado from "./config/UsuarioLogado";
import PrivateRoute from "./config/PrivateRoute";
import HomeResp from "./telas/responsavel/HomeResponsavel";
import AgendarEspecialista from "./telas/paciente/AgendarEspecialista";

function App() {

  const {usuario, carregando} = UsuarioLogado();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <Routes>
      <Route path = "/recepcao" element={<Recepcao />} />
      <Route path = "/" element={<Recepcao />} />
      <Route path  = "/cadastrar" element={<Cadastro />} />
      <Route path = "/entrar" element={<Entrar />} />
      <Route 
        path = "/home" 
        element={
          <PrivateRoute usuario={usuario}>
            <Home />
          </PrivateRoute>
        }
      />

      <Route 
        path = "/agendar" 
        element={
          <PrivateRoute usuario={usuario}>
            <Agendar />
          </PrivateRoute> 
        }
      />

      <Route path = "/homeResponsavel" element={<HomeResp />} />
      <Route path = "/agendarEspecialista" element={<AgendarEspecialista />}/>

    </Routes>
  );
}

export default App
