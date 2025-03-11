"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalTarget } from "./GlobalTargetContext";
const AladinContext = createContext();

export function AladinProvider({ children }) {
    const { target } = useGlobalTarget();
    const [settings, setSettings] = useState({
        survey: "P/DSS2/color",
        fov: 5,
        cooFrame: "ICRS",
        target: target
    });
    useEffect(() => {
        setSettings((prev) => ({
            ...prev,
            target: target
        }));
    }, [target]);

    return (
        <AladinContext.Provider value={{ settings, setSettings }}>
            {children}
        </AladinContext.Provider>
    );
}

export function useAladin() {
    return useContext(AladinContext);
}
