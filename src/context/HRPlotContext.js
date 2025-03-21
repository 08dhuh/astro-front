import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalTarget } from "@/context/GlobalTargetContext";
import { processUBVData } from "@/utils/clusterHRUtils";
import { fetchClusterUBV } from "@/services/apiBackendService";
import { fetchIsochroneData } from "@/services/isochronesBackendService";
import pleiades_uvb from "@/data/pleiades_uvb.json";
import isochroneSample from "@/data/isochrone_sample.json";
const HRPlotContext = createContext();

export function HRPlotProvider({ children }) {
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [clusterData, setClusterData] = useState(pleiades_uvb);
    const [isochroneData, setIsochroneData] = useState(isochroneSample);
    const [plotSettings, setPlotSettings] = useState({
        logAge: 7.8,  //default: 63 million years
        z: 0.019,    //default: solar metallicity      
    });
    const { setTarget } = useGlobalTarget();

    useEffect(()=>
    {
        if (selectedCluster) {
            //sets selected cluster as the global target object
            setTarget(selectedCluster.name);
            //processes UBV data for the selected cluster
            loadUBVData(selectedCluster.pk);
        }
    }
    , [selectedCluster, setTarget]);

    useEffect(()=> {
        loadIsochroneData(plotSettings.logAge, plotSettings.z);
    }, [plotSettings.logAge, plotSettings.z])

    return (
        <HRPlotContext.Provider value={{
            selectedCluster, setSelectedCluster,
            plotSettings, setPlotSettings,
            clusterData,
            isochroneData
        }}>
            {children}
        </HRPlotContext.Provider>
    );

    async function loadUBVData(clusterPk) {
        if (!clusterPk) return;
    
        try {
            const ubvData = await fetchClusterUBV(clusterPk);
            //console.log(ubvData);
    
            if (ubvData.length > 0) {
                const processedData = processUBVData(ubvData)
                //console.log(processedData);
                setClusterData(processedData);
            } else {
                console.error("No cluster data available");
                setClusterData([]);
            }
        } catch (error) {
            console.error("Error fetching UBV data:", error);
            setClusterData([]);
        }
    }
    async function loadIsochroneData(logAge, Z) {
        try {
            const isoData = await fetchIsochroneData(logAge, Z);
            setIsochroneData(isoData || []);
        } catch (error) {
            console.error("Error fetching isochrone data:", error);
            setIsochroneData([]);
        }
    }
}

export function useHRPlot() {
    return useContext(HRPlotContext);
}

