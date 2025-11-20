"use client";

//import { useState } from "react";
import { useHRPlot } from "@/context/HRPlotContext";
import HRDiagramPlot from "./HRDiagramPlot";
import ClusterTable from "./ClusterTable";
import ReferenceFooter from "../common/ReferenceFooter";

function HRDiagramMain() {
  //const [selectedCluster, setSelectedCluster] = useState(null);
  const { selectedCluster, setSelectedCluster, references } = useHRPlot();

  return (
    <div className="w-full px-4">
      <h1 className="bg-black/[.05] dark:bg-white/[.06] text-3xl font-extrabold text-center mb-2">
        HR Diagram Analysis of Star Clusters
      </h1>
      <br />
      <h2 className="bg-black/[.05] dark:bg-white/[.06] flex justify-center items-center gap-2 text-2xl font-semibold mb-6">
        <img
          aria-hidden
          src="/file.svg"
          alt="Document icon"
          width={18}
          height={18}
        />
        <a
          className="hover:underline hover:underline-offset-4"
          href="/ClusterHRAnalysis.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instructions
        </a>
      </h2>

      <ClusterTable
        selectedCluster={selectedCluster}
        setSelectedCluster={setSelectedCluster}
      />

      {selectedCluster && (
        <div className="mt-6 p-4 border border-gray-300 bg-gray-700 w-full max-w-3xl mx-auto rounded">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Cluster Details</h3>
          <p className="text-white"><strong>ID:</strong> {selectedCluster.cluster_id}</p>
          <p className="text-white"><strong>Name:</strong> {selectedCluster.name}</p>
          <p className="text-white"><strong>Star Count:</strong> {selectedCluster.star_count}</p>
          <p className="text-white"><strong>E(B-V):</strong> {selectedCluster["reddening"]?.toFixed(5) ?? "N/A"}</p>
          <p className="text-white"><strong>[Fe/H]:</strong> {selectedCluster["fe_h"]?.toFixed(5) ?? "N/A"}</p>
        </div>
      )}

      <div className="text-white w-full flex flex-col items-center gap-6 mt-8">
        <HRDiagramPlot />
      </div>

      <ReferenceFooter references={references} />



    </div>
  );

}



export default HRDiagramMain;
