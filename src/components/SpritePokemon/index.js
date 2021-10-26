import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function SpritePokemon(props) {
    const [pokemonName, setPokemonName] = useState(props.name);
    const [pokemonImg, setPokemonImg] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then( response => setPokemonImg(response.data.sprites.other['official-artwork'].front_default))
        setIsLoading(false)
    },[pokemonImg])

    
    if(isLoading) {
        return <h1>Carregando...</h1>
    }
    return (
        <Link to={`/pokemon/${pokemonName}`}>
            <img src={pokemonImg} alt={pokemonName} />
        </Link>
    )
}