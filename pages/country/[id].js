import Layout from "../../components/Layout/Layout";
import styles from './Country.module.css'
import Image from 'next/Image'
import { useState, useEffect } from 'react'

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)

  const country = await res.json()

  return country;
}

export const getStaticPaths = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')

  const countries = await res.json();

  const paths = countries.map(country => {
    return {
      params: {
        id: country.alpha3Code.toString()
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)

  const country = await res.json();

  return {
    props: {
      country: country,
    }
  }
}

const Detail = ({ country }) => {

  const [ borders, setBorders ] = useState([])

  const getBorders = async () => {
    const borders = await Promise.all(country.borders.map(border => getCountry(border))
    ); 

    setBorders(borders)
  }


  useEffect(() => {
    getBorders();
  })

  return ( 
    <Layout>
      <section className={styles.main_detail_section}>
        <article className={styles.detail_flag}>
          <img src={country.flag} alt={country.name} />
          <h3>{country.name}</h3>
          <h4>{country.region}</h4>

          <div>
            <p><span>{country.population}</span> <span>{country.area}</span></p>
            <p><span>Population</span> <span>Area</span></p>
          </div>
        </article>

        <article className={styles.detail_info}>
          <h3>Details</h3>
          <table>
            <tbody>
              <tr>
                <td>Capital</td>
                <td>{country.capital}</td>
              </tr>

              <tr>
                <td>Native Name</td>
                <td>{country.nativeName}</td>
              </tr>
              <tr>
                <td>Capital</td>
                <td>{country.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{country.area}</td>
              </tr>
              <tr>
                <td>Languages</td>
                {
                  country.languages.map(({name}) => (
                    <td key={name}>{name}</td>
                  ))
                }
              </tr>
              <tr>
                <td>Region</td>
                <td>{country.region}</td>
              </tr>
              <tr>
                <td>SubRegion</td>
                <td>{country.subregion}</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>{country.population}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.detail_neighbouring_countries}>
              <h4>Neighbouring Countries</h4>

              <article>
                {
                  borders.map(({flag,name}) => (
                    <div key={name}>
                      <img src={flag} alt={name} />
                      <p>{name}</p>
                    </div>
                  ))
                }
              </article>
          </div>

        </article>
      </section>
    </Layout>
   );
}
 
export default Detail;