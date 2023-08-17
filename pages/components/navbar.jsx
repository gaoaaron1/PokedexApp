import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const PokedexLogo = "/PokemonLogo.png";

    return (
        <div className="navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a className="navbar-brand" href="/">
                <img src={PokedexLogo} alt="Pokedex" style={{ width: '200px', height: '125px' }} />
            </a>
            <a className="navbar-brand" href="/">
                <h1 className="navbar-text mx-3">Pokedex</h1>
            </a>
            <a className="navbar-brand" href="/aaron">
                <h1 className="navbar-text mx-3">Contact Us</h1>
            </a>
            <a className="navbar-brand" href="/music">
                <h1 className="navbar-text mx-3">Videos</h1>
            </a>
        </nav>
        </div>
    );
}
