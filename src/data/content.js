// Services, agents, testimonials, blog posts, FAQs, process steps and localities.

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const services = [
  {
    id: 's-1',
    slug: 'buying',
    icon: 'key',
    title: 'Buying a Home',
    short: 'Shortlists built around your budget, commute and school map — not around our inventory.',
    body: 'We start with a written brief: budget ceiling, loan eligibility, commute tolerance and the non-negotiables. Then we shortlist across every developer in that micro-market, take you on a single consolidated site-visit day, and negotiate on your behalf. You never pay us a brokerage on a primary purchase — the developer does.',
    points: [
      'Loan eligibility check before shortlisting',
      'Consolidated site visits in one day',
      'Price and payment-plan negotiation',
      'Legal due diligence on title and RERA',
    ],
  },
  {
    id: 's-2',
    slug: 'selling',
    icon: 'tag',
    title: 'Selling & Resale',
    short: 'Priced from live transaction data, marketed properly, closed in a defined window.',
    body: 'A listing sells at the right price when it is priced from actual registered transactions in the same tower, not from asking prices on portals. We produce the photography, the floor plan and the listing copy in-house, run it across portals and our own buyer pool, and manage every visit so you are not fielding calls.',
    points: [
      'Comparative pricing from registry data',
      'Professional photos, video and floor plans',
      'Portal syndication + private buyer pool',
      'Visit management and offer negotiation',
    ],
  },
  {
    id: 's-3',
    slug: 'renting',
    icon: 'contract',
    title: 'Renting & Leasing',
    short: 'Tenant screening, agreement drafting, registration and handover — end to end.',
    body: 'For owners we screen tenants on employment and prior-tenancy references, draft and register the leave-and-licence agreement, and run a documented condition report at both handover and exit. For tenants we shortlist only properties whose owners have already agreed to your terms on pets, notice and lock-in.',
    points: [
      'Employment and reference screening',
      'Leave-and-licence drafting and registration',
      'Photo-documented handover inventory',
      'Deposit and exit settlement support',
    ],
  },
  {
    id: 's-4',
    slug: 'property-management',
    icon: 'shield',
    title: 'Property Management',
    short: 'For owners who live elsewhere — rent collection, upkeep, compliance, reporting.',
    body: 'A single annual fee covers rent collection and follow-up, quarterly inspections with a photo report, coordination of repairs through vetted vendors, society dues and utility payments, and a year-end statement your accountant can file from.',
    points: [
      'Rent collection and arrears follow-up',
      'Quarterly inspection with photo report',
      'Vetted vendor network for repairs',
      'Society dues, utilities and tax filing pack',
    ],
  },
  {
    id: 's-5',
    slug: 'investment-advisory',
    icon: 'chart',
    title: 'Investment Advisory',
    short: 'Yield maths, exit assumptions and downside cases — before you commit capital.',
    body: 'We model rental yield, holding cost, expected appreciation and realistic exit timelines for each option you are weighing, including the case where the market goes sideways for three years. If the numbers do not work, we say so — that has cost us deals and kept us clients.',
    points: [
      'Rental yield and holding-cost modelling',
      'Micro-market supply and absorption data',
      'Exit-timeline and downside scenarios',
      'Portfolio rebalancing reviews',
    ],
  },
  {
    id: 's-6',
    slug: 'home-loans',
    icon: 'bank',
    title: 'Home Loan Assistance',
    short: 'Rate comparison across 14 lenders, paperwork handled, sanction tracked to disbursal.',
    body: 'We compare live rates and processing fees across fourteen banks and NBFCs, prepare the file so it clears at first submission, and stay on the sanction until disbursal. Balance-transfer reviews for existing loans are free for our clients.',
    points: [
      'Live rate comparison across 14 lenders',
      'File preparation and document checklist',
      'Sanction-to-disbursal tracking',
      'Balance transfer and top-up reviews',
    ],
  },
  {
    id: 's-7',
    slug: 'legal-documentation',
    icon: 'doc',
    title: 'Legal & Documentation',
    short: 'Title search, agreement vetting, stamp duty, registration and mutation.',
    body: 'Our empanelled advocates run a thirty-year title search, verify encumbrance and RERA status, vet the agreement for one-sided clauses, and handle stamp duty, registration and the post-registration mutation entry with the local body.',
    points: [
      '30-year title and encumbrance search',
      'Agreement vetting for unfair clauses',
      'Stamp duty computation and payment',
      'Registration and mutation follow-through',
    ],
  },
  {
    id: 's-8',
    slug: 'interiors',
    icon: 'paint',
    title: 'Interiors & Handover',
    short: 'Snag lists at possession, then a fixed-cost interior fit-out if you want one.',
    body: 'Before you take keys we walk the home with a snag checklist and hold the developer to the fixes. After handover, our interiors team quotes a fixed-cost fit-out with a written timeline and a penalty clause on delay — no open-ended running bills.',
    points: [
      'Pre-possession snag inspection',
      'Developer rectification follow-up',
      'Fixed-cost interior quotations',
      'Timeline with delay penalty clause',
    ],
  },
]

export const agents = [
  {
    id: 'a-1',
    name: 'Ananya Deshpande',
    role: 'Principal Consultant — Luxury Residential',
    city: 'Pune',
    experience: 14,
    deals: 320,
    phone: '+91 98220 45611',
    email: 'ananya@estaticarealty.in',
    languages: ['English', 'Hindi', 'Marathi'],
    specialities: ['Penthouses', 'Sea & valley view homes', 'NRI clients'],
    bio: 'Ananya has run the luxury desk since 2014 and has closed more than half of the ₹4 crore-plus residential transactions the firm has handled in Baner and Koregaon Park.',
    photo: img('1573497019940-1c28c88b4f3e', 500),
  },
  {
    id: 'a-2',
    name: 'Rohit Menon',
    role: 'Senior Consultant — Apartments & Resale',
    city: 'Bengaluru',
    experience: 9,
    deals: 410,
    phone: '+91 80 4711 9020',
    email: 'rohit@estaticarealty.in',
    languages: ['English', 'Hindi', 'Kannada', 'Malayalam'],
    specialities: ['Resale apartments', 'First-time buyers', 'Loan structuring'],
    bio: 'Rohit handles the Koramangala–Whitefield resale corridor and is the person most of our first-time buyers end up working with. He also runs our lender comparison desk.',
    photo: img('1507003211169-0a1dd7228f2d', 500),
  },
  {
    id: 'a-3',
    name: 'Farah Qureshi',
    role: 'Consultant — Villas & Second Homes',
    city: 'Lonavala / Goa',
    experience: 11,
    deals: 190,
    phone: '+91 98501 22740',
    email: 'farah@estaticarealty.in',
    languages: ['English', 'Hindi', 'Konkani'],
    specialities: ['Weekend villas', 'Managed rentals', 'Land acquisition'],
    bio: 'Farah covers the Lonavala ridge and the north Goa belt, and set up the rental-management programme that our second-home owners use.',
    photo: img('1580489944761-15a19d654956', 500),
  },
  {
    id: 'a-4',
    name: 'Vikram Sethi',
    role: 'Consultant — Leasing & Rentals',
    city: 'Mumbai',
    experience: 7,
    deals: 520,
    phone: '+91 22 6742 3300',
    email: 'vikram@estaticarealty.in',
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    specialities: ['Corporate leasing', 'Expat relocations', 'Bandra–Juhu belt'],
    bio: 'Vikram runs the Mumbai leasing desk and manages relocation mandates for four multinational employers in the western suburbs.',
    photo: img('1472099645785-5658abf4ff4e', 500),
  },
  {
    id: 'a-5',
    name: 'Sneha Kulkarni',
    role: 'Head — Commercial & Investment',
    city: 'Pune',
    experience: 16,
    deals: 240,
    phone: '+91 20 4901 7788',
    email: 'sneha@estaticarealty.in',
    languages: ['English', 'Hindi', 'Marathi'],
    specialities: ['Office leasing', 'Leased-asset sales', 'Yield analysis'],
    bio: 'Sneha leads the commercial vertical, covering office and retail leasing along with pre-leased asset transactions for investors.',
    photo: img('1438761681033-6461ffad8d80', 500),
  },
  {
    id: 'a-6',
    name: 'Imran Shaikh',
    role: 'Consultant — Plots & Land',
    city: 'Pune',
    experience: 12,
    deals: 160,
    phone: '+91 98905 31188',
    email: 'imran@estaticarealty.in',
    languages: ['English', 'Hindi', 'Marathi', 'Urdu'],
    specialities: ['NA plots', 'Agricultural land', 'Title due diligence'],
    bio: 'Imran handles land and plotted development, including the title and conversion work that most buyers underestimate.',
    photo: img('1519345182560-3f2917c472ef', 500),
  },
]

export const getAgent = (id) => agents.find((a) => a.id === id)

export const testimonials = [
  {
    id: 't-1',
    name: 'Meera & Sandeep Rao',
    role: 'Bought a 3BHK in Koramangala',
    quote:
      'We had been looking for eleven months on our own. Rohit shortlisted four homes, told us honestly that two of them were overpriced, and we closed on the third within three weeks. The registry paperwork was handled end to end.',
    rating: 5,
    photo: img('1494790108377-be9c29b29330', 300),
  },
  {
    id: 't-2',
    name: 'Capt. Arun Nair',
    role: 'NRI investor, Dubai',
    quote:
      'I bought the Lonavala villa without flying down once. Video walkthroughs, a title report from their advocate, and the rental programme has kept it occupied for 82% of the season. The quarterly photo reports are genuinely useful.',
    rating: 5,
    photo: img('1500648767791-00dcc994a43e', 300),
  },
  {
    id: 't-3',
    name: 'Priya Bhatt',
    role: 'Sold a 2BHK in Wakad',
    quote:
      'They priced it ₹4 lakh below what two other brokers promised, and explained exactly why using registered sale data. It sold in 26 days at the asking price. The other two would still have been showing it.',
    rating: 5,
    photo: img('1544005313-94ddf0286df2', 300),
  },
  {
    id: 't-4',
    name: 'Nikhil Agarwal',
    role: 'Leased office space, Baner',
    quote:
      'Sneha understood that we needed a fitted floor with a short fit-out window, not a bare shell. We moved 70 people in eighteen days from signing. She also renegotiated the escalation clause for us.',
    rating: 5,
    photo: img('1519085360753-af0119f7cbe7', 300),
  },
  {
    id: 't-5',
    name: 'Rukmini Iyer',
    role: 'Property management client',
    quote:
      'I live in Chennai and own two flats in Pune. I have not had to make a single trip in four years. Rent lands on time, repairs get approved over WhatsApp, and the year-end statement goes straight to my CA.',
    rating: 5,
    photo: img('1534528741775-53994a69daeb', 300),
  },
]

export const blogPosts = [
  {
    id: 'b-1',
    slug: 'ready-to-move-vs-under-construction',
    title: 'Ready-to-move or under construction? Run these five numbers first',
    category: 'Buying Guide',
    date: '2026-02-14',
    readTime: '7 min read',
    author: 'Ananya Deshpande',
    cover: img('1560518883-ce09059eeffa', 1200),
    excerpt:
      'Under-construction homes look cheaper per square foot. Once you add rent paid during construction, GST and the risk premium, the gap often disappears.',
    body: [
      'The headline difference between a ready home and an under-construction one is usually 12–18% on the per-square-foot rate. That gap is real, but it is not the whole comparison, and buyers who stop there tend to be surprised eighteen months later.',
      'Start with the rent you will pay while the home is being built. A three-year possession timeline on a rental of ₹45,000 a month is ₹16.2 lakh of pure outflow that a ready home avoids. On a ₹1.2 crore purchase, that alone is 13.5% — roughly the entire discount.',
      'Then add GST. Under-construction property attracts 5% GST (1% for affordable housing) on the agreement value; a completed property with an occupancy certificate attracts none. On the same ₹1.2 crore, that is another ₹6 lakh.',
      'Third, count the interest you pay on the disbursed portion of your loan before possession. Pre-EMI on a construction-linked plan is interest-only, which feels light, but it builds no equity at all.',
      'Fourth, price the risk. RERA has made delays less common and gives you a compensation mechanism, but a two-year slip still costs you rent and interest that no compensation clause fully returns. Look at the developer\'s last three delivered projects and their actual versus promised dates.',
      'Fifth, look at what appreciation you are actually buying. In a launch-heavy micro-market with a lot of unsold inventory, prices tend to move slowly until absorption catches up. In a supply-constrained pocket, an under-construction buy at launch pricing can genuinely outperform.',
      'The honest summary: under-construction wins when you already own where you live, the developer has a clean delivery record, and the micro-market is supply-constrained. Ready-to-move wins in almost every other case.',
    ],
  },
  {
    id: 'b-2',
    slug: 'home-loan-checklist-2026',
    title: 'The home loan checklist we give every client before they apply',
    category: 'Finance',
    date: '2026-01-27',
    readTime: '6 min read',
    author: 'Rohit Menon',
    cover: img('1554224155-6726b3ff858f', 1200),
    excerpt:
      'Most rejections and delays come from four or five avoidable things. Fix them before you submit rather than after.',
    body: [
      'A home loan file that clears at first submission saves three to five weeks. Almost every file that does not clear fails on the same small set of issues.',
      'Check your credit report first, not last. Pull the report from all four bureaus — they do not always agree. A closed loan still showing as active, or a settled credit card, will cost you either the sanction or 25 to 50 basis points on the rate.',
      'Fix your FOIR before you apply. Lenders cap total EMI outflow at roughly 50–55% of net income. If you are close to that line, closing one small personal loan can raise your eligibility by several lakh — far more than the loan balance itself.',
      'Keep the down payment seasoned. Money that appears in your account three days before the application invites questions about its source. Park it at least three months in advance, or be ready with a documented gift deed.',
      'Get the property legally cleared before, not after. If the project is not on the lender\'s approved list, your file goes to a full technical and legal appraisal and adds two weeks. Ask for the APF number up front.',
      'Compare the total cost, not the rate on the banner. Processing fee, legal and technical charges, insurance bundling and the reset frequency on a floating rate can be worth more than the 10 basis points you negotiated on the headline number.',
      'Finally, ask for the sanction letter in writing with all conditions listed. Verbal assurances about waived fees have a way of not surviving the disbursal desk.',
    ],
  },
  {
    id: 'b-3',
    slug: 'rera-what-buyers-should-verify',
    title: 'RERA: the six things to verify before you pay a booking amount',
    category: 'Legal',
    date: '2025-12-11',
    readTime: '5 min read',
    author: 'Sneha Kulkarni',
    cover: img('1450101499163-c8848c66ca85', 1200),
    excerpt:
      'The registration number on the brochure is the beginning of the check, not the end of it. Here is the rest.',
    body: [
      'Every buyer now knows to ask for the RERA number. Fewer know that the portal carries far more than a yes-or-no answer, and that the useful information is in the quarterly updates.',
      'First, confirm the registration is live and covers the phase you are buying in. Developers register phases separately, and a valid number for Phase 1 tells you nothing about Phase 3.',
      'Second, read the declared completion date on the portal, not the one in the brochure. Where they differ, the portal date is the legally enforceable one.',
      'Third, open the quarterly progress updates. They carry the actual percentage of work completed against what was promised. A project consistently reporting below its own schedule is telling you something.',
      'Fourth, check the litigation disclosures. Pending cases against the land or the promoter are listed and are frequently ignored by buyers who only look at the approval status.',
      'Fifth, verify the sanctioned plan and the number of approved units. Extra floors added later without amended sanction are a known source of trouble at the occupancy-certificate stage.',
      'Sixth, insist on the model agreement for sale prescribed under the state rules. Deviations from it — particularly one-sided default and cancellation clauses — are the most common thing our advocates strike out during vetting.',
    ],
  },
  {
    id: 'b-4',
    slug: 'rental-yield-india-2026',
    title: 'What a realistic rental yield looks like in 2026',
    category: 'Investment',
    date: '2025-11-08',
    readTime: '8 min read',
    author: 'Sneha Kulkarni',
    cover: img('1560520653-9e0e4c89eb11', 1200),
    excerpt:
      'Gross yield is the number in the brochure. Net yield, after everything that actually leaves your account, is usually 1.4 to 1.8 percentage points lower.',
    body: [
      'Ask ten investors what their rental yield is and nine will quote gross — annual rent divided by purchase price. It is a useful screening number and a poor decision number.',
      'Net yield subtracts the things that reliably happen: society maintenance, property tax, vacancy between tenants, brokerage on each re-let, repairs and repainting, and management fees if you are not local.',
      'Residential yields in the metros currently sit around 2.8–3.6% gross in the mid-segment. Net, that is closer to 1.6–2.2%. Luxury runs lower, often below 2% gross, because capital values have outrun rents.',
      'Commercial is the other end. Grade-A office space in an established belt yields 6.5–8.5% gross with three-year lock-ins and annual escalations built into the lease, and the tenant typically bears maintenance. Net stays close to gross.',
      'Pre-leased commercial units are the most misunderstood category. You are buying a rent stream, so the question is the tenant\'s covenant strength and the remaining lock-in, not the finish quality of the lobby.',
      'Vacancy is the assumption that most spreadsheets get wrong. Budget one month of vacancy per year in residential — even a good tenant leaves eventually, and the gap between exit and the next handover is rarely instant.',
      'The practical rule we use: if a residential asset needs capital appreciation to justify itself, say that out loud in the model. Do not disguise a bet on price growth as an income investment.',
    ],
  },
  {
    id: 'b-5',
    slug: 'pune-micro-markets-to-watch',
    title: 'Five Pune micro-markets worth watching this year',
    category: 'Market Report',
    date: '2025-10-19',
    readTime: '9 min read',
    author: 'Ananya Deshpande',
    cover: img('1477959858617-67f85cf4f1df', 1200),
    excerpt:
      'Infrastructure moves prices before inventory does. These are the pockets where the infrastructure is already committed.',
    body: [
      'Micro-market calls age badly when they are based on launch activity. They age better when they are based on committed infrastructure, because roads and metro lines have funding, contracts and dates attached.',
      'Mahalunge–Baner Annexe. The riverfront development and the Baner–Balewadi road widening have both moved from proposal to execution. Plotted and row-house formats here have limited competing supply.',
      'Wakad and the Metro Line 3 corridor. The station locations are fixed and the alignment is under construction. Projects within a kilometre of a confirmed station have historically absorbed faster than the surrounding belt.',
      'Kharadi east of the EON belt. Office absorption has been steady and the residential supply has not kept pace, which is the healthier version of a demand-supply gap.',
      'Hinjawadi Phase 3 periphery. The long-standing complaint here is the commute, which is exactly what the metro extension addresses. Entry pricing is still well below the equivalent product in Wakad.',
      'Mulshi and the Paud Road stretch. Second-home demand from Pune itself, rather than from Mumbai, has changed the buyer profile — smaller plots, year-round use, and a preference for gated schemes over standalone land.',
      'A caution that applies to all five: infrastructure timelines slip. Buy on the assumption that the metro opens two years after the announced date, and the investment should still make sense.',
    ],
  },
  {
    id: 'b-6',
    slug: 'possession-snag-list',
    title: 'The snag list to walk with before you accept possession',
    category: 'Buying Guide',
    date: '2025-09-05',
    readTime: '6 min read',
    author: 'Vikram Sethi',
    cover: img('1581858726788-75bc0f6a952d', 1200),
    excerpt:
      'Once you sign the possession letter, your leverage drops sharply. Spend the two hours before you sign.',
    body: [
      'The possession walkthrough is the last moment when the developer has a strong incentive to fix things quickly. After you sign, you join a queue.',
      'Carry a torch, a plug tester, a spirit level and a measuring tape. Most of the defects worth catching are invisible without them.',
      'Measure the carpet area against the agreement. Deviations beyond the permitted tolerance are actionable, and almost nobody checks.',
      'Test every electrical point with a plug tester, not by eye. Check that each MCB actually controls the circuit it is labelled for, and that the earthing is live.',
      'Fill each bathroom floor with water and leave it for two hours. Slope, drainage speed and the first sign of seepage into the adjoining room all show up in that window.',
      'Open and close every window and door through their full travel. Check the level of the flooring with a spirit level across at least three rooms, and tap tiles for hollowness.',
      'Photograph everything you find, list it in writing, and get the site engineer to sign the list on the day. A signed snag list attached to the possession letter is worth far more than a WhatsApp thread.',
    ],
  },
]

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug)

export const processSteps = [
  {
    icon: 'search',
    title: 'Tell us the brief',
    text: 'Budget, locality, commute, timeline and the things you will not compromise on. Twenty minutes on a call.',
  },
  {
    icon: 'list',
    title: 'Get a shortlist',
    text: 'Four to six options across every developer in that micro-market, with pricing and the honest drawbacks of each.',
  },
  {
    icon: 'tour',
    title: 'Visit in one day',
    text: 'We consolidate site visits so you see everything in a single trip, with a consultant who knows each project.',
  },
  {
    icon: 'handshake',
    title: 'Negotiate and close',
    text: 'Price, payment plan, legal vetting, loan sanction and registration — handled through to the handover of keys.',
  },
]

export const whyUs = [
  {
    icon: 'verified',
    title: 'Every listing verified',
    text: 'We physically inspect and verify title, RERA status and possession claims before a property goes on our site.',
  },
  {
    icon: 'rupee',
    title: 'No hidden brokerage',
    text: 'Our fee is stated in writing before you engage us, and on primary sales the developer pays it, not you.',
  },
  {
    icon: 'data',
    title: 'Priced from registry data',
    text: 'Valuations come from registered transactions in the same tower, not from asking prices on listing portals.',
  },
  {
    icon: 'support',
    title: 'One point of contact',
    text: 'A single consultant owns your file from the first call to the mutation entry after registration.',
  },
]

export const faqs = [
  {
    q: 'Do I pay a brokerage when I buy a new project through you?',
    a: 'No. On a primary sale the developer pays our fee, and the price you get through us is the same or better than walking into the site office yourself — often better, because we negotiate against comparable inventory.',
  },
  {
    q: 'How long does a typical resale purchase take to close?',
    a: 'From agreed price to registration, four to six weeks is normal. Two of those weeks are the loan sanction and one is the title search. If the seller has a running loan, add ten days for the release of the original documents.',
  },
  {
    q: 'Can NRIs buy residential property in India through you?',
    a: 'Yes. NRIs and OCI cardholders can buy residential and commercial property (not agricultural land, plantations or farmhouses). We handle the FEMA-compliant payment routing, the power of attorney if you cannot travel, and the TDS and repatriation paperwork.',
  },
  {
    q: 'What does property management actually cover?',
    a: 'Rent collection and follow-up, quarterly inspections with a photo report, repair coordination through vetted vendors, society dues and utility payments, tenant exit settlement, and a year-end statement for your tax filing.',
  },
  {
    q: 'How do you price a property for sale?',
    a: 'From registered transactions in the same building or the immediate vicinity over the last six months, adjusted for floor, view, facing and condition. We show you the comparables so you can see how the number was reached.',
  },
  {
    q: 'What are the total costs on top of the purchase price?',
    a: 'Budget for stamp duty and registration (5–7% depending on state and buyer gender), GST if the property is under construction, legal fees, loan processing charges, and the society corpus or maintenance advance the developer collects at possession.',
  },
]

export const localities = [
  {
    name: 'Baner',
    city: 'Pune',
    listings: 148,
    image: img('1512917774080-9991f1c4c750', 700),
  },
  {
    name: 'Koregaon Park',
    city: 'Pune',
    listings: 96,
    image: img('1449824913935-59a10b8d2000', 700),
  },
  {
    name: 'Bandra West',
    city: 'Mumbai',
    listings: 112,
    image: img('1570168007204-dfb528c6958f', 700),
  },
  {
    name: 'Koramangala',
    city: 'Bengaluru',
    listings: 134,
    image: img('1596176530529-78163a4f7af2', 700),
  },
  {
    name: 'Whitefield',
    city: 'Bengaluru',
    listings: 178,
    image: img('1580889240912-c39ecefd3d95', 700),
  },
  {
    name: 'Lonavala',
    city: 'Maharashtra',
    listings: 54,
    image: img('1587474260584-136574528ed5', 700),
  },
]

export const milestones = [
  { year: '2009', title: 'Founded in Pune', text: 'Started as a two-person resale desk operating out of a single room in Aundh.' },
  { year: '2013', title: 'First project mandate', text: 'Took on exclusive marketing for a 96-unit residential project in Wakad.' },
  { year: '2016', title: 'Mumbai office', text: 'Opened the Bandra office to serve the western suburbs leasing market.' },
  { year: '2019', title: 'Property management launched', text: 'Built the managed-rental arm after NRI clients asked for it repeatedly.' },
  { year: '2022', title: 'Bengaluru office', text: 'Entered the Koramangala–Whitefield corridor with a six-person team.' },
  { year: '2025', title: '2,400 transactions', text: 'Crossed 2,400 completed transactions and 42 delivered project mandates.' },
]
