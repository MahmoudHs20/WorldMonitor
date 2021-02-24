import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "./../components/SearchInput/SearchInput";
import CountriesTable from "./../components/CountriesTable/CountriesTable";
import { useState } from "react";

function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter((country) => {
    return (
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
    );
  });

  const inputChange = (e) => {
    e.preventDefault;
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} Countries</div>
      <SearchInput
        placeholder="Find By Name, Region, SubRegion"
        onChange={inputChange}
      />
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  // const res = await fetch("https://restcountries.eu/rest/v2/all");
  // const countries = await res.json();

  return {
    props: {
      countries: [],
    },
  };
}

export default Home;
