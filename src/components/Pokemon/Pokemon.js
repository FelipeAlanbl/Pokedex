import React, { Component } from 'react'
import axios from 'axios'

import Card from '../Card/Card';

class Pokemon extends Component {

    constructor(props){
        super(props);

        this.state = {
            url: this.props.pokemon.url,
            isLoading: true,
            pokemon: {}
        }
    }

    componentDidMount() {
        this.loadPokemon(this.state.url);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.url !== this.props.pokemon.url){
            this.loadPokemon(this.props.pokemon.url)
        }
    }


    loadPokemon(url) {
        axios.get(url)
            .then(response => response.data)
            .then(data => this.setState({
                pokemon: data,
                isLoading: false
            }))
    }



    render(){

        let { isLoading, pokemon } = this.state;

        
        if(isLoading) {
            return(
                <p>Renderizando...</p>
                )
        } else {
            return(
                <div>
                    <Card key={pokemon.id} pokemon={pokemon} /> 
                </div>
            )
        }
    }

}

export default Pokemon