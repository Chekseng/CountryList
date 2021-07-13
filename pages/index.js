import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import SearchInput from '../components/SearchInput/SearchInput'
import { useState } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable'

export default function Home({ countries }) {

  const [keyword,setKeyword] = useState('')

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(keyword)
  })

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout>
      <SearchInput onChange={onInputChange} countries={filteredCountries} />
      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`)
  const countries = await res.json()

  return {
    props: {
      countries,
    }
  }
}
