import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext();

function CitiesProvider({children}) {

    const BASE_URL = 'http://localhost:8000'

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currCity, setCurrCity] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                alert(`there was an error loading data`)
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrCity(data);
        } catch (e) {
            alert(`there was an error loading data`)
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            setCities([...cities, data])
        } catch (e) {
            alert(`there was an error loading data`)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={
            {
                cities,
                isLoading,
                getCity,
                currCity,
                createCity
            }
        }>
            {children}
        </CitiesContext.Provider>
    )
}

function useCitiesContext() {
    if (useContext(CitiesContext) === undefined) {
        throw new Error('CitiesContext created out side of contextProvider');
    }
    return useContext(CitiesContext);
}

export {CitiesProvider, useCitiesContext}