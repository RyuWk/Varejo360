import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FormularioCadastro } from '../components/FormularioCadastro';

export function Home() {
  const [produtos, setProdutos] = useState([]); //lista de produtos [cite: 9]
  const [filtro, setFiltro] = useState("");      //texto para busca [cite: 6]
  const [pagina, setPagina] = useState(0);       //controle de pagina [cite: 10, 23]
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  //busca os dados do backend aplicando filtro e paginação [cite: 6, 10, 23, 24]
  const carregarProdutos = async (tipoSucesso) => {
    try {
      const response = await api.get(`/leite?filtro=${filtro}&page=${pagina}&size=10`);
      setProdutos(response.data.content); 
      
      //exibir msg de sucesso (3 seg)
      if (tipoSucesso === "cadastro") {
        setMensagemSucesso("CADASTRO REALIZADO COM SUCESSO");
        setTimeout(() => setMensagemSucesso(""), 3000);
      } else if (tipoSucesso === "exclusao") {
        setMensagemSucesso("REGISTRO REMOVIDO COM SUCESSO");
        setTimeout(() => setMensagemSucesso(""), 3000);
      }
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  //carrega os dados na inicialização e sempre que a página mudar 
  useEffect(() => {
    carregarProdutos();
  }, [pagina]);

  //func p deletar um item da tabela [cite: 11]
  const excluirProduto = async (id) => {
    //é possível colocar um if (window.confirm("Deseja realmente remover este registro?"))
    try {
      await api.delete(`/leite/${id}`);
      carregarProdutos("exclusao"); //atualiza a tabela depois de excluido 
    } catch (error) {
      alert("Erro ao excluir produto.");
    }
  };

  return (
    <div className="container">
      
      {/*card*/}
      {mensagemSucesso && (
        <div className="toast-container">
          <div className="toast-card">
            {mensagemSucesso}
          </div>
        </div>
      )}

      <h1>Catálogo de Leite</h1>
      
      {/*seçao de busca*/}
      <div style={{ marginBottom: '30px' }}>
        <span className="label-text">Digite os dados para busca</span>
        <input 
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button className="btn-azul" onClick={() => carregarProdutos()}>
          Buscar 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/*tabela produtos*/}
      <table>
        <thead>
          <tr>
            <th>
              <div className="th-content">
                Código
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th>
              <div className="th-content">
                Nome
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.codigo}</td>
              <td>{p.nome}</td>
              <td>
                <button onClick={() => excluirProduto(p.id)} className="btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*paginacao com seta svg*/}
      <div className="pagination-container">
        <button className="btn-paginacao" disabled={pagina === 0} onClick={() => setPagina(p => p - 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="btn-paginacao" onClick={() => setPagina(p => p + 1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <FormularioCadastro aoSucesso={carregarProdutos} />
    </div>
  );
}