"use client";

import { useState, useEffect } from "react";
import Spectrometer from "./Spectrometer";
import GalaxyTable from "./GalaxyTable";
import { useGlobalTarget } from "@/context/GlobalTargetContext";

export default function HRAMain() {
  const [selectedGalaxy, setSelectedGalaxy] = useState(null);
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
  return (<>


    <GalaxyTable setSelectedGalaxy={setSelectedGalaxy} />

    {selectedGalaxy && (
      <div className="mt-4 p-4 border border-gray-300 bg-gray-700 w-full max-w-3xl">
        <h3 className="text-lg font-semibold">Selected Galaxy</h3>
        <p className="mt-2"><strong>ID:</strong> {selectedGalaxy.id}</p>
        <p><strong>RA:</strong> {selectedGalaxy.ra}</p>
        <p><strong>DEC:</strong> {selectedGalaxy.dec}</p>
        <p><strong>Mag(B):</strong> {selectedGalaxy.flux_b}</p>
      </div>
    )}


    <div className="text-white w-full flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Hubble Redshift Spectrum Analysis</h2>

      <Spectrometer
        selectedGalaxy={selectedGalaxy}
        //setSelectedGalaxy={setSelectedGalaxy}
        spectrumData={spectrumData}

      />
    </div>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
      href="/HubbleRedshiftAnalysis"
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

  </>
  );
}