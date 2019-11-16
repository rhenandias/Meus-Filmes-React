import React, { Component } from 'react';
import './styles.css';

import Header from '../../components/Header';
import MovieCard from '../../components/MovieCard';
import Loading from '../../components/Loading';

import storageManager from '../../services/storageManager';

export default class Movies extends Component {

	state = {
		movies: [],
		loading: false,
	};
	
	componentDidMount(){
		// Trigger de inicio de carregamento da lista de filmes
		this.setState({
			loading: true,
		});
		
		// Busca lista de filmes salvos no local storage
		this.update_state();

		// Carregamento concluido
		this.setState({
			loading: false, 
		});
	}

	remove_movie(movie){
		storageManager.remove_movie(movie);
		this.update_state();
	}

	update_state(){
		let my_movies = storageManager.read_storage();
		this.setState({
			movies: my_movies,
		});
	}

	contains(saved_movies, movie){
		for(const index in saved_movies){
			if(saved_movies[index].id === movie.id){
				return true;
			}
		}
		return false;
	}

	render() {
		const { movies, loading } = this.state;

		return (
			<div className="movies-page-div">
				{/* Header de navegação entre páginas */}
				<Header /> 

				{/* Carregando lista de filmes salvos */}
				{ loading && <Loading />}

				{/* Exibe Cards com filmes salvos */}
				<div className="saved-movies">
					{movies.map(movie => (
						<MovieCard 	key={movie.id} movie={movie} 
									saved={this.contains(this.state.movies, movie)}
									addMovie={() => this.add_movie(movie)}
									removeMovie={() => this.remove_movie(movie)}/>
					))}
				</div>
			</div>
		);
	};
}
