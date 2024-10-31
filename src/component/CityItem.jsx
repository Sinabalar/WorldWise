import React from 'react';
import styles from './CityItem.module.css';
import {Link} from "react-router-dom";
import {useCitiesContext} from "../context/citiesContext.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));


export default function CityItem({city}) {

    const {cityName, emoji, date, id, position} = city;
    const {currCity} = useCitiesContext();

    return (
        <li>
            <Link
                className={
                    `${styles.cityItem} ${currCity.id === id
                        ? styles.cityItemActive
                        : ''}`
                }
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>

        </li>
    );
}