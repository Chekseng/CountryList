import SearchRounded from '@material-ui/icons/SearchRounded'
import styles from './SearchInput.module.css'

const SearchInput = ({ countries, ...rest}) => {
  return ( 
    <section className={styles.main_search_section}>
      <article className={styles.country_length}>
        <p>Countries Available: {countries.length}</p>
      </article>
      <article className={styles.search_input_field}>
        <SearchRounded class={styles.search_icon} style={{color: 'var(--tetiary-text-color', fontSize: "30px", fontWeight: 'bold'}}/>
        <input {...rest} placeholder="enter name or country region" />
      </article>
    </section>
   );
}
 
export default SearchInput;