import React, { Component } from 'react';
import './styles.css';

export default class TextField extends Component {
	
	render() {
		const { parentFunction, placeHolder } = this.props;

		return(
			<input onChange={parentFunction} name="search" type="text" id="search-input" placeholder={placeHolder}></input>
		);
	}
}
