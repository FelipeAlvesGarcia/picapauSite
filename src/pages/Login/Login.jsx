import React from 'react';
import {useEffect, useState} from "react";
import {setDados, getDados} from "../../components/local.jsx"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [senha, setsenha] = useState("");
  const navigate = useNavigate();

  function funLogin (e){
    e.preventDefault();
    if(email !== "" && senha !== ""){
      console.log(email);
      console.log(senha);

      axios.post("https://picapauapi-production.up.railway.app/api/login", {
        email:email,
        senha:senha
      }).then((resp) => {
        console.log(resp.data);
        setDados(resp.data);
        if(resp.data.user.tipo == "Gerenciador"){
          navigate("/home");
        }
        else{
          navigate("/lider")
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="src\assets\images\logo-picapau.png" 
          alt="Logo Pica Pau Móveis"
          className="login-logo"
        />
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={funLogin}>
            <div className="login-input">
              <label className='cor-eti' htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" onChange={(e) => {setEmail(e.target.value)}} required />
            </div>
            <div className="login-input">
              <label className='cor-eti' htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" onChange={(e) => {setsenha(e.target.value)}} required />
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
          <p className="signup-text">
            Não tem uma conta? <Link to="/cadastro">Crie aqui</Link> {/* Usando Link para evitar recarregamento */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
