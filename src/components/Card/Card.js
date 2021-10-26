import {React, Component} from 'react'

import './style.css'

class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            pokemon: {},
            isLoading: true
        }

    }   

    componentDidMount(){
        this.setState({
            name: this.props.name,
            pokemon: this.props.pokemon,
            isLoading: false
        })
    }

    render(){

        const { pokemon, isLoading } = this.state;

        
        if (isLoading) {
            return <p>Renderizando....</p> 
        }
        
        const types = pokemon.types.map( (type, index) => (
            <li className={type['type'].name} key={index}>{type['type'].name}</li>
        ))

        const stats = pokemon.stats.map( (stat, index) => (
            <li key={index}>{stat.stat.name} - {stat.base_stat}</li>
        ))

        return(
            <div className="card">
                <img src={this.state.pokemon.sprites.other['official-artwork'].front_default} alt="" />
                <p className="name">{this.state.pokemon.name}</p>
                <div className="type">
                    <ul>
                        {types}
                    </ul>
                </div>
                <p className="number">#{this.state.pokemon.id}</p>
            </div>
        );
    }
}

export default Card;