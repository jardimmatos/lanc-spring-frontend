import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
//import LocalStorageService from '../app/service/localStorageService'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'
import { Button } from 'primereact/button';
import {withRouter} from 'react-router-dom'
import { AuthContext } from '../main/provedorAutenticacao'
class Login extends React.Component{

    constructor(){
        super()
        this.service = new UsuarioService();
    }

    state = {
        email:'email@email.com',
        senha:'123456',
    }
    componentDidMount(){
        //Após componente ser montado
        //this.props.history.push('/')
    }
    
    entrar = () =>{

        // foi definido o CORS no backend na class principal *Application
        this.service.autenticar({ email:this.state.email, senha: this.state.senha})
        .then(response => {
            console.log(response.data)
                //ao logar, salvar usuário autenticado
                this.context.iniciarSessao(response.data)
                // LocalStorageService.adicionarItem('_usuario_logado',response.data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                mensagemErro(error.response.data)
            })
            .finally()
        }
        
        prepareCadastrar = () => {
            //navegar entre rotas
            this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(
            <div>
                <div className="">
                    <div className="row">
                        <div className="col-md-6" style={ {position: "relative", left: "300px"} }>
                            <div className="bs-docs-section">
                                <Card title="Login">
                                    <div className="row">
                                        <div className="col-lg-12">
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="bs-component">
                                                <form>
                                                    <fieldset>
                                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                            <input type="email" 
                                                                value={this.state.email} onChange={ e => this.setState({email:e.target.value})}
                                                                className="form-control" 
                                                                id="exampleInputEmail1" 
                                                                aria-describedby="emailHelp" 
                                                                placeholder="Digite o Email"/>
                                                        </FormGroup>

                                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                            <input type="password" 
                                                                value={this.state.senha} onChange={ e => this.setState({senha:e.target.value})}
                                                                className="form-control" 
                                                                id="exampleInputPassword1" 
                                                                placeholder="Password"/>
                                                        </FormGroup>
                                                        <hr/>
                                                        <Button label="Acesso" onClick={this.entrar} 
                                                            className="p-button-success" icon="pi pi-sign-in"/>
                                                        <Button label="Cadastrar" onClick={this.prepareCadastrar} 
                                                            className="p-button-secondary" icon="pi pi-users"/>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// acessar o contexto do ProviderAutenticacao (somente para componentes de classe)
Login.contextType = AuthContext
export default withRouter(Login)