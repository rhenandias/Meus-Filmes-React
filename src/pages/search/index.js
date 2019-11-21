import React, { Component } from 'react';
import './styles.css';

//Components
import Header from '../../components/Header'
import TextField from '../../components/TextField';
import SearchButton from '../../components/SearchButton';
import NoResults from '../../components/NoResults';
import Loading from '../../components/Loading';
import MovieCard from '../../components/MovieCard';

//Util
import api from '../../services/api';
import storageManager from '../../services/storageManager';

//Assets	

export default class Search extends Component {

	state = {
		searchResults: [],		// Resultados da busca por filmes
		findTrigger: false,		// Formulário de busca acionado? Evita "NoResults" na tela mesmo sem ter pesquisado por nada
		loading: false,			// Busca iniciada, loading até aparecer ou não resultados
		searchTerm: '',			// Termo de busca no input dentro do TextField
		movies: [],				// Lista de filmes salvos no localStorage
	};

	componentDidMount(){
		this.updateState();
	};

	// Função para realizar a leitura de filmes salvos no localStorage e atualizar o state
	updateState(){
		let myMovies = storageManager.readStorage();
		this.setState({
			movies: myMovies,
		});
	}

	search = async (event) => {
		event.preventDefault();

		// Busca Iniciada
		// findTrigger: o formulário de busca foi acionado
		// loading: trigger de busca iniciada
		this.setState({
			searchResults: [],
			findTrigger: false,
			loading: true,
		});

		// Adquire o termo de busca
		// O termo de busca está sendo atualizado no state conforme o input aciona o event "onChange"
		// Para isso, foi passado para o TextField a função de callback para o event onChange
		const { searchTerm } = this.state;

		// Configura parâmetros da busca
		const params = {
			term: searchTerm,
			country: "BR",
			media: "movie",
		}

		// Handler para a API de busca de filmes
		// Esse trecho é necessário pois na página de search é realizada uma busca por parâmetros com um "api search"
		// Entretanto, na página de info, a busca é realizada por ID com um "api lookup"
		const results = await api.getByParams(params);

		// Insere resultados da busca no state
		results.forEach(res => {
			this.setState(prevState => ({
				searchResults: [...prevState.searchResults, res],
			}));
		});		

		// Busca finalizada
		// findTrigger: trigger de busca finalizada
		// loading: trigger de busca iniciada
	 	this.setState({
	 		findTrigger: true,
	 		loading: false,
		 });
	}

	// Função de callback para lidar com o "event onChange" do input dentro do TextField
	// Quando o texto é alterado no input, é chamada essa função para atualizar o termo de busca no state
	searchFieldChange = (event) => {
		this.setState({
			searchTerm: event.target.value,
		});
	};

	// Busca pelo "movie" na array "savedMovies"
	contains(savedMovies, movie){
		for(const index in savedMovies){
			if(savedMovies[index].id === movie.id){
				return true;
			}
		}
		return false;
	}

	addMovie(movie){
		storageManager.addMovie(movie);
		this.updateState();
	}
	
	removeMovie(movie){
		storageManager.removeMovie(movie);
		this.updateState();
	}

	render() {
		
		const { searchResults, findTrigger, loading } = this.state;

		return (
			<div className="search-page-div">

				{/* Cabeçalho com troca de páginas */}
				<Header page={'search'}/>

				{/* Formulário de busca */}
				{/* Dentro do textfield, passar a função de callback para o evento "onChange" do input */}
				<div className="search-form-div">
					<form className="search-form" onSubmit={this.search}>
						<TextField parentFunction={this.searchFieldChange} placeHolder={"Procurar por um filme..."}/>
						<SearchButton />
					</form>
				</div>
				
				{/* Carregando resultados */}
				{ loading && <Loading />}

				{/* Nenhum resultado encontrado */}
				{ searchResults.length===0 && findTrigger && <div className="no-result-div"><NoResults /></div> }

				{/* Exibe Cards com os resultados */}
				{/* Passar para o MovieCard o status saved do filme que está sendo inserido */}
				{/* addMovie e removeMovie precisam ser passados como arrow function com paramêtro do filme */}
				{/* isso é necessário pois caso contrário o callback perde a referencia do this e do parâmetro */}
				<div className="search-results">
					{searchResults.map(movie => (
						<MovieCard 	key			={movie.id} 
									movie		={movie} 
									saved		={this.contains(this.state.movies, movie)}
									addMovie    ={() => this.addMovie(movie)   }
									removeMovie ={() => this.removeMovie(movie)}/>
					))}
				</div>
			</div>
		);
	}
}
