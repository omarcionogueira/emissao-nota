import React, { useState } from 'react';
import api from '../servicos/api';

function FormularioNotaFiscal() {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [notaEmitida, setNotaEmitida] = useState(false);
  const [respostaApi, setRespostaApi] = useState(null);

  const valorTotal = quantidade && valorUnitario
    ? parseFloat(quantidade) * parseFloat(valorUnitario)
    : 0;

  async function emitirNota(evento) {
    evento.preventDefault();

    if (!cliente || !produto || !quantidade || !valorUnitario) {
      alert('Preencha todos os campos');
      return;
    }

    const dadosNota = {
      cliente,
      produto,
      quantidade: parseInt(quantidade),
      valor_unitario: parseFloat(valorUnitario),
      valor_total: valorTotal,
    };

    try {
      const resposta = await api.post('/notas', dadosNota);
      setRespostaApi(resposta.data);
      setNotaEmitida(true);
    } catch (erro) {
      console.error('Erro ao emitir nota:', erro);
      alert('Falha ao conectar com a API');
    }
  }

  return (
    <>
      <form onSubmit={emitirNota} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <input
            type="text"
            className="form-control"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Produto</label>
          <input
            type="text"
            className="form-control"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Quantidade</label>
          <input
            type="number"
            className="form-control"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Valor Unitário</label>
          <input
            type="number"
            className="form-control"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Valor Total</label>
          <input
            type="text"
            className="form-control"
            value={`R$ ${valorTotal.toFixed(2)}`}
            disabled
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Emitir Nota
          </button>
        </div>
      </form>

      {notaEmitida && (
        <div className="mt-5">
          <h4>Nota Fiscal Emitida</h4>
          <ul className="list-group">
            <li className="list-group-item">Cliente: {cliente}</li>
            <li className="list-group-item">Produto: {produto}</li>
            <li className="list-group-item">Quantidade: {quantidade}</li>
            <li className="list-group-item">Valor Unitário: R$ {parseFloat(valorUnitario).toFixed(2)}</li>
            <li className="list-group-item">Valor Total: R$ {valorTotal.toFixed(2)}</li>
            {respostaApi && (
              <li className="list-group-item">ID da Nota: {respostaApi.id}</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default FormularioNotaFiscal;
