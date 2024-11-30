import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { getDados } from '../components/local';
import axios from 'axios';

interface FormSchemaType {
  email: string;
  senha: string;
  nome: string;
}

interface User {
  token: string;
}

export function FormularioCadastro() {
  const [formData, setFormData] = useState<FormSchemaType>({
    email: '',
    senha: '',
    nome: ''
  });
  const [errors, setErrors] = useState<Partial<FormSchemaType>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormSchemaType> = {};
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      newErrors.email = "Endereço de e-mail inválido";
    }
    if (formData.senha.length < 8) {
      newErrors.senha = "A senha deve ter pelo menos 8 caracteres";
    }
    if (formData.nome.length < 2) {
      newErrors.nome = "O nome deve ter pelo menos 2 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const user: User | null = getDados();

    if (!user || typeof user === 'string' || !user.token) {
      console.error('Usuário não autenticado');
      setIsLoading(false);
      // Redirecione para a página de login ou exiba uma mensagem de erro
      return;
    }

    const http = axios.create({
      baseURL: "https://picapauapi-production.up.railway.app/api",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = {
      ...formData,
      tipo: 'Funcionario' // Define automaticamente como "Funcionario"
    };

    try {
      const response = await http.post('/cadastrofuncionario', data);
      console.log('Funcionário cadastrado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Cadastrar Novo Funcionário</Card.Title>
        <Card.Text>Preencha os dados do novo funcionário abaixo.</Card.Text>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="João da Silva"
              isInvalid={!!errors.nome}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nome}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="********"
              isInvalid={!!errors.senha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.senha}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="w-full mt-3" disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Cadastrar'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
