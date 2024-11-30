import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Home from './pages/Home/Home.jsx';
import Recrutamento from './pages/Recrutamento/Recrutamento.jsx';
import CriarRecrutamento from './pages/CriarRecrutamento/CriarRecrutamento.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';
import Equipe from './pages/Equipe/Equipe.jsx';
import Lider from './pages/lider/Lider.jsx';
import RecrutamentoDetalhes from './pages/RecrutamentoDetalhes/RecrutamentoDetalhes.jsx';
import InserirCurriculo from './pages/InserirCurriculo/InserrirCurriculo.jsx'; // Verifique a capitalização
import CurriculosPage from './pages/Curriculos/Curriculos.jsx'; // Importe o novo componente
import PaginaCadastroFuncionario from './pages/CadastrarFuncionario/CadastrarFuncionario.jsx'; // Importe o novo componente

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "home", element: <Home /> },
      { path: "recrutamento", element: <Recrutamento /> },
      { path: "criarecrutamento", element: <CriarRecrutamento /> },
      { path: "perfil", element: <Perfil /> },
      { path: "equipe", element: <Equipe /> },
      { path: "lider", element: <Lider /> },
      { path: "RecrutamentoDetalhes", element: <RecrutamentoDetalhes /> },
      { path: "inserir-curriculo", element: <InserirCurriculo /> },
      { path: "curriculos", element: <CurriculosPage /> },
      { path: "cadastrar-funcionario", element: <PaginaCadastroFuncionario /> } // Adicione a nova rota
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);