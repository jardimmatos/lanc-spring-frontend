import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService{
    
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

    validar(usuario){
        const erros = []

        if (!usuario.nome){
            erros.push("O campo Nome é obrigatório.")
        }
        if (!usuario.email){
            erros.push("O campo E-mail é obrigatório.")
        } else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push("Informe um e-mail válido")
        }
        
        if(!usuario.senha || !usuario.senha2){
            erros.push("Digite a senha 2x")
        }else if( usuario.senha !== usuario.senha2){
            erros.push("Senhas não conferem")
        }
        
        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}

export default UsuarioService