"use client";

import { useState } from "react";
import HRDiagramPlot from "./HRDiagramPlot";
import OCTable from "./ClusterTable";

function HRDiagram() {
  const [selectedCluster, setSelectedCluster] = useState(null);

  return (
    <div>      
      <OCTable selectedCluster={selectedCluster} setSelectedCluster={setSelectedCluster} />

      {selectedCluster && (
        <div className="mt-4 p-4 border border-gray-300 bg-gray-700">
          <h3 className="text-lg font-semibold">Selected Cluster Details</h3>
          <p><strong>ID:</strong> {selectedCluster.id}</p>
          <p><strong>Name:</strong> {selectedCluster.name}</p>
          <p><strong>Star Count:</strong> {selectedCluster.star_count}</p>
          <p><strong>E(B-V):</strong> {selectedCluster["E(B-V)"] ?? "N/A"}</p>
          <p><strong>[Fe/H]:</strong> {selectedCluster["[Fe/H]"] ?? "N/A"}</p>
          <p><strong>Distance (pc):</strong> {selectedCluster.Dist ?? "N/A"}</p>
          <p><strong>Age (Gyr):</strong> {selectedCluster.Age ?? "N/A"}</p>
        </div>
      )}


      <HRDiagramPlot />
    </div>
  );
}



export default HRDiagram;
