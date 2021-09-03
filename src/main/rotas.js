// yarn add react-router-dom
import React from 'react'
import {Route, Switch, HashRouter, Redirect} from 'react-router-dom' 
import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastro-usuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import {AuthConsumer} from './provedorAutenticacao'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){ 

    return(
        <Route {...props} render={ (componentProps) => {
            if( isUsuarioAutenticado ){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ { pathname:'/login', state: {from: componentProps.location /* manter o histórico da url após a url de login*/ } } } />
                )
            }
        } } />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route isUsuarioAutenticado={props.isUsuarioAutenticado} path="/login" component={Login} />
                <Route isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

const rotas = () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
)
export default  rotas