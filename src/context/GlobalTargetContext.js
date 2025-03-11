"use client";
import { createContext, useContext, useState } from "react";

const GlobalTargetContext = createContext();

export function GlobalTargetProvider({ children }) {
    const [target, setTarget] = useState("Pleiades");//default: pleiades

    return (
        <GlobalTargetContext.Provider value={{ target, setTarget }}>
            {children}
        </GlobalTargetContext.Provider>
    );
}

export function useGlobalTarget() {
    return useContext(GlobalTargetContext);
}
