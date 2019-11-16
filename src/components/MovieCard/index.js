import React, { Component } from 'react';
import './styles.css';

import InfoButton from '../../components/InfoButton';
import ActionButton from '../../components/ActionButton';
import Age from '../../components/Age';

export default class MovieCard extends Component {
	
	render() {
		const { id, poster_url, title, director, genre, duration, age, year } = this.props.movie;
		const { saved } = this.props;

		return (
			<div className="movie-card" key={id}>
				<div className="movie-poster">	
					<img src={poster_url} alt=""/>
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
					
					{/* addMovie e removeMovie precisam ser passados como arrow function */}
					{/* isso é necessário pois caso contrário o callback perde a referencia do this*/}
					<div className="action-buttons">
						<InfoButton id={id}/>
						<ActionButton 	movie={this.props.movie} saved={saved}
										addMovie    ={() => this.props.addMovie()    }
										removeMovie ={() => this.props.removeMovie()}/>
					</div>
				</div>
			</div>
		);
	}
}
