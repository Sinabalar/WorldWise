// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import ButtonBack from "./ButtonBack.jsx";
import {useUrlPosition} from "../hooks/useURLPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCitiesContext} from "../context/citiesContext.jsx";
import {useNavigate} from "react-router-dom";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geoCodingError, setGeoCodingError] = useState("");
    const {createCity, isLoading} = useCitiesContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoadingGeoCoding(true)
                if (!lat && !lng) return;
                if (!lat && !lng) return;
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                if (!data.countryCode) {
                    throw new Error("That doesn't seem to be a city. Please click somewhere else.")
                } else {
                    setGeoCodingError("");
                    setCityName(data.city || data.locality || '');
                    setCountry(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode))
                }
            } catch (e) {
                setGeoCodingError(e.message)
            } finally {
                setIsLoadingGeoCoding(false);
            }
        }

        fetchCityData()
    }, [lat, lng]);

    if (isLoadingGeoCoding) return <Spinner/>;
    if (!lat && !lng) return <Message message={'Start by clicking somewhere on the map'}/>;
    if (geoCodingError) return <Message message={geoCodingError}/>;

    async function handelSubmit(e) {
        e.preventDefault();
        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng},
        }
        await createCity(newCity);
        navigate("/app");

    }

    return (
        <form
            className={`${styles.form} ${isLoading ? styles.loading : ''}`}
            onSubmit={handelSubmit}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id={'date'}
                    onChange={(date) => setDate(date)}
                    selected={date}
                    dateFormat={'yyy/MM/dd'}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type={'primary'}>Add</Button>
                <ButtonBack/>
            </div>
        </form>
    );
}

export default Form;
