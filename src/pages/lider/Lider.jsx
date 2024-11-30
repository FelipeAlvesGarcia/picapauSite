import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDados, setDados } from "../../components/local.jsx";
import { useState, useEffect } from "react";
import Headeri from '../../components/Headeri';
import './lider.css';

function Lider() {
    let user;
    useEffect(() => {
        user = getDados();
        console.log(user);
        getEquipes(user.token);
    }, []);

    const [equipe, setEquipe] = useState([]);

    function getEquipes(token) {
        const url = axios.create({
            baseURL: "https://picapauapi-production.up.railway.app/api",
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        });

        url.get("/equipes/listar-equipes")
            .then((resp) => {
                console.log(resp.data);
                setEquipe(resp.data);
                console.log(equipe)
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Headeri />
            <div className="list-group">
                {equipe.map((member, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center list-group-item">
                    <span>{member}</span>
                    <a href="#" className="text-warning">Ver avaliações</a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Lider;