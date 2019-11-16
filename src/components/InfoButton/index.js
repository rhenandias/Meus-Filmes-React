import React, { Component } from 'react';
import './styles.css';

import  { Link } from 'react-router-dom';

import info_img from '../../assets/info.svg';

export default class InfoButton extends Component {
	render() {
		return (
			<Link className="link-info-button" to={ `/movie/${this.props.id}`}>
				<button className="info-button">
					<img src={info_img} alt="Informações sobre o filme"/>
				</button>
			</Link>	
		);
	}
}
