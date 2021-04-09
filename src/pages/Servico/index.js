import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useLocation, useHistory } from "react-router-dom";
import api from '../../service/api'

import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './styles.css'


function Servico() {

  const [servico, setServico] = useState([])
  const [solicitacao, setSolicitacao] = useState([])
  const [isAlert, setIsAlert] = useState(false)

  const location = useLocation();

  useLayoutEffect(() => {
    async function loadServico() {

      const response = await api.get('servicos')
      setServico(response.data)
    }
    loadServico()
  }, [])

  const solicitar = (data) => {
    setSolicitacao(data)
  }

  const history = useHistory();
  const sair = () => {
    history.push('/')
  }

  useEffect(() => {
    async function sendSolicitacao() {
      const { id, name, valor, time } = solicitacao
      await api.post('/solicitacao', {
        user_id: location.state.id,
        servicos_id: id,
        name_servico: name,
        name_cliente: location.state.nome,
        valor: valor,
        time: time
      })
        .then(res => {
          setIsAlert(true)

        }).catch(err => {
          console.log(err)
        })
    }

    if (solicitacao != []) {
      sendSolicitacao()
    }

  }, [solicitacao])

  return (
    <>
      <Row>
        <h1>Serviços</h1>
        <Alert show={isAlert} variant="success" className="alert">
          <Alert.Heading>Você acabou de solicitar um dos nossos serviços!!</Alert.Heading>
          <p>
            Aguardo um dos nossos colaboradores confirmar para o senhor(a) ser atendido.
        </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setIsAlert(false)} variant="outline-success">
              Fechar
          </Button>
          </div>
        </Alert>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nº</th>
              <th>NOME</th>
              <th>R$</th>
              <th>TEMPO</th>
              <th>SOLICITAR</th>
            </tr>
          </thead>
          <tbody>
            {servico.map(servico => (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.name}</td>
                <td>{servico.valor}</td>
                <td>{servico.time} MIM</td>
                <td>
                  <Button variant="primary" type="submit" onClick={() => {
                    solicitar(servico)
                  }} >
                    Solicitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="danger" type="submit" onClick={sair} >
          Sair
        </Button>
      </Row>
    </>
  )
}

export default Servico;