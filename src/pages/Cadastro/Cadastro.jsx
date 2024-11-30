import React, { useState, useEffect } from 'react';
import {setDados, getDados} from "../../components/local.jsx"
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import './Cadastro.css';

const Cadastro = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  //

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function funCadastrar (e){
    e.preventDefault();
    if(nome !== "" && email !== "" && senha !== "" && selectedRole !== ""){
      console.log(nome)
      console.log(email)
      console.log(senha)
      console.log(selectedRole)  

      if(selectedRole == "Gerenciador"){
        axios.post("https://picapauapi-production.up.railway.app/api/cadastro", {
          nome:nome,
          email:email,
          senha:senha,
          tipo:selectedRole,
        }).then((resp) => {
          console.log(resp.data);
          funLogin();
          navigate("/home");
        }).catch((error) => {
          console.log(error);
        })  
      }
      else{
        axios.post("https://picapauapi-production.up.railway.app/api/cadastro", {
          nome:nome,
          email:email,
          senha:senha,
          tipo:selectedRole
        }).then((resp) => {
          console.log(resp.data);
          funLogin();
          navigate("/lider");
        }).catch((error) => {
          console.log(error);
        })  
      }      
    }
  }

  function funLogin (){
    if(email !== "" && senha !== ""){
      console.log(email);
      console.log(senha);

      axios.post("https://picapauapi-production.up.railway.app/api/login", {
        email:email,
        senha:senha
      }).then((resp) => {
        console.log(resp.data);
        setDados(resp.data);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-left">
        <img
          src="src/assets/images/logo-picapau.png"
          alt="Logo Pica Pau Móveis"
          className="cadastro-logo"
        />
      </div>
      <div className="cadastro-right">
        <div className="cadastro-box">
          <h2>Cadastro</h2>
          <form onSubmit={funCadastrar}>
            <div className="cadastro-input">
              <label htmlFor="text">Nome</label>
              <input type="text" id="nome" placeholder="Digite seu nome" onChange={(e) => {setNome(e.target.value)}} required />
            </div>
            <div className="cadastro-input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" onChange={(e) => {setEmail(e.target.value)}} required />
            </div>
            <div className="cadastro-input">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" onChange={(e) => {setSenha(e.target.value)}} required />
            </div>
            <p className="role-text">Você é administrador ou Líder</p>
            <div className="role-selection">
              <button
                type="button"
                className={`role-button ${selectedRole === 'Gerenciador' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('Gerenciador')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`role-button ${selectedRole === 'Lider' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('Lider')}
              >
                Líder
              </button>
            </div>
            <button type="submit" className="cadastro-button">Cadastrar</button>
          </form>
          <p className="login-text">
            Já tem uma conta? <Link to="/">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
