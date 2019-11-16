import React, { Component } from 'react';
import './styles.css';

//Components
import Header from '../../components/Header';
import Age from '../../components/Age';
import Loading from '../../components/Loading';
import NoResults from '../../components/NoResults';

//Util
import api from '../../services/api';

export default class Info extends Component {
	state = {
		movie: [],
		loading: false,
		finded: false,
	};

	async componentDidMount() {
		//Adquire rota atual
		const current_id = window.location.pathname.substring(7);

		// Aciona trigger de carregando, busca iniciada 
		this.setState({
			loading: true,
		});

		// Executa requisição à api
		// const searchHandler = new getMovie();
		const result = await api.get_by_id(current_id);

		// Requisição completa, retira trigger de carregando, busca finalizada
		this.setState({
			loading: false,
		});

		// Verifica se foi encontrado algum resultado
		if (result){
			this.setState({
				finded: true,
			});
		} else return;

		// Carrega state com o resultado encontrado
		this.setState({
			movie: result,
		})
	};

	render() {
		const { title, director, genre, year, duration, age, poster_url, description} = this.state.movie;
		const { loading, finded } = this.state;

		return (
			<div className="info-div">	
				<Header />
				
				{/* Carregando resultados */}
				{ loading && <Loading />}

				{/* Nenhum resultado encontrado */}
				{!loading && !finded && <NoResults />}

				{/* Resultado encontrado  */}
				{!loading && finded &&
				<div className="info-card-div">
					<div className="info-movie-title">
						<strong>{title}</strong>
					</div>
					<div className="info-movie-info">
						<p><b>Direção:</b> {director}</p>
						<p><b>Gênero:</b> {genre}</p>
						<p><b>Lançamento:</b> {year}</p>
						<p><b>Duração:</b> {duration}</p>
						<article>
							<p><b>Classificação indicativa:</b></p><Age age={age} />
						</article>
					</div>
					<div className="info-movie-poster">
						<img src={poster_url} alt=""/>
					</div>
					<div className="info-movie-description">
						<p>{description}</p>
					</div>
				</div>
				}
			</div>
		);
	}
}
