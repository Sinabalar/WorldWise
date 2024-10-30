import React from 'react';
import styles from './CityList.module.css';
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import {useCitiesContext} from "../context/citiesContext.jsx";


export default function CityList() {

    const {cities, isLoading} = useCitiesContext()

    if (isLoading) return <Spinner/>;
    if(!cities.length) return <Message message={'Add your first city by clicking on a city on the map'}/>;

    return (
        <ul className={styles.cityList}>
            {
                cities.map((el) => (
                    <CityItem
                        key={el.id}
                        city={el}
                    />
                ))
            }
        </ul>
    );
}
