import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pokemon from '../../components/Pokemon/Pokemon';

import '../../App.css';




class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      pokemons: [],
      next: '',
      previous: ''
    }
  }

  componentDidMount()  {
    this.loadPokemons();
  }



  loadPokemons(url) {

    url = url || 'https://pokeapi.co/api/v2/pokemon/'

    try {
      axios.get(url)
      .then(response => response.data)
      .then(data => this.setState({
        isLoading: false,
        pokemons: data.results,
        next: data.next,
        previous: data.previous
      }));

    } catch (e){
      console.log(e)
    }
  }

  handleLoadPage(destiny) {
    if(destiny === 'next') {
      this.loadPokemons(this.state.next)
    }
    if(destiny === 'previous') {
      this.loadPokemons(this.state.previous)
    }
  }

  render() {
    let { isLoading, pokemons } = this.state

    if(isLoading) {
      return(
        <div className="loading">
          <h1>Carregando...</h1>
          <div className="css-spinner">

          </div>
        </div>
      )
    } else {

      return(
        <div>
          <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '15px 0'}}>
            <button onClick={() => this.handleLoadPage('previous')}>Previous</button>
            <img src="https://i2.wp.com/multarte.com.br/wp-content/uploads/2019/03/pokemon-png-logo.png" alt="Pokemon logo"/>
            <button onClick={() => this.handleLoadPage('next')} >Next</button>
          </div>
          <div className="grid">
            {pokemons.map((pokemon) => (
              <div className="pokebola">
                <Link to={`/pokemon/${pokemon.name}`}>
                    <Pokemon key={pokemon.id} pokemon={pokemon} /> 
                </Link>
              </div>
            ))}

          </div>

        </div>
      );
    }
  }
}


export default Home;