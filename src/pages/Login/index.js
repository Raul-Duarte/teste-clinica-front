import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import api from '../../service/api.js'
import { useHistory } from 'react-router-dom';

import './styles.css'

function Login() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        setNome(data.nome)
        setSenha(data.senha)
    };


    useEffect(() => {
        async function login() {
            console.log(nome)
            console.log(senha)
            await api.post('/users', {
                "name": nome,
                "password_hash": senha
            }).then(res => {
                console.log(res.data.user);
                const { id } = res.data.user
                if (id === 1) {
                    history.push({
                        pathname: 'servicos',
                        state: { id,nome }
                    })
                } else if (id === 2) {
                    history.push('andamento')
                }

            }).catch(err => {
                console.log(err)
            })

        }
        if (nome != '') {
            login()
        }

    }, [nome])

    return (
        <Row className="login">
            <Form className="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <br>
            </br>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="Nome" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="senha" placeholder="Senha" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>
        </Row>
    )
}

export default Login;