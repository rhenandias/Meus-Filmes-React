import React from 'react';
import './styles.css';

import loading from '../../assets/loading.svg';

export default function Loading() {
	return (
		<div className="loading-div">
			<img src={loading} alt="Carregando conteúdo"/>
		</div>
	);
}
