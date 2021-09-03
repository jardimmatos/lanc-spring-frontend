import React from 'react'
import currencyFormatter from 'currency-formatter'
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

function LancamentosTable(props){
    const rows = props.lancamentos.map( (item,index) => {
        return (
            <tr key={index}>
                <td>{item.descricao}</td>
                <td>{currencyFormatter.format(item.valor, {locale:'pt-BR'})}</td>
                <td>
                    {item.tipo === 'RECEITA' ? (<Tag value={item.tipo} icon="pi pi-caret-up" severity="success" />): '' }
                    {item.tipo === 'DESPESA' ? (<Tag value={item.tipo} icon="pi pi-caret-down" severity="danger" />): '' }
                </td>
                <td>{item.mes}</td>
                <td>
                    {item.status === 'EFETIVADO' ? (<Tag value={item.status} icon="pi pi-check" severity="success" />) :''}
                    {item.status === 'PENDENTE' ? (<Tag value={item.status} icon="pi pi-info-circle" severity="warning" />) :''}
                    {item.status === 'CANCELADO' ? (<Tag value={item.status} icon="pi pi-times" severity="danger" />) :''}
                </td>
                <td>
                    <Button 
                        className="p-button-info p-button-sm p-button-rounded" tooltip="Efetivar" tooltipOptions={{position: 'top'}}
                        icon="pi pi-check" disabled={['CANCELADO','PENDENTE'].indexOf(item.status) === -1 }
                        onClick={ e => props.alterarStatus(item, 'EFETIVADO') } />
                    <Button 
                        className="p-button-danger p-button-sm p-button-rounded" tooltip="Cancelar"  tooltipOptions={{position: 'top'}}
                        icon="pi pi-times" disabled={['EFETIVADO','PENDENTE'].indexOf(item.status) === -1 }
                        onClick={ e => props.alterarStatus(item, 'CANCELADO') } />
                    <Button 
                        className="p-button-primary p-button-sm p-button-rounded" tooltip="Alterar"  tooltipOptions={{position: 'top'}}
                        icon="pi pi-pencil" 
                        onClick={ e => props.editAction(item.id) } />
                    <Button 
                        className="p-button-danger p-button-sm p-button-rounded" tooltip="Excluir"  tooltipOptions={{position: 'top'}}
                        icon="pi pi-trash" 
                        onClick={ e => props.deleteAction(item) } />
                </td>
            </tr>
        )
    })
    
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable