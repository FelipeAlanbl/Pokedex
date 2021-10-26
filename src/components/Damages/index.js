import React, {Component} from 'react';
import axios from 'axios';

export default class Damages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: {},
            isLoading: true
        }

    }

    componentDidMount() {
        axios.get(this.props.type.type.url)
            .then(response => this.setState({
                type: response.data,
                isLoading: false
            }))
    }

    render(){
        const { type, isLoading } = this.state

        if (isLoading) {
            return(<h1>Carregando...</h1>)
        }

        return(
            <div>
                <h3 className="type">{type.name}</h3>

                <div style={{display: 'flex'}}>
                    <div>
                        <h4>Double damage from:</h4>
                        <ul>
                            {type.damage_relations.double_damage_from.map( t => (
                                <li>{t.name}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4>Double damage to:</h4>
                        <ul>
                            {type.damage_relations.double_damage_to.map( t => (
                                <li>{t.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>Half damage from:</h4>
                        <ul>
                            {type.damage_relations.double_damage_from.map( t => (
                                <li>{t.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>Half damage to:</h4>
                        <ul>
                            {type.damage_relations.double_damage_to.map( t => (
                                <li>{t.name}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div> 
        );
    }
}