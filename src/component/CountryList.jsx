import React from 'react';
import styles from './CountryList.module.css';
import CountryItem from "./CountryItem.jsx";
import {useCitiesContext} from "../context/citiesContext.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";


export default function CountryList() {

    const {cities, isLoading} = useCitiesContext()

    if (isLoading) return <Spinner/>;
    if (!cities.length) {
        return (
            <Message
                message={'Add your first city by clicking on a city on the map'}
            />
        )
    }

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