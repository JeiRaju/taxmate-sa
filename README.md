# TaxMate SA

An offline-first tax estimator and literacy tool for everyday Australians in Adelaide, South Australia. Built for ATO **FY2024–25**.

The goal isn't just a calculator — it's a plain-language tool that explains *what* the numbers mean, so you can understand your tax situation without paying an accountant for simple questions.

## Features

- **Live tax estimator** — refund/owing calculation updates as you type
- **Bracket visualisation** — see exactly how your income is taxed across brackets
- **LITO, Medicare Levy & Surcharge, HELP/HECS** — all built in
- **Knowledge hub** — 18+ articles covering tax basics, income, deductions, offsets, lodgement, and SA-specific topics (land tax, payroll tax, first home buyer)
- **Search & filter** articles by category or keyword
- **Fully offline** — no API calls, no tracking, no dependencies

## Tech Stack

Vanilla **HTML + CSS + JavaScript (ES Modules)**. No frameworks, no build tools, no `npm install`.

## Running Locally

ES Modules need to be served (not opened directly via `file://`). Pick one:

```bash
# Python
python3 -m http.server 8080

# Node
npx live-server
```

Then open <http://localhost:8080>.

## Project Structure

```
taxmate-sa/
├── index.html              # Calculator (entry point)
├── pages/
│   ├── learn.html          # Knowledge hub
│   └── article.html        # Article reader
├── css/                    # Tokens, global styles, components, page styles
├── js/
│   ├── data/               # ATO rates & knowledge base articles
│   └── modules/            # Calculator, UI, router, learn hub
└── assets/                 # Favicon
```

## Disclaimer

TaxMate SA provides **estimates for educational purposes only**. It is not tax advice. Figures are based on published ATO rates for FY2024–25 and may not reflect your full circumstances. For binding advice, consult a registered tax agent or the ATO directly.
