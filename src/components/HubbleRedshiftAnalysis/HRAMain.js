"use client";

import { useState, useEffect } from "react";
import Spectrometer from "./Spectrometer";
import GalaxyTable from "./GalaxyTable";
import { useGlobalTarget } from "@/context/GlobalTargetContext";
import galaxies from "@/data/galaxy_meta.json";

export default function HRAMain() {
  const [selectedGalaxy, setSelectedGalaxy] = useState(galaxies[0]);
  const [spectrumData, setSpectrumData] = useState([]);
  const { setTarget } = useGlobalTarget();

  useEffect(() => {
    if (!selectedGalaxy) return;

    const fetchSpectrum = async () => {
      try {
        const idNoSpace = selectedGalaxy.id.replace(/\s/g, "");
        const res = await fetch(`/data/spectra/${idNoSpace}.json`);
        if (!res.ok) throw new Error("Failed to load spectral data");

        const data = await res.json();
        setSpectrumData(data);
      } catch (err) {
        console.error("Error loading spectrum:", err);
        setSpectrumData([]);
      }
    };
    setTarget(selectedGalaxy.id);
    fetchSpectrum();
  }, [selectedGalaxy, setTarget]);

  return (
    <div className="w-full px-4">
      <h1 className="bg-black/[.05] dark:bg-white/[.06] text-3xl font-extrabold text-white text-center mb-2">
        Hubble Redshift Spectrum Analysis
      </h1>
      <br/>
      <h2 className="bg-black/[.05] dark:bg-white/[.06] flex justify-center items-center gap-2 text-2xl font-semibold text-white mb-6">
        <img
          aria-hidden
          src="/file.svg"
          alt="Document icon"
          width={18}
          height={18}
        />
        <a
          className="hover:underline hover:underline-offset-4"
          href="/HubbleRedshiftAnalysis"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instructions & Worksheet
        </a>
      </h2>

      <GalaxyTable setSelectedGalaxy={setSelectedGalaxy} />

      {selectedGalaxy && (
        <div className="mt-6 p-4 border border-gray-300 bg-gray-700 w-full max-w-3xl mx-auto rounded">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Galaxy</h3>
          <p className="text-white"><strong>ID:</strong> {selectedGalaxy.id}</p>
          <p className="text-white"><strong>RA:</strong> {selectedGalaxy.ra}</p>
          <p className="text-white"><strong>DEC:</strong> {selectedGalaxy.dec}</p>
          <p className="text-white"><strong>Mag(B):</strong> {selectedGalaxy.flux_b}</p>
        </div>
      )}

      <div className="text-white w-full flex flex-col items-center gap-6 mt-8">
        <Spectrometer
          selectedGalaxy={selectedGalaxy}
          spectrumData={spectrumData}
        />
      </div>
    </div>
  );

}