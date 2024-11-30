import React from 'react';
import './Home.css';
import Headeri from '../../components/Headeri';
import {useEffect, useState} from "react"
import axios from "axios";
import {setDados, getDados} from "../../components/local.jsx"

const Home = () => {

  


  return (
    <div className="home-container">
      <Headeri />
      <div className="options-container">
        <div className="option-card">
          <h3>Inserir Currículo ao Banco de Dados</h3>
          <p>Adicione currículos diretamente ao nosso banco de dados para futuras oportunidades.</p>
          <button onClick={() => window.location.href = '/Curriculo/Cadastrar'}>
            Inserir Currículo
          </button>
        </div>
        <div className="option-card">
          <h3>Criar Recrutamento</h3>
          <p>Inicie um novo recrutamento e gerencie o processo seletivo da empresa.</p>
          <button onClick={() => window.location.href = '/Recrutamento/criar'}>
            Lista de Recrutamentos
          <button onClick={() => window.location.href = '/recrutamento'}>
            Criar Recrutamento
          </button>
        </div>
        <div className="option-card">
          <h3>Ver Currículos</h3>
          <p>Acesse a lista de currículos disponíveis no banco de dados.</p>
          <button onClick={() => window.location.href = '/curriculos'}>
            Ver Currículos
          </button>
        </div>
        <div className="option-card">
          <h3>Cadastrar Funcionário</h3>
          <p>Cadastre novos funcionários no sistema.</p>
          <button onClick={() => window.location.href = '/cadastrar-funcionario'}>
            Cadastrar Funcionário

          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
