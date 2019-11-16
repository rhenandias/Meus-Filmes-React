import React, { Component } from 'react';
import './styles.css';

import warning from '../../assets/warning.svg'

export default class NoResults extends Component {
  render() {
	return (
		<div className="no-results-card">
			<img src={warning} alt=""/>
			<strong>Oh não! :(</strong>
			<p>Nenhum resultado encontrado para esse filme ...</p>
		</div>
	);
  }
}
