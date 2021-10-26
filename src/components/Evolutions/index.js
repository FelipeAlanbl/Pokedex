import React, {Component} from 'react';
import axios from 'axios';

import SpritePokemon from '../SpritePokemon';

class Evolutions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: this.props.url,
            chain: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        axios.get(this.state.url)
        .then(response => {
            axios.get(response.data.evolution_chain.url).then(res => this.setState({
               chain: (res.data.chain),
               isLoading: false
            }))
        });
    }


    render(){

        const { isLoading, chain } = this.state;

        if(isLoading){
            return(<h1>Carregando...</h1>)
        }

        //console.log(chain)

        return(
            <div>
                <h1>Evolutions</h1>
                <SpritePokemon name={chain.species.name}/> evolves to {(chain.evolves_to.length > 0) ? <SpritePokemon name={chain.evolves_to[0].species.name}/> : ''} {(chain.evolves_to[0].evolves_to.length > 0) ? (<SpritePokemon name={chain.evolves_to[0].evolves_to[0].species.name}/>): ''}
                
            </div>
        );
    }
}

export default Evolutions;