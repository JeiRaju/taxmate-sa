# TaxMate SA — Project Initialization Brief
> For use with Claude Code. Read this file fully before making any changes or additions.

---

## Project Overview

**TaxMate SA** is an offline-first, multi-page web application that helps everyday Australians in Adelaide, South Australia understand and estimate their tax obligations — without needing any prior tax knowledge.

The goal is not just a calculator, but a **tax literacy tool**: plain-language education, guided inputs with contextual explanations, and a clean results experience that demystifies the ATO process.

**Tech stack:** Vanilla HTML + CSS + JavaScript (ES Modules). No build tools, no frameworks, no dependencies. Must work by opening `index.html` directly in a browser with no server required (note: ES modules require a local server or relative imports — use a simple `live-server` or Python's `http.server` for development).

**Target user:** An everyday Adelaide resident with no tax knowledge — a student, wage worker, renter, or someone with a side hustle — who wants to understand their tax situation without paying an accountant for simple questions.

**Scope (current):** South Australia / ATO rules, FY2024–25. Designed with expansion in mind (other states, future financial years).

---

## Repository Structure

```
taxmate-sa/
├── index.html                  # Home + Calculator page
├── pages/
│   ├── learn.html              # Knowledge hub (article listing)
│   └── article.html            # Individual article reader
├── css/
│   ├── tokens.css              # Design tokens (CSS variables)
│   ├── main.css                # Global styles, typography, layout
│   ├── calculator.css          # Calculator page styles
│   ├── learn.css               # Knowledge hub styles
│   └── components.css          # Shared components (cards, toggles, inputs, callouts)
├── js/
│   ├── data/
│   │   ├── taxRates.js         # ✅ DONE — ATO rates & thresholds
│   │   └── taxKnowledge.js     # ✅ DONE — Knowledge base articles
│   └── modules/
│       ├── calculator.js       # ✅ DONE — Pure calculation engine
│       ├── ui.js               # ❌ TODO — DOM rendering & reactive updates
│       ├── router.js           # ❌ TODO — Client-side hash router
│       └── learn.js            # ❌ TODO — Knowledge hub rendering & search
├── assets/
│   └── favicon.svg             # ❌ TODO — Simple SVG favicon
├── .gitignore                  # ❌ TODO
└── README.md                   # ❌ TODO
```

---

## What Is Already Built

### `js/data/taxRates.js`
Exports all ATO FY2024–25 constants:
- `CURRENT_FY` — string "2024–25"
- `BRACKETS` — 5 income tax brackets (Stage 3 cuts applied: 32.5% up to $135k, 37% up to $190k)
- `LITO` — Low Income Tax Offset thresholds (max $700, tapers to $0 at $66,667)
- `MEDICARE` — 2% levy, shade-in threshold ~$26k, surcharge tiers ($93k/$108k/$144k)
- `HELP_RATES` — 18 repayment bands from $54,435 (1%) to $159,236+ (10%)
- `SA_LAND_TAX` — RevenueSA land tax brackets (individual, not PPOR)
- `SA_PAYROLL_TAX` — 4.9% above $1.5M threshold

### `js/data/taxKnowledge.js`
Exports:
- `CATEGORIES` — 6 categories: basics, income, deductions, offsets, lodgement, sa-specific
- `ARTICLES` — 18 articles, each with: `id`, `category`, `title`, `icon`, `difficulty` (beginner/intermediate/advanced), `summary`, `body` (HTML string), `tags`

Article list:
| ID | Category | Title |
|----|----------|-------|
| what-is-tax-return | basics | What is a Tax Return? |
| financial-year | basics | Australia's Financial Year Explained |
| how-tax-brackets-work | basics | How Tax Brackets Work |
| taxable-income | basics | What is Taxable Income? |
| employment-income | income | Salary & Wages Income |
| side-income | income | Side Income & the Gig Economy |
| rental-income | income | Rental Income |
| interest-dividends | income | Interest & Dividends |
| work-related-deductions | deductions | Work-Related Deductions |
| working-from-home | deductions | Working From Home Deductions |
| self-education | deductions | Self-Education Expenses |
| car-vehicle | deductions | Car & Vehicle Expenses |
| lito-explained | offsets | Low Income Tax Offset (LITO) |
| medicare-explained | offsets | Medicare Levy & Surcharge |
| help-hecs | offsets | HELP / HECS Debt Repayments |
| how-to-lodge | lodgement | How to Lodge Your Tax Return |
| tax-help-program | lodgement | Free Tax Help in Adelaide |
| sa-land-tax | sa-specific | SA Land Tax |
| sa-first-home-buyer | sa-specific | First Home Buyer Grants & Stamp Duty (SA) |
| sa-payroll-tax | sa-specific | SA Payroll Tax (for Employers) |

### `js/modules/calculator.js`
Pure functions (no DOM access):
- `calcGrossTax(taxable)` — applies bracket rates
- `calcLITO(taxable)` — LITO offset amount
- `calcMedicareLevy(taxable, exempt)` — Medicare levy with shade-in
- `calcMLS(taxable, hasPrivateHealth)` — Medicare Levy Surcharge
- `calcHELPRepayment(taxable)` — annual HELP repayment
- `getMarginalRate(taxable)` — string label e.g. "32.5%"
- `getEffectiveRate(netTax, taxable)` — percentage, 2 decimal places
- `calculateTax(inputs)` — master function, takes full inputs object, returns full result object

`calculateTax` input shape:
```js
{
  grossIncome, taxWithheld, otherIncome, rentalIncome,
  workExpenses, selfEducation, donations, rentalExpenses, otherDeductions,
  medicareExempt, privateHealth, hasHelp, helpBalance
}
```

`calculateTax` return shape:
```js
{
  totalIncome, totalDeductions, taxable,
  grossTax, lito, medicare, mls, netTax,
  taxWithheld, helpRepayment,
  refundOrOwing, effectiveRate, marginalRate,
  bracketBreakdown,   // array of { label, color, income, tax, rate }
  isRefund            // boolean
}
```

---

## Design System

### Aesthetic Direction
Dark theme. Editorial / refined utilitarian. Feels like a premium financial tool — not a government form.

- **Heading font:** `DM Serif Display` (Google Fonts) — italic variant used for emphasis
- **Mono font:** `DM Mono` — all numbers, amounts, codes, labels
- **Body font:** `DM Sans` — UI text, descriptions, prose

### CSS Token Reference (to be defined in `tokens.css`)
```css
:root {
  /* Backgrounds */
  --bg:        #0d1117;
  --surface:   #161b22;
  --surface2:  #1c2330;
  --border:    #30363d;

  /* Text */
  --text:       #e6edf3;
  --text-muted: #7d8590;
  --text-dim:   #484f58;

  /* Accent */
  --accent:   #f0b429;   /* gold — primary CTA, highlights */
  --refund:   #3fb950;   /* green — refund outcomes */
  --owing:    #f85149;   /* red — owing outcomes */

  /* Bracket colours (income segments) */
  --bracket-0:    #3d444d;
  --bracket-19:   #2d6a4f;
  --bracket-325:  #1e8a5a;
  --bracket-37:   #f0b429;
  --bracket-45:   #f85149;

  /* Spacing scale */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  /* Transitions */
  --transition: 0.2s ease;
}
```

### Background Treatment
Subtle dot-grid or line-grid overlay on `--bg` using a CSS `::before` pseudo-element with `background-image` using `linear-gradient` lines at `--border` color, 48px spacing, 25% opacity.

### Component Patterns
These components are used across the app and should be defined in `components.css`:

**`.card`** — `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-md)`, `padding: var(--space-lg)`

**`.section-label`** — DM Mono, 10px, uppercase, letter-spacing 0.12em, `--text-dim` colour, with a horizontal rule extending to the right

**`.input-wrap`** — relative container; `.prefix` span (the `$` sign) absolutely positioned left; `input[type=number]` with DM Mono font, `--surface2` bg, no spin buttons

**`.toggle`** — custom checkbox slider (40×22px pill), gold when checked

**`.knowledge-callout`** — contextual inline callout boxes inside article body:
- `.tip` — gold left border, gold-tinted background
- `.warning` — red left border, red-tinted background
- `.example` — blue-grey left border, neutral background
- `.formula` — monospace, dark background, centered

**`.knowledge-table`** — styled table for rate tables in articles; full-width, striped rows, `--border` borders

**`.difficulty-badge`** — small pill: beginner=green, intermediate=amber, advanced=red

---

## Pages & Features

### `index.html` — Calculator Page

**Layout:** Single column, max-width 900px, centered.

**Header:**
- Badge: `ATO · FY2024–25` (gold pill with pulsing dot)
- H1: `Your Tax Return Estimator` (DM Serif Display, italic "Tax Return")
- Subtitle: `Adelaide, South Australia · FY2024–25`
- Nav links to Learn page

**Calculator Sections (accordion or stacked cards):**

1. **Income** — 4 fields:
   - Gross Employment Income (before tax)
   - Tax Withheld by Employer
   - Other Income (interest, freelance, ABN)
   - Rental Income

2. **Deductions** — 5 fields:
   - Work-Related Expenses
   - Self-Education Expenses
   - Charitable Donations (DGR only)
   - Rental Property Expenses
   - Other Deductions

3. **Your Situation** — toggle switches:
   - LITO (auto-applied, read-only indicator)
   - Medicare Levy Exemption
   - Private Hospital Cover
   - HELP/HECS Debt (reveals balance input when toggled on)

4. **Results Panel** (always visible / sticky on desktop):
   - Large outcome banner: green "Estimated Refund $X,XXX" or red "Tax Owing $X,XXX"
   - Breakdown table (gross → deductions → taxable → gross tax → LITO → Medicare → net tax → withheld → result)
   - Bracket visualisation bar (coloured segments proportional to income in each bracket)
   - Effective rate pill + marginal rate

**UX requirements:**
- All calculations update live on every input change (no submit button)
- Each input field has a small `?` tooltip or inline hint explaining what to enter
- Empty state shows a friendly prompt, not zeros
- "Learn more" contextual links from inputs (e.g., "What counts as work expenses?" links to the deductions article)
- Reset button at bottom

### `pages/learn.html` — Knowledge Hub

**Layout:** Max-width 1000px, centered.

**Header:** "Tax Knowledge" heading, subtitle, search bar.

**Category filter tabs:** Pills for each of the 6 categories + "All".

**Article grid:** 3-col on desktop, 2-col tablet, 1-col mobile. Each card shows:
- Icon + category
- Title
- Summary (2 lines max, truncated)
- Difficulty badge (beginner/intermediate/advanced)
- Arrow link

**Search:** Client-side filter across title, summary, and tags. Filters the grid in real time.

**"Start Here" featured section:** Highlights 3 beginner articles at the top for first-time visitors.

### `pages/article.html` — Article Reader

**Layout:** Max-width 720px, centered (readable prose width).

**Features:**
- Back button → returns to learn.html
- Article header: icon, category breadcrumb, title, difficulty badge
- Body rendered from the `body` HTML string in taxKnowledge.js
- Styled callout boxes (`.tip`, `.warning`, `.example`, `.formula`)
- Styled tables for rate tables
- "Related Articles" section at bottom (2–3 articles from same category)
- Article ID passed via URL hash: `article.html#working-from-home`

### Routing
Use a simple hash-based router. No server needed. `router.js` reads `window.location.hash` to determine which content to render. The article page reads the hash to know which article to display.

---

## Navigation Structure

```
index.html          ← Calculator (main entry point)
  └── "Learn" link →  pages/learn.html
                          └── Article card click → pages/article.html#[article-id]
                                                        └── Back → pages/learn.html
```

A persistent top nav bar should appear on all pages with:
- Left: TaxMate SA logo/wordmark
- Right: "Calculator" and "Learn" links
- Active state on current page

---

## Non-Functional Requirements

- **Fully offline:** No API calls, no CDN dependencies in production (fonts can be self-hosted or loaded from Google Fonts with a graceful fallback)
- **No frameworks:** Vanilla JS ES Modules only
- **No build step:** Works by serving the folder with any static server
- **Mobile responsive:** All pages must work on 375px+ screens
- **Accessible:** Semantic HTML, ARIA labels on interactive elements, sufficient colour contrast
- **Persistent state (optional nice-to-have):** Save calculator inputs to `localStorage` so they survive a page refresh

---

## Future Expansion Notes

The codebase should be structured to make these future additions straightforward:

- **New financial years:** Add a new export to `taxRates.js` and update `CURRENT_FY`. The calculator should accept a `fy` parameter.
- **Other Australian states:** The `sa-specific` category in the knowledge base and `SA_LAND_TAX` / `SA_PAYROLL_TAX` in taxRates are isolated — new states can be added without touching existing logic.
- **More income types:** Capital gains, super contributions, trust distributions — add new fields to the calculator inputs object and extend `calculateTax()`.
- **Tax agent directory:** A future `pages/agents.html` could list Adelaide-based registered tax agents with their specialities.
- **PAYG withholding estimator:** A tool to help people set the right withholding on their tax declaration form to avoid a surprise bill.

---

## Development Setup

```bash
# Clone and serve locally
git clone <your-repo-url>
cd taxmate-sa

# Option 1: Python
python3 -m http.server 8080

# Option 2: Node
npx live-server

# Open in browser
open http://localhost:8080
```

No `npm install`, no build process, no config files needed.

---

## Code Style Conventions

- ES Modules throughout (`import`/`export`) — no CommonJS
- camelCase for variables and functions
- UPPER_SNAKE_CASE for exported data constants
- JSDoc comments on all exported functions
- CSS: BEM-lite naming (`.block__element--modifier` where needed, otherwise flat class names)
- No inline styles in HTML — all styling via CSS classes
- Keep JS files focused: data files export only data, module files export only functions, page scripts wire things together

---

*Last updated by Claude (claude.ai) — Session: TaxMate SA initial build*
*Files completed: taxRates.js, taxKnowledge.js, calculator.js*
*Files remaining: all HTML, CSS, ui.js, router.js, learn.js, README.md, .gitignore*
