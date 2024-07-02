function CountryInfo(props) {
  const {countryData} = props;

  return(
    <div className="country-info">
      <h2>{countryData.altSpellings[0]} <strong>{countryData.altSpellings[1]}</strong> <i>{countryData.altSpellings[2]}</i></h2>
      <h3>Capital: {countryData.capital}</h3>
      <h4>Borders:</h4>
      {countryData.borders ? 
        <ul>
          {countryData.borders.map((country) => {
            return <li key={`border-${country}`}>{country}</li>
          })}
        </ul>
      : <p>No borders</p>}
    </div>
  );
}

export default CountryInfo;