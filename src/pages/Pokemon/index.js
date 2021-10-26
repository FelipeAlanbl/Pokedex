import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import Evolutions from "../../components/Evolutions";
import Damages from "../../components/Damages";

import './style.css'


class Pokemon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.match.params.name,
            pokemon: {},
            isLoading: true,
        }
    }

    componentDidMount() {
        this.loadPokemon();
    }


    componentDidUpdate(prevProps) {
        if(prevProps.match.params.name !== this.props.match.params.name) {
            this.loadPokemon(this.props.match.params.name);
        }
    }

    loadPokemon(name) {
        const namePokemon = name ||this.state.name;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
        .then(response => this.setState({
            pokemon: response.data,
            isLoading: false
        }))
    }

    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    render(){
        let { isLoading, pokemon } = this.state;


        if(isLoading) {
            return(
                <div className="loading">
                <h1>Carregando...</h1>
                <div className="css-spinner">

                </div>
                </div>
            );
        } else {
            return(
                <div className="container-pokebola">
                    <Link className="link-button" to="/">Voltar</Link>
                    <div>
                        <div style={{display: 'flex', alignItems:'center    '}}>  
                            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                            <div>
                                <h1>#{pokemon.id} {pokemon.name.toUpperCase()}</h1>

                                <div style={{display: 'flex', alignItems:'center'}}>

                                    <div>
                                        <ul className="list-type">
                                            {pokemon.types.map((type, index) => (
                                                <li key={index}>    
                                                    <img className="type" src={`../../../assets/imgs/Pokémon_${this.capitalize(type.type.name)}_Type_Icon.svg`} alt={`${type.type.name} Logo`} />
                                                </li>

                                            ))}
                                        </ul>
                                        <p>Height: {pokemon.height} inch</p>
                                        <p>Weight: {pokemon.weight} Pounds</p> 
                                    </div>
                                    <div>
                                        <ul>
                                            {pokemon.stats.map((stat, index) => (
                                                <li key={index} className="stats-table">
                                                    <div className="stats-col">{stat.stat.name}</div>
                                                    <div className="stats-col">
                                                        <div className="stats-bar">
                                                            <div style={{width: `${stat.base_stat}%`}} className="progress">{stat.base_stat}</div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div>
                            <Evolutions url={pokemon.species.url} />
                        </div>

                        <div>
                            <h2>Battle Damages</h2>
                            {pokemon.types.map( (type, index) => (
                                <Damages key={index} type={type} />
                            ))}
                            
                        </div>

                    </div>

                </div>
            );
        }
    }
}

export default Pokemon;