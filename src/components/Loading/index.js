import React, { Component } from 'react';
import './styles.css';

import loading from '../../assets/loading.svg';

export default class Loading extends Component {
  render() {
	return (
		<div className="loading-div">
			<img src={loading} alt=""/>
		</div>
	);
  }
}
