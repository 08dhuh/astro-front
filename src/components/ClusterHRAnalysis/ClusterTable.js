import { useState } from "react";
import clusters from "@/data/clusters.json";

export default function ClusterTable({ selectedCluster, setSelectedCluster }) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  //search for clusters
  const filteredClusters = clusters.filter(cluster =>
    cluster.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const clusterTableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-700">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Star Count</th>
          <th className="border border-gray-300 px-4 py-2">E(B-V)</th>
          <th className="border border-gray-300 px-4 py-2">[Fe/H]</th>
          {/* <th className="border border-gray-300 px-4 py-2">Distance (pc)</th>
          <th className="border border-gray-300 px-4 py-2">Age (Gyr)</th> */}
        </tr>
      </thead>
    )
  }

  const createClusterTable = clusterGroup => {
    return clusterGroup.map((cluster, index) => (
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
        {/* <td className="border border-gray-300 px-4 py-2">{cluster.Dist ?? "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{cluster.Age ?? "N/A"}</td> */}
      </tr>
    ));
  };

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

          <input
            type="text"
            placeholder="Search by cluster name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 w-full text-black rounded border border-gray-300"
          />

          {searchQuery.length > 1 && filteredClusters.length === 0 && (
            <div className="mb-4 text-center text-gray-400">
              No matching clusters found.
            </div>
          )}

          <table className="w-full border-collapse border border-gray-300 bg-black text-white">
          {clusterTableHeader()}
            <tbody>
              {
                filteredClusters.length > 0 ? (                  
                    
                    createClusterTable(filteredClusters)
)
                  : (

                      createClusterTable(clusters)

                  )
               
              }
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}