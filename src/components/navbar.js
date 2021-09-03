import React from 'react'
import NavBarItem from './navbar-item'
import { AuthConsumer } from '../main/provedorAutenticacao'

function NavBar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <span className="navbar-brand">Minhas Finanças</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.isUsuarioAutenticado} label="Home" link="#/" />
                        <NavBarItem render={props.isUsuarioAutenticado} label="Usuários" link="#/cadastro-usuarios" />
                        <NavBarItem render={props.isUsuarioAutenticado} label="Lançamentos" link="#/consulta-lancamentos" />
                        <NavBarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

const navbar = () => (
    <AuthConsumer>
        { (context)=> (<NavBar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />) }
    </AuthConsumer>
)
export default navbar