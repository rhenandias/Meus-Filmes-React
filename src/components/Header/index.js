import React from 'react';
import './styles.css';

import  { Link } from 'react-router-dom';

import iconSearch from '../../assets/search1.svg';
import iconMovies from '../../assets/video-player.svg';

export default function Header() {

	const currentPage = window.location.pathname;
	
	return (
		<>
			<header className="main-header">
				<Link className="link" to={ '/'}>
					<button>
						<p   disabled={currentPage !== "/"} >Procurar</p>		
						<img disabled={currentPage !== "/"} id="search-icon" src={iconSearch} alt=""/>
						<div disabled={currentPage !== "/"} className="tab-indication" id="search-tab-indication"/>			
					</button>
				</Link>	

				<Link className="link" to={ '/movies'}>
					<button>
						<p   disabled={currentPage !== "/movies"} >Meus Filmes</p>
						<img disabled={currentPage !== "/movies"} id="movie-icon" src={iconMovies} alt=""/>	
						<div disabled={currentPage !== "/movies"} className="tab-indication" id="search-tab-indication"/>
					</button>
				</Link>
			</header>
		</>
	);
}