import React, {Component} from 'react';
import '../style/Country.css';
import axios from 'axios';

let API_url_name = "https://restcountries.eu/rest/v2/name"
class Country extends Component {
    constructor(props){
        super(props);
        this.state = {countrydata: null, index: 0};
        this.handleClick = this.handleClick.bind(this)
    }

    async fetchCountryData(name){
        try {
            let url = `${API_url_name}/${name}?fullText=true`
            let res = await axios.get(url)
            let data = res.data[0]
            return {
                name: data.name,
                officialname: data.altSpellings,
                flag: data.flag,
                capital: data.capital,
                region: data.region,
                subregion: data.subregion,
                population: data.population,
                nativeName: data.nativeName,
                currency: data.currencies[0],
                languages: data.languages,
                regionalBlock: data.regionalBlocs[0]
            }
        }
        catch(err){
            console.log(err)
        }
    }

    async componentDidMount() {
        let country = this.props.countries[0];
        return this.fetchCountryData(country)
        .then((a) => {
            this.setState({countrydata: a})
        })
    }

    async componentDidUpdate(prevProps,prevState) {
        if(prevProps.countries !== this.props.countries) {
            let index = 0
            let country = this.props.countries[index]
            return this.fetchCountryData(country)
            .then((a) => {
                this.setState({countrydata: a, index: index})
            })
        }
        else if(prevState.index !== this.state.index) {
            let index = this.state.index
            let country = this.props.countries[index]
            return this.fetchCountryData(country)
            .then((a) => {
                this.setState({countrydata: a, index: index})
            })
        }
    }

    handleClick(number) {
        let newIndex = this.state.index + number
        if(newIndex >= 0 && newIndex < this.props.countries.length) {
            this.setState(st => ({
                index: newIndex
            }))
        }
    }

    render() {
        return (
            <div className="Country">   
                {this.state.countrydata && 
                    <div className="Country-info"> 
                        <div className="Country-left"> 
                            <div className="Country-warning"> 
                                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                <p> Important </p>
                                <p> </p>
                            </div> 
                        </div>
                        <div className="Country-middle"> 
                            <h1 className="Country-name"> {this.state.countrydata.name} </h1>
                            <img src={this.state.countrydata.flag} alt={this.state.countrydata.name} />
                        </div>
                        <div className="Country-right">
                            <h1> This is {this.state.countrydata.capital} </h1>
                        </div>
                    </div>
                }
                <div className="Country-navigation">
                    <i 
                        className="fa fa-angle-double-left" 
                        aria-hidden="true"
                        onClick={() => this.handleClick(-1)}> </i>
                    <i 
                        className="fa fa-angle-double-right" 
                        aria-hidden="true"
                        onClick={() => this.handleClick(1)}> </i>
                </div>
            </div>
        )
    }
}

export default Country;