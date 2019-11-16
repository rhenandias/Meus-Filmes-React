class storageManager{

	// Executa leitura do valor de filmes salvos do localStorage, retorna array com resultado
	read_storage(){
		let my_movies = JSON.parse(localStorage.getItem('my_movies')) || [];
		return my_movies;
	}

	// Recebe e escreve uma array de filmes salvos no localStorage
	write_storage(movies){
		localStorage.setItem('my_movies', JSON.stringify(movies));
		return true;
	}

	// Adiciona um filme recebido para a lista de filmes salvos
	add_movie(movie){
		let my_movies = this.read_storage();
		my_movies.unshift(movie);
		this.write_storage(my_movies);
	}

	// Remove um filme recebido da lista de filmes salvos
	remove_movie(movie){		
		let my_movies = this.read_storage();
		
		for(const index in my_movies){
			if(my_movies[index].id === movie.id){
				my_movies.splice(index, 1);
				break;
			}
		}

		this.write_storage(my_movies);
	}
}

export default new storageManager();