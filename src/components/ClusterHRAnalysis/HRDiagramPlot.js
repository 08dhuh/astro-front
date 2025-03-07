import { useState, useMemo, useEffect } from "react";
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
import { useHRPlot } from "@/context/HRPlotContext";
//Data imports - should be replaced later
import zamsData from "@/data/zams.json";
import isochroneData from "@/data/isochrone_sample.json";
import clusterData from "@/data/pleiades_uvb.json";

const HRDiagramPlot = () => {

  const {selectedCluster, plotSettings, setPlotSettings} = useHRPlot();

  const [b_vOffset, setB_VOffset] = useState(0);
  const [MvOffset, setMvOffset] = useState(0);

  useEffect(() => {
    if (selectedCluster) {
      setB_VOffset(selectedCluster["E(B-V)"] ?? 0);
    }
  }, [selectedCluster]); 

  //accessibility
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isBGDarkMode, setIsBGDarkMode] = useState(false);

  const colourScheme = isHighContrast
    ? { clusters: "#E69F00", zams: "#CC79A7", isochrones: "#0072B2" }
    : { clusters: "green", zams: "red", isochrones: "blue" };




  //Shifts to data
  const shiftedCluster = useMemo(()=>
    clusterData.map((point) => ({
      ...point,
      b_v: point.b_v + b_vOffset
    })),
    [b_vOffset]
  );

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

  const clusterDataLabel = (cluster) => {
    return cluster? cluster.name : "No Cluster Selected"
  }

  return (
    <div className={`p-4 bg-black text-white rounded-lg`}>
      <h2 className="text-lg font-semibold mb-4">HR Diagram</h2>

      {/*Offset Controls*/}
      {/*should be replaced by sliders*/}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm">E(B-V):</label>
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
      <div className={`p-4 rounded-lg ${isBGDarkMode ? "bg-black" : "bg-white"}`}>
      <ResponsiveContainer  width="100%" height={400}>
        <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="b_v"
            name="B-V Color Index"
            domain={[-0.5, 2.5]}
            tickCount={6}
            allowDataOverflow={true}
            label={{ value: "B-V", position: "insideBottom", dy: 20 }} />
          <YAxis
            type="number"
            dataKey="Mv"
            name="Vmag"
            domain={[0, 21]}
            tickCount={8}
            allowDataOverflow={true}
            label={"V"}
            reversed />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend verticalAlign="bottom" align="right" wrapperStyle={{ paddingTop: 20 }} />



          <Scatter
            name={clusterDataLabel(selectedCluster)}
            data={shiftedCluster}
            strokeWidth={1}
            fill={colourScheme.clusters}


            shape={(props) => (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={3}
                stroke={colourScheme.clusters}
                fill={isBGDarkMode ? "black" : "white"}
              />
            )}
          />

          {/*ZAMS Line Graph*/}
          <Line
            name="ZAMS"
            type="monotone"
            dataKey="Mv"
            data={shiftedZams}
            stroke={colourScheme.zams}
            strokeWidth={3}
            dot={false}
          />

          {/*Isochrone Line Graph*/}
          <Line
            name="Isochrones"
            type="monotone"
            dataKey="Mv"
            data={shiftedIsochrone}
            stroke={colourScheme.isochrones}
            strokeWidth={3}
            dot={false}
          />

        </ComposedChart>
        
      </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mb-4 pt-2">

          <label className="flex items-center gap-2">
          <span>High-Contrast Mode</span>
            <input
              type="checkbox"
              checked={isHighContrast}
              onChange={() => setIsHighContrast(!isHighContrast)}
              className="w-4 h-4"
            />
            
          </label>

          <label className="flex items-center gap-2">
          <span>White Background</span>
            <input
              type="checkbox"
              checked={!isBGDarkMode}
              onChange={() => setIsBGDarkMode(!isBGDarkMode)}
              className="w-4 h-4"
            />
            
          </label>
        </div>

    </div>
  );
}

export default HRDiagramPlot;
