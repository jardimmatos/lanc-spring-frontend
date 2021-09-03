import React from "react";

//import Login from "../views/login";
//import CadastroUsuario from "../views/cadastro-usuario";
import Rotas from './rotas'
import 'bootswatch/dist/flatly/bootstrap.css';
import "../assets/css/custom.min.css";
import NavBar from '../components/navbar'

import 'primereact/resources/themes/fluent-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


//js do Toastr
import 'toastr/build/toastr.min.js'

//css do Toastr
import 'toastr/build/toastr.css'
import ProvedorAutenticacao from "./provedorAutenticacao";

class App extends React.Component{
	
    render(){
		return(
			<ProvedorAutenticacao>
				<NavBar/>
				<div className="container">
					<Rotas/>
				</div>
			</ProvedorAutenticacao>
		)
    }
}
export default App;
