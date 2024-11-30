import { useState } from "react";
import { getDados } from "../../components/local";
import axios from "axios";
import Headeri from "../../components/Headeri";
import { Navigate } from "react-router-dom";

function CadastrarCurriculo() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [arquivo, setArquivo] = useState(null);

    function funCadastrarCurriculo(e) {
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
                    setNome("");
                    setEmail("");
                    setCpf("");
                    setArquivo(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Preencha todos os campos e selecione um arquivo.");
        }
    }

    return (
        <>
            <Headeri/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 mb-3">
                        <h2>Cadastrar Curriculo</h2>     
                    </div>
                    
                    <form onSubmit={funCadastrarCurriculo} className="row d-flex justify-content-center">
                        <div className="col-12 mb-4">
                            <label className="ms-2">Nome</label>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-100 p-2"
                            />    
                        </div>
                        <div className="col-12 mb-4">
                            <label className="ms-2">Email</label>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-100 p-2"
                            />    
                        </div>
                        <div className="col-12 mb-4">
                            <label className="ms-2">CPF</label>
                            <input
                                type="text"
                                placeholder="Cpf"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                className="w-100 p-2"
                            />    
                        </div>
                        <div className="col-12">
                            <label className="ms-2">Currículo (PDF)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setArquivo(e.target.files[0])}
                                className="w-100 p-2"
                            />    
                        </div>
                        <div className="col-4 my-5">
                            <input type="submit" className="p-3 w-100" />
                        </div>
                    </form>        
                </div>
            </div>
            
        </>
    );
}

export default CadastrarCurriculo;
