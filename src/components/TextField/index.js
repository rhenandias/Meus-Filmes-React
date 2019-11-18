import React from 'react';
import './styles.css';

export default function TextField(props) {
	// parentFunction é uma função de callback recebida do componente Parent
	// A ideia é deixar o TextField multipropósito, então o componente apenas chama o callback
	// O callback deve lidar como o evento "onChange" do input 
	const { parentFunction, placeHolder } = props;
  	return (
		<input onChange={parentFunction} 
			   name="search" type="text" id="search-input" 
			   placeholder={placeHolder}>
		</input>
  	)
}

