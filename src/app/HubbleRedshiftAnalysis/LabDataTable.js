//"use client";
//import { useState } from "react";

//Todo
const columnDefs = [
  { label: "Galaxy name", type: "input" },
  { label: "Measured λ₀,H", type: "input" },
  { label: "Measured λ₀,K", type: "input" },
  { label: "Redshift Δλ (H)", type: "input" },
  { label: "Redshift Δλ (K)", type: "input" },
  { label: "Velocity from H (km/s)", type: "input" },
  { label: "Velocity from K (km/s)", type: "input" },
  { label: "Average velocity (km/s)", type: "input" },
  { label: "Apparent magnitude", type: "input" },
  { label: "Distance (Mpc)", type: "input" },
];

export default function LabDataTable({ rows, setRows }) {
  //const [rows, setRows] = useState([Array(columnDefs.length).fill("")]);

  const handleChange = (rowIdx, colIdx, value) => {
    const updated = [...rows];
    updated[rowIdx][colIdx] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, Array(columnDefs.length).fill("")]);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updated = [...rows];
      updated.splice(index, 1);
      setRows(updated);
    }
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg p-4 mb-6">
      <table className="min-w-full border-collapse text-sm text-black">
        <thead>
          <tr>
            {columnDefs.map((col, idx) => (
              <th
                key={idx}
                className={`px-3 py-2 border-b font-semibold text-left ${
                  col.type === "output" ? "bg-gray-100" : "bg-white"
                }`}
              >
                {col.label}
              </th>
            ))}
            <th className="px-3 py-2 border-b text-left font-semibold bg-white">
              {/* Empty header for delete column */}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {row.map((cell, colIdx) => (
                <td key={colIdx} className="px-3 py-2">
                  <input
                    type="text"
                    className={`w-full border border-gray-300 px-2 py-1 rounded text-sm ${
                      columnDefs[colIdx].type === "output"
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-white"
                    }`}
                    value={cell}
                    onChange={(e) =>
                      handleChange(rowIdx, colIdx, e.target.value)
                    }
                    disabled={columnDefs[colIdx].type === "output"}
                  />
                </td>
              ))}
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
