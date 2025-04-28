import React from 'react';
import NavBar from '../components/navbar'; 
import { Container } from 'react-bootstrap';
import '../styles/landingpage.css'; // Import the CSS file

export default function LandingPage() {
    return (
        <>
            <NavBar />
            <div className="landing-page">
                <div className="content">
                    <h2>WELCOME TO</h2>
                    <h1>POKÉMON SEARCH</h1>
                    <img src="/ui_assets/pokeball.png" alt="Pokeball" className="pokeball" />
                    <p className="tagline">Your ultimate tool for <span className="bold">exploring</span>, <span className="bold">managing</span>, and <span className="bold">comparing</span> Pokémon.</p>
                    <p className="description">
                        Whether you're a seasoned trainer or just starting your Pokémon journey, Pokémon Search gives you the power to create your own account, build a personalized Pokédex, and dive deep into Pokémon stats.
                    </p>
                    <p className="description">
                        Easily search for your favorite Pokémon, filter by type or attributes, and compare stats to build the perfect team.
                    </p>
                    <p className="footer-line">
                        Start exploring now and discover the world of Pokémon like never before — your adventure awaits!
                    </p>
                    <div className="pokemon-trios">
                        <img src="/ui_assets/pokemon_trio1.png" alt="Pokemon Trio 1" className="pokemon-left" />
                        <img src="/ui_assets/pokemon_trio2.png" alt="Pokemon Trio 2" className="pokemon-right" />
                    </div>
                </div>
            </div>
        </>
    );
}
  