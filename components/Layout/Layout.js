import styles from './Layout.module.css'
import Head from 'next/head'
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import Link from 'next/link'

const Layout = ({ children, title="Country List"}) => {
  return ( 
    <section className={styles.main_section}>

      {/* Head section */}
      <Head>
        <title>{title}</title>
      </Head>

      {/* Header section */}
      <header className={styles.main_header}>
        <PublicSharpIcon className={styles.main_header_icon} style={{fontSize: '35px', fontWeight: '800'}}/>
        <Link href={`/`} passHref>
          <h2 className={styles.main_header_heading}>Country<span>List</span></h2>
        </Link>
      </header>

      {/* Main Section */}
      <main>
        {children}
      </main>

      {/* Footer Section */}
      <footer className={styles.main_footer}>
        <p>All rights reserved @copyright countrylist.com</p>
      </footer>
    </section>
   );
}
 
export default Layout