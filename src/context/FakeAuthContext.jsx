import {createContext, useContext, useReducer} from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'logIn':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case 'logOut':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        default:
            throw new Error('Unknown action type')
    }
}

const FAKE_USER = {
    name: "Sina",
    email: "sinabalar666@gmail.com",
    password: "123456789",
    avatar: "https://ui-avatars.com/api/?name=Sina",
};


function AuthProvider({children}) {

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function logIn(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({
                type: 'logIn',
                payload: FAKE_USER
            })
        }
    }

    function logOut() {
        dispatch({
            type: 'logOut',
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            logIn,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    if (useContext(AuthContext) === undefined) {
        throw new Error('AuthContext created out side of contextProvider')
    }
    return useContext(AuthContext)
}

export {AuthProvider, useAuth}