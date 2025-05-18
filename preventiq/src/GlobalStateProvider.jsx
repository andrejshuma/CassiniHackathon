// src/context/GlobalStateContext.js
import { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [globalObject, setGlobalObject] = useState({
        user: null,
        data: null,
        score: 0,
    });

    return (
        <GlobalStateContext.Provider value={{ globalObject, setGlobalObject }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
