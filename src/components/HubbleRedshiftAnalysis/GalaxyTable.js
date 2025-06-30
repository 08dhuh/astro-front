"use client";

import { useState } from "react";
import galaxies from "@/data/galaxy_meta.json";

export default function GalaxyTable({ setSelectedGalaxy }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="overflow-x-auto p-4 relative">
      <button
        className="flex items-center gap-2 text-xl font-semibold mb-4 bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        Galaxy Hotlist {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <table className="w-full border-collapse border border-gray-300 bg-black text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-300 px-4 py-2">Galaxy ID</th>
              <th className="border border-gray-300 px-4 py-2">RA</th>
              <th className="border border-gray-300 px-4 py-2">DEC</th>
            </tr>
          </thead>
          <tbody>
            {galaxies.map((galaxy, index) => (
              <tr
                key={index}
                className="hover:bg-gray-600 cursor-pointer"
                onClick={() => setSelectedGalaxy(galaxy)}
              >
                <td className="border border-gray-300 px-4 py-2">{galaxy.id}</td>
                <td className="border border-gray-300 px-4 py-2">{galaxy.ra}</td>
                <td className="border border-gray-300 px-4 py-2">{galaxy.dec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}