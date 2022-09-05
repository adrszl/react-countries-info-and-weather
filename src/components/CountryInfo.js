function CountryInfo(props) {
  const {altSpellings, borders, capital} = props;

  return(
    <div className="country-info">
      <h2>{altSpellings[0]} <strong>{altSpellings[1]}</strong> <i>{altSpellings[2]}</i></h2>
      <h3>Capital: {capital}</h3>
      <h4>Borders:</h4>
      <ul>
        {borders.map((country) => {
          return <li key={`border-${country}`}>{country}</li>
        })}
      </ul>
    </div>
  );
}

export default CountryInfo;