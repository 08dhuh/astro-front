import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalTarget } from "@/context/GlobalTargetContext";
import { processUBVData } from "@/utils/clusterHRUtils";
import { fetchClusterUBV } from "@/services/apiBackendService";
import pleiades_uvb from "@/data/pleiades_uvb.json";
const HRPlotContext = createContext();

export function HRPlotProvider({ children }) {
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [clusterData, setClusterData] = useState(pleiades_uvb);
    const [plotSettings, setPlotSettings] = useState({
        isochroneAge: 1e9,  //default: 1 billion years
        metallicity: 0.0,    //default: solar metallicity      
    });
    const { setTarget } = useGlobalTarget();

    useEffect(()=>
    {
        if (selectedCluster) {
            //sets selected cluster as the global target object
            setTarget(selectedCluster.name);
            //processes UBV data for the selected cluster
            //loadUBVData(selectedCluster.pk);
        }
    }
    , [selectedCluster, setTarget]);

    return (
        <HRPlotContext.Provider value={{
            selectedCluster, setSelectedCluster,
            plotSettings, setPlotSettings,
            clusterData, setClusterData
        }}>
            {children}
        </HRPlotContext.Provider>
    );
    async function loadUBVData(clusterPk) {
        if (!clusterPk) return;
    
        try {
            const ubvData = await fetchClusterUBV(clusterPk);
            console.log(ubvData);
    
            if (ubvData.length > 0) {
                setClusterData(processUBVData(ubvData));
            } else {
                console.error("No cluster data available");
                setClusterData([]);
            }
        } catch (error) {
            console.error("Error fetching UBV data:", error);
            setClusterData([]);
        }
    }
}

export function useHRPlot() {
    return useContext(HRPlotContext);
}

