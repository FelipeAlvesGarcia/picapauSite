import React from 'react';
import './Perfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headeri from '../../components/Headeri';

const Perfil = () => {
  return (
    <>            
        <Headeri />
        <div className="profile-container">
            <div className="content-container">
                <h1 className='title-name-profile'>Perfil De Felipe</h1>

                <div className="profile-content row">
                    <div className="col-md-3 text-center">
                        <img src="src/assets/images/logo-picapau.png" alt="Perfil" className="profile-pic" />
                        <button className="btn btn-warning mt-3">Currículo digitalizado</button>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Nome</label>
                                <input type="text" className="form-control" value="Felipe Garcia" readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Função</label>
                                <input type="text" className="form-control" value="Marceneiro" readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>CPF</label>
                                <input type="text" className="form-control" value="458.589.547-92" readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Número de telefone</label>
                                <input type="text" className="form-control" value="9981010287" readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" value="FelipegarçaNeto@gmail.com" readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Equipe</label>
                                <select className="form-control" defaultValue="Marcenaria II" disabled>
                                    <option>Marcenaria I</option>
                                    <option>Marcenaria II</option>
                                    <option>Marcenaria III</option>
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <label>Endereço</label>
                                <textarea className="form-control" rows="3" readOnly>
                                    Rua Socorro, Nº 505, Bairro Me Ajuda, Cidade Não me toque. Ponto de referência: Próximo à Praça da Desesperança.
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-actions d-flex justify-content-between align-items-center">
                    <p className="last-bonus">Última Bonificação 04/10/2024</p>
                    <div>
                        <button className="btn btn-outline-danger me-2">Retirar</button>
                        <button className="btn btn-warning">Dar Bonificação</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Perfil;
