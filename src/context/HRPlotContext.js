import { createContext, useContext, useState } from "react";

const HRPlotContext = createContext();

export function PlotProvider({ children }) {
    const [plotSettings, setPlotSettings] = useState({
        isochroneAge: 1e9,  //default: 1 billion years
        metallicity: 0.0,    //default: solar metallicity
        showZAMS: true,      
    });

    return (
        <HRPlotContext.Provider value={{ plotSettings, setPlotSettings }}>
            {children}
        </HRPlotContext.Provider>
    );
}

export function useHRPlot() {
    return useContext(HRPlotContext);
}
