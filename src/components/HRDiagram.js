"use client";

import { useState } from "react";
import clusters from "@/data/clusters.json";
import zams from "@/data/zams.json";
import isochrone from "@/data/isochrone_sample.json";
import pleiades_uvb from "@/data/pleiades_uvb.json";


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

      {/* Other HRDiagram content here */}
    </div>
  );
}

function OCTable({ selectedCluster, setSelectedCluster }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="overflow-x-auto p-4 relative">
      <button
        className="flex items-center gap-2 text-xl font-semibold mb-4 bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        Open Clusters Table {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div>
          <table className="w-full border-collapse border border-gray-300 bg-black text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Star Count</th>
                <th className="border border-gray-300 px-4 py-2">E(B-V)</th>
                <th className="border border-gray-300 px-4 py-2">[Fe/H]</th>
                <th className="border border-gray-300 px-4 py-2">Distance (pc)</th>
                <th className="border border-gray-300 px-4 py-2">Age (Gyr)</th>
              </tr>
            </thead>
            <tbody>
              {clusters.map((cluster, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-600 cursor-pointer"
                  onClick={() => setSelectedCluster(cluster)}
                >
                  <td className="border border-gray-300 px-4 py-2">{cluster.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{cluster.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{cluster.star_count}</td>
                  <td className="border border-gray-300 px-4 py-2">{cluster["E(B-V)"] ?? "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{cluster["[Fe/H]"] ?? "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{cluster.Dist ?? "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{cluster.Age ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HRDiagram;
