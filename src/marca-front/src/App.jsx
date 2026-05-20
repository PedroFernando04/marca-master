import Recepcao from "./telas/Recepcao";
import Cadastro from "./telas/Cadastro";
import Entrar from "./telas/Entrar";
import Home from "./telas/Home";
import Agendar from "./telas/Agendar";

import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./config/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path = "/recepcao" element={<Recepcao />} />
      <Route path = "/" element={<Recepcao />} />
      <Route path  = "/cadastrar" element={<Cadastro />} />
      <Route path = "/entrar" element={<Entrar />} />
      <Route 
        path = "/home" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route 
        path = "/agendar" 
        element={
          <PrivateRoute>
            <Agendar />
          </PrivateRoute> 
        }
      />

    </Routes>
  );
}

export default App
