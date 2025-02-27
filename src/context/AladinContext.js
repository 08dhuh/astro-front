"use client";
import { createContext, useContext, useState } from "react";

const AladinContext = createContext();

export function AladinProvider({ children }) {
    const [settings, setSettings] = useState({
        survey: "P/DSS2/color",
        fov: 5,
        cooFrame: "ICRS",
        target: "Pleiades"
    });

    return (
        <AladinContext.Provider value={{ settings, setSettings }}>
            {children}
        </AladinContext.Provider>
    );
}

export function useAladin() {
    return useContext(AladinContext);
}
