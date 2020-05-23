class storageManager {
  // Executa leitura do valor de filmes salvos do localStorage, retorna array com resultado
  readStorage() {
    let myMovies = JSON.parse(localStorage.getItem("myMovies")) || [];
    return myMovies;
  }

  // Recebe e escreve uma array de filmes salvos no localStorage
  writeStorage(movies) {
    localStorage.setItem("myMovies", JSON.stringify(movies));
    return true;
  }

  // Adiciona um filme recebido para a lista de filmes salvos
  addMovie(movie) {
    let myMovies = this.readStorage();
    myMovies.unshift(movie);
    this.writeStorage(myMovies);
  }

  // Remove um filme recebido da lista de filmes salvos
  removeMovie(movie) {
    let myMovies = this.readStorage();

    for (const index in myMovies) {
      if (myMovies[index].id === movie.id) {
        myMovies.splice(index, 1);
        break;
      }
    }

    this.writeStorage(myMovies);
  }
}

export default new storageManager();
