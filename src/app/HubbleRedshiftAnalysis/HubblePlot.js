"use client";
import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Label,
} from "recharts";

// Example data; replace with actual data from LabDataTable if needed
const dummyData = [
  { distance: 10, velocity: 600 },
  { distance: 20, velocity: 1300 },
  { distance: 30, velocity: 1900 },
  { distance: 40, velocity: 2650 },
];

export default function HubblePlot({ data = dummyData }) {
  const [slope, setSlope] = useState(67.8); // km/s/Mpc
  const [intercept, setIntercept] = useState(0); // km/s


  const regressionLine = data
    .filter(d => d.distance !== null)
    .map((point) => ({
      distance: point.distance,
      velocity: slope * point.distance + intercept,
    }));

  return (
    <div className="w-full max-w-4xl bg-white rounded p-4 mt-6">
      <h2 className="text-lg font-semibold text-center mb-4">
        Hubble Diagram: Velocity vs Distance
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 25, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="distance"
            name="Distance"
            unit=" Mpc"
          >
            <Label value="Distance (Mpc)" position="insideBottom" dy={10} />
          </XAxis>
          <YAxis
            type="number"
            dataKey="velocity"
            name="Velocity"
            unit=" km/s"
          >
            <Label
              angle={-90}
              position="insideLeft"
              value="Velocity (km/s)"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Galaxy Data" data={data} fill="#8884d8" />
          <Line
            type="linear"
            dataKey="velocity"
            data={regressionLine}
            stroke="red"
            strokeWidth={2}
            dot={false}
            name="Fitted Line"
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black">
        <label className="flex flex-col">
          Slope (H₀ in km/s/Mpc):
          <input
            type="number"
            value={slope}
            onChange={(e) => setSlope(Number(e.target.value))}
            className="mt-1 border border-gray-300 rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col">
          Intercept (km/s):
          <input
            type="number"
            value={intercept}
            onChange={(e) => setIntercept(Number(e.target.value))}
            className="mt-1 border border-gray-300 rounded px-2 py-1"
          />
        </label>
      </div>
    </div>
  );
}
