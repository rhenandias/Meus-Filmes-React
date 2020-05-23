import axios from "axios";

class api {
  // A classe api é responsável por realizar a busca na Itunes API

  // A baseUrl do sistema deve passar pelo CORS Anywhere
  constructor() {
    this.baseUrl = "https://cors-anywhere.herokuapp.com/";
  }

  // Utilidade: converter a data fornecida pelo itunes para utilizar os valores necessários
  convertMS(milliseconds) {
    let day, hour, minute, seconds;
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
      seconds: seconds,
    };
  }

  // Extrai as informações relevantes sobre um filme, dado um resultado de busca
  getMovieInfo(res) {
    // Manipulações necessárias para a duração do filme
    let dur = this.convertMS(res.trackTimeMillis);
    let durString = `${dur.hour}h${dur.minute}min`;

    // Manipulações necessárias para o poster do filme
    let posterUrl = res.artworkUrl100;
    let firstPart = posterUrl.slice(0, posterUrl.length - 13);
    posterUrl = firstPart + `150x150bb.jpg`;

    // Dados relevantes
    let returnMovie = {
      id: res.trackId,
      title: res.trackName,
      director: res.artistName,
      genre: res.primaryGenreName,
      year: res.releaseDate.substring(0, 4),
      duration: durString,
      age: res.contentAdvisoryRating,
      posterUrl: posterUrl,
      description: res.longDescription,
    };

    return returnMovie;
  }

  // Adquire um filme por ID através do metodo lookup
  async getById(id) {
    const country = "BR";
    const url =
      this.baseUrl +
      `https://itunes.apple.com/lookup?id=${id}&country=${country}`;

    try {
      const response = await axios.get(url);
      const result = response.data.results;
      return this.getMovieInfo(result[0]);
    } catch (error) {
      console.warn("Erro na requisição em api/getByID");
      console.log(error);

      return [];
    }
  }

  // Adquire um filme por parâmetros através do metodo search
  async getByParams(params) {
    const url =
      this.baseUrl +
      `https://itunes.apple.com/search?term=${params.term}&country=${params.country}&media=${params.media}`;

    try {
      const response = await axios.get(url);
      const result = response.data.results;

      const resultsList = [];

      //Adquire informações úteis de cada resultado
      result.forEach((res) => {
        let movie = this.getMovieInfo(res);
        resultsList.push(movie);
      });

      return resultsList;
    } catch (error) {
      console.warn("Erro na requisição em api/getByParams");
      console.log(error);

      return [];
    }
  }
}

export default new api();
