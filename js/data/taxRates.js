/**
 * taxRates.js
 * ATO tax rates, thresholds & offsets — FY2024–25
 * Source: ato.gov.au
 *
 * To update for a new financial year:
 *  1. Update CURRENT_FY
 *  2. Update BRACKETS with new rates/thresholds
 *  3. Update LITO_THRESHOLDS if changed
 *  4. Update MEDICARE thresholds
 *  5. Update HELP_RATES with new repayment thresholds
 */

export const CURRENT_FY = "2024–25";

// ─── Income Tax Brackets (Australian Resident) ───────────────────────────────
export const BRACKETS = [
  { min: 0,      max: 18200,     rate: 0,     label: "0%",    color: "#3d444d" },
  { min: 18201,  max: 45000,     rate: 0.19,  label: "19%",   color: "#2d6a4f" },
  { min: 45001,  max: 135000,    rate: 0.325, label: "32.5%", color: "#1e8a5a" },
  { min: 135001, max: 190000,    rate: 0.37,  label: "37%",   color: "#f0b429" },
  { min: 190001, max: Infinity,  rate: 0.45,  label: "45%",   color: "#f85149" },
];
// Note: Stage 3 tax cuts applied from 1 July 2024
// $120k–$135k threshold raised; $45k–$120k rate dropped to 32.5%

// ─── Low Income Tax Offset (LITO) ────────────────────────────────────────────
export const LITO = {
  maxOffset: 700,
  thresholds: [
    { upTo: 37500,  reduction: 0 },
    { upTo: 45000,  reductionRate: 0.05,  base: 700,  from: 37500 },
    { upTo: 66667,  reductionRate: 0.015, base: 325,  from: 45000 },
  ],
};

// ─── Medicare Levy ────────────────────────────────────────────────────────────
export const MEDICARE = {
  rate: 0.02,
  shadeInThreshold: 26000,  // single, no dependants
  shadeInRate: 0.10,
  // Surcharge thresholds (no private hospital cover)
  surcharge: [
    { min: 0,       max: 93000,   rate: 0 },
    { min: 93001,   max: 108000,  rate: 0.01 },
    { min: 108001,  max: 144000,  rate: 0.0125 },
    { min: 144001,  max: Infinity,rate: 0.015 },
  ],
};

// ─── HELP / HECS Repayment Rates (FY2024–25) ─────────────────────────────────
export const HELP_RATES = [
  { min: 0,       max: 54434,  rate: 0 },
  { min: 54435,   max: 62738,  rate: 0.01 },
  { min: 62739,   max: 70973,  rate: 0.02 },
  { min: 70974,   max: 74980,  rate: 0.025 },
  { min: 74981,   max: 79185,  rate: 0.03 },
  { min: 79186,   max: 83571,  rate: 0.035 },
  { min: 83572,   max: 88198,  rate: 0.04 },
  { min: 88199,   max: 91009,  rate: 0.045 },
  { min: 91010,   max: 100813, rate: 0.05 },
  { min: 100814,  max: 107213, rate: 0.055 },
  { min: 107214,  max: 113613, rate: 0.06 },
  { min: 113614,  max: 119517, rate: 0.065 },
  { min: 119518,  max: 126270, rate: 0.07 },
  { min: 126271,  max: 134552, rate: 0.075 },
  { min: 134553,  max: 143074, rate: 0.08 },
  { min: 143075,  max: 151599, rate: 0.085 },
  { min: 151600,  max: 159235, rate: 0.09 },
  { min: 159236,  max: Infinity, rate: 0.10 },
];

// ─── SA Land Tax Rates (2024–25, individual) ─────────────────────────────────
export const SA_LAND_TAX = {
  note: "Applies to SA land not used as principal place of residence",
  brackets: [
    { min: 0,       max: 834000,  rate: 0,      fixed: 0 },
    { min: 834001,  max: 1252000, rate: 0.005,  fixed: 0 },
    { min: 1252001, max: 2503000, rate: 0.0175, fixed: 2090 },
    { min: 2503001, max: Infinity,rate: 0.035,  fixed: 23982.5 },
  ],
};

// ─── SA Payroll Tax ───────────────────────────────────────────────────────────
export const SA_PAYROLL_TAX = {
  note: "Applies to employers with SA wages above the threshold",
  threshold: 1500000,
  rate: 0.049,
};
