import React, {Component} from 'react';
import Country from './Country';
import Navbar from './Navbar';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import '../style/Homepage.css'

const API_url = "https://restcountries.eu/rest/v2"
class Homepage extends Component {
    static defaultProps = {
        alphabet : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        countries: []
    }
    constructor(props){
        super(props);
        this.state = {countries: []}
    }
    async componentDidMount() {
        let res = await axios.get(`${API_url}/all/`);
        res.data.map(country => this.props.countries.push(country.name))
    }

    getLetter(letter) {
        var countries = this.props.countries;
        var result = countries.filter(country => country.startsWith(letter));
        this.setState({countries:result});
    }
    render() {
        let alphabet = this.props.alphabet.map(letter => (
            <Navbar
            key={letter}
            getLetter={() => this.getLetter(letter)}
            name={letter}/>
        ))
        /* let displayCountries = this.state.countries.map(country => (
            <Country
            key={uuid()}
            name={country}
            />
        )) */
        
        /* <div> {displayCountries} </div> */

        return (
            <div className="Homepage">
                <div className="Homepage-navbar"> 
                    {alphabet} 
                </div> 

                <div className="Homepage-content">
                    <div className="Homepage-title"> GEO GRAPHYFY </div>
                    <div className="Homepage-info">
                        {this.state.countries.length > 0
                        ? <Country countries={this.state.countries} />
                        : <div className="Homepage-loading"> Loading... </div> }
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Homepage;