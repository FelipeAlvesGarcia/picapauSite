import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headeri from '../../components/Headeri';
import './Equipe.css';

const Equipe = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('https://picapauapi-production.up.railway.app/api/equipes/listar-equipes');
        const data = await response.json();
        console.log(data); // Verifique o formato da resposta
        setTeamMembers(data.equipes || []); // Ajuste conforme o retorno da API
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar equipes:', error);
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleBonification = async (id, pontos) => {
    try {
      const response = await fetch('https://picapauapi-production.up.railway.app/api/adicionar-pontos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funcionarioId: id, pontos }),
      });

      if (response.ok) {
        alert('Bonificação atribuída com sucesso!');
      } else {
        const errorData = await response.json();
        alert('Erro ao atribuir bonificação: ' + errorData.message);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div>
      <Headeri />
      <div className="container mt-5">
        <h1 className="mb-4">Minha Equipe</h1>

        {loading ? (
          <div>Carregando...</div>
        ) : teamMembers.length > 0 ? (
          <div className="list-group">
            {teamMembers.map((member) => (
              <div key={member.id} className="d-flex justify-content-between align-items-center list-group-item">
                <span>{member.nome}</span>
                <div>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleBonification(member.id, 10)}
                  >
                    +10 Pontos
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBonification(member.id, -10)}
                  >
                    -10 Pontos
                  </button>
                  <a href={`/perfil/${member.id}`} className="btn btn-link ms-3 text-warning">
                    Ver Perfil
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning">Nenhum membro encontrado.</div>
        )}
      </div>
    </div>
  );
};

export default Equipe;
