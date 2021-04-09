import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Andamento from './pages/Andamento'
import Login from './pages/Login'
import Servico from './pages/Servico'


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/servicos" exact component={Servico} />
                <Route path="/andamento" exact component={Andamento} />
            </Switch>
        </BrowserRouter>
    )
}