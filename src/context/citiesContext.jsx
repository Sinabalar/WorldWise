import {createContext, useCallback, useContext, useEffect, useReducer, useState} from "react";
import city from "../component/City.jsx";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currCity: {},
    error: "",
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currCity: action.payload,
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
            }
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((el) => el.id !== action.payload),
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            throw new Error('unknown action type !')
    }
}

function CitiesProvider({children}) {

    const BASE_URL = 'http://localhost:8000'

    const [{cities, isLoading, currCity}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchData() {
            dispatch({
                type: 'loading'
            });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({
                    type: 'cities/loaded', payload: data
                })
            } catch (e) {
                dispatch({
                    type: 'rejected', payload: 'there was an error loading cities'
                })
            }
        }

        fetchData();
    }, []);

    const getCity = useCallback(async function getCity(id) {
        if (Number(id) === currCity.id) return
        dispatch({type: 'loading'})
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({
                type: 'city/loaded', payload: data
            });
        } catch (e) {
            dispatch({
                type: 'rejected', payload: `there was an error loading city`
            })
        }
    }, [currCity.id])

    async function createCity(newCity) {
        dispatch({type: 'loading'})
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            dispatch({type: 'city/created', payload: data})
        } catch {
            dispatch({
                type: 'rejected', payload: `there was an error creating city`
            })
        }
    }

    async function deleteCity(id) {
        dispatch({type: 'loading'})
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            dispatch({type: 'city/deleted', payload: id})
        } catch {
            dispatch({
                type: 'rejected', payload: `there was an error deleting city`
            })
        }
    }

    return (
        <CitiesContext.Provider value={
            {
                cities,
                isLoading,
                getCity,
                currCity,
                createCity,
                deleteCity
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