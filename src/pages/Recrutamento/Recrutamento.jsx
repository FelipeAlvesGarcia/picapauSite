import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recrutamento.css';
import Headeri from '../../components/Headeri';
import {setDados, getDados} from "../../components/local.jsx"
import {useEffect, useState} from "react"
import axios from "axios";

const Recrutamento = () => {
  
  let user;
  useEffect(() => {
      user = getDados();
      console.log(user);
      getEquipes(user.token);
  }, [0]);

  const [recrutamento, setRecrutamento] = useState([]);

  async function getEquipes(token) {
    const url = axios.create({
        baseURL: "https://picapauapi-production.up.railway.app/api",
        headers: {
            Authorization: `Bearer ${token}`, 
        }
    });

    url.get("recrutamentos/meus-recrutamentos")
    .then((resp) => {
        console.log(resp.data);
        setRecrutamento(resp.data.recrutamentos);
        console.log(recrutamento)
    }).catch((error) => {
        console.log(error);
    });
  }
  return (
    <>
      <Headeri />
      <div className="recrutamentos-container">
        <h1 className="title">Recrutamentos</h1>
        <div className="recrutamentos-list">
            {recrutamento.map((rec) => {

              return (
                 <a
                    className="recrutamento-item"
                    href={`/Recrutamento/Detalhes/${rec._id}`}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    <span>{rec.nome}</span>
                  </a>
              )
            })}
        </div>

        <a className="create-button" href="/recrutamento/criar">
          Criar
        </a>
      </div>
    </>
  );
};

export default Recrutamento;
