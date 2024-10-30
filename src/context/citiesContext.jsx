import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext();

function CitiesProvider({children}) {

    const BASE_URL = 'http://localhost:8000'

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <CitiesContext.Provider value={
            {
                cities,
                isLoading
            }
        }>
            {children}
        </CitiesContext.Provider>
    )
}
function useCitiesContext(){
    if(useContext(CitiesContext)===undefined){
        throw new Error('CitiesContext created out side of contextProvider');
    }
    return useContext(CitiesContext);
}
export {CitiesProvider,useCitiesContext}