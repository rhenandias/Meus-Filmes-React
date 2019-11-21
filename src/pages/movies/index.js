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
		this.updateState();

		// Carregamento concluido
		this.setState({
			loading: false, 
		});
	}

	// Executa a leitura de filmes do storage, e carrega no state
	updateState(){
		let myMovies = storageManager.readStorage();
		this.setState({
			movies: myMovies,
		});
	}

	removeMovie(movie){
		storageManager.removeMovie(movie);
		this.updateState();
	}

	// Procura por "movie" na array "savedMovies"
	contains(savedMovies, movie){
		for(const index in savedMovies){
			if(savedMovies[index].id === movie.id){
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
				<Header page={'movies'}/> 

				{/* Carregando lista de filmes salvos */}
				{ loading && <Loading />}

				{/* Exibe Cards com filmes salvos */}
				<div className="saved-movies">
					{movies.map(movie => (
						<MovieCard 	key         ={movie.id} 
						            movie       ={movie} 
									saved       ={this.contains(this.state.movies, movie)}
									removeMovie ={() => this.removeMovie(movie)}/>
					))}
				</div>
			</div>
		);
	};
}
