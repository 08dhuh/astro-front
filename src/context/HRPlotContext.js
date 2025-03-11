import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalTarget } from "@/context/GlobalTargetContext";
const HRPlotContext = createContext();

export function HRPlotProvider({ children }) {
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [plotSettings, setPlotSettings] = useState({
        isochroneAge: 1e9,  //default: 1 billion years
        metallicity: 0.0,    //default: solar metallicity      
    });
    const { setTarget } = useGlobalTarget();

    useEffect(()=>
    {
        if (selectedCluster) {
            setTarget(selectedCluster.name);
        }
    }
    , [selectedCluster, setTarget]);

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
