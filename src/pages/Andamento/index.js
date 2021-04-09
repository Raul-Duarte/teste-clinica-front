import React, { useLayoutEffect, useState } from 'react';

import {  useHistory } from "react-router-dom";
import api from '../../service/api'

import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import './styles.css'
// import { Container } from './styles';

function Andamento() {
    const [servico, setServico] = useState([])


    const history = useHistory();
    const sair = () => {
        history.push('/')
    }

    useLayoutEffect(() => {
        async function loadServico() {

            const response = await api.get('solicitacao')
            setServico(response.data)
        }
        loadServico()
    }, [])

    return (
        <Row>
            <h1>Serviços Solicitados</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tempo</th>
                        <th>Tempo</th>
                        <th>Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {servico.map(servico => (
                        <tr key={servico.id}>
                            <td>{servico.id}</td>
                            <td>{servico.name_servico}</td>
                            <td>R$ {servico.valor}</td>
                            <td>{servico.time} MIM</td>
                            <td>{servico.name_cliente}</td>
                            <td>
                                <Button variant="success" type="submit" onClick={() => {

                                }} >
                                    Iniciar
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
    )
}

export default Andamento;