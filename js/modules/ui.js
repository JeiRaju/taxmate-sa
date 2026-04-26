/**
 * ui.js
 * Wires the calculator form to the calculation engine.
 * Handles DOM updates, localStorage persistence, and reset.
 */

import { calculateTax } from './calculator.js';

const NUMBER_FIELDS = [
  'grossIncome', 'taxWithheld', 'otherIncome', 'rentalIncome',
  'workExpenses', 'selfEducation', 'donations', 'rentalExpenses',
  'otherDeductions', 'helpBalance',
];

function getVal(id) {
  return parseFloat(document.getElementById(id)?.value) || 0;
}

function getBool(id) {
  return document.getElementById(id)?.checked ?? false;
}

function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-AU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function update() {
  const inputs = {
    grossIncome:     getVal('grossIncome'),
    taxWithheld:     getVal('taxWithheld'),
    otherIncome:     getVal('otherIncome'),
    rentalIncome:    getVal('rentalIncome'),
    workExpenses:    getVal('workExpenses'),
    selfEducation:   getVal('selfEducation'),
    donations:       getVal('donations'),
    rentalExpenses:  getVal('rentalExpenses'),
    otherDeductions: getVal('otherDeductions'),
    medicareExempt:  getBool('medicareExempt'),
    privateHealth:   getBool('privateHealth'),
    hasHelp:         getBool('helpDebt'),
    helpBalance:     getVal('helpBalance'),
  };

  const r = calculateTax(inputs);

  // Breakdown rows
  setText('rGross',      fmt(r.totalIncome));
  setText('rDeductions', r.totalDeductions > 0 ? `-${fmt(r.totalDeductions)}` : '$0');
  setText('rTaxable',    fmt(r.taxable));
  setText('rGrossTax',   fmt(r.grossTax));
  setText('rLITO',       r.lito > 0 ? `+${fmt(r.lito)}` : '$0');
  setText('rMedicare',   fmt(r.medicare));
  setText('rMLS',        fmt(r.mls));
  setText('rNetTax',     fmt(r.netTax));
  setText('rWithheld',   r.taxWithheld > 0 ? `+${fmt(r.taxWithheld)}` : '$0');

  const helpRow2 = document.getElementById('helpRow2');
  if (helpRow2) helpRow2.style.display = inputs.hasHelp ? 'flex' : 'none';
  setText('rHELP', fmt(r.helpRepayment));

  // Outcome banner
  const banner = document.getElementById('outcomeBanner');
  const label  = document.getElementById('outcomeLabel');
  const amount = document.getElementById('outcomeAmount');
  const sub    = document.getElementById('outcomeSub');

  if (r.totalIncome === 0) {
    if (banner) banner.className = 'outcome-banner';
    if (label)  { label.className = 'outcome-label'; label.textContent = 'Enter your income to begin'; }
    if (amount) { amount.className = 'outcome-amount'; amount.textContent = '—'; }
    if (sub)    sub.textContent = '';
  } else if (r.isRefund) {
    if (banner) banner.className = 'outcome-banner refund';
    if (label)  { label.className = 'outcome-label refund'; label.textContent = '✦ Estimated Refund'; }
    if (amount) { amount.className = 'outcome-amount refund'; amount.textContent = fmt(r.refundOrOwing); }
    if (sub) sub.textContent = inputs.hasHelp && r.helpRepayment > 0
      ? `Note: ${fmt(r.helpRepayment)} HELP repayment is separate to your refund`
      : 'The ATO owes you money.';
  } else {
    if (banner) banner.className = 'outcome-banner owing';
    if (label)  { label.className = 'outcome-label owing'; label.textContent = '▲ Tax Owing'; }
    if (amount) { amount.className = 'outcome-amount owing'; amount.textContent = fmt(Math.abs(r.refundOrOwing)); }
    if (sub)    sub.textContent = 'You may owe the ATO on assessment.';
  }

  renderBracketBar(r.bracketBreakdown, r.taxable);

  const rateEl = document.getElementById('effectiveRate');
  if (rateEl) {
    rateEl.innerHTML = r.taxable > 0
      ? `<div class="rate-pill">⚡ Effective rate: ${r.effectiveRate}% · Marginal rate: ${r.marginalRate}</div>`
      : '';
  }

  try {
    localStorage.setItem('taxmate_inputs', JSON.stringify({
      ...inputs,
      helpDebt: inputs.hasHelp,
    }));
  } catch {}
}

function renderBracketBar(breakdown, taxable) {
  const bar    = document.getElementById('bracketBar');
  const legend = document.getElementById('bracketLegend');
  if (!bar || !legend) return;

  bar.innerHTML    = '';
  legend.innerHTML = '';
  if (!taxable || !breakdown.length) return;

  for (const seg of breakdown) {
    const pct = ((seg.income / taxable) * 100).toFixed(1);
    const el  = document.createElement('div');
    el.className = 'bracket-segment';
    el.style.cssText = `width:${pct}%;background:${seg.color};`;
    el.setAttribute('data-tip', `${seg.label} on ${fmt(seg.income)} → ${fmt(seg.tax)} tax`);
    bar.appendChild(el);
  }

  for (const seg of breakdown) {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<div class="legend-dot" style="background:${seg.color}"></div>${seg.label} bracket`;
    legend.appendChild(item);
  }
}

function resetAll() {
  for (const id of NUMBER_FIELDS) {
    const el = document.getElementById(id);
    if (el) el.value = '';
  }
  ['medicareExempt', 'privateHealth', 'helpDebt'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
  const helpRow = document.getElementById('helpRow');
  if (helpRow) helpRow.classList.remove('visible');
  try { localStorage.removeItem('taxmate_inputs'); } catch {}
  update();
}

function loadSavedState() {
  try {
    const saved = localStorage.getItem('taxmate_inputs');
    if (!saved) return;
    const state = JSON.parse(saved);

    for (const id of NUMBER_FIELDS) {
      const el = document.getElementById(id);
      if (el && state[id]) el.value = state[id];
    }

    ['medicareExempt', 'privateHealth'].forEach(id => {
      const el = document.getElementById(id);
      if (el && state[id]) el.checked = true;
    });

    const helpEl  = document.getElementById('helpDebt');
    const helpRow = document.getElementById('helpRow');
    if (helpEl && state.helpDebt) {
      helpEl.checked = true;
      if (helpRow) helpRow.classList.add('visible');
    }
  } catch {}
}

function init() {
  loadSavedState();

  for (const id of NUMBER_FIELDS) {
    document.getElementById(id)?.addEventListener('input', update);
  }

  ['medicareExempt', 'privateHealth', 'helpDebt'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', update);
  });

  document.getElementById('helpDebt')?.addEventListener('change', function () {
    document.getElementById('helpRow')?.classList.toggle('visible', this.checked);
  });

  document.getElementById('btnReset')?.addEventListener('click', resetAll);

  update();
}

init();
