"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * GLOBAL TAILORING PRODUCTION INDEX
 * Design: Barlow Condensed display / Barlow body / JetBrains Mono labels
 * Dark editorial authority page — data-driven, citation-linked, illustrated
 * Sources: McKinsey State of Luxury 2025, Bain/Altagamma 2024, IWTO 2024,
 *          HKTDC 2024, WTO Trade Review 2023, Mordor Intelligence, academic research
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/lib/wouter-shim';
// SEO handled by generateMetadata in page.tsx

const F = {
  display: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  body: "'Barlow', 'Arial', sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

interface Stat {
  value: string;
  unit: string;
  label: string;
  source: string;
  sourceUrl: string;
}

interface Source {
  id: string;
  author: string;
  title: string;
  year: string;
  url: string;
}

const SOURCES: Source[] = [
  { id: '1', author: 'Bain & Company / Altagamma', title: 'Luxury in Transition: Securing Future Growth', year: '2024', url: 'https://www.bain.com/insights/luxury-in-transition-securing-future-growth/' },
  { id: '2', author: 'McKinsey & Company / Business of Fashion', title: 'The State of Luxury 2025', year: '2025', url: 'https://www.mckinsey.com/industries/retail/our-insights/state-of-luxury' },
  { id: '3', author: 'McKinsey & Company / Business of Fashion', title: 'The State of Fashion 2025', year: '2024', url: 'https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion' },
  { id: '4', author: 'IWTO — International Wool Textile Organisation', title: 'A Compilation of Wool Industry Statistics 2024', year: '2024', url: 'https://iwto.org/a-compilation-of-wool-industry-statistics/' },
  { id: '5', author: 'HKTDC Research', title: 'Clothing Industry in Hong Kong', year: '2026', url: 'https://research.hktdc.com/en/article/MzEzOTM4MzY2' },
  { id: '6', author: 'HKTDC Research', title: 'Textiles Industry in Hong Kong', year: '2025', url: 'https://research.hktdc.com/en/article/MzEzOTUyNDMy' },
  { id: '7', author: 'WTO', title: 'World Trade Statistical Review 2023', year: '2023', url: 'https://www.wto.org/english/res_e/publications_e/wtsr_2023_e.htm' },
  { id: '8', author: 'Mordor Intelligence', title: 'Italy Textile Manufacturing Market Size, Growth Outlook 2031', year: '2026', url: 'https://www.mordorintelligence.com/industry-reports/italy-textile-manufacturing-industry-study-market' },
  { id: '9', author: 'Sheng Lu, University of Delaware', title: 'Key Textile and Apparel Trade Statistics', year: '2024', url: 'https://shenglufashion.com/key-industry-statistics/' },
  { id: '10', author: 'A Hand Tailored Suit', title: 'The Art of Bespoke: 100 Hours in the Making of Your Perfect Suit', year: '2025', url: 'https://ahandtailoredsuit.com/blogs/off-the-cuff/the-art-of-bespoke-100-hours-in-the-making-of-your-perfect-suit' },
  { id: '11', author: 'Westwood Hart', title: 'Fused vs Canvassed Suits: Complete Suit Construction Guide', year: '2025', url: 'https://westwoodhart.com/blogs/westwood-hart/fused-vs-canvassed-suits-suit-construction-guide-menswear-tailoring' },
  { id: '12', author: 'ITC / CITES', title: 'Vicuña Trade and Production Analysis', year: '2023', url: 'https://intracen.org/sites/default/files/uploadedFiles/intracenorg/Content/Publications/Vicuna_trade_final_Low_res.pdf' },
  { id: '13', author: 'Business Research Insights', title: 'Custom Suits Market Size, Share & Growth Report', year: '2026', url: 'https://www.businessresearchinsights.com/market-reports/custom-suits-market-119803' },
  { id: '14', author: 'Statista', title: 'Turnover of the Textile Manufacturing Industry in Italy', year: '2026', url: 'https://www.statista.com/statistics/386120/turnover-manufacturing-textile-industry-italy/' },
];

const HERO_STATS: Stat[] = [
  { value: '€364B', unit: '', label: 'Personal Luxury Goods Market (2024)', source: '[1]', sourceUrl: '#ref-1' },
  { value: '€1.48T', unit: '', label: 'Total Global Luxury Spending (2024)', source: '[1]', sourceUrl: '#ref-1' },
  { value: '$520B', unit: '', label: 'World Clothing Exports (2023)', source: '[7,9]', sourceUrl: '#ref-7' },
  { value: '~55hrs', unit: '', label: 'Labour: Savile Row Bespoke Suit', source: '[10]', sourceUrl: '#ref-10' },
];

function CitationLink({ id, url }: { id: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#b8a87a', textDecoration: 'none', verticalAlign: 'super' }}
    >
      [{id}]
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.18em', color: '#888', textTransform: 'uppercase', marginBottom: '1rem' }}>
      {children}
    </div>
  );
}

function DataBar({ label, value, max, color = '#b8a87a' }: { label: string; value: number; max: number; color?: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth((value / max) * 100); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, max]);

  return (
    <div ref={ref} style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: '0.7rem', color: '#aaa', marginBottom: '0.3rem' }}>
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div style={{ height: '2px', background: '#222', borderRadius: '1px' }}>
        <div style={{ height: '100%', width: `${width}%`, background: color, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)', borderRadius: '1px' }} />
      </div>
    </div>
  );
}

export default function ProductionIndex() {
  const [copied, setCopied] = useState(false);
  useSEO({
    title: 'Global Tailoring Production Index | Tailors.hk',
    description: 'A data-driven reference index covering global luxury apparel production, handcraft benchmarks, wool and fine fibre statistics, and the economics of bespoke tailoring. Sourced from McKinsey, Bain/Altagamma, IWTO, HKTDC, and WTO.',
    canonical: 'https://tailors.hk/production-index',
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Production Index', url: '/production-index' },
      ]),
      SCHEMAS.speakable(['h1', 'h2']),
      SCHEMAS.dataset({
        name: 'Global Tailoring Production Index',
        description: 'A data-driven reference index covering global luxury apparel production, handcraft benchmarks, wool and fine fibre statistics, and the economics of bespoke tailoring.',
        url: '/production-index',
        keywords: ['bespoke tailoring', 'luxury apparel production', 'wool statistics', 'handcraft benchmarks', 'Hong Kong tailoring industry'],
      }),
      SCHEMAS.article({
        title: 'Global Tailoring Production Index',
        description: 'Authoritative data on global luxury apparel production, handcraft construction benchmarks, fine fibre statistics, and the economics of bespoke tailoring.',
        url: '/production-index',
        image: 'https://tailors.hkhttps://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/shLtnQaQLmeQtCVt.png',
        datePublished: '2025-05-08',
        dateModified: '2026-05-12',
        authorName: 'Tailors.hk Editorial Team',
        keywords: ['global tailoring production', 'luxury apparel statistics', 'bespoke tailoring economics', 'wool industry data'],
        wordCount: 3200,
      }),
    ],
  });

  return (
    <div style={{ background: '#0a0a0a', color: '#e8e4dc', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '8rem 2rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>§ DATA · GLOBAL TAILORING PRODUCTION INDEX · 2024–2025</SectionLabel>
        <h1 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: '2rem', color: '#f0ece4' }}>
          Global Tailoring<br />Production Index
        </h1>
        <p style={{ fontFamily: F.body, fontSize: '1.1rem', lineHeight: 1.7, color: '#aaa', maxWidth: '680px', marginBottom: '2rem' }}>
          A reference index covering the economics of global luxury apparel production, handcraft construction benchmarks, fine fibre statistics, and the structural dynamics of the bespoke tailoring trade. All data sourced from primary industry reports, trade organisations, and peer-reviewed research.
        </p>

        {/* Share row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              const url = 'https://tailors.hk/production-index';
              if (navigator.share) {
                navigator.share({ title: 'Global Tailoring Production Index — Tailors.hk', url });
              } else {
                navigator.clipboard.writeText(url).then(() => setCopied(true));
                setTimeout(() => setCopied(false), 2000);
              }
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: copied ? '#b8a87a' : '#888', background: 'transparent',
              border: '1px solid #333', padding: '0.5rem 1rem', cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            {copied ? 'Link Copied' : 'Share This Index'}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent('Global Tailoring Production Index — Tailors.hk: https://tailors.hk/production-index')}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#888', textDecoration: 'none', border: '1px solid #333', padding: '0.5rem 1rem',
              transition: 'color 0.2s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share via WhatsApp
          </a>
        </div>

        {/* Hero stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: '#222', border: '1px solid #222' }}>
          {HERO_STATS.map((s, i) => (
            <div key={i} style={{ background: '#0a0a0a', padding: '2rem 1.5rem' }}>
              <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#b8a87a', lineHeight: 1, marginBottom: '0.5rem' }}>
                {s.value}
                <a href={s.sourceUrl} style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#666', textDecoration: 'none', verticalAlign: 'super', marginLeft: '2px' }}>{s.source}</a>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 01: LUXURY MARKET OVERVIEW ──────────────────────── */}
      <section style={{ borderTop: '1px solid #1a1a1a', padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>§ 01 · LUXURY GOODS MARKET · GLOBAL OVERVIEW</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem', color: '#f0ece4' }}>
              The Personal<br />Luxury Goods<br />Market
            </h2>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
              The global personal luxury goods market — encompassing fashion, leather goods, watches, jewellery, and beauty — reached <strong style={{ color: '#e8e4dc' }}>€364 billion in 2024</strong>, according to Bain & Company in partnership with Altagamma. <CitationLink id="1" url="https://www.bain.com/insights/luxury-in-transition-securing-future-growth/" /> This represents the first contraction since the Great Recession (excluding COVID), a -2% decline at current exchange rates versus 2023's peak of approximately €370 billion.
            </p>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
              Total global luxury spending — including experiences, hospitality, fine dining, private aviation, and yachts — reached <strong style={{ color: '#e8e4dc' }}>€1.48 trillion in 2024</strong>. <CitationLink id="1" url="https://www.bain.com/insights/luxury-in-transition-securing-future-growth/" /> The luxury customer base contracted by approximately 50 million consumers over the past two years, as price elevation and macroeconomic uncertainty drove aspirational buyers out of the market.
            </p>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa' }}>
              McKinsey's State of Luxury 2025 identifies a structural problem: rapid expansion has led to "overexposure," weakening the industry's core promise of exclusivity, creativity, and craftsmanship. <CitationLink id="2" url="https://www.mckinsey.com/industries/retail/our-insights/state-of-luxury" /> Brands that failed to align scale with craftsmanship heritage are experiencing the sharpest declines.
            </p>
          </div>
          <div>
            <div style={{ border: '1px solid #222', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>PERSONAL LUXURY GOODS — MARKET TRAJECTORY</div>
              <DataBar label="2019 Baseline" value={281} max={380} />
              <DataBar label="2021 Post-COVID Recovery" value={308} max={380} />
              <DataBar label="2022 Peak Growth" value={353} max={380} />
              <DataBar label="2023 Peak Market" value={370} max={380} />
              <DataBar label="2024 Contraction" value={364} max={380} />
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', marginTop: '1rem' }}>Values in € billion. Source: Bain/Altagamma <CitationLink id="1" url="https://www.bain.com/insights/luxury-in-transition-securing-future-growth/" /></div>
            </div>
            <div style={{ border: '1px solid #222', padding: '1.5rem' }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>McKINSEY STRATEGIC IMPERATIVE</div>
              <blockquote style={{ fontFamily: F.body, fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.7, color: '#b8a87a', borderLeft: '2px solid #b8a87a', paddingLeft: '1rem', margin: 0 }}>
                "Realign business scale with craftsmanship heritage by investing in long-term supply chain stability and implementing best-in-class sourcing and manufacturing practices."
              </blockquote>
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', marginTop: '0.75rem' }}>McKinsey State of Luxury 2025 <CitationLink id="2" url="https://www.mckinsey.com/industries/retail/our-insights/state-of-luxury" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: CONSTRUCTION BENCHMARKS ─────────────────────── */}
      <section style={{ background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>§ 02 · PRODUCTION BENCHMARKS · CONSTRUCTION METHODOLOGY</SectionLabel>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '3rem', color: '#f0ece4' }}>
            The Economics<br />of Construction
          </h2>

          {/* Construction comparison table */}
          <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F.mono, fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  {['Method', 'Labour Hours', 'Lead Time', 'Canvas', 'Fittings', 'Pattern', 'Retail Equivalent'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Handcrafted Bespoke', hours: '55–100+', lead: '12–16 weeks', canvas: 'Full floating', fittings: '3–5', pattern: 'Unique to client', retail: 'HK$30,000–200,000+', highlight: true },
                  { method: 'Handcrafted MTM', hours: '20–40', lead: '4–8 weeks', canvas: 'Full or half', fittings: '1–2', pattern: 'Block adjusted', retail: 'HK$15,000–50,000', highlight: false },
                  { method: 'Factory RTW (Luxury)', hours: '4–8', lead: 'Seasonal', canvas: 'Half or fused', fittings: '0', pattern: 'Standard block', retail: 'HK$30,000–80,000', highlight: false },
                  { method: 'Factory RTW (Mass)', hours: '1–3', lead: 'Seasonal', canvas: 'Fused only', fittings: '0', pattern: 'Standard block', retail: 'HK$3,000–15,000', highlight: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', background: row.highlight ? 'rgba(184,168,122,0.05)' : 'transparent' }}>
                    <td style={{ padding: '1rem', color: row.highlight ? '#b8a87a' : '#e8e4dc', fontWeight: row.highlight ? 600 : 400 }}>{row.method}</td>
                    <td style={{ padding: '1rem', color: row.highlight ? '#b8a87a' : '#aaa' }}>{row.hours}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{row.lead}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{row.canvas}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{row.fittings}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{row.pattern}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{row.retail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', marginTop: '0.75rem' }}>
              Sources: <CitationLink id="10" url="https://ahandtailoredsuit.com/blogs/off-the-cuff/the-art-of-bespoke-100-hours-in-the-making-of-your-perfect-suit" /> <CitationLink id="11" url="https://westwoodhart.com/blogs/westwood-hart/fused-vs-canvassed-suits-suit-construction-guide-menswear-tailoring" /> Academic research via Tandfonline (Savile Row bespoke: ~55 hours)
            </div>
          </div>

          {/* Construction breakdown illustration */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: '#1a1a1a' }}>
            {[
              { stage: '01', label: 'Consultation & Measurement', hours: '1 hr', detail: 'Body measurements, style brief, cloth selection' },
              { stage: '02', label: 'Pattern Drafting', hours: '7 hrs', detail: 'Unique pattern cut to client measurements' },
              { stage: '03', label: 'Cloth Cutting', hours: '5 hrs', detail: 'Hand-cut to pattern, grain aligned' },
              { stage: '04', label: 'Basting & First Fitting', hours: '10 hrs', detail: 'Temporary construction for initial fitting' },
              { stage: '05', label: 'Canvas & Hand-Stitching', hours: '30–50 hrs', detail: 'Floating canvas hand-padded to chest piece' },
              { stage: '06', label: 'Final Fitting & Finish', hours: '5–10 hrs', detail: 'Surgeon\'s cuffs, pick stitch, final press' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#0a0a0a', padding: '1.5rem 1.25rem' }}>
                <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>STAGE {s.stage}</div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase', color: '#e8e4dc', marginBottom: '0.5rem', lineHeight: 1.2 }}>{s.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: '0.75rem', color: '#b8a87a', marginBottom: '0.5rem' }}>{s.hours}</div>
                <div style={{ fontFamily: F.body, fontSize: '0.8rem', color: '#666', lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', marginTop: '0.75rem' }}>
            Source: <CitationLink id="10" url="https://ahandtailoredsuit.com/blogs/off-the-cuff/the-art-of-bespoke-100-hours-in-the-making-of-your-perfect-suit" />
          </div>
        </div>
      </section>

      {/* ── SECTION 03: FIBRE & FABRIC QUALITY ──────────────────────── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>§ 03 · FIBRE SCIENCE · QUALITY GRADING & PRODUCTION</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem', color: '#f0ece4' }}>
              Fibre Quality<br />& Micron<br />Classification
            </h2>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
              Wool quality is measured in microns — the diameter of the fibre. The finer the fibre, the softer the handle and the higher the value. The IWTO (International Wool Textile Organisation) maintains global standards for fibre classification and trade. <CitationLink id="4" url="https://iwto.org/a-compilation-of-wool-industry-statistics/" />
            </p>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
              Global greasy wool production increased 1.1% in the 2022/23 growing season, with world sheep numbers remaining stable. Total global raw wool production stands at approximately <strong style={{ color: '#e8e4dc' }}>1.95 million tonnes</strong> annually. <CitationLink id="4" url="https://iwto.org/a-compilation-of-wool-industry-statistics/" />
            </p>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa' }}>
              Vicuña — the rarest natural fibre in the world — is classified and regulated under CITES (Convention on International Trade in Endangered Species). Annual global production is approximately <strong style={{ color: '#e8e4dc' }}>10,000 kg</strong>, almost entirely from Peru, which holds the world's largest vicuña population of ~209,000 animals. <CitationLink id="12" url="https://intracen.org/sites/default/files/uploadedFiles/intracenorg/Content/Publications/Vicuna_trade_final_Low_res.pdf" /> Trade in vicuña fibre increased 78% over the decade to 2023.
            </p>
          </div>
          <div>
            {/* Micron scale */}
            <div style={{ border: '1px solid #222', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>FIBRE DIAMETER SCALE (MICRONS) — FINEST TO COARSEST</div>
              {[
                { fibre: 'Vicuña', micron: '12–14', color: '#b8a87a', note: 'Rarest natural fibre · CITES regulated' },
                { fibre: 'Qiviut (Musk Ox)', micron: '15–16', color: '#9a8a6a', note: 'Arctic undercoat' },
                { fibre: 'Cashmere', micron: '14–19', color: '#8a7a5a', note: 'Mongolian / Chinese highland goat' },
                { fibre: 'Superfine Merino', micron: '15–18.5', color: '#7a6a4a', note: 'Super 150s–200s designation' },
                { fibre: 'Fine Merino', micron: '18.6–20', color: '#6a5a3a', note: 'Super 100s–140s designation' },
                { fibre: 'Medium Merino', micron: '20.1–22.9', color: '#5a4a2a', note: 'Standard suiting weight' },
                { fibre: 'Standard Wool', micron: '23+', color: '#3a3a3a', note: 'Commercial production' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
                  <div style={{ width: '3px', height: '2.5rem', background: f.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: '#e8e4dc' }}>{f.fibre}</span>
                      <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: f.color }}>{f.micron}μ</span>
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555' }}>{f.note}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', marginTop: '1rem' }}>Source: IWTO Standards <CitationLink id="4" url="https://iwto.org/a-compilation-of-wool-industry-statistics/" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: ITALY TEXTILE INDUSTRY ──────────────────────── */}
      <section style={{ background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>§ 04 · PRODUCTION GEOGRAPHY · ITALY & THE BIELLA DISTRICT</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem', color: '#f0ece4' }}>
                Italy: The<br />World's Cloth<br />Capital
              </h2>
              <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
                The Italian textile manufacturing industry is valued at <strong style={{ color: '#e8e4dc' }}>USD $31.3 billion (2026)</strong>, growing at a CAGR of 3.22% toward $36.6 billion by 2031. <CitationLink id="8" url="https://www.mordorintelligence.com/industry-reports/italy-textile-manufacturing-industry-study-market" /> Turnover reached €20.44 billion in 2024. <CitationLink id="14" url="https://www.statista.com/statistics/386120/turnover-manufacturing-textile-industry-italy/" />
              </p>
              <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
                The Biella district in Piedmont is home to the world's most prestigious wool mills: Vitale Barberis (founded 1663), Loro Piana, Ermenegildo Zegna Baruffa, and Reda. These mills supply cloth to the world's finest tailoring houses — from Savile Row to Naples to Hong Kong.
              </p>
              <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa' }}>
                Prato (Tuscany) specialises in regenerated and blended fibres. Together, Biella and Prato account for the majority of Italy's premium suiting cloth output — the raw material that underpins the world's luxury tailoring trade.
              </p>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Italy Textile Market', value: '$31.3B', sub: '2026 valuation' },
                  { label: 'Italy Textile Turnover', value: '€20.4B', sub: '2024 (Statista)' },
                  { label: 'Market CAGR', value: '3.22%', sub: 'Through 2031' },
                  { label: 'Biella Founded', value: '1663', sub: 'VBC — oldest active mill' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#0a0a0a', padding: '1.5rem' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{s.label}</div>
                    <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '1.8rem', color: '#b8a87a', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#666', marginTop: '0.3rem' }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ border: '1px solid #222', padding: '1.5rem' }}>
                <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>KEY BIELLA MILLS</div>
                {[
                  { mill: 'Vitale Barberis', est: 'Est. 1663', spec: 'Super 100s–200s suiting' },
                  { mill: 'Loro Piana', est: 'Est. 1924', spec: 'Vicuña, cashmere, superfine merino' },
                  { mill: 'Ermenegildo Zegna Baruffa', est: 'Est. 1910', spec: 'Cashwool, high-twist suiting' },
                  { mill: 'Reda', est: 'Est. 1865', spec: 'Merino, sustainable wool' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.5rem 0', borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none' }}>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: '0.7rem', color: '#e8e4dc' }}>{m.mill}</div>
                      <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555' }}>{m.spec}</div>
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#666' }}>{m.est}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: HONG KONG TRADE ──────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>§ 05 · HONG KONG · ROLE IN GLOBAL TAILORING TRADE</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem', color: '#f0ece4' }}>
              Hong Kong's<br />Position in the<br />Global Trade
            </h2>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
              Hong Kong's clothing and textile industry occupies a unique position in global trade: a hub for ODM (Original Design Manufacturing) and OEM (Original Equipment Manufacturing) production, with deep expertise in quality control, logistics, and international sourcing. <CitationLink id="5" url="https://research.hktdc.com/en/article/MzEzOTM4MzY2" />
            </p>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
              Major international premium labels — including Calvin Klein, Donna Karan, Ralph Lauren, Tommy Hilfiger, and Yves Saint Laurent — source garments in Hong Kong through buying offices or intermediaries. <CitationLink id="5" url="https://research.hktdc.com/en/article/MzEzOTM4MzY2" /> This positions Hong Kong producers as direct suppliers to the world's most recognised retail labels.
            </p>
            <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa' }}>
              Hong Kong's textiles exports reached <strong style={{ color: '#e8e4dc' }}>HK$11.1 billion</strong> in the first half of 2025 alone. <CitationLink id="6" url="https://research.hktdc.com/en/article/MzEzOTUyNDMy" /> The industry employs 52,100 people in import/export operations and 1,930 in direct manufacturing (2024). <CitationLink id="5" url="https://research.hktdc.com/en/article/MzEzOTM4MzY2" />
            </p>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', marginBottom: '1.5rem' }}>
              {[
                { label: 'HK Textiles Exports H1 2025', value: 'HK$11.1B', sub: 'Jan–Jun 2025' },
                { label: 'Import/Export Employment', value: '52,100', sub: '2024 (HKTDC)' },
                { label: 'Manufacturing Establishments', value: '390', sub: '2024 (HKTDC)' },
                { label: 'I/E Establishments', value: '10,450', sub: '2024 (HKTDC)' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#0a0a0a', padding: '1.5rem' }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{s.label}</div>
                  <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '1.6rem', color: '#b8a87a', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: '#666', marginTop: '0.3rem' }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ border: '1px solid #222', padding: '1.5rem' }}>
              <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>UNDER CEPA — MAINLAND CHINA ARRANGEMENT</div>
              <p style={{ fontFamily: F.body, fontSize: '0.85rem', lineHeight: 1.7, color: '#888' }}>
                Under the Mainland and Hong Kong Closer Economic Partnership Arrangement (CEPA), all products of Hong Kong origin — including clothing items — receive tariff-free treatment in Mainland China from 1 January 2006. <CitationLink id="5" url="https://research.hktdc.com/en/article/MzEzOTM4MzY2" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 06: GLOBAL APPAREL TRADE ────────────────────────── */}
      <section style={{ background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>§ 06 · GLOBAL TRADE FLOWS · APPAREL EXPORT STATISTICS</SectionLabel>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '3rem', color: '#f0ece4' }}>
            World Clothing<br />Export Flows
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div>
              <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa', marginBottom: '1.5rem' }}>
                World clothing exports totalled <strong style={{ color: '#e8e4dc' }}>$520 billion in 2023</strong>, a decline of approximately 10% year-over-year, reflecting slowed economic growth and persistent inventory corrections across major retail markets. <CitationLink id="9" url="https://shenglufashion.com/key-industry-statistics/" />
              </p>
              <p style={{ fontFamily: F.body, fontSize: '1rem', lineHeight: 1.8, color: '#aaa' }}>
                The global apparel market was valued at <strong style={{ color: '#e8e4dc' }}>USD $1.8 trillion in 2023</strong>, projected to reach $2.6 trillion by 2030. China dominates global apparel exports by volume, while Italy maintains a distinct comparative advantage in the luxury and premium segment, where value-per-unit — not volume — defines market position.
              </p>
            </div>
            <div>
              <div style={{ border: '1px solid #222', padding: '2rem' }}>
                <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>GLOBAL APPAREL MARKET — KEY METRICS</div>
                {[
                  { label: 'Global Apparel Market (2023)', value: '$1.8T', source: '9' },
                  { label: 'Global Apparel Market (2030 proj.)', value: '$2.6T', source: '9' },
                  { label: 'World Clothing Exports (2023)', value: '$520B', source: '9' },
                  { label: 'YoY Export Change (2023)', value: '−10%', source: '9' },
                  { label: 'Custom Suits Market (2026)', value: '$6.65B', source: '13' },
                  { label: 'Custom Suits CAGR', value: '5.2%', source: '13' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.6rem 0', borderBottom: i < 5 ? '1px solid #1a1a1a' : 'none' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#888' }}>{m.label}</span>
                    <span style={{ fontFamily: F.mono, fontSize: '0.75rem', color: '#b8a87a' }}>
                      {m.value} <CitationLink id={m.source} url={`#ref-${m.source}`} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 07: TERMINOLOGY GLOSSARY ────────────────────────── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>§ 07 · TECHNICAL GLOSSARY · PRODUCTION TERMINOLOGY</SectionLabel>
        <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '3rem', color: '#f0ece4' }}>
          Production<br />Terminology
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: '#1a1a1a' }}>
          {[
            { term: 'Full Floating Canvas', def: 'A layer of horsehair and wool interlining hand-padded to the chest piece. Floats freely between cloth and lining. Molds to the body over years of wear. The defining feature of handcrafted construction.' },
            { term: 'Half Canvas', def: 'Canvas runs from shoulder to lapel break only. Below the break, the front is fused. A compromise between handcraft and production efficiency.' },
            { term: 'Fused Construction', def: 'Synthetic interlining bonded to the cloth with heat and adhesive. Faster and cheaper to produce. Can delaminate after repeated dry cleaning. Standard in factory RTW production.' },
            { term: 'Pick Stitch', def: 'Hand-sewn edge finishing along lapels and pockets. 8–12 stitches per inch. Visible indicator of handcraft. Absent in machine-finished garments.' },
            { term: 'Surgeon\'s Cuffs', def: 'Working buttonholes on the sleeve cuff that actually open. A traditional indicator of bespoke construction. In RTW, cuffs are typically decorative only.' },
            { term: 'Gorge Line', def: 'The seam where collar meets lapel. In bespoke, set by the cutter to the client\'s posture. In RTW, standardised to a block pattern.' },
            { term: 'Basting', def: 'Temporary stitching used to construct the first fitting shell. Allows the cutter to assess fit before committing to permanent construction.' },
            { term: 'ODM / OEM', def: 'Original Design Manufacturing / Original Equipment Manufacturing. Hong Kong producers supply finished garments to international labels under the label\'s brand identity.' },
            { term: 'Super Number (S100s–S200s)', def: 'A designation for the fineness of wool used in suiting cloth. Derived from the number of hanks per pound of yarn. Higher numbers indicate finer, lighter cloth.' },
          ].map((g, i) => (
            <div key={i} style={{ background: '#0a0a0a', padding: '1.5rem' }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase', color: '#b8a87a', marginBottom: '0.5rem', lineHeight: 1.2 }}>{g.term}</div>
              <div style={{ fontFamily: F.body, fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>{g.def}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REFERENCES ───────────────────────────────────────────────── */}
      <section style={{ background: '#050505', borderTop: '1px solid #1a1a1a', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>§ REFERENCES · PRIMARY SOURCES</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '0.75rem' }}>
            {SOURCES.map((s) => (
              <div key={s.id} id={`ref-${s.id}`} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #111' }}>
                <span style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#b8a87a', flexShrink: 0, width: '1.5rem' }}>[{s.id}]</span>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#aaa', lineHeight: 1.5 }}>
                    {s.author} ({s.year}).{' '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: '#b8a87a', textDecoration: 'underline', textDecorationColor: 'rgba(184,168,122,0.3)' }}>
                      {s.title}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: '#666', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>◆ Atelier Direct · Handcrafted to Order</div>
        <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1.5rem', color: '#f0ece4' }}>
          Access the Production
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '1.1rem', color: '#888', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          The data above describes the industry. Tailors.hk is the production. Enquire for direct access.
        </p>
        <Link href="/contact?type=bespoke">
          <button style={{ fontFamily: F.mono, fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1rem 2.5rem', background: '#b8a87a', color: '#0a0a0a', border: 'none', cursor: 'pointer' }}>
            Enquire for Atelier Direct →
          </button>
        </Link>
      </section>

    </div>
  );
}
