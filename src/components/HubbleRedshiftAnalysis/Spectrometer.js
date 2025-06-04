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

const dummyLegendData = [
  { name: "λ₀,K", color: "red" },
  { name: "λ₀,H", color: "red" },
];


const referenceLines = [
  { wavelength: 3933.7, label: "λ₀,K"  },
  { wavelength: 3968.5, label: "λ₀,H" },
  // { wavelength: 4101, label: "Hδ" },
  // { wavelength: 4340, label: "Hγ" },
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


  const lambda0 = {
    K: 3933.7,
    H: 3968.5,
  };

  const [dragOffset, setDragOffset] = useState(0);

  const dataToPlot =
  spectrumData && spectrumData.length > 0 ? spectrumData : spData;

  return (
    <div className="w-full max-w-3xl h-80 bg-white rounded p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataToPlot}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="wavelength"
            domain={[3700, 4700]}
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
          {dummyLegendData.map((entry) => (
            <Line
              key={entry.name}
              name={entry.name}
              data={[]}
              stroke={entry.color}
              strokeDasharray="3 3"
              legendType="line"
            />
          ))}
          {/* <Legend verticalAlign="top" height={36} />*/}
          <Line
            type="monotone"
            dataKey="intensity"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
          {referenceLines.map((line) => (
            <ReferenceLine
              key={line.wavelength}
              x={line.wavelength + dragOffset}
              stroke="red"
              strokeDasharray="5 3"
              label={{
                position: "top",
                value: line.label,
                fill: "red",
                fontSize: 10,
              }}
              isFront
            />
          ))} 
        </LineChart>

      </ResponsiveContainer>
      {/* <div className="mt-2 text-sm text-black bg-white p-2 rounded w-full max-w-3xl">
  <p><strong>Redshift Simulation</strong></p>
  <p>Δλ = {dragOffset.toFixed(2)} Å</p>
  <p>z<sub>K</sub> = {(dragOffset / lambda0.K).toFixed(4)} | z<sub>H</sub> = {(dragOffset / lambda0.H).toFixed(4)}</p>
  <input
    type="range"
    min={-100}
    max={100}
    step={0.1}
    value={dragOffset}
    onChange={(e) => setDragOffset(parseFloat(e.target.value))}
    className="w-full mt-2"
  />
</div> */}
    </div>
  );


}

// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//   } from "recharts";

//   const dummySpectrum = [
//     { wavelength: 3700, intensity: 0.1 },
//     { wavelength: 3900, intensity: 0.4 },
//     { wavelength: 4100, intensity: 0.35 },
//     { wavelength: 4300, intensity: 0.7 },
//     { wavelength: 4500, intensity: 0.5 },
//     { wavelength: 4700, intensity: 0.2 },
//   ];
  

//   export default function Spectrometer() {
//     return (
//       <div className="w-full max-w-3xl h-80 bg-white rounded p-4">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={dummySpectrum}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               dataKey="wavelength"
//               domain={[3700, 4700]}
//               tickCount={7}
//               label={{ value: "Wavelength (Å)", position: "insideBottom", dy: 10 }}
//               type="number"
//             />
//             <YAxis
//               domain={[0, 1]}
//               tickCount={6}
//               label={{ value: "Intensity", angle: -90, position: "insideLeft" }}
//             />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="intensity"
//               stroke="#8884d8"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }