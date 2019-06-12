import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    const [name, setName] = useState('')
    const handleChange = (event) => {
        setName(event.target.value)
    }

    return(
        <div>
            find countries <input 
                value={name}
                onChange={handleChange} 
                />
            <br />
            <Countries name={name} />
        </div>
    )
}

const Countrydata = ({ country }) => {
    const row = () => country.languages.map(lang =>
        <Row 
            key={lang.name}
            output={lang.name}
        />
    )
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <br />
            <h2>languages</h2>
            {row()}
            <br />
            <img 
                width="40%"
                height="auto"
                src={country.flag} 
                alt="country flag" 
            />
        </div>
    )
}

const Countries = ({ name }) => {
    const [countries, setCountries] = useState([])
    if(name==='' || name.includes(' ')){
        name='filler'
    }
    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/name/'
          .concat(name))
          .then(response => {
            setCountries(response.data)})
          .catch(error => {}
        )
      }, [name]
    )
    const handleDisplay = () => {
        if(countries.length===0 || countries.length>10){
            return <div>Too many matches, specify another filter</div>
        }else if(countries.length===1){
            return <Countrydata country={countries[0]} />
        }else{
            return <div>{rows()}</div>
        }
    }

    const showCountryData = (event) => {
        event.preventDefault()
        console.log()
        return (
            <Countrydata country={countries[0]} />
        )
    }

    const rows = () => countries.map((country,index) =>
        <div>
            <Row key={country.capital} output={country.name} />
            <form onSubmit={showCountryData} >
                <button type="submit" > 
                    show 
                </button>
            </form>
        </div>
    )

    return (
        <div> 
            {handleDisplay()}
        </div>
    )
}

const Row = ({ output }) => {
    return (
        <div>{output} <br /></div>
    )
}

const refresh = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

refresh()