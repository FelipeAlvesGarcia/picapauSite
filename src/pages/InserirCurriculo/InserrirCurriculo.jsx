import React, { useState } from 'react';
import { getDados } from '../../components/local.jsx';
import Headeri from '../../components/Headeri';
import axios from 'axios';
import './InserrirCurriculo.css'; // Importe o arquivo CSS

const InserirCurriculo = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [arquivo, setArquivo] = useState(null);

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nome: " + nome);
    console.log("Email: " + email);
    console.log("Cpf: " + cpf);
    console.log("Arquivo: ", arquivo);

    if (nome !== "" && email !== "" && cpf !== "" && arquivo) {
      let user = getDados();
      const http = axios.create({
        baseURL: "https://picapauapi-production.up.railway.app/api",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("cpf", cpf);
      formData.append("arquivo", arquivo);

      http.post("curriculos/", formData)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Preencha todos os campos e selecione um arquivo.");
    }
  };

  return (
    <div>
      <Headeri />
      <div className="form-container">
        <div className="form-content">
          <h1 className="form-title">Inserir Currículo</h1>
          <p className="form-description">Adicione seu currículo ao banco de dados.</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome:</label>
              <input className="form-input" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input className="form-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">CPF:</label>
              <input className="form-input" type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Arquivo:</label>
              <input className="form-input" type="file" accept="application/pdf" onChange={handleFileChange} required />
            </div>
            <button className="submit-button" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InserirCurriculo;