import styles from './CountriesTable.module.css'
import { useState } from 'react'
import Image from 'next/Image'
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded
} from "@material-ui/icons"
import Link from 'next/link'

const orderBy = (countries,value,direction) => {
  if(direction === 'asc'){
    return [...countries].sort((a,b) => (a[value] > b[value] ? 1 : -1))
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries
}

const SortArrow = ({ direction }) => {
  if(!direction){
    return <></>
  }

  if(direction === 'desc'){
    return (
      <div>
        <KeyboardArrowDownRounded />
      </div>
    )
  } else {
    return (
      <div>
        <KeyboardArrowUpRounded />
      </div>
    )
  }
}

const CountriesTable = ({ countries }) => {

  const [direction, setDirection] = useState()
  const [value, setValue] = useState()

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if(!direction){
      setDirection('desc')
    } else if (direction === 'desc'){
      setDirection('asc')
    } else {
      setDirection(null)
    }
  }

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  }

  return ( 
    <section className={styles.main_countries_table}>

      <article className={styles.countries_table_upper}>
        <div>
          <h4>Flag</h4>
        </div>

        <div onClick={() => setValueAndDirection('name')}>
          <h4>Name</h4>
          <p>{value === "name" && <SortArrow direction=  {direction} />}</p>
        </div>

        <div onClick={() => setValueAndDirection('capital')}>
          <h4>Capital</h4>
          <p>{value === "capital" && <SortArrow direction=  {direction} />}</p>
        </div>

        <div onClick={() => setValueAndDirection('region')}>
          <h4>Region</h4>
          <p>{value === "region" && <SortArrow direction=  {direction} />}</p>
        </div>

        <div onClick={() => setValueAndDirection('population')}>
          <h4>Population</h4>
          <p>{value === "population" && <SortArrow direction=  {direction} />}</p>
        </div>

      </article>

      <article className={styles.countries_table_lower}>
        {
          orderedCountries.map((country) => (
            <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code} className={styles.countries_lower_link} passHref>
              <div key={country.alpha3Code}>
                <p><img src={country.flag} alt={country.name} /></p>
                <p>{country.name}</p>
                <p>{country.capital}</p>
                <p>{country.region}</p>
                <p>{country.population}</p>
              </div>
            </Link>
          ))
        }
      </article>
    </section>
   );
}
 
export default CountriesTable;