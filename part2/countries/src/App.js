import { useState, useEffect } from 'react'
import axios from 'axios'

import countryService from './services/countries'

function App() {
  const [filterName, setFiltername] = useState('')
  const [countries, setCountries] = useState(null)

   //Event handlers
   const handleFilter = (event) => setFilterName(event.target.value)

  useEffect(() => {
    console.log("effect run, country is now: ", country)

    // skip if country is not defined
    if (countries) {
      console.log("Fetching country information for: ", countries)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/${countries}`)
        .then(response => {
          console.log("This is the response after GET: ", response)
        })
        .catch(
          console.log("Error")
        )
    }
  }, [countries])
  
 


  return (
    <div>
      find countries 
      <input 
        value={country}
        onChange={handleFilter}
        />
      <pre>
        {JSON.stringify()}
      </pre>
    </div>
    )
}

export default App
