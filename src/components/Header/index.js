import React, { Component } from 'react';
import './styles.css';

import  { Link } from 'react-router-dom';

import search_icon from '../../assets/search1.svg';
import movies_icon from '../../assets/video-player.svg';

export default class Header extends Component {

	state = {
		current_page: '',
	};

	componentDidMount(){
		let cur_route = window.location.pathname;
		this.setState({
			current_page: cur_route,
		});
	}

	render() {

		const  { current_page } =  this.state;

		return (
			<header className="main-header">
				<Link className="link" to={ '/'}>
					<button>
						<p   disabled={current_page!=="/"} >Procurar</p>		
						<img disabled={current_page!=="/"} id="search-icon" src={search_icon} alt=""/>
						<div disabled={current_page!=="/"} className="tab-indication" id="search-tab-indication"/>			
					</button>
				</Link>	

				<Link className="link" to={ '/movies'}>
					<button>
						<p   disabled={current_page!=="/movies"}>Meus Filmes</p>
						<img disabled={current_page!=="/movies"} id="movie-icon" src={movies_icon} alt=""/>	
						<div disabled={current_page!=="/movies"} className="tab-indication" id="search-tab-indication"/>
					</button>
				</Link>
			</header>
		);
	}
}
