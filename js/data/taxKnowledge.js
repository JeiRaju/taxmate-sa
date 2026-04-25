/**
 * taxKnowledge.js
 * Plain-language tax knowledge base for everyday Australians.
 * Scoped to South Australia / ATO rules FY2024–25.
 *
 * Each article has:
 *  - id, category, title, icon
 *  - summary (1–2 sentences shown in card)
 *  - body (HTML string rendered in the learn panel)
 *  - tags (for search/filter)
 *  - difficulty: "beginner" | "intermediate" | "advanced"
 */

export const CATEGORIES = [
  { id: "basics",      label: "Tax Basics",        icon: "📚" },
  { id: "income",      label: "Income Types",       icon: "💰" },
  { id: "deductions",  label: "Deductions",         icon: "🧾" },
  { id: "offsets",     label: "Offsets & Rebates",  icon: "⚡" },
  { id: "lodgement",   label: "Lodging Your Return",icon: "📬" },
  { id: "sa-specific", label: "SA Specific",        icon: "🗺️" },
];

export const ARTICLES = [
  // ── BASICS ───────────────────────────────────────────────────────────────
  {
    id: "what-is-tax-return",
    category: "basics",
    title: "What is a Tax Return?",
    icon: "📄",
    difficulty: "beginner",
    summary: "Every year, Australians tell the ATO how much they earned and what they spent — your refund or bill comes from this.",
    tags: ["return", "ATO", "basics", "refund"],
    body: `
      <p>A <strong>tax return</strong> is a form you lodge with the Australian Tax Office (ATO) each year, covering the financial year from <strong>1 July to 30 June</strong>.</p>
      <p>It tells the ATO:</p>
      <ul>
        <li>How much money you earned (from work, investments, rent, etc.)</li>
        <li>How much tax your employer already took out of your pay</li>
        <li>What legitimate work-related expenses you spent money on</li>
      </ul>
      <p>The ATO then works out whether you paid the <em>right</em> amount of tax throughout the year. If you paid too much — you get a <strong>refund</strong>. If you paid too little — you owe the ATO money.</p>
      <div class="knowledge-callout tip">
        <strong>💡 Did you know?</strong> Most Australians receive a refund because employers often withhold slightly more tax than necessary as a buffer.
      </div>
      <p>The deadline to lodge your return is <strong>31 October</strong> each year (for the previous financial year). If you use a registered tax agent, you may get an extension.</p>
    `,
  },
  {
    id: "financial-year",
    category: "basics",
    title: "Australia's Financial Year Explained",
    icon: "📅",
    difficulty: "beginner",
    summary: "Australia's tax year runs July to June — not January to December like many other countries.",
    tags: ["financial year", "FY", "dates", "lodgement"],
    body: `
      <p>Unlike most calendar-year countries, Australia's <strong>financial year (FY)</strong> runs from <strong>1 July to 30 June</strong>.</p>
      <p>So "FY2024–25" means 1 July 2024 to 30 June 2025.</p>
      <div class="knowledge-callout tip">
        <strong>📅 Key Dates</strong><br>
        <strong>1 July</strong> — New financial year begins<br>
        <strong>31 July</strong> — ATO starts processing returns<br>
        <strong>31 October</strong> — Deadline to lodge (self-lodging)<br>
        <strong>15 May</strong> — Extended deadline if using a tax agent
      </div>
      <p>When you receive a <strong>payment summary</strong> or <strong>income statement</strong> from your employer, it covers the full financial year (July–June), not a calendar year.</p>
    `,
  },
  {
    id: "how-tax-brackets-work",
    category: "basics",
    title: "How Tax Brackets Work",
    icon: "📊",
    difficulty: "beginner",
    summary: "Australia uses a progressive tax system — you only pay the higher rate on income above each threshold, not your whole income.",
    tags: ["brackets", "progressive", "rates", "marginal"],
    body: `
      <p>Many people think: <em>"If I earn just $1 more, I'll move into a higher tax bracket and pay more on everything."</em> This is a <strong>myth</strong>.</p>
      <p>Australia uses a <strong>progressive (marginal) tax system</strong>. Each bracket only applies to the portion of income within that range.</p>
      <div class="knowledge-callout example">
        <strong>📌 Example: $60,000 income (FY2024–25)</strong><br>
        First $18,200 → 0% = <strong>$0</strong><br>
        $18,201–$45,000 → 19% = <strong>$5,092</strong><br>
        $45,001–$60,000 → 32.5% = <strong>$4,875</strong><br>
        <strong>Total tax: $9,967</strong> (not $60,000 × 32.5% = $19,500!)
      </div>
      <p>Your <strong>marginal rate</strong> is the rate that applies to your last dollar of income. Your <strong>effective rate</strong> is your total tax divided by your total income — it's always lower than your marginal rate.</p>
    `,
  },
  {
    id: "taxable-income",
    category: "basics",
    title: "What is Taxable Income?",
    icon: "🔢",
    difficulty: "beginner",
    summary: "Taxable income is what's left after subtracting your deductions from your total income — this is what the ATO actually taxes.",
    tags: ["taxable income", "deductions", "gross income"],
    body: `
      <p>The ATO doesn't tax your <em>total</em> earnings — it taxes your <strong>taxable income</strong>:</p>
      <div class="knowledge-callout formula">
        <strong>Taxable Income = Total Income − Total Deductions</strong>
      </div>
      <p><strong>Total Income</strong> includes: salary/wages, business income, rental income, interest, dividends, and more.</p>
      <p><strong>Deductions</strong> are legitimate work-related or income-producing expenses that reduce your taxable income.</p>
      <div class="knowledge-callout tip">
        <strong>💡 Why this matters:</strong> Every dollar of a valid deduction reduces your taxable income. If you're in the 32.5% bracket, a $100 deduction saves you $32.50 in tax.
      </div>
    `,
  },

  // ── INCOME ───────────────────────────────────────────────────────────────
  {
    id: "employment-income",
    category: "income",
    title: "Salary & Wages Income",
    icon: "👔",
    difficulty: "beginner",
    summary: "Your employer deducts tax from every pay and sends it to the ATO — this is called 'Pay As You Go' (PAYG) withholding.",
    tags: ["salary", "wages", "PAYG", "employer", "income statement"],
    body: `
      <p>When you work for an employer, they use a system called <strong>PAYG (Pay As You Go) Withholding</strong> to deduct tax from your wages and send it to the ATO on your behalf.</p>
      <p>At the end of the financial year, your employer provides an <strong>Income Statement</strong> (previously a Payment Summary) via myGov that shows:</p>
      <ul>
        <li>Your total gross income</li>
        <li>Total tax withheld</li>
        <li>Superannuation contributions</li>
      </ul>
      <div class="knowledge-callout tip">
        <strong>💡 myGov tip:</strong> Your income statement is automatically pre-filled in myTax. Log in to myGov → ATO to see it after your employer finalises it (usually by late July).
      </div>
      <p>If you had <strong>multiple jobs</strong> during the year, you'll have multiple income statements — all need to be included in your return.</p>
    `,
  },
  {
    id: "side-income",
    category: "income",
    title: "Side Income & the Gig Economy",
    icon: "🚗",
    difficulty: "intermediate",
    summary: "Uber, Airtasker, freelancing — all side income must be declared, and you may need an ABN.",
    tags: ["gig", "freelance", "ABN", "uber", "airtasker", "side hustle"],
    body: `
      <p>Any income you earn outside of a regular employer relationship must be declared in your tax return. This includes:</p>
      <ul>
        <li>Rideshare driving (Uber, DiDi, Ola)</li>
        <li>Food delivery (DoorDash, Uber Eats)</li>
        <li>Freelancing or consulting</li>
        <li>Selling goods online (eBay, Etsy, Facebook Marketplace)</li>
        <li>Renting out a room or parking space (Airbnb, Spacer)</li>
      </ul>
      <div class="knowledge-callout warning">
        <strong>⚠️ Important:</strong> The ATO has data-matching with platforms like Uber, Airbnb, and banks. Undeclared income is often detected.
      </div>
      <p>If you run a side business or do regular contracting, you may need an <strong>ABN (Australian Business Number)</strong>. Without one, those paying you must withhold 47% in tax.</p>
      <p>You can deduct expenses directly related to earning this income (e.g., car expenses for rideshare, equipment for freelancing).</p>
    `,
  },
  {
    id: "rental-income",
    category: "income",
    title: "Rental Income",
    icon: "🏠",
    difficulty: "intermediate",
    summary: "Rent you receive must be declared as income, but you can offset it with property expenses and depreciation.",
    tags: ["rental", "investment property", "negative gearing", "landlord"],
    body: `
      <p>All rental income from SA properties (or elsewhere) must be declared. This includes rent from houses, units, holiday homes, or even rooms in your home.</p>
      <p><strong>Deductible rental expenses</strong> include:</p>
      <ul>
        <li>Interest on your investment property loan (not principal)</li>
        <li>Council rates, water rates, land tax</li>
        <li>Property management fees</li>
        <li>Insurance, repairs and maintenance</li>
        <li>Depreciation on the building and fittings</li>
      </ul>
      <div class="knowledge-callout tip">
        <strong>💡 Negative Gearing:</strong> If your rental expenses exceed your rental income, you have a "rental loss." In Australia, this loss can offset your other income (like salary), reducing your tax bill. This is called negative gearing.
      </div>
      <div class="knowledge-callout warning">
        <strong>⚠️ SA Land Tax:</strong> If you own investment property in SA, you may also be liable for SA Land Tax (administered by RevenueSA, separate to ATO income tax).
      </div>
    `,
  },
  {
    id: "interest-dividends",
    category: "income",
    title: "Interest & Dividends",
    icon: "📈",
    difficulty: "intermediate",
    summary: "Bank interest and share dividends are taxable income — and dividends often come with franking credits that reduce your tax.",
    tags: ["interest", "dividends", "franking credits", "shares", "savings"],
    body: `
      <p><strong>Bank interest</strong>: Any interest earned on savings accounts, term deposits, or other accounts is taxable. Your bank reports this to the ATO, so it's usually pre-filled.</p>
      <p><strong>Dividends from shares</strong>: These are taxable, but Australian companies pay <em>franked dividends</em> — meaning the company has already paid tax on those profits.</p>
      <div class="knowledge-callout example">
        <strong>📌 Franking Credits Example:</strong><br>
        You receive a $70 dividend + $30 franking credit = $100 gross<br>
        You declare $100 as income, but get a $30 tax offset<br>
        If your marginal rate is 32.5%, your net tax on $100 = $32.50 − $30 = <strong>only $2.50</strong>
      </div>
      <p>If your marginal rate is below 30%, you may even receive a <strong>franking credit refund</strong>.</p>
    `,
  },

  // ── DEDUCTIONS ───────────────────────────────────────────────────────────
  {
    id: "work-related-deductions",
    category: "deductions",
    title: "Work-Related Deductions",
    icon: "🧾",
    difficulty: "beginner",
    summary: "You can claim expenses you spent to earn your income — but you must have records, and it must be directly work-related.",
    tags: ["deductions", "work expenses", "receipts", "claim"],
    body: `
      <p>The <strong>3 golden rules</strong> for a valid work-related deduction:</p>
      <ol>
        <li>You must have spent the money yourself (not been reimbursed)</li>
        <li>It must be directly related to earning your income</li>
        <li>You must have a record (receipt, bank statement, logbook)</li>
      </ol>
      <p><strong>Common claimable items:</strong></p>
      <ul>
        <li>Work uniform or protective clothing (not regular clothing)</li>
        <li>Home office expenses (if you work from home)</li>
        <li>Professional memberships and subscriptions</li>
        <li>Tools and equipment (if &lt; $300, claim immediately; if &gt; $300, depreciate)</li>
        <li>Work-related phone and internet usage</li>
        <li>Vehicle expenses (work travel — <em>not</em> home to work)</li>
      </ul>
      <div class="knowledge-callout warning">
        <strong>⚠️ The $300 rule:</strong> You can claim up to $300 in work-related expenses without receipts. But you must still have spent the money, and the ATO can ask you to explain it.
      </div>
    `,
  },
  {
    id: "working-from-home",
    category: "deductions",
    title: "Working From Home Deductions",
    icon: "🏡",
    difficulty: "intermediate",
    summary: "If you worked from home in FY2024–25, you can claim 70 cents per hour using the revised fixed rate method.",
    tags: ["WFH", "work from home", "home office", "fixed rate", "deductions"],
    body: `
      <p>The ATO has a <strong>revised fixed rate method</strong> of <strong>70 cents per hour</strong> for FY2024–25 for working from home.</p>
      <p>This covers: electricity, internet, stationery, and the decline in value of equipment.</p>
      <div class="knowledge-callout example">
        <strong>📌 Example:</strong><br>
        40 hours/week × 46 working weeks = 1,840 hours<br>
        1,840 × $0.70 = <strong>$1,288 deduction</strong>
      </div>
      <p><strong>What you need:</strong> A record of hours worked from home (diary, roster, timesheets, or calendar entries).</p>
      <div class="knowledge-callout tip">
        <strong>💡 Tip:</strong> You can still separately claim phone/internet costs not already covered if you use the <em>actual cost</em> method instead. Compare both methods to see which gives you a bigger deduction.
      </div>
      <p><strong>What you cannot claim:</strong> Rent, mortgage interest, or coffee — working from home doesn't make your home a "place of business" for tax purposes.</p>
    `,
  },
  {
    id: "self-education",
    category: "deductions",
    title: "Self-Education Expenses",
    icon: "🎓",
    difficulty: "intermediate",
    summary: "Course fees and study materials can be deductible — if the study is directly connected to your current job.",
    tags: ["study", "education", "course fees", "TAFE", "university", "deductions"],
    body: `
      <p>You can claim self-education expenses if the course or study:</p>
      <ul>
        <li>Maintains or improves skills for your <em>current</em> job, OR</li>
        <li>Is likely to result in increased income from your <em>current</em> job</li>
      </ul>
      <div class="knowledge-callout warning">
        <strong>⚠️ Cannot claim if:</strong> The study is for a completely different career or job you don't yet have.
      </div>
      <p><strong>Claimable items include:</strong> Course fees (not covered by HELP), textbooks, stationery, a portion of laptop/computer usage, and travel to your place of study.</p>
      <div class="knowledge-callout example">
        <strong>📌 Example:</strong><br>
        A nurse studying an advanced nursing degree → ✅ Claimable<br>
        A retail worker studying nursing to become a nurse → ❌ Not claimable
      </div>
      <p>Note: HELP/HECS repayments themselves are <em>not</em> deductible — but the course fees paid upfront are.</p>
    `,
  },
  {
    id: "car-vehicle",
    category: "deductions",
    title: "Car & Vehicle Expenses",
    icon: "🚙",
    difficulty: "intermediate",
    summary: "Work travel (not home-to-work) is deductible. Use the cents-per-km method for simplicity or a logbook for accuracy.",
    tags: ["car", "vehicle", "logbook", "cents per km", "travel deductions"],
    body: `
      <p>You can claim car expenses for work-related travel — but <strong>not</strong> the regular commute from home to your usual workplace.</p>
      <p><strong>Two methods:</strong></p>
      <h4>1. Cents per kilometre (simpler)</h4>
      <p>Claim up to <strong>5,000 km</strong> at <strong>88 cents/km</strong> (FY2024–25) — max $4,400. No receipts needed, but you must be able to explain the work purpose.</p>
      <h4>2. Logbook method (more accurate)</h4>
      <p>Keep a logbook for 12 continuous weeks to establish your "work use %" — then claim that % of all car running costs. Must be kept every 5 years (or if your work use changes significantly).</p>
      <div class="knowledge-callout tip">
        <strong>💡 Tip:</strong> The logbook method is worth it if your work use is high (e.g., trades, sales reps, social workers). The cents-per-km method is easier for occasional work travel.
      </div>
    `,
  },

  // ── OFFSETS ───────────────────────────────────────────────────────────────
  {
    id: "lito-explained",
    category: "offsets",
    title: "Low Income Tax Offset (LITO)",
    icon: "⚡",
    difficulty: "beginner",
    summary: "If you earn under $66,667, the ATO gives you an automatic tax reduction of up to $700 — no action required.",
    tags: ["LITO", "low income", "offset", "tax reduction"],
    body: `
      <p>The <strong>Low Income Tax Offset (LITO)</strong> is an automatic reduction applied to your tax bill. You don't need to apply — the ATO calculates it automatically.</p>
      <table class="knowledge-table">
        <tr><th>Taxable Income</th><th>LITO Offset</th></tr>
        <tr><td>$0 – $37,500</td><td>$700</td></tr>
        <tr><td>$37,501 – $45,000</td><td>Reduces by 5 cents per $1</td></tr>
        <tr><td>$45,001 – $66,667</td><td>Reduces by 1.5 cents per $1</td></tr>
        <tr><td>Over $66,667</td><td>$0 (no offset)</td></tr>
      </table>
      <div class="knowledge-callout tip">
        <strong>💡 Effect:</strong> Due to LITO, Australians effectively pay $0 tax until they earn around <strong>$21,884</strong> (not the advertised $18,200 tax-free threshold).
      </div>
    `,
  },
  {
    id: "medicare-explained",
    category: "offsets",
    title: "Medicare Levy & Surcharge",
    icon: "🏥",
    difficulty: "beginner",
    summary: "The 2% Medicare Levy funds Australia's public health system. High earners without private hospital cover pay an extra surcharge.",
    tags: ["medicare", "levy", "surcharge", "health", "private cover"],
    body: `
      <p>The <strong>Medicare Levy</strong> is an additional 2% on your taxable income that funds Medicare — Australia's public health system.</p>
      <p>You may be <strong>exempt or pay a reduced levy</strong> if you earn below $26,000 (single) or have certain visa types.</p>
      <h4>Medicare Levy Surcharge (MLS)</h4>
      <p>If you earn over <strong>$93,000</strong> and don't have <em>private hospital cover</em>, you pay an extra surcharge on top of the standard levy:</p>
      <table class="knowledge-table">
        <tr><th>Income</th><th>Surcharge Rate</th></tr>
        <tr><td>$0 – $93,000</td><td>0% (no surcharge)</td></tr>
        <tr><td>$93,001 – $108,000</td><td>1.0%</td></tr>
        <tr><td>$108,001 – $144,000</td><td>1.25%</td></tr>
        <tr><td>$144,001+</td><td>1.5%</td></tr>
      </table>
      <div class="knowledge-callout tip">
        <strong>💡 Private health tip:</strong> At $93,001 income, the surcharge is $930/year. Basic hospital cover often costs less — so it may be worth getting cover purely to avoid the surcharge.
      </div>
    `,
  },
  {
    id: "help-hecs",
    category: "offsets",
    title: "HELP / HECS Debt Repayments",
    icon: "🎓",
    difficulty: "beginner",
    summary: "HECS doesn't charge interest, but your debt is indexed to inflation each year. Repayments are automatic once you earn above the threshold.",
    tags: ["HELP", "HECS", "student debt", "university", "repayment"],
    body: `
      <p><strong>HELP (Higher Education Loan Program)</strong>, formerly called HECS, is the government loan that covers your university fees.</p>
      <p>Key facts:</p>
      <ul>
        <li>No interest — but indexed to inflation (CPI) each June</li>
        <li>Repayments are mandatory once your income exceeds <strong>$54,435</strong> (FY2024–25)</li>
        <li>Repayments are collected through your tax return (or via PAYG if you tick the HELP box on your tax file declaration)</li>
        <li>Repayments are a % of your entire income, not just the amount above the threshold</li>
      </ul>
      <div class="knowledge-callout warning">
        <strong>⚠️ Indexation:</strong> In recent years, CPI has been high (7%+ in 2023). Your HELP debt can grow significantly even as you repay it. Voluntary repayments have no bonus since 2022.
      </div>
      <div class="knowledge-callout tip">
        <strong>💡 Tip:</strong> HELP repayments are <em>separate</em> from your income tax refund. Even if you get a tax refund, your HELP repayment still comes out — they're calculated independently.
      </div>
    `,
  },

  // ── LODGEMENT ────────────────────────────────────────────────────────────
  {
    id: "how-to-lodge",
    category: "lodgement",
    title: "How to Lodge Your Tax Return",
    icon: "📬",
    difficulty: "beginner",
    summary: "You can lodge yourself for free using myTax via myGov, or use a registered tax agent for complex returns.",
    tags: ["lodge", "myTax", "myGov", "tax agent", "etax", "deadline"],
    body: `
      <p>There are two main ways to lodge your Australian tax return:</p>
      <h4>1. Self-lodge via myTax (Free)</h4>
      <ul>
        <li>Go to <strong>my.gov.au</strong> → link your ATO account</li>
        <li>Open myTax — your income and details are pre-filled</li>
        <li>Review, add deductions, and submit</li>
        <li>Most refunds arrive within <strong>2 weeks</strong></li>
      </ul>
      <h4>2. Use a Registered Tax Agent</h4>
      <ul>
        <li>Worth it for complex situations (investment properties, business income, large deductions)</li>
        <li>Their fee is <strong>tax-deductible</strong> next year</li>
        <li>Extended lodgement deadline until 15 May</li>
      </ul>
      <div class="knowledge-callout tip">
        <strong>💡 Adelaide tip:</strong> H&R Block, TaxWise, and many local accountants in the Adelaide CBD offer affordable returns for simple situations. Community organisations like the <strong>Tax Help program</strong> offer free assistance for people earning under ~$60,000.
      </div>
    `,
  },
  {
    id: "tax-help-program",
    category: "lodgement",
    title: "Free Tax Help in Adelaide",
    icon: "🤝",
    difficulty: "beginner",
    summary: "The ATO's Tax Help program offers free tax assistance from trained volunteers across Adelaide for eligible individuals.",
    tags: ["free", "help", "Adelaide", "volunteer", "low income", "Tax Help"],
    body: `
      <p>The ATO's <strong>Tax Help program</strong> runs every year from July to October, providing <strong>free tax return assistance</strong> from trained ATO-accredited volunteers.</p>
      <p><strong>Who qualifies:</strong></p>
      <ul>
        <li>Income under approximately $60,000</li>
        <li>No complex income types (investments, rental properties, business)</li>
        <li>Suitable for workers, students, pensioners, and retirees</li>
      </ul>
      <p><strong>Adelaide locations typically include:</strong> libraries, community centres, and Centrelink offices across metro and outer suburbs.</p>
      <div class="knowledge-callout tip">
        <strong>💡 Find a centre:</strong> Visit <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/help-and-support-to-lodge-your-tax-return/tax-help-program" target="_blank" rel="noopener">ato.gov.au/taxhelp</a> to find your nearest Tax Help location in Adelaide.
      </div>
      <p>Bring: TFN, bank details (for refund), income statements, receipts for deductions, and photo ID.</p>
    `,
  },

  // ── SA SPECIFIC ──────────────────────────────────────────────────────────
  {
    id: "sa-land-tax",
    category: "sa-specific",
    title: "SA Land Tax",
    icon: "🗺️",
    difficulty: "intermediate",
    summary: "RevenueSA levies land tax on SA properties not used as your main home. Rates apply to the unimproved land value.",
    tags: ["land tax", "SA", "RevenueSA", "investment property", "state tax"],
    body: `
      <p><strong>SA Land Tax</strong> is a state tax administered by <strong>RevenueSA</strong> (not the ATO). It applies to property you own in SA that is <em>not</em> your principal place of residence.</p>
      <p><strong>Rates for FY2024–25 (individual):</strong></p>
      <table class="knowledge-table">
        <tr><th>Total Land Value</th><th>Tax</th></tr>
        <tr><td>$0 – $834,000</td><td>Nil</td></tr>
        <tr><td>$834,001 – $1,252,000</td><td>0.50% of excess over $834,000</td></tr>
        <tr><td>$1,252,001 – $2,503,000</td><td>$2,090 + 1.75% of excess over $1,252,000</td></tr>
        <tr><td>Over $2,503,000</td><td>$23,982.50 + 3.5% of excess over $2,503,000</td></tr>
      </table>
      <div class="knowledge-callout tip">
        <strong>💡 Note:</strong> SA Land Tax is based on the <em>unimproved site value</em> (land only, not the building). RevenueSA assesses this value, not the market value.
      </div>
      <div class="knowledge-callout warning">
        <strong>⚠️ Aggregation:</strong> If you own multiple investment properties in SA, their land values are aggregated — pushing you into higher brackets faster.
      </div>
    `,
  },
  {
    id: "sa-first-home-buyer",
    category: "sa-specific",
    title: "First Home Buyer Grants & Stamp Duty (SA)",
    icon: "🏡",
    difficulty: "intermediate",
    summary: "SA first home buyers may be eligible for a $15,000 grant and stamp duty concessions on new builds.",
    tags: ["first home", "grant", "stamp duty", "SA", "FHOG", "RevenueSA"],
    body: `
      <p>South Australia offers support for first home buyers through two main schemes (administered by RevenueSA):</p>
      <h4>First Home Owner Grant (FHOG)</h4>
      <ul>
        <li><strong>$15,000</strong> for eligible new homes (built or substantially renovated)</li>
        <li>Must be your first home in Australia</li>
        <li>Property value cap: <strong>$650,000</strong></li>
        <li>You must live in the home for at least 6 months within the first year</li>
      </ul>
      <h4>Stamp Duty Concession</h4>
      <ul>
        <li>First home buyers purchasing a <strong>new home</strong> may be exempt from stamp duty</li>
        <li>Off-the-plan purchases may also qualify</li>
      </ul>
      <div class="knowledge-callout tip">
        <strong>💡 Tip:</strong> These are state-level benefits — not part of your ATO income tax return. Apply through your conveyancer or directly via RevenueSA at the time of purchase.
      </div>
      <div class="knowledge-callout warning">
        <strong>⚠️ Federal schemes also available:</strong> The Federal First Home Guarantee (FHBG) and First Home Super Saver (FHSS) scheme operate separately to the SA state grant.
      </div>
    `,
  },
  {
    id: "sa-payroll-tax",
    category: "sa-specific",
    title: "SA Payroll Tax (for Employers)",
    icon: "🏢",
    difficulty: "advanced",
    summary: "SA businesses with annual wages above $1.5 million must pay payroll tax at 4.9% to RevenueSA.",
    tags: ["payroll tax", "employer", "SA", "RevenueSA", "wages", "business"],
    body: `
      <p><strong>Payroll tax</strong> is a state-based tax on wages paid by employers. In SA, it is administered by RevenueSA.</p>
      <p><strong>Key details:</strong></p>
      <ul>
        <li><strong>Rate:</strong> 4.9% on SA wages above the threshold</li>
        <li><strong>Threshold:</strong> $1.5 million per year (for standard businesses)</li>
        <li>Applies to wages, salaries, allowances, bonuses, superannuation contributions, and contractor payments in some cases</li>
        <li>Monthly returns required for most employers</li>
      </ul>
      <div class="knowledge-callout tip">
        <strong>💡 Note for employees:</strong> Payroll tax is paid by your <em>employer</em> — not you. It does not affect your personal tax return. It is worth knowing about if you run or plan to run a business with staff.
      </div>
    `,
  },
];
