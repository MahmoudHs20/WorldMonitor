import styles from "./CountriesTable.module.css";
import React from "react";
import Link from "next/Link";
import { useState } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <React.Fragment></React.Fragment>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  }
  if (direction === "asc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    setValue(value);
    switchDirection();
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => {
            setValueAndDirection("name");
          }}
        >
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>
        <button
          className={styles.heading_population}
          onClick={() => {
            setValueAndDirection("population");
          }}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link
          key={country.population + country.name}
          href={`/country/${country.alpha3Code}`}
        >
          <div className={styles.row}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
