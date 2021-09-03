import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
//import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

class CadastroLancamentos extends React.Component{
    
    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then( response => {
                    this.setState({...response.data, atualizar:true})
                }).catch( error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }

    state = {
        id:null,
        descricao:'',
        valor:'',
        mes:'',
        ano:'',
        tipo:'',
        status:'PENDENTE',
        usuario:null,
        atualizar:false

    }


    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, id, usuario } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, status, id, usuario };
        this.service
            .atualizar(lancamento)
            .then( response => {
                messages.mensagemSucesso("Lançamento atualizado com sucesso.")
                this.props.history.push('/consulta-lancamentos')
            }).catch( error => {
                messages.mensagemErro(`Falha na criação do lançamento! `+error.response.data)
            })
    }
    
    buscar = () => {
        this.props.history.push('/consulta-lancamentos')
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }
    cancelar = ()=>{
        this.props.history.push('/consulta-lancamentos')
    }
    submit = () => {
        
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario:usuarioLogado.id };
        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach( msg => messages.mensagemErro(msg))
            
            return false
        }
        this.service.salvar(lancamento)
            .then( response => {
                messages.mensagemSucesso("Lançamento criado com sucesso.")
                this.props.history.push('/consulta-lancamentos')
            }).catch( error => {
                messages.mensagemErro(`Falha na criação do lançamento! `+error.response.data)
            })
    }

    render(){
        const tipos = this.service.obterTiposLancamentos();
        const meses = this.service.obterListaMeses();
        return(
            <Card title={ this.state.atualizar ? "Alteração de lançamento" : "Cadastro Lançamento"}>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                            <input type="text" 
                                name="descricao" 
                                value={this.state.descricao}
                                onChange={this.handleChange}
                                className="form-control" id="inputDescricao"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text" 
                                name="ano" 
                                value={this.state.ano}
                                onChange={this.handleChange}
                                className="form-control" id="inputAno"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu lista={meses} 
                                name="mes" 
                                value={this.state.mes}
                                onChange={this.handleChange}
                                className="form-control" id="inputMes"></SelectMenu>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input type="text" 
                                name="valor" 
                                value={this.state.valor}
                                onChange={this.handleChange}
                                className="form-control" id="inputValor"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu lista={tipos} 
                                name="tipo" 
                                value={this.state.tipo}
                                onChange={this.handleChange}
                                className="form-control" id="inputTipo"></SelectMenu>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: *">
                            <input type="text" className="form-control" 
                                name="status" 
                                value={this.state.status}
                                id="inputStatus" disabled/>
                        </FormGroup>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.atualizar ?
                            (
                                <Button label="Alterar" onClick={this.atualizar} className="p-button-info" icon="pi pi-refresh" />
                            ) : (
                                <Button label="Salvar" onClick={this.submit} className="p-button-success" icon="pi pi-save"/>
                            )
                        }
                        <Button label="Cancelar" onClick={this.cancelar} className="p-button-danger" icon="pi pi-times"/>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)