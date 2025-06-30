"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from "recharts";
import spData from "@/data/spectra/NGC1357.json";

const referenceLines = [
  { wavelength: 3933.7, label: "λ₀,K" },
  { wavelength: 3968.5, label: "λ₀,H" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { intensity } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-400 rounded shadow text-sm text-black">
        <p><strong>Wavelength:</strong> {label.toFixed(2)} Å</p>
        <p><strong>Intensity:</strong> {intensity.toFixed(4)}</p>
      </div>
    );
  }
  return null;
};

export default function Spectrometer({ selectedGalaxy, spectrumData }) {

  const minWavelength = 3700;
  const maxWavelength = 4700;

  const leftMostRef = Math.min(...referenceLines.map(l => l.wavelength));
  const rightMostRef = Math.max(...referenceLines.map(l => l.wavelength));

  const minShift = minWavelength - leftMostRef;
  const maxShift = maxWavelength - rightMostRef;


  const [dragOffset, setDragOffset] = useState(0);
  const [showStaticLines, setShowStaticLines] = useState(true);

  const dataToPlot =
    spectrumData && spectrumData.length > 0 ? spectrumData : spData;

  return (
    <div className="w-full max-w-3xl bg-white rounded p-4">
      <ResponsiveContainer width="100%" height={320}>

        <LineChart
          data={dataToPlot}
          margin={{ top: 25, right: 20, bottom: 20, left: 0 }}
        >
          <text
            x="50%"
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 17 }}
            
          >
            Spectrum of {selectedGalaxy?.id || "Unknown Galaxy"}
          </text>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="wavelength"
            domain={[minWavelength, maxWavelength]}
            tickCount={9}
            allowDataOverflow={true}
            label={{
              value: "Wavelength (Å)",
              position: "insideBottom",
              dy: 10,
            }}
            type="number"
          />
          <YAxis
            domain={[0, 1]}
            tickCount={6}
            allowDataOverflow={true}
            label={{ value: "Intensity", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="intensity"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
          <Line
            name="λ₀,K (3933.7 Å)"
            data={[]}
            stroke="blue"
            strokeWidth={2}
            legendType="line"
          />
          <Line
            name="λ₀,H (3968.5 Å)"
            data={[]}
            stroke="blue"
            strokeWidth={2}
            legendType="line"
          />

          <Legend verticalAlign="top" height={36} />


          {/* Static Lines */}
          {showStaticLines &&
            referenceLines.map((line) => (
              <ReferenceLine
                key={`static-${line.wavelength}`}
                x={line.wavelength}
                stroke="blue"
                strokeOpacity={0.4}
                strokeWidth={2}
                label={{
                  position: "top",
                  value: line.label,
                  fill: "red",
                  fontSize: 10,
                }}
              />
            ))}

          {/* Movable Lines */}
          {referenceLines.map((line) => (
            <ReferenceLine
              key={`movable-${line.wavelength}`}
              x={line.wavelength + dragOffset}
              stroke="red"
              strokeDasharray="6 2"
              strokeWidth={2}
              isFront
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Controls */}
      <div className="mt-3 text-sm text-black bg-white p-2 rounded w-full max-w-3xl">
        <div className="flex items-center gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showStaticLines}
              onChange={() => setShowStaticLines(!showStaticLines)}
            />
            Toggle Reference Lines
          </label>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <label>
            Shift (Å):
            <input
              type="number"
              step="0.1"
              value={dragOffset}
              onChange={(e) => setDragOffset(parseFloat(e.target.value))}
              className="ml-2 border border-gray-400 rounded px-1 w-24"
            />
          </label>
          <button
            onClick={() => setDragOffset(0)}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Reset
          </button>

        </div>

        <input
          type="range"
          min={minShift}
          max={maxShift}
          step={0.1}
          value={dragOffset}
          onChange={(e) => setDragOffset(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>
    </div>
  );
}
