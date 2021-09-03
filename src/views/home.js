import React from 'react'
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
//import LocalStorageService from '../app/service/localStorageService'
import currencyFormatter from 'currency-formatter'
import { AuthContext } from '../main/provedorAutenticacao' 

class Home extends React.Component{

    constructor(){
        super()
        this.serviceUsuario = new UsuarioService();
    }

    state = {
        saldo:0,
        nome:''
    }

    getSaldo = async () => {
        const usuarioLogado = this.context.usuarioAutenticado
        await this.serviceUsuario.obterSaldoUsuario(usuarioLogado.id)
        .then(response => {
            this.setState({saldo:response.data})
            this.setState({nome: usuarioLogado.nome})
        }).catch(error =>{
            console.error(error)
        }).finally()
    }
    componentDidMount(){
        //Após componente ser montado
        this.getSaldo()
    }

    componentWillUnmounted(){
        //quando o componente será montado
    }


    render(){
        return(
            <div className="jumbotron">
                <h3 className="display-6">Bem vindo, {this.state.nome}!</h3>
                <div className="lead">Esse é seu sistema de finanças.</div>
                <div className="lead">Seu saldo para o mês atual é de: 
                    <div>{this.state.saldo < 0 ?
                        (
                            <span className="text-danger"> 
                                {currencyFormatter.format(this.state.saldo, {locale:'pt-BR'})}
                            </span>
                        ) :
                        (
                            <span className="text-success"> 
                                {currencyFormatter.format(this.state.saldo, {locale:'pt-BR'})}
                            </span>
                        )
                    }</div>
                </div>
                <hr className="my-2"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <Button label="Cadastrar Usuário" icon="pi pi-users" style={{margin:2}} onClick={ e => this.props.history.push('/cadastro-usuarios')}></Button>
                    <Button label="Lançamentos" icon="pi pi-money-bill" style={{margin:2}} onClick={ e => this.props.history.push('/consulta-lancamentos')} className="p-button-danger"></Button>
                </p>
            </div>
        )
    }
}
// acessar contexto do Provedor de Autenticacao
Home.contextType = AuthContext
export default withRouter(Home)
