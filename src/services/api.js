import axios from 'axios';

class api {
	// A classe api é responsável por realizar a busca na Itunes API
	
	// A baseURL do sistema deve passar pelo CORS Anywhere
	constructor(){
		this.baseURL = "https://cors-anywhere.herokuapp.com/";
	}
	
	// Utilidade: converter a data fornecida pelo itunes para utilizar os valores necessários
	convertMS( milliseconds ) {
		var day, hour, minute, seconds;
		seconds = Math.floor(milliseconds / 1000);
		minute = Math.floor(seconds / 60);
		seconds = seconds % 60;
		hour = Math.floor(minute / 60);
		minute = minute % 60;
		day = Math.floor(hour / 24);
		hour = hour % 24;
		return {
			day: day,
			hour: hour,
			minute: minute,
			seconds: seconds
		};
	}

	// Extrai as informações relevantes sobre um filme, dado um resultado de busca
	get_movie_info(res) {
		// Manipulações necessárias para a duração do filme
		let dur = this.convertMS(res.trackTimeMillis);
		let dur_string = `${dur.hour}h${dur.minute}min`;

		// Manipulações necessárias para o poster do filme
		let poster_url = res.artworkUrl100;
		let first_part = poster_url.slice(0, poster_url.length - 13);
		poster_url = first_part + `150x150bb.jpg`;

		// Dados relevantes
		let return_movie = {
			id: res.trackId,
			title: res.trackName,
			director: res.artistName,
			genre: res.primaryGenreName,
			year: res.releaseDate.substring(0, 4),
			duration: dur_string,
			age: res.contentAdvisoryRating,
			poster_url: poster_url,
			description: res.longDescription
		}
		
		return return_movie;
	}

	// Adquire um filme por ID através do metodo lookup
	async get_by_id(id){
		const country = 'BR';
		const url = this.baseURL + `https://itunes.apple.com/lookup?id=${id}&country=${country}`;

		try {
			const response = await axios.get(url);
			const result = response.data.results;
			return this.get_movie_info(result[0]);
		} catch (error) {
			console.warn("Erro na requisição em api/get_by_id");
			console.log(error);
		}
	};

	// Adquire um filme por parâmetros através do metodo search
	async get_by_params(params){

		const url = `https://itunes.apple.com/search?term=${params.term}&country=${params.country}&media=${params.media}`;
		
		try {
			//Adquire resultados brutos
			const response = await axios.get(url);
			const result = response.data.results;

			const results_list = [];

			//Adquire informações úteis de cada resultado
			result.forEach(res => {
				let movie = this.get_movie_info(res);
				//Coloca filme na array de resultados
				results_list.push(movie);
			});

			//Retorna lista com os resultados da busca
			return results_list;
			
		} catch (error) {
			console.warn("Erro na requisição em api/get_by_params");
			console.log(error);
		}
	}
}

export default new api();