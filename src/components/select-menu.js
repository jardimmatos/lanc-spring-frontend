import React from 'react'


function SelectMenu(props){
    const options = props.lista.map((option, index) => {
        return(
            <option value={option.id} key={index}>{option.descricao}</option>
        )
    })
    return(
        <select {...props}>
            {options}
        </select>
    )
}

export default SelectMenu