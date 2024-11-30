import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Headeri from '../../components/Headeri';
import { FilterSidebar } from '../../components/filter-sidebar';
import { CurriculumCard } from '../../components/curriculum-card';
import { getDados } from '../../components/local.jsx';
import axios from 'axios';
import './Curriculos.css'; // Importe o arquivo CSS

export default function CurriculosPage() {
  const [curriculos, setCurriculos] = useState([]);
  const [selectedCurriculo, setSelectedCurriculo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurriculos = async () => {
      let user = getDados();
      const http = axios.create({
        baseURL: "https://picapauapi-production.up.railway.app/api",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      try {
        const response = await http.get('/curriculos/meus-curriculos');
        if (response.data && Array.isArray(response.data.curriculos)) {
          setCurriculos(response.data.curriculos);
        } else {
          console.error('A resposta da API não contém um array de currículos:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar currículos:', error);
      }
    };

    fetchCurriculos();
  }, []);

  const handleRecrutar = async (curriculoId) => {
    let user = getDados();
    const http = axios.create({
      baseURL: "https://picapauapi-production.up.railway.app/api",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const recrutamentoData = {
      nome: "Recrutamento de Desenvolvedor",
      descricao: "Recrutamento para a posição de Desenvolvedor Full Stack.",
      curriculos: [curriculoId]
    };

    try {
      const response = await http.post('/recrutamentos/', recrutamentoData);
      console.log('Recrutamento criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar recrutamento:', error);
    }
  };

  const handleShowDetails = (curriculo) => {
    setSelectedCurriculo(curriculo);
  };

  const handleCloseDetails = () => {
    setSelectedCurriculo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Headeri />
      <main className="page-container">
        <h1 className="page-title">Currículos Disponíveis</h1>
        <div className="page-content">
          {/* Área de Filtro */}
          <div className="filter-sidebar">
            <FilterSidebar />
          </div>
          
          {/* Área de Currículos */}
          <div className="curriculum-area">
            <div className="curriculum-grid">
              {curriculos.map((curriculo, index) => (
                <CurriculumCard 
                  key={index} 
                  name={curriculo.nome} 
                  onRecrutar={() => handleRecrutar(curriculo._id)} 
                  onShowDetails={() => handleShowDetails(curriculo)}
                />
              ))}
            </div>
            <Button className="create-button" onClick={() => navigate('/inserir-curriculo')}>
              Criar
            </Button>
          </div>
        </div>
      </main>

      {/* Modal para exibir detalhes do currículo */}
      {selectedCurriculo && (
        <Modal show={true} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Currículo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Nome:</strong> {selectedCurriculo.nome}</p>
            <p><strong>Email:</strong> {selectedCurriculo.email}</p>
            <p><strong>CPF:</strong> {selectedCurriculo.cpf}</p>
            <p><strong>Arquivo:</strong> <a href={`https://picapauapi-production.up.railway.app/${selectedCurriculo.arquivo}`} target="_blank" rel="noopener noreferrer">Visualizar PDF</a></p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}