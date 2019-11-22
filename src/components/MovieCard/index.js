import React from 'react';
import './styles.css';

import InfoButton from '../../components/InfoButton';
import ActionButton from '../../components/ActionButton';
import Age from '../../components/Age';

export default function MovieCard(props) {

	// TODO: alterar todos os posterUrl para a imagem não quebrar
	const { id, posterUrl, title, director, genre, duration, age, year } = props.movie;
	const { saved } = props;

	return (
		<div className="movie-card" key={id}>
			
			<div className="movie-poster">	
				<img src={posterUrl} alt="Poster de divulgação do filme"/>
			</div>

			<div className="movie-info-hold">
				<div className="result-title">
					<strong>{title}</strong>
				</div>
				<div className="result-info">
					<p> <b>Direção:</b> {director}</p>
					<p> <b>Gênero:</b> {genre}</p>
					<article>
						<p> {year} <b>•</b> {duration} <b>•</b> </p>
						<Age age={age} />
					</article>
				</div>
				
				{/* addMovie/removeMovie são callbacks recebidos da Page, que serão passados ao ActionButton */}
				{/* Rota dos callbacks: Page -> MovieCard -> ActionButton */}
				{/* addMovie/removeMovie precisam ser passados como arrow function */}
				{/* isso é necessário pois caso contrário o callback perde a referencia do this*/}
				<div className="action-buttons">
					<InfoButton id={id}/>
					<ActionButton 	movie       ={ props.movie } 
					                saved       ={ saved }
									addMovie    ={ () => props.addMovie()    }
									removeMovie ={ () => props.removeMovie() }/>
				</div>
			</div>
		</div>
	)
}
