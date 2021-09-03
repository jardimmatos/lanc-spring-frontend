import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { Button } from 'primereact/button';

import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'

class CadastroUsuario extends React.Component{

    constructor(){
        super()
        this.serviceUsuario = new UsuarioService();
    }
    state = {
        nome:'',
        email:'',
        senha:'',
        senha2:''

    }

    cadastrar = ()=>{

        const {nome, email, senha, senha2 } = this.state
        const usuario = {nome, email, senha, senha2 }
        try{
            this.serviceUsuario.validar(usuario)
        }catch(erro){
            const msgs = erro.mensagens
            msgs.forEach( msg => {
                mensagemErro(msg)
            })

            return false

        }

        this.serviceUsuario.salvar(usuario)
            .then( response => {
                mensagemSucesso("Usuário cadastrado com sucesso! Faça o login para acessar o sistema")
                this.props.history.push('/login')
            }).catch( error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }
    render(){
        return(
            <div className="">
                <Card title="Cadastro Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <form>
                                <fieldset>
                                    <div className="bs-component">
                                        <FormGroup label="Nome: *" htmlFor="nome">
                                            <input type="text" className="form-control" id="nome" 
                                                value={this.state.nome} onChange={e => this.setState({nome:e.target.value}) }
                                                aria-describedby="nomeHelp" placeholder="Digite o Nome"/>
                                        </FormGroup>
                                        <FormGroup label="E-mail: *" htmlFor="email">
                                            <input type="email" className="form-control" id="email" 
                                                value={this.state.email} onChange={e => this.setState({email:e.target.value}) }
                                                aria-describedby="emailHelp" placeholder="Digite o Email"/>
                                            <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="senha">
                                            <input type="password" className="form-control" 
                                                value={this.state.senha} onChange={e => this.setState({senha:e.target.value}) }
                                                id="senha" placeholder="Senha"/>
                                        </FormGroup>
                                        <FormGroup label="Confirmar senha: *" htmlFor="senha2">
                                            <input type="password" className="form-control" id="senha2" 
                                                value={this.state.senha2} onChange={e => this.setState({senha2:e.target.value}) }
                                                placeholder="Repetir a senha"/>
                                        </FormGroup>
                                        <hr/>
                                        <Button label="Salvar" onClick={this.cadastrar} className="p-button-success" icon="pi pi-save"/>
                                        <Button label="Cancelar" onClick={this.cancelar} className="p-button-danger" icon="pi pi-times"/>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter( CadastroUsuario )