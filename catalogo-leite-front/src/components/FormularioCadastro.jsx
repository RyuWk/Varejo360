import React, { useState } from 'react';
import api from '../services/api';

export function FormularioCadastro({ aoSucesso }) {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!codigo || !nome) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      //envia os dados pro backend
      await api.post('/leite', { codigo, nome });
      
      //limpa os campos se deu boa
      setCodigo("");
      setNome("");
      
      //notifica a Home para recarregar a tabela 
      aoSucesso("cadastro"); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Erro: Este código de produto já existe!");
      } else {
        alert("Erro ao cadastrar produto.");
      }
    }
  };

  return (
    <div>
      <h2>Cadastrar novo produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group codigo">
            <span className="label-text">Código</span>
            <input value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          </div>
          <div className="input-group nome">
            <span className="label-text">Nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn-azul">Cadastrar</button>
      </form>
    </div>
  );
}