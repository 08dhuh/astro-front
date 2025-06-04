"use client";

//import { useState } from "react";
import { useHRPlot } from "@/context/HRPlotContext";
import HRDiagramPlot from "./HRDiagramPlot";
import ClusterTable from "./ClusterTable";

function HRDiagramMain() {
  //const [selectedCluster, setSelectedCluster] = useState(null);
  const { selectedCluster, setSelectedCluster } = useHRPlot();

  return (
    <div>
      <ClusterTable selectedCluster={selectedCluster} setSelectedCluster={setSelectedCluster} />

      {selectedCluster && (
        <div className="mt-4 p-4 border border-gray-300 bg-gray-700">
          <h3 className="text-lg font-semibold">Selected Cluster Details</h3>
          <p className="mt-2"></p>
          <p><strong>ID:</strong> {selectedCluster.cluster_id}</p>
          <p><strong>Name:</strong> {selectedCluster.name}</p>
          <p><strong>Star Count:</strong> {selectedCluster.star_count}</p>
          <p><strong>E(B-V):</strong> {selectedCluster["reddening"] ?? "N/A"}</p>
          <p><strong>[Fe/H]:</strong> {selectedCluster["fe_h"] ?? "N/A"}</p>
          {/* <p><strong>Distance (pc):</strong> {selectedCluster.Dist ?? "N/A"}</p>
          <p><strong>Age (Gyr):</strong> {selectedCluster.Age ?? "N/A"}</p> */}
        </div>
      )}


      <HRDiagramPlot />
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
        href="/ClusterHRAnalysis"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Prac Exercise
      </a>
    </div>
  );
}



export default HRDiagramMain;
