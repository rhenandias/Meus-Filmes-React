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
		search_results: [],		// Resultados da busca por filmes
		find_trigger: false,	// Formulário de busca acionado? Evita "NoResults" na tela mesmo sem ter pesquisado por nada
		loading: false,			// Busca iniciada, loading até aparecer ou não resultados
		search_term: '',		// Termo de busca no input dentro do TextField
		movies: [],				// Lista de filmes salvos no localStorage
	};

	componentDidMount(){
		// Busca lista de filmes salvos no local storage, e atualiza o state
		this.update_state();
	};

	search = async (event) => {
		event.preventDefault();

		// Busca Iniciada
		// find_trigger: o formulário de busca foi acionado
		// loading: trigger de busca iniciada
		this.setState({
			search_results: [],
			find_trigger: false,
			loading: true,
		});

		// Adquire o termo de busca
		// O termo de busca está sendo atualizado no state conforme o input aciona o event "onChange"
		// Verificar o elemento TextField na organização do render
		// Para isso, foi passado para o TextField a função de callback para o event onChange
		const { search_term } = this.state;

		// Configura parâmetros da busca
		const params = {
			term: search_term,
			country: "BR",
			media: "movie",
		}

		// Handler para a API de busca de filmes
		// Esse trecho é necessário pois na página de search é realizada uma busca por parâmetros com um "api search"
		// Entretanto, na página de info, a busca é realizada por ID com um "api lookup"
		const results = await api.get_by_params(params);

		// Insere resultados da busca no state
		results.forEach(res => {
			this.setState(prevState => ({
				search_results: [...prevState.search_results, res],
			}));
		});		

		// Busca finalizada
		// find_trigger: trigger de busca finalizada
		// loading: trigger de busca iniciada
	 	this.setState({
	 		find_trigger: true,
	 		loading: false,
		 });
	}

	// Função de callback para lidar com o "event onChange" do input dentro do TextField
	// Quando o texto é alterado no input, é chamada essa função para atualizar o termo de busca no state
	search_field_change = (event) => {
		this.setState({
			search_term: event.target.value,
		});
	};

	// Função para realizar a leitura de filmes salvos no localStorage e atualizar 
	update_state(){
		let my_movies = storageManager.read_storage();

		this.setState({
			movies: my_movies,
		});
	}

	// Função para verificar se um filme está presente na lista de filmes salvos
	// Busca pelo "movie" na array "saved_movies" e retorna true ou false
	contains(saved_movies, movie){
		for(const index in saved_movies){
			if(saved_movies[index].id === movie.id){
				return true;
			}
		}
		return false;
	}

	// Chama o storageManager para adicionar um filme à lista
	add_movie(movie){
		storageManager.add_movie(movie);
		this.update_state();
	}
	
	// Chama o storageManager para remover um filme da lista
	remove_movie(movie){
		storageManager.remove_movie(movie);
		this.update_state();
	}

	render() {
		
		const { search_results, find_trigger, loading } = this.state;

		return (
			<div className="search-page-div">

				{/* Cabeçalho com troca de páginas */}
				<Header />

				{/* Formulário de busca */}
				{/* Dentro do textfield, passar a função de callback para o evento "onChange" do input */}
				<div className="search-form-div">
					<form className="search-form" onSubmit={this.search}>
						<TextField parentFunction={this.search_field_change} placeHolder={"Procurar por um filme..."}/>
						<SearchButton />
					</form>
				</div>
				
				{/* Carregando resultados */}
				{ loading && <Loading />}

				{/* Nenhum resultado encontrado */}
				{ search_results.length===0 && find_trigger && <div className="no-result-div"><NoResults /></div> }

				{/* Exibe Cards com os resultados */}
				{/* Passar para o MovieCard o status saved do filme que está sendo inserido */}
				{/* addMovie e removeMovie precisam ser passados como arrow function com paramêtro do filme */}
				{/* isso é necessário pois caso contrário o callback perde a referencia do this e do parâmetro */}
				<div className="search-results">
					{search_results.map(movie => (
						<MovieCard 	key={movie.id} movie={movie} 
									saved={this.contains(this.state.movies, movie)}
									addMovie    ={() => this.add_movie(movie)   }
									removeMovie ={() => this.remove_movie(movie)}/>
					))}
				</div>
			</div>
		);
	}
}
