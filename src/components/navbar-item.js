import React from 'react'

function NavBarItem({render, ...props} ){
    if(render){
        return(
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.link}>{props.label}</a>
            </li>
        )
    } else{
        // não renderiza nada
        return false
    }
}

export default NavBarItem