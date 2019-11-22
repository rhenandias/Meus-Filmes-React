import React from 'react';
import './styles.css';

import searchIcon from '../../assets/search2.svg'

export default function SearchButton() {
	return (
		<button className="search-button" >
			<img id="search-movie-icon" src={searchIcon} alt="Imagem de uma lupa, pesquisar"/>
		</button>	
	);
}
