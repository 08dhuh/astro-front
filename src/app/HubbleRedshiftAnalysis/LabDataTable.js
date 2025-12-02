"use client";
import { useState } from "react";
import galaxyMetadata from "@/data/galaxy_meta.json";
import { createLetterIndexMap, applyFormulas } from "./FormulaEngine";

//Todo
const columnDefs = [
  { letter: "A", key: "galaxy", label: "Galaxy name", role: "input" },
  { letter: "B", key: "lambda_K", label: "Measured λ,K (Å)", role: "input" },
  { letter: "C", key: "lambda_H", label: "Measured λ,H (Å)", role: "input" },
  { letter: "D", key: "z_K", label: "Redshift from Δλ Ca II K", role: "computed" },
  { letter: "E", key: "z_H", label: "Redshift from Δλ Ca II H", role: "computed" },
  { letter: "F", key: "v_K", label: "Velocity from K (km/s)", role: "computed" },
  { letter: "G", key: "v_H", label: "Velocity from H (km/s)", role: "computed" },
  { letter: "H", key: "v_avg", label: "Average velocity", role: "computed" },
  { letter: "I", key: "m_B", label: "Apparent magnitude (B)", role: "auto" },
  { letter: "J", key: "distance", label: "Distance (Mpc)", role: "computed" },
];
const letterMap = createLetterIndexMap(columnDefs);

const CONSTANTS = {
  k: 3933.7,
  l: 3968.5,
  m: -22,
  n: 3e5,
};

const initialFormulas = {
  D: "",
  E: "",
  F: "",
  G: "",
  H: "(F+G)/2",
  J: "",
};

const correctFormulas = { //debugging purposes only
  D: "(B - k) / k",
  E: "(C - l) / l",
  F: "D*n",
  G: "E*n",
  H: "(F + G) / 2",
  J: "10^((I - m - 25)/5)",
};


const GALAXY_NAME_COL = columnDefs.findIndex(
  (col) => col.key === "galaxy"
);

const APP_MAG_COL = columnDefs.findIndex(
  (col) => col.key === "m_B"
);

function isValidNumber(value) {
  const regex = /^-?(?:\d+\.?\d*|\.\d+)$/;
  return regex.test(value);
}


export default function LabDataTable({ rows, setRows }) {
  //const [rows, setRows] = useState([Array(columnDefs.length).fill("")]);
  const [formulas, setFormulas] = useState(initialFormulas);
  //const [formulas, setFormulas] = useState(correctFormulas);

  const handleGalaxyNameChange = (rowIdx, value) => {
    const updated = [...rows];
    updated[rowIdx] = [...updated[rowIdx]];
    updated[rowIdx][GALAXY_NAME_COL] = value;

    const filteredGalaxies = galaxyMetadata.filter((g) =>
      g.id.toLowerCase().includes(value.toLowerCase())
    );

    const exactMatch = filteredGalaxies.find(
      (g) => g.id.toLowerCase() === value.toLowerCase()
    );

    if (exactMatch && typeof exactMatch.flux_b !== "undefined") {
      updated[rowIdx][APP_MAG_COL] = String(exactMatch.flux_b);
    } else {
      updated[rowIdx][APP_MAG_COL] = "";
    }

    const withComputed = applyFormulas(updated, formulas, CONSTANTS, letterMap);
    setRows(withComputed);
  };



  const handleChange = (rowIdx, colIdx, value) => {
    const updated = [...rows];
    updated[rowIdx] = [...updated[rowIdx]];
    updated[rowIdx][colIdx] = value;
    const withComputed = applyFormulas(updated, formulas, CONSTANTS, letterMap);
    setRows(withComputed);
  };


  const addRow = () => {
    const updated = [...rows, Array(columnDefs.length).fill("")];
    const withComputed = applyFormulas(updated, formulas, CONSTANTS, letterMap);
    setRows(withComputed);
  };


  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updated = [...rows];
      updated.splice(index, 1);
      const withComputed = applyFormulas(updated, formulas, CONSTANTS, letterMap);
      setRows(withComputed);
    }
  };


  return (
    <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg p-4 mb-6">
      <details open className="mb-6">
        <summary className="text-lg font-semibold text-center cursor-pointer">
          Column definitions(A - J) and constants(k - n)
        </summary>

        <div className="mt-4 text-sm flex justify-center">
          <div className="w-full max-w-2xl">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 items-start">
              <div className="space-y-1 text-left">
                <div><span className="font-mono font-semibold">A</span>: Galaxy name</div>
                <div><span className="font-mono font-semibold">B</span>: Measured Ca II K line wavelength (Å)</div>
                <div><span className="font-mono font-semibold">C</span>: Measured Ca II H line wavelength (Å)</div>
                <div><span className="font-mono font-semibold">D</span>: Redshift from Δ Ca II K</div>
                <div><span className="font-mono font-semibold">E</span>: Redshift from Δ Ca II H</div>
                <div><span className="font-mono font-semibold">F</span>: Velocity from K (km/s)</div>
                <div><span className="font-mono font-semibold">G</span>: Velocity from H (km/s)</div>
                <div><span className="font-mono font-semibold">H</span>: Average velocity (km/s)</div>
                <div><span className="font-mono font-semibold">I</span>: Apparent magnitude B</div>
                <div><span className="font-mono font-semibold">J</span>: Distance (Mpc)</div>
              </div>

              <div className="space-y-1 text-left">
                <div><span className="font-mono font-semibold">k</span>: 3933.7 Å (rest Ca II K)</div>
                <div><span className="font-mono font-semibold">l</span>: 3968.5 Å (rest Ca II H)</div>
                <div><span className="font-mono font-semibold">m</span>: −22 (absolute magnitude)</div>
                <div><span className="font-mono font-semibold">n</span>: 3×10⁵ km/s (speed of light)</div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <details open className="mb-12">
        <summary className="text-lg font-semibold text-center cursor-pointer">
          Formulae
        </summary>

        <div className="mt-4 text-sm flex justify-center">
          <div className="w-full max-w-2xl space-y-4">

            <p className="text-center">
              Define column relations using A–J and k–n.
              Use + − * / ( ) and ^ for exponents.<br />
              Example: <span className="font-mono">D = (B + k) / k</span>
            </p>

            <div className="space-y-2 text-left">
              {["D", "E", "F", "G", "H", "J"].map((letter) => (
                <div key={letter} className="flex items-center gap-2">
                  <span className="font-mono font-semibold w-6 text-right">{letter} = </span>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 px-2 py-1 rounded text-sm"
                    value={formulas[letter]}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (/[^0-9A-Na-n+\-*/^()\s]/.test(raw)) return;
                      const f = { ...formulas, [letter]: raw };
                      setFormulas(f);
                      const computed = applyFormulas(rows, f, CONSTANTS, letterMap);
                      setRows(computed);
                    }}
                  />


                </div>
              ))}
            </div>

          </div>
        </div>
      </details>


      <table className="min-w-full border-collapse text-sm text-black">
        <thead>
          <tr>
            {columnDefs.map((col, idx) => (
              <th
                key={idx}
                className="px-3 py-1 border-b font-semibold text-center bg-white"
              >
                {col.letter}
              </th>
            ))}
            <th className="px-3 py-1 border-b text-center font-semibold bg-white" />
          </tr>
          <tr>
            {columnDefs.map((col, idx) => (
              <th
                key={idx}
                className="px-3 py-2 border-b font-semibold text-center bg-white"
              >
                {col.label}
              </th>
            ))}
            <th className="px-3 py-2 border-b text-left font-semibold bg-white" />
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {row.map((cell, colIdx) => {
                const isGalaxyNameCol = colIdx === GALAXY_NAME_COL;

                return (
                  <td key={colIdx} className="px-3 py-2">
                    <input
                      type="text"
                      list={isGalaxyNameCol ? "galaxy-names" : undefined}
                      className={`w-full border px-2 py-1 rounded text-sm ${columnDefs[colIdx].role !== "input" ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        } ${(columnDefs[colIdx].key === "lambda_K" || columnDefs[colIdx].key === "lambda_H") &&
                          cell !== "" &&
                          !isValidNumber(cell)
                          ? "border-red-500"
                          : "border-gray-300"
                        }`}
                      value={cell}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          (columnDefs[colIdx].key === "lambda_K" ||
                            columnDefs[colIdx].key === "lambda_H") &&
                          value !== "" &&
                          !isValidNumber(value)
                        ) {
                          return;
                        }
                        if (isGalaxyNameCol) {
                          handleGalaxyNameChange(rowIdx, value);
                        } else {
                          handleChange(rowIdx, colIdx, value);
                        }
                      }}

                      disabled={columnDefs[colIdx].role !== "input"}
                    />


                  </td>
                )
              })}
              <td className="px-3 py-2">
                {rows.length > 1 && (
                  <button
                    onClick={() => deleteRow(rowIdx)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <datalist id="galaxy-names">
        {galaxyMetadata.map((g) => (
          <option key={g.id} value={g.id} />
        ))}
      </datalist>

      <button
        onClick={addRow}
        className="flex items-center gap-2 text-blue-600 mt-4 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a.5.5 0 0 1 .5.5V7.5H14a.5.5 0 0 1 0 1H8.5V14a.5.5 0 0 1-1 0V8.5H2a.5.5 0 0 1 0-1h5.5V1.5A.5.5 0 0 1 8 1z" />
        </svg>
        Add Row
      </button>
    </div>
  );
}
