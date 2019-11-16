import React, { Component } from 'react';
import './styles.css';

import add_img from '../../assets/plus.svg';
import remove_img from '../../assets/error.svg';

export default class ActionButton extends Component {
	
	render() {
		const { saved } = this.props;

		return (	
			<div>
				{/* O método onClick recebe uma função de callback que vem do MovieCard */}
				{/* A função que vem do MovieCard por sua vez, vem da página movies/search */}
				{/* A função é acionada na ordem: onClick -> MovieCard -> page */}
				
				{/* Filme não salvo, action button de adicionar filme */}
				{!saved &&
				<button className="action-button" onClick={() => this.props.addMovie(this.props.movie)} >
					<img src={add_img} alt=""/>
				</button>
				}

				{/*  Filme salvo, action button de remover filme */}
				{saved &&
				<button className="action-button" onClick={() =>  this.props.removeMovie(this.props.movie)} >
					<img src={remove_img} alt=""/>
				</button>
				}
			</div>
			
		);
	}
}
