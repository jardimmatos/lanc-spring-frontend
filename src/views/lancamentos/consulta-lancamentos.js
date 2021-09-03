import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import Home from '../../views/home'
import SelectMenu from '../../components/select-menu'
import LancamentosTable from './lancamentos-table'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'


class ConsultaLancamentos extends React.Component{
	constructor(){
		super()
		this.service = new LancamentoService()
	}

	state = {
		ano:new Date().getFullYear().toString(),
		mes:'',
		status:'',
		descricao:'',
		tipo:'',
		lancamentos:[],
		showConfirmDialog:false,
		lancamentoDeletar:{}
	}

	buscar = () => {
		if(!this.state.ano){
			messages.mensagemErro("Ano é obrigatório!")
			return false
		}
		const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
		const filtro = {
			ano:this.state.ano,
			mes:this.state.mes,
			status:this.state.status,
			descricao:this.state.descricao,
			tipo:this.state.tipo,
			usuario: usuarioLogado.id
		}
		this.service.consultar(filtro)
			.then( response =>{
				const lista = response.data
				if(lista.length <= 0){
					messages.mensagemAlerta("Nenhum resultado encontrado!")
				}
				this.setState({lancamentos: lista})
			}).catch( error =>{
				messages.mensagemErro(error.response.data)
			})
	}

	editar = (id) => {
		this.props.history.push(`/cadastro-lancamentos/${id}`)
	}
	abrirConfirmacao = (lancamento) => {
		console.log(lancamento)
		this.setState({showConfirmDialog:true, lancamentoDeletar:lancamento})
	}
	//recebe todo o objeto para não realizar uma nova requisição após excluir, e assim pode-se apenas excluir o objeto do array de lancamentos
	deletar = () => {
		this.service
			.deletar( this.state.lancamentoDeletar.id )
			.then( response => {
				//recebe todos os lancamentos
				const lancamentos = this.state.lancamentos
				//recupera o index do lancamento excluido
				const index= lancamentos.indexOf(this.state.lancamentoDeletar)
				//exclui o lancamento pelo seu indice no array de lancamentos
				lancamentos.splice(index,1)
				//atualiza os lancamentos após a remoção
				this.setState(lancamentos)
				messages.mensagemSucesso("Lançamento excluído com sucesso")
				this.fecharConfirmDialog()
			}).catch( error => {
				messages.mensagemErro("Falha ao deletar lançamento")
				console.error( error.response )
			})
	}

	fecharConfirmDialog = () =>{
		this.setState( { showConfirmDialog:false, lancamentoDeletar:{} })
	}

	preparaFormularioCadastro = () =>{
		this.props.history.push('/cadastro-lancamentos')
	}

	alterarStatus = (lancamento, status) => {
		this.service.alterarStatus(lancamento.id, status)
			.then( response => {
				//Atualizar o lancamento alterado sem realizar requisição
				//recupera todos os lançamentos
				const lancamentos = this.state.lancamentos;
				//recupera o index do lançamento a ser alterado sobre todos os lançamentos
				const index = lancamentos.indexOf(lancamento);
				//Se o lancamento existir e for encontrado no array
				if (index !== -1){
					//atualizar (manualmente) o status do lançamento
					lancamento['status'] = status;
					//atualizar o lancamento alterado na possição do array
					lancamentos[index] = lancamento;
				}
				// atualiar todos os lancamentos no state
				this.setState({lancamentos})
				messages.mensagemSucesso("Status atualizado com sucesso.")
			}).catch( error => {
				messages.mensagemErro(error.response.data)

			})
	}
	render(){
		const listaMeses = this.service.obterListaMeses()
		const tipos = this.service.obterTiposLancamentos()

		const confirmDialogFooter = (
			<div>
				<Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} className="p-button-info"></Button>
				<Button label="Cancelar" icon="pi pi-times" onClick={this.fecharConfirmDialog}></Button>
			</div>
		)
		
    	return(
			<Card title="Consulta Lançamento">
				<div className="row">
					<div className="col-lg-6">
						<div className="bs-component">
							<form>
								<fieldset>
									<FormGroup htmlFor="inputDescricao" label="Descrição: ">
										<input type="text" className="form-control" id="inputDescricao" 
											value={this.state.descricao}
											onChange={ e => this.setState({descricao:e.target.value}) }
											laceholder="Informe a descrição"/>
									</FormGroup>
									<FormGroup htmlFor="inputAno" label="Ano: *">
										<input type="text" className="form-control" id="inputAno" 
											value={this.state.ano}
											onChange={ e => this.setState({ano:e.target.value}) }
											laceholder="Digite o Ano"/>
									</FormGroup>
									<FormGroup htmlFor="inputMes" label="Mês: ">
										<SelectMenu className="form-control" id="inputMes" 
											value={this.state.mes}
											onChange={ e => this.setState({mes:e.target.value}) }
											lista={listaMeses}></SelectMenu>
									</FormGroup>
									<FormGroup htmlFor="inputTipoLancamento" label="Tipo Lançamento: ">
										<SelectMenu className="form-control" id="inputTipoLancamento" 
											value={this.state.tipo}
											onChange={ e => this.setState({tipo:e.target.value}) }
											lista={tipos}></SelectMenu>
									</FormGroup>
									<hr/>
									<Button label="Buscar" icon="pi pi-search" 
										style={{margin:2}} onClick={this.buscar} 
										className="p-button-info"/>
									<Button label="Cadastrar" icon="pi pi-plus" 
										style={{margin:2}} onClick={this.preparaFormularioCadastro}/>
								</fieldset>
							</form>
						</div>
  					</div>
					<div className="col-lg-6">
						<Home/>
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-md-12">
						<div className="bs-component">
							<LancamentosTable lancamentos={this.state.lancamentos}
								deleteAction={this.abrirConfirmacao}
								editAction={this.editar}
								alterarStatus={this.alterarStatus}
							/>
						</div>
					</div>
				</div>
				<div>
					<Dialog 
						header="Excluir Lançamento" 
						visible={this.state.showConfirmDialog} 
						style={{ width: '50vw' }} 
						modal={true}
						footer={confirmDialogFooter}
						onHide={ () => this.setState( { showConfirmDialog:false } ) }>
						<p>Confirma a exclusão deste lançamento?</p>
					</Dialog>
				</div>
			</Card>
    	)
  	}
}

export default withRouter(ConsultaLancamentos) //permitir navegação

