import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import { useState, useEffect } from "react";
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';

function Paragraph(props) {
  return (
    <>
      <p>{props.id}:{props.title}</p>
    </>
  )
}

function getIDFromPokemon(pokemon) {
  return pokemon.url.replace(
    "https://pokeapi.co/api/v2/pokemon/",
    ""
  ).replace("/", "");
}

function Card(props) {
  const [likes, setLikes] = useState(0);
  const [weight, setWeight] = useState(null);

  {/* useEffect for weight */ }
  useEffect(() => {
    fetch(props.detailsUrl)
      .then(response => response.json())
      .then(json => {
        setWeight(json.weight);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.detailsUrl]);

  return (
    <div
      className="card col-4 d-flex justify-content-center"
    >
      <img
        src={props.src}
        className="card-img-top"
        style={{ width: "${likes}px" }}
        alt="..."
      />

      <div className="card-body">
        <Link href={{pathname: "pokemons/[id]", query: {id: props.id}}} legacyBehavior>
        <a><h5 className="card-title">{props.title}</h5></a>
        
        </Link>

        {weight !== null && (
          <p className="card-text">Weight: {weight} kg</p>
        )}

        <p className="card-text">{props.text}</p>
        {likes == 0 ? null : <p className="card-text">Likes {likes}</p>}
        {likes == 10 ? null : (
          <>


            <button
              onClick={() => {
                setLikes(likes + 1);
              }}
              href="#"
              className="btn btn-primary"
            >
              <props.iconLike />
            </button>

            <button
              onClick={() => {
                setLikes(likes - 1);
              }}
              href="#"
              className="btn btn-primary"
            >
              <props.iconDislike />
            </button>
          </>

        )}
      </div>
    </div>
  );
}


function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setIsLoading(false);
        setPokemonList([...pokemonList, ...json["results"]]);
      })
  }, [offset])


  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {pokemonList.map(pokemon => {
            const id = getIDFromPokemon(pokemon);
            return (
            <Card
              key={id}
              id={id}
              title={pokemon["name"]}
              detailsUrl={pokemon.url}
              iconLike={AiOutlineLike}
              iconDislike={AiOutlineDislike}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            />
            );
          })}

        </div>
        {isLoading == true ? <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> : null}

        <div>
          <button onClick={() => { setOffset(offset + limit) }}>More</button>
        </div>
      </div>

    </div>
  );
}

export default App;
