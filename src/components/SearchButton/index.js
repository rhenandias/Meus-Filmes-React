import React, { Component } from 'react';
import './styles.css';

import search_icon from '../../assets/search2.svg'

export default class SearchButton extends Component {
	render() {
		return(
			<button className="search-button" >
				<img id="search-movie-icon" src={search_icon} alt=""/>
			</button>		
		);
	}
}
