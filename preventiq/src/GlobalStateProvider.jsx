// src/context/GlobalStateContext.js
import { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [globalObject, setGlobalObject] = useState({
        data: {
            uv: {
                category: "Low",
                score: 1,
                scaled_value: 0.116035625,
                value: 2.3207125,
                description: "Minimal protection needed. Safe to be outside.",
            },
            green_density: 0.1684321813254267,
            city_density: 0.6587589408830308,
            ozone_density: 0.14514514514514515,
            air_pollution: {
                datetime: "2025-05-17T21:49:22+02:00",
                value: 8,
                scaled_value: 0.008888888888888889,
                category: "Good",
                score: 1,
            },
            pollen: {
                apg_conc_scaled: 0.00001708984375,
                bpg_conc_scaled: 0.0003515625,
                gpg_conc_scaled: 0.20054931640625,
                mpg_conc_scaled: 1.993000049844286e-20,
                opg_conc_scaled: 0.000078125,
                rwpg_conc_scaled: 2.3995056834212538e-20,
            },
        },
        score: 17.8,
        user: {
            username: "borjan",
            emailAddress: "borjan",
            password: "borjan",
            gender: "male",
            age: "21",
            healthConditions: {
                asthma: "yes",
                respiratoryProblems: "",
                cardiovascularProblems: "yes",
                pollenAllergy: "",
                mentalHealthDisorder: "",
                skinConditions: "",
            },
        },
    });

    return (
        <GlobalStateContext.Provider value={{ globalObject, setGlobalObject }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
