import { useState, useMemo } from "react";
import clusters from "@/data/clusters.json";
import clusterTargets from "@/data/cluster_targets.json";

export default function ClusterTable({ selectedCluster, setSelectedCluster }) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });


  //search for clusters
  const filteredClusters = clusters.filter(cluster =>
    cluster.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  //cluster sorting logics
  const sortedFilteredClusters = [...filteredClusters].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "star_count") {
      return sortConfig.direction === "asc"
        ? a.star_count - b.star_count
        : b.star_count - a.star_count;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "⬍";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const clusterTableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-700">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2 cursor-pointer"
            onClick={() => handleSort("name")}>
            Name {getSortIndicator("name")}
          </th>
          <th
            className="border border-gray-300 px-4 py-2 cursor-pointer"
            onClick={() => handleSort("star_count")}
          >
            Star Count {getSortIndicator("star_count")}
          </th>
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
        <td className="border border-gray-300 px-4 py-2">{cluster.cluster_id}</td>
        <td className="border border-gray-300 px-4 py-2">{cluster.name}</td>
        <td className="border border-gray-300 px-4 py-2">{cluster.star_count}</td>
        <td className="border border-gray-300 px-4 py-2">
          {cluster["reddening"] != null ? cluster["reddening"].toFixed(3) : "N/A"}
        </td>

        <td className="border border-gray-300 px-4 py-2">
          {cluster["fe_h"] != null ? cluster["fe_h"].toFixed(3) : "N/A"}
        </td>
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
              {createClusterTable(sortedFilteredClusters)}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}