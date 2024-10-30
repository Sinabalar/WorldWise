import React from 'react';
import styles from './CountryList.module.css';
import CountryItem from "./CountryItem.jsx";
import {useCitiesContext} from "../context/citiesContext.jsx";


export default function CountryList() {

    const {cities} = useCitiesContext()

    const countries = cities.reduce((acc, cur) => {
        if (acc.map((el) => el.country).includes(cur.country)) {
            return acc
        } else {
            return [...acc, {country: cur.country, emoji: cur.emoji}]
        }
    }, [])


    return (
        <ul className={styles.countryList}>
            {countries.map(el => (
                <CountryItem
                    key={el.emoji}
                    country={el}
                />
            ))}
        </ul>
    );
}