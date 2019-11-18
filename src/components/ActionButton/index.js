import React from 'react';
import './styles.css';

import addImage from '../../assets/plus.svg';
import removeImage from '../../assets/error.svg';

export default function ActionButton(props) {
	const { saved, movie } = props;
	return (
		<>
			{/* O método onClick recebe uma função de callback que vem do componente MovieCard */}
			{/* A função que vem do MovieCard por sua vez, vem das páginas movies/search */}
			{/* A função é acionada na ordem: onClick -> MovieCard -> Page */}
			
			{!saved &&
			<button className="action-button" onClick={() => props.addMovie(movie)} >
				<img src={addImage} alt=""/>
			</button>
			}

			{saved &&
			<button className="action-button" onClick={() =>  props.removeMovie(movie)} >
				<img src={removeImage} alt=""/>
			</button>
			}
		</>
	);
}
