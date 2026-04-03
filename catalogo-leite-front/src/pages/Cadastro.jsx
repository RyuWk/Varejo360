import React from 'react';
import { Link } from 'react-router-dom';

export function Cadastro() {
  return (
    <div>
      <h1>Novo Produto</h1>
      <p>Formulário de cadastro virá aqui...</p>
      <Link to="/">Voltar para a listagem</Link>
    </div>
  );
}