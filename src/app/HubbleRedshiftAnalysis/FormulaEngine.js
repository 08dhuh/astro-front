export function createLetterIndexMap(columnDefs) {
  return columnDefs.reduce((a, col, idx) => {
    a[col.letter.toLowerCase()] = idx;
    return a;
  }, {});
}

export function evaluateExpression(rawExpr, row, constants, letterMap) {
  if (!rawExpr || !rawExpr.trim()) return "";

  let expr = rawExpr.toLowerCase();

  if (/[^0-9a-n+\-*/^()\s]/.test(expr)) return "";

  expr = expr.replace(/\^/g, "**");

  expr = expr.replace(/\b([a-n])\b/g, (match, p1) => {
    if (p1 >= "a" && p1 <= "j") return `getCol("${p1}")`;
    return `constants["${p1}"]`;
  });

  const getCol = (letter) => {
    const idx = letterMap[letter];
    if (idx == null) return NaN;
    const v = row[idx];
    if (v === "" || v == null) return NaN;
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  };

  try {
    const fn = new Function(
      "row",
      "constants",
      "getCol",
      `"use strict"; return (${expr});`
    );
    const result = fn(row, constants, getCol);
    if (typeof result !== "number" || !Number.isFinite(result)) return "";
    return String(result.toFixed(4));
  } catch {
    return "";
  }
}

export function applyFormulas(rows, formulas, constants, letterMap) {
  const out = rows.map((r) => [...r]);
  for (const [letter, expr] of Object.entries(formulas)) {
    if (!expr || !expr.trim()) continue;
    const idx = letterMap[letter.toLowerCase()];
    if (idx == null) continue;
    for (let i = 0; i < out.length; i++) {
      out[i][idx] = evaluateExpression(expr, out[i], constants, letterMap);
    }
  }
  return out;
}
