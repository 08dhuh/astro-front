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
//import isochroneData from "@/data/isochrone_sample.json";
//import clusterData from "@/data/pleiades_uvb.json";
import TooltipIcon from "../common/ToolTipIcon";

const HRDiagramPlot = () => {
  //plot context settings
  const { selectedCluster, clusterData, plotSettings, setPlotSettings, isochroneData } = useHRPlot();

  //offsets
  const [b_vOffset, setB_VOffset] = useState(0);
  const [b_vOffsetIsochrone, setB_VOffsetIsochrone] = useState(0); //isochrone-only X shift
  const [MvOffset, setMvOffset] = useState(0);

  //toggle graph settings
  const [isShowingZAMS, setIsShowingZAMS] = useState(true);
  const [isShowingIsochrones, setIsShowingIsochrones] = useState(true);


  //accessibility
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isBGDarkMode, setIsBGDarkMode] = useState(false);

  const colourScheme = isHighContrast
    ? { clusters: "#E69F00", zams: "#CC79A7", isochrones: "#0072B2" }
    : { clusters: "green", zams: "red", isochrones: "blue" };
  const [isIsoOpen, setIsIsoOpen] = useState(true);

  useEffect(() => {
    if (selectedCluster) {
      //setB_VOffset(selectedCluster["E(B-V)"] ?? 0);
      setB_VOffset(selectedCluster["reddening"].toFixed(3) ?? 0);
    }
  }, [selectedCluster]);


  //Shifts to data
  const shiftedCluster = useMemo(() =>
    clusterData.map((point) => ({
      ...point,
      b_v: point.b_v - b_vOffset
    })),
    [clusterData, b_vOffset]
  );

  const shiftedZams = useMemo(() =>
    zamsData.map((point) => ({
      //b_v: point.b_v + b_vOffset,
      b_v: point.b_v, // no X-Axis shift for ZAMS
      Mv: point.Mv + MvOffset, // Y-Axis
    })),
    [MvOffset]
  );

  const shiftedIsochrone = useMemo(() =>
    isochroneData.map((point) => ({
      //b_v: point.b_v + b_vOffset,
      b_v: point.b_v + b_vOffsetIsochrone, // X-Axis shift for Isochrone lines
      Mv: point.Mv + MvOffset,
    })),
    [isochroneData, b_vOffsetIsochrone, MvOffset]
  );

  const clusterDataLabel = (cluster) => {
    return cluster ? cluster.name : "No Cluster Selected"
  }

  const startDrag = (e) => {
    const slider = e.target;
    const sliderRect = slider.parentElement.getBoundingClientRect();

    const onMouseMove = (event) => {
      let newTop = event.clientY - sliderRect.top;
      newTop = Math.max(0, Math.min(newTop, sliderRect.height));

      const newMvOffset = (100 - (newTop / sliderRect.height) * 100) / 5;
      setMvOffset(newMvOffset);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };


  return (
    <div className="relative p-4 bg-black text-white rounded-lg">
      <h2 className="text-lg font-semibold mb-2">HR Diagram</h2>

      {/*Cluster Offset Controls*/}
      {/*should be replaced by sliders*/}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="text-sm flex items-center gap-1">
            V-Mv
            {/* Tooltip */}
            <TooltipIcon
              title="Mv Offset and Distance modulus"
              description="Distance modulus is the difference between apparent and absolute magnitude (Mv) of an object. Adjusting Mv Offset helps align ZAMS and isochrones with the cluster scatter plot to estimate distance modulus."
            />
            {/* <div className="group relative flex items-center">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold cursor-pointer">
                ?
              </div>

              <div className="absolute top-0 left-0 translate-x-4 -translate-y-full w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="font-semibold pb-1">Mv Offset and Distance modulus</p>
                <p>
                  <b>Distance modulus</b> is the difference between the apparent magnitude and the absolute magnitude (Mv) of an astronomical object.
                  Adjusting this value (<b>Mv offset</b>) allows you to align the ZAMS and isochrones graphs with the central axis of the cluster scatter plot,
                  helping you determine the <b>distance modulus</b> of the cluster.
                </p>
              </div>
            </div> */}
          </label>
          <input
            type="number"
            step="0.1"
            value={MvOffset.toFixed(2)}
            onChange={(e) => setMvOffset(parseFloat(e.target.value) || 0)}
            className="px-2 py-1 text-black rounded"
          />
        </div>

        <div>
          <label className="text-sm flex items-center gap-1">
            E(B-V)

            {/* Tooltip */}
            <TooltipIcon
              title="E(B-V): Extinction or Reddening"
              description="E(B-V) is the absorption and scattering of light by dust and gas between a star cluster and the observer. This value comes from the selected cluster and cannot be changed manually."
            />
            {/* <div className="group relative flex items-center">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold cursor-pointer">
                ?
              </div>

              <div className="absolute top-0 left-0 translate-x-4 -translate-y-full w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="font-semibold pb-1">E(B-V): Extinction or Reddening</p>
                <p>
                  E(B-V) is the absorption and scattering of electromagnetic radiation by
                  dust and gas between an emitting astronomical object and the observer.
                </p>
                <p>
                  This value is set to the accepted value for the selected cluster and
                  cannot be manually changed by default.
                </p>
              </div>
            </div> */}
          </label>


          {/* Input */}
          <input
            type="number"
            step="0.01"
            value={b_vOffset}
            //disabled
            onChange={(e) => setB_VOffset(parseFloat(e.target.value) || 0)}
            className="px-2 py-1 text-black rounded disabled:bg-gray-500"
          />
        </div>

      </div>

      {/*isochrone controls*/}
      <div className="pt-4 mb-2">
        <button
          type="button"
          onClick={() => setIsIsoOpen(v => !v)}
          aria-expanded={isIsoOpen}
          aria-controls="isochrone-controls"
          className="flex items-center gap-2 rounded px-2 py-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          title={isIsoOpen ? "Hide isochrone controls" : "Show isochrone controls"}
        >
          <h3 className="text-lg font-semibold">Isochrone Controls</h3>
          <span aria-hidden="true">{isIsoOpen ? "▲" : "▼"}</span>
        </button>
      </div>
      {isIsoOpen && (
        <div
          id="isochrone-controls"
          className={`flex gap-4 mb-6`}>
          <div>
            <label className="text-sm flex items-center gap-1">
              Metallicity (Z)
              <TooltipIcon
                title="Metallicity (Z)"
                description="The proportion of elements heavier than hydrogen and helium. Select a standard metallicity for isochrone fitting."
              />
              {/* <div className="group relative flex items-center">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold cursor-pointer">?</div>
              <div className="absolute top-0 left-0 translate-x-4 -translate-y-full w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="font-semibold pb-1">Metallicity (Z)</p>
                <p>
                  The proportion of elements heavier than hydrogen and helium.
                  Choose from standard metallicities for isochrone fitting.
                </p>
              </div>
            </div> */}
            </label>
            <select
              value={plotSettings.z}
              onChange={(e) => setPlotSettings({ ...plotSettings, z: parseFloat(e.target.value) })}
              className="px-2 py-1 text-black rounded"
            >
              {[0.0004, 0.001, 0.004, 0.008, 0.019, 0.03].map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="text-sm flex items-center gap-1">
              log(Age)
              <TooltipIcon
                title="log(Age)"
                description="Controls the logarithmic age of the isochrone curve. Typical range: 7.80 (~63 million years) to 10.25 (~17.8 billion years)."
              />
              {/* <div className="group relative flex items-center">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold cursor-pointer">?</div>
              <div className="absolute top-0 left-0 translate-x-4 -translate-y-full w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="font-semibold pb-1">log(Age)</p>
                <p>
                  Controls the logarithmic age of the isochrone curve.
                  Range: 7.80 (~63 million years) to 10.25 (~17.8 billion years).
                </p>
              </div>
            </div> */}
            </label>
            <input
              type="range"
              min={7.80}
              max={10.25}
              step={0.05}
              value={plotSettings.logAge}
              onChange={(e) => setPlotSettings({ ...plotSettings, logAge: parseFloat(e.target.value) })}
              className="w-64"
            />
            <div className="text-sm mt-1">
              Value: <strong>{plotSettings.logAge.toFixed(2)}</strong>
              
              &nbsp;<strong>( ≈ {(Math.pow(10, plotSettings.logAge) / Math.pow(10, 9)).toFixed(2)} Gyr)</strong>
            </div>
          </div>
          <div>
            <label className="text-sm flex items-center gap-1">
              Isochrone E(B-V)
              <TooltipIcon
                title="Isochrone E(B-V) (horizontal shift)"
                description="Applies an independent reddening offset to the isochrone curves only."
              />
            </label>
            <input
              type="range"
              min={-1.0}
              max={1.0}
              step="0.01"
              value={b_vOffsetIsochrone}
              onChange={(e) => setB_VOffsetIsochrone(parseFloat(e.target.value) || 0)}
              className="w-64"
            />
            <div className="text-sm mt-1">
              Value: <strong>{b_vOffsetIsochrone.toFixed(2)}</strong>
            </div>
          </div>

        </div>)}


      {/* Toggle Options */}
      <div className="flex justify-center rounded-lg gap-4 mb-0 pt-1 pb-1 bg-gray-700 w-full max-w-[600px] mx-auto">

        <label className="flex items-center gap-2">
          <span>Toggle ZAMS</span>
          <input
            type="checkbox"
            checked={isShowingZAMS}
            onChange={() => setIsShowingZAMS(!isShowingZAMS)}
            className="w-4 h-4"
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Toggle Isochrone</span>
          <input
            type="checkbox"
            checked={isShowingIsochrones}
            onChange={() => setIsShowingIsochrones(!isShowingIsochrones)}
            className="w-4 h-4"
          />

        </label>
      </div>

      {/* Chart */}
      <div className={`p-4 rounded-lg flex ${isBGDarkMode ? "bg-black" : "bg-white"} w-full max-w-[600px] mx-auto`} >

        {/* Sidebar for Mv Offset */}
        <div className="w-[5%] flex flex-col justify-center items-center">
          <div className="h-[90%] w-1 rounded bg-gray-400 relative">
            <div
              className="w-4 h-4 rounded-full absolute left-[-6px] cursor-pointer"
              style={{
                backgroundColor: isBGDarkMode ? "white" : "black",
                top: `${100 - (MvOffset) * 5}%`,
              }}
              onMouseDown={(e) => startDrag(e)}
            />
          </div>
          <p className="text-xs mt-2 text-gray-600">V-Mv</p>
        </div>


        <div className="w-[95%]">
          <ResponsiveContainer width="100%" aspect={2 / 3}>
            {/* <ResponsiveContainer width="100%" height={400}> */}
            <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="b_v"
                name="B-V Color Index"
                domain={[-0.5, 2.5]}
                tickCount={7}
                allowDataOverflow={true}
                label={{ value: "B-V", position: "insideBottom", dy: 20 }}
              />
              <YAxis
                type="number"
                dataKey="Mv"
                name="Vmag"
                domain={[0, 21]}
                tickCount={12}
                allowDataOverflow={true}
                label={"V"}
                reversed
              />
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

              {isShowingZAMS && (
                <Line
                  name="ZAMS"
                  type="monotone"
                  dataKey="Mv"
                  data={shiftedZams}
                  stroke={colourScheme.zams}
                  strokeWidth={3}
                  dot={false}
                />
              )}

              {isShowingIsochrones && (
                <Line
                  name="Isochrones"
                  type="monotone"
                  dataKey="Mv"
                  data={shiftedIsochrone}
                  stroke={colourScheme.isochrones}
                  strokeWidth={3}
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="flex justify-center rounded-lg gap-4 mb-4 pt-1 pb-1 bg-gray-700">

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




    </div >
  );
}

export default HRDiagramPlot;
