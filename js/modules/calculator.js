/**
 * calculator.js
 * Core tax calculation engine.
 * All functions are pure — no DOM access, fully testable.
 */

import { BRACKETS, LITO, MEDICARE, HELP_RATES } from "../data/taxRates.js";

// ─── Gross Tax ────────────────────────────────────────────────────────────────
export function calcGrossTax(taxable) {
  let tax = 0;
  for (const b of BRACKETS) {
    if (taxable <= b.min) break;
    const top = Math.min(taxable, b.max);
    tax += (top - b.min) * b.rate;
  }
  return Math.round(tax * 100) / 100;
}

// ─── LITO ────────────────────────────────────────────────────────────────────
export function calcLITO(taxable) {
  if (taxable <= 37500) return LITO.maxOffset;
  if (taxable <= 45000) return Math.max(0, LITO.maxOffset - (taxable - 37500) * 0.05);
  if (taxable <= 66667) return Math.max(0, 325 - (taxable - 45000) * 0.015);
  return 0;
}

// ─── Medicare Levy ────────────────────────────────────────────────────────────
export function calcMedicareLevy(taxable, exempt = false) {
  if (exempt) return 0;
  const { shadeInThreshold, shadeInRate, rate } = MEDICARE;
  if (taxable <= shadeInThreshold) return 0;
  if (taxable <= shadeInThreshold / (1 - shadeInRate / rate)) {
    return Math.round((taxable - shadeInThreshold) * shadeInRate * 100) / 100;
  }
  return Math.round(taxable * rate * 100) / 100;
}

// ─── Medicare Levy Surcharge ──────────────────────────────────────────────────
export function calcMLS(taxable, hasPrivateHealth = false) {
  if (hasPrivateHealth) return 0;
  const bracket = [...MEDICARE.surcharge].reverse().find(b => taxable > b.min);
  if (!bracket || bracket.rate === 0) return 0;
  return Math.round(taxable * bracket.rate * 100) / 100;
}

// ─── HELP Repayment ───────────────────────────────────────────────────────────
export function calcHELPRepayment(taxable) {
  const bracket = [...HELP_RATES].reverse().find(b => taxable >= b.min);
  if (!bracket || bracket.rate === 0) return 0;
  return Math.round(taxable * bracket.rate * 100) / 100;
}

// ─── Marginal Rate ────────────────────────────────────────────────────────────
export function getMarginalRate(taxable) {
  const bracket = [...BRACKETS].reverse().find(b => taxable > b.min);
  return bracket ? bracket.label : "0%";
}

// ─── Effective Rate ───────────────────────────────────────────────────────────
export function getEffectiveRate(netTax, taxable) {
  if (taxable <= 0) return 0;
  return Math.round((netTax / taxable) * 10000) / 100; // 2 decimal places
}

// ─── Full Tax Summary ─────────────────────────────────────────────────────────
/**
 * @param {Object} inputs
 * @returns {Object} Full tax calculation result
 */
export function calculateTax(inputs) {
  const {
    grossIncome = 0,
    taxWithheld = 0,
    otherIncome = 0,
    rentalIncome = 0,
    workExpenses = 0,
    selfEducation = 0,
    donations = 0,
    rentalExpenses = 0,
    otherDeductions = 0,
    medicareExempt = false,
    privateHealth = false,
    hasHelp = false,
    helpBalance = 0,
  } = inputs;

  const totalIncome = grossIncome + otherIncome + rentalIncome;
  const totalDeductions = workExpenses + selfEducation + donations + rentalExpenses + otherDeductions;
  const taxable = Math.max(0, totalIncome - totalDeductions);

  const grossTax = calcGrossTax(taxable);
  const lito = calcLITO(taxable);
  const medicare = calcMedicareLevy(taxable, medicareExempt);
  const mls = calcMLS(taxable, privateHealth);
  const netTax = Math.max(0, grossTax - lito + medicare + mls);

  const helpAnnual = hasHelp ? calcHELPRepayment(taxable) : 0;
  const helpRepayment = hasHelp && helpBalance > 0
    ? Math.min(helpAnnual, helpBalance)
    : helpAnnual;

  const refundOrOwing = taxWithheld - netTax;
  const effectiveRate = getEffectiveRate(netTax, taxable);
  const marginalRate = getMarginalRate(taxable);

  // Bracket segment breakdown for visualisation
  const bracketBreakdown = BRACKETS.map(b => ({
    ...b,
    income: Math.max(0, Math.min(taxable, b.max === Infinity ? taxable : b.max) - b.min),
    tax: 0,
  })).filter(b => b.income > 0).map(b => ({
    ...b,
    tax: Math.round(b.income * b.rate * 100) / 100,
  }));

  return {
    totalIncome,
    totalDeductions,
    taxable,
    grossTax,
    lito,
    medicare,
    mls,
    netTax,
    taxWithheld,
    helpRepayment,
    refundOrOwing,
    effectiveRate,
    marginalRate,
    bracketBreakdown,
    isRefund: refundOrOwing >= 0,
  };
}
