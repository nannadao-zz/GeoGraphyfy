export const getCountries = (country) => {
    
    return fetch(`https://restcountries.eu/rest/v2/name/${country}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(country)
    }).then(res => res.json());
}