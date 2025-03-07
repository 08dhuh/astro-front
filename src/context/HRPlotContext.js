import { createContext, useContext, useState } from "react";

const HRPlotContext = createContext();

export function HRPlotProvider({ children }) {
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [plotSettings, setPlotSettings] = useState({
        isochroneAge: 1e9,  //default: 1 billion years
        metallicity: 0.0,    //default: solar metallicity      
    });

    return (
        <HRPlotContext.Provider value={{
            selectedCluster, setSelectedCluster,
            plotSettings, setPlotSettings
        }}>
            {children}
        </HRPlotContext.Provider>
    );
}

export function useHRPlot() {
    return useContext(HRPlotContext);
}
