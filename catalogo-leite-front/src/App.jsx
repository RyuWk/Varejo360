import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cadastro } from './pages/Cadastro';

function App() {
  return (
    // 1. O BrowserRouter deve envolver toda a aplicação para habilitar o uso de rotas
    <BrowserRouter>
      {/* 2. O Routes funciona como um "switch", escolhendo apenas UMA rota para mostrar por vez */}
      <Routes>
        
        {/* 3. Definimos o caminho (path) e qual componente (element) deve abrir */}
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota de segurança: se o usuário digitar algo errado, volta para a Home */}
        <Route path="*" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;