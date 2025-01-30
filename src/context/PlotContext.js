import { createContext, useContext, useState } from "react";

const PlotContext = createContext();

export function PlotProvider({ children }) {
    const [plotSettings, setPlotSettings] = useState({
        isochroneAge: 1e9,  //default: 1 billion years
        metallicity: 0.0,    //default: solar metallicity
        showZAMS: true,      
    });

    return (
        <PlotContext.Provider value={{ plotSettings, setPlotSettings }}>
            {children}
        </PlotContext.Provider>
    );
}

export function usePlot() {
    return useContext(PlotContext);
}
