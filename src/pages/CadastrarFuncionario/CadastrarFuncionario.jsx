import React from 'react';
import Headeri from '../../components/Headeri';
import { FormularioCadastro } from '../../components/formulario-cadastro.tsx';
import './CadastrarFuncionario.css'; // Importe o arquivo CSS

export default function PaginaCadastroFuncionario() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Headeri />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cadastro de Funcionários</h1>
        <FormularioCadastro />
      </main>
    </div>
  );
}