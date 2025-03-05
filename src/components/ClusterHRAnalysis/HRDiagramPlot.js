import { useState, useMemo } from "react";
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
//Data imports - should be replaced later
import zamsData from "@/data/zams.json";
import isochroneData from "@/data/isochrone_sample.json";
import pleiadesData from "@/data/pleiades_uvb.json";

const HRDiagramPlot = () => {
  const [b_vOffset, setB_VOffset] = useState(0);
  const [MvOffset, setMvOffset] = useState(0);

  //Shifts to ZAMS & Isochrone
  const shiftedZams = useMemo(() =>
    zamsData.map((point) => ({
      b_v: point.b_v + b_vOffset, // X-Axis
      Mv: point.Mv + MvOffset, // Y-Axis
    })),
    [b_vOffset, MvOffset] 
  );

  const shiftedIsochrone = useMemo(() =>
    isochroneData.map((point) => ({
      b_v: point.b_v + b_vOffset,
      Mv: point.Mv + MvOffset,
    })),
    [b_vOffset, MvOffset]
  );

  return (
    <div className="p-4 bg-black text-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">HR Diagram</h2>

      {/*Offset Controls*/}
      {/*should be replaced by sliders*/}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm">B-V Offset:</label>
          <input
            type="number"
            step="0.1"
            value={b_vOffset}
            onChange={(e) => setB_VOffset(parseFloat(e.target.value) || 0)}
            className="px-2 py-1 text-black rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Mv Offset:</label>
          <input
            type="number"
            step="0.1"
            value={MvOffset}
            onChange={(e) => setMvOffset(parseFloat(e.target.value) || 0)}
            className="px-2 py-1 text-black rounded"
          />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="b_v" name="B-V Color Index" />
          <YAxis type="number" dataKey="Mv" name="Vmag" reversed />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />


          <Scatter
            name="Pleiades UVB"
            data={pleiadesData}
            strokeWidth={1}
            fill="green"
            fillOpacity={0}

            shape={(props) => (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={3}
                stroke="green"

              />
            )}
          />

          {/*ZAMS Line Graph*/}
          <Line
          name="ZAMS"
            type="monotone"
            dataKey="Mv"
            data={shiftedZams}
            stroke="red"
            strokeWidth={2}
            dot={false}
          />

          {/*Isochrone Line Graph*/}
          <Line
          name="Isochrones"
            type="monotone"
            dataKey="Mv"
            data={shiftedIsochrone}
            stroke="blue"
            strokeWidth={2}
            dot={false}
          />

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HRDiagramPlot;
