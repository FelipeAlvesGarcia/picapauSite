
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CriarRecrutamento.css';
import Headeri from '../../components/Headeri';
import {setDados, getDados} from "../../components/local.jsx"
import axios from 'axios';

const CriarRecrutamento = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    curriculos: [],
  });
  const [availableCandidates, setAvailableCandidates] = useState([
    // Exemplo de candidatos disponíveis
    { id: '1', name: 'Candidato 1' },
    { id: '2', name: 'Candidato 2' },
  ]);
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addToTeam = (candidate) => {
    setTeamMembers([...teamMembers, candidate]);
    setAvailableCandidates(availableCandidates.filter((c) => c.id !== candidate.id));
    setFormData({
      ...formData,
      curriculos: [...formData.curriculos, candidate.id],
    });
  };

  const removeFromTeam = (member) => {
    setAvailableCandidates([...availableCandidates, member]);
    setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
    setFormData({
      ...formData,
      curriculos: formData.curriculos.filter((id) => id !== member.id),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://picapauapi-production.up.railway.app/api/recrutamentos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Recrutamento criado com sucesso!');
        navigate(`/recrutamentos/${data._id}`);
      } else {
        alert('Erro ao criar recrutamento: ' + data.message);
      }
    } catch (error) {
      alert('Erro ao conectar ao servidor: ' + error.message);
    }
  };

  return (
    <>
      <Headeri />
      <div className="recruitment-page">
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <h1 className="recruitment-title">Criar Novo Recrutamento</h1>
            </div>

            <div className="form-container">
              <form onSubmit={funCriarRecrutamento}>
                <div className="form-group">
                  <label>Nome do Recrutamento</label>
                  <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => {setNome(e.target.value)}}
                    placeholder="Nome do Recrutamento"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    name="descricao"
                    value={descricao}
                    onChange={(e) => {setDescricao(e.target.value)}}
                    placeholder="Descrição"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div>
                  <h3>Selecione os Curriculos</h3>
                  {
                    listaCurriculos.map((cur) => {

                      return(
                        <div>
                          
                        </div>
                      );
                    })
                  }
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">Criar</button>
                </div>
              </form>
            </div>  
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CriarRecrutamento;