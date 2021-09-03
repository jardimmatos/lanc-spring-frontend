import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

class LancamentoService extends ApiService{
    
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return  [
			{ descricao: 'Selecione...', id:'' },
			{ descricao: 'Janeiro', id:1 },
			{ descricao: 'Fevereiro', id:2 },
			{ descricao: 'Março', id:3 },
			{ descricao: 'Abril', id:4 },
			{ descricao: 'Maio', id:5 },
			{ descricao: 'Junho', id:6 },
			{ descricao: 'Julho', id:7 },
			{ descricao: 'Agosto', id:8 },
			{ descricao: 'Setembro', id:9 },
			{ descricao: 'Outubro', id:10 },
			{ descricao: 'Novembro', id:11 },
			{ descricao: 'Dezembro', id:12 }
		]
    }

    obterTiposLancamentos(){
        return [
			{ descricao: 'Selecione', id:'' },
			{ descricao: 'Despesa', id:'DESPESA' },
			{ descricao: 'Receita', id:'RECEITA' }
		]
    }

    consultar(filtro){
        let params = `?ano=${filtro.ano}`
        if(filtro.mes){
            params = `${params}&mes=${filtro.mes}` 
        }
        if(filtro.descricao){
            params = `${params}&descricao=${filtro.descricao}` 
        }
        if(filtro.tipo){
            params = `${params}&tipo=${filtro.tipo}` 
        }
        if(filtro.status){
            params = `${params}&status=${filtro.status}` 
        }
        if(filtro.usuario){
            params = `${params}&usuario=${filtro.usuario}` 
        }
        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    salvar(lancamento){
        return this.post('/', lancamento)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}` , lancamento)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.ano)
            erros.push("Informe o ano")
        if(!lancamento.descricao)
            erros.push("Informe a descrição")
        if(!lancamento.valor)
            erros.push("Informe o valor")
        if(!lancamento.tipo)
            erros.push("Informe o tipo")
        if(!lancamento.mes)
            erros.push("Informe o mês")

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualizar-status`, {status} ) //{status:status}
    }

}

export default LancamentoService