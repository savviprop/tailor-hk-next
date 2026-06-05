import type { Metadata } from "next";
import WorldTailorsClient from "./WorldTailorsClient";

export const metadata: Metadata = {
  title: "The World's Best 47 Tailoring Houses — A Complete Global Directory | Tailors.hk",
  description: "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo.",
  alternates: { canonical: "https://tailors.hk/worlds-best-tailoring" },
  openGraph: {
    title: "The World's Best 47 Tailoring Houses — A Complete Global Directory",
    description: "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo.",
    url: "https://tailors.hk/worlds-best-tailoring",
    images: [{ url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png", width: 1200, height: 630, alt: "The World's Best Tailoring Houses — Tailors.hk" }],
    type: "website",
  },
};

const TAILORS_SSR = [
  { name: "Anderson & Sheppard", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1906, description: "Founded by Per Anders Andersson and Sidney Sheppard, Anderson & Sheppard is the spiritual home of the draped English suit. Their house style — soft, unpadded, with a floating canvas — is the antithesis of the structured Milanese cut. The house has dressed Hollywood royalty for over a century and remains the benchmark for understated English elegance.", url: "https://tailors.hk/worlds-best-tailoring#anderson-sheppard" },
  { name: "Huntsman", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1849, description: "Established in 1849, Huntsman is the most architecturally structured house on Savile Row. Their signature single-button jacket with a high, tight armhole and suppressed waist is immediately recognisable. Originally a riding tailor, the house has translated equestrian precision into civilian dress with extraordinary results.", url: "https://tailors.hk/worlds-best-tailoring#huntsman" },
  { name: "Norton & Sons", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1821, description: "Founded in 1821, Norton & Sons is one of the oldest surviving tailoring houses on Savile Row. Under the stewardship of Patrick Grant, the house has been revitalised while maintaining its commitment to traditional English construction.", url: "https://tailors.hk/worlds-best-tailoring#norton-sons" },
  { name: "Henry Poole & Co", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1806, description: "Henry Poole & Co holds the distinction of being the founding house of Savile Row, having established their premises there in 1846. The house is credited with creating the dinner jacket for the Prince of Wales in 1865. With royal warrants from across Europe and a client list spanning emperors and statesmen, Henry Poole represents the apex of English tailoring heritage.", url: "https://tailors.hk/worlds-best-tailoring#henry-poole" },
  { name: "Kiton", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1956, description: "Founded by Ciro Paone in Naples in 1956, Kiton is the benchmark for Neapolitan tailoring at its most luxurious. Each jacket requires up to 25 hours of hand work by a single craftsman. The house is renowned for its spalla camicia — the shirt-sleeve shoulder, gathered and puckered — and its extraordinary cashmere and vicuña fabrics.", url: "https://tailors.hk/worlds-best-tailoring#kiton" },
  { name: "Cesare Attolini", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1930, description: "The Attolini family claim the most significant contribution to modern tailoring: it was Vincenzo Attolini, working for Gennaro Rubinacci in the 1930s, who first created the soft, unstructured Italian jacket — abandoning the stiff English canvas and padding to reveal the natural shape of the body.", url: "https://tailors.hk/worlds-best-tailoring#cesare-attolini" },
  { name: "Isaia", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1957, description: "Founded by Enrico Isaia in Naples in 1957, Isaia has built its reputation on the most adventurous use of cloth on the Neapolitan scene. Where other houses favour restraint, Isaia embraces bold patterns, vivid colours, and unexpected fabric combinations.", url: "https://tailors.hk/worlds-best-tailoring#isaia" },
  { name: "Brioni", city: "Rome", country: "Italy", tradition: "Italian", founded: 1945, description: "Founded in Rome in 1945 by Nazareno Fonticoli and Gaetano Savini, Brioni elevated Italian tailoring to international prominence. Their Roman construction — more structured than Naples, more fluid than Milan — occupies a unique position. The house dressed James Bond from 1995 to 2012.", url: "https://tailors.hk/worlds-best-tailoring#brioni" },
  { name: "Ermenegildo Zegna", city: "Milan", country: "Italy", tradition: "Italian", founded: 1910, description: "Founded by Ermenegildo Zegna in Trivero in 1910 — beginning as a wool mill — Zegna is unique among luxury tailoring houses in controlling the entire supply chain from raw fibre to finished garment. The Oasi Cashmere and Vellutino fabrics produced at their Trivero mill are among the finest in the world.", url: "https://tailors.hk/worlds-best-tailoring#zegna" },
  { name: "Cifonelli", city: "Paris", country: "France", tradition: "Parisian", founded: 1880, description: "Founded in Rome in 1880 and relocated to Paris, Cifonelli has developed the most distinctive shoulder construction in tailoring — the concave, scooped armhole that creates a uniquely clean line from the back. The house is now run by cousins Lorenzo and Massimo Cifonelli.", url: "https://tailors.hk/worlds-best-tailoring#cifonelli" },
  { name: "Ralph Lauren Purple Label", city: "New York", country: "United States", tradition: "American", founded: 1994, description: "Launched in 1994, Ralph Lauren Purple Label represents the pinnacle of the Ralph Lauren universe — full canvas construction, hand-finished in Italy, with a distinctly American sensibility. The collection channels the patrician elegance of the American East Coast establishment.", url: "https://tailors.hk/worlds-best-tailoring#ralph-lauren-purple" },
  { name: "Tom Ford", city: "New York", country: "United States", tradition: "American", founded: 2006, description: "Tom Ford launched his eponymous label in 2006 after transforming Gucci and Yves Saint Laurent. His suits are the most body-conscious in the luxury market — slim, sleek, and deliberately cinematic. The construction is impeccable: full canvas in the bespoke line, with extraordinary fabrics.", url: "https://tailors.hk/worlds-best-tailoring#tom-ford" },
  { name: "W.W. Chan & Sons", city: "Hong Kong", country: "Hong Kong", tradition: "Hong Kong", founded: 1952, description: "Founded in Shanghai in 1952 and relocated to Hong Kong, W.W. Chan & Sons is the most consistently recommended bespoke house in the city among serious menswear writers and well-travelled clients. Their construction follows the Shanghai tradition: full canvas, hand-padded lapels, and a fitting process that prioritises anatomical precision over speed.", url: "https://tailors.hk/worlds-best-tailoring#ww-chan" },
  { name: "Magnus & Novus", city: "Hong Kong", country: "Hong Kong", tradition: "British", founded: 2015, description: "Magnus & Novus is a British menswear house of singular aesthetic conviction — understated, precise, and built to endure. Every garment is entirely handcrafted, with over 5,000 individual stitches per piece and proprietary textiles developed exclusively for the house.", url: "https://tailors.hk/worlds-best-tailoring#magnus-novus" },
  { name: "Boglioli", city: "Milan", country: "Italy", tradition: "Italian", founded: 1890, description: "Founded in 1890, Boglioli is best known for the K-Jacket — the original deconstructed Italian suit jacket, unlined and unpadded, that moves like a second skin. This innovation, launched in the 1990s, created an entirely new category of tailored clothing.", url: "https://tailors.hk/worlds-best-tailoring#boglioli" },
  { name: "Loro Piana", city: "Quarona", country: "Italy", tradition: "Italian", founded: 1924, description: "Loro Piana is not a tailor in the traditional sense — it is the world's foremost fabric house, and arguably the single most important name in luxury textile production. Founded in 1924 in Quarona, Piedmont, the house controls the supply chain from raw fibre to finished garment.", url: "https://tailors.hk/worlds-best-tailoring#loro-piana" },
  { name: "Berluti", city: "Paris", country: "France", tradition: "Parisian", founded: 1895, description: "Founded in Paris in 1895, Berluti is the house that elevated the shoe to an art form — and then extended that philosophy to the entire wardrobe. Their hand-patinated leather, developed over generations, remains unmatched.", url: "https://tailors.hk/worlds-best-tailoring#berluti" },
  { name: "Brunello Cucinelli", city: "Solomeo", country: "Italy", tradition: "Italian", founded: 1978, description: "Brunello Cucinelli founded his house in 1978 in the medieval hamlet of Solomeo, Umbria, where it remains today. His philosophy — that luxury and ethics are inseparable — has produced a house unlike any other. The cashmere knitwear and tailoring are among the finest produced in Italy.", url: "https://tailors.hk/worlds-best-tailoring#brunello-cucinelli" },
  { name: "Ring Jacket", city: "Osaka", country: "Japan", tradition: "Japanese", founded: 1954, description: "Founded in Osaka in 1954, Ring Jacket has developed the most respected Japanese interpretation of Neapolitan tailoring — floating canvas, hand-stitched, with a spalla camicia shoulder. Extraordinary quality at a price point that rivals European bespoke.", url: "https://tailors.hk/worlds-best-tailoring#ring-jacket" },
  { name: "Rubinacci", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1932, description: "Gennaro Rubinacci's London House in Naples was the atelier where Vincenzo Attolini created the first modern Italian suit in the 1930s. The house, now run by Mariano Rubinacci, has maintained its position at the apex of Neapolitan tailoring.", url: "https://tailors.hk/worlds-best-tailoring#rubinacci" },
  { name: "Luigi Borrelli", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1957, description: "While primarily a shirtmaker, Luigi Borrelli's influence on Neapolitan tailoring is profound. Founded in Naples in 1957, the house produces what many consider the finest shirts in the world — each requiring 25 hand-sewn steps.", url: "https://tailors.hk/worlds-best-tailoring#borrelli" },
  { name: "Charvet", city: "Paris", country: "France", tradition: "Parisian", founded: 1838, description: "Founded in 1838 on the Place Vendôme, Charvet is the oldest shirtmaker in the world and the definitive Parisian standard for bespoke shirts. The house occupies six floors of its original address, each dedicated to a different category of cloth.", url: "https://tailors.hk/worlds-best-tailoring#charvet" },
  { name: "G. Inglese", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1956, description: "Founded in Naples in 1956, G. Inglese is the shirt house that best embodies the Neapolitan philosophy applied to shirtmaking — soft, unstructured, and entirely hand-finished. Their signature one-piece collar, cut without interlining, rolls and softens with wear.", url: "https://tailors.hk/worlds-best-tailoring#g-inglese" },
  { name: "Liverano & Liverano", city: "Florence", country: "Italy", tradition: "Italian", founded: 1949, description: "Founded by Antonio Liverano in Florence in 1949, Liverano & Liverano occupies a unique position in Italian tailoring — a house with a distinctly Anglophile sensibility executed with the finest Italian hands. Antonio Liverano, still cutting at the bench, is considered one of the greatest living tailors.", url: "https://tailors.hk/worlds-best-tailoring#liverano" },
  { name: "Chittleborough & Morgan", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1987, description: "Founded by Joe Morgan and Roy Chittleborough in 1987, Chittleborough & Morgan occupies a unique position on Savile Row as the most theatrical and expressive house. Where other Row tailors favour restraint, C&M embraces drama — exaggerated shoulders, bold patterns, and silhouettes that push the boundaries of traditional tailoring.", url: "https://tailors.hk/worlds-best-tailoring#chittleborough-morgan" },
  { name: "Richard James", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1992, description: "Founded in 1992 by Richard James and Sean Dixon, the house was among the first on Savile Row to embrace contemporary proportions and a more fashion-forward aesthetic. Their suits are slimmer, more modern, and more colourful than the traditional Row offering.", url: "https://tailors.hk/worlds-best-tailoring#richard-james" },
  { name: "Ozwald Boateng", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1994, description: "Ozwald Boateng became the first Black tailor to open a shop on Savile Row in 1994, bringing a vibrant, sculptural aesthetic that was unlike anything the street had seen. His suits — in bold colours with a distinctive silhouette that emphasises the male form — have dressed Hollywood's African-American elite.", url: "https://tailors.hk/worlds-best-tailoring#ozwald-boateng" },
  { name: "Edward Sexton", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1969, description: "Edward Sexton co-founded Tommy Nutter in 1969, creating the most theatrical suits the Row had ever seen — wide lapels, flared trousers, and a dramatic silhouette that captured the spirit of the late 1960s. The Beatles wore Nutter on the Abbey Road cover.", url: "https://tailors.hk/worlds-best-tailoring#edward-sexton" },
  { name: "Thom Sweeney", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 2009, description: "Founded in 2009 by Thom Whiddett and Luke Sweeney, Thom Sweeney represents the new generation of Savile Row tailoring — modern proportions, contemporary fabrics, and a relaxed approach to the bespoke experience that makes the Row accessible to a younger clientele.", url: "https://tailors.hk/worlds-best-tailoring#thom-sweeney" },
  { name: "Belvest", city: "Vicenza", country: "Italy", tradition: "Italian", founded: 1964, description: "Founded in 1964 in Vicenza, Belvest is one of the last Italian houses to produce entirely by hand — 220 individual hand operations per garment. The construction is pure Venetian: a soft, unstructured shoulder, clean chest, and relaxed drape that moves with the body.", url: "https://tailors.hk/worlds-best-tailoring#belvest" },
  { name: "A. Caraceni", city: "Milan", country: "Italy", tradition: "Italian", founded: 1913, description: "Founded in Rome in 1913 by Augusto Caraceni, A. Caraceni is among the oldest and most revered tailoring houses in Italy. The house moved to Milan and became the definitive expression of Italian bespoke — a structured yet fluid silhouette that influenced every Italian tailor who followed. Gianni Agnelli was a devoted client.", url: "https://tailors.hk/worlds-best-tailoring#a-caraceni" },
  { name: "B&Tailor", city: "Seoul", country: "South Korea", tradition: "Korean", founded: 2010, description: "B&Tailor is Seoul's most respected bespoke house — a studio that has elevated Korean tailoring to international recognition. Founded in 2010, the house combines full canvas construction with a distinctly Korean aesthetic: precise, architectural, and refined.", url: "https://tailors.hk/worlds-best-tailoring#b-and-tailor" },
  { name: "Solito", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1890, description: "Solito is the living standard of Neapolitan tailoring. Gennaro Solito's work — the spalla camicia shoulder, the floating chest, the fluid drape — is considered by many to be the definitive expression of the soft Neapolitan school.", url: "https://tailors.hk/worlds-best-tailoring#solito" },
  { name: "Orazio Luciano", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1990, description: "Orazio Luciano is widely considered the finest entry point into serious Neapolitan bespoke — a house where the quality of construction rivals houses charging twice the price. The soft Neapolitan silhouette is fully present: floating chest, spalla camicia shoulder, fluid drape.", url: "https://tailors.hk/worlds-best-tailoring#orazio-luciano" },
  { name: "Sartoria Dalcuore", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1965, description: "Sartoria Dalcuore is the connoisseur's Neapolitan tailor — a quiet house without the international profile of Kiton or the editorial attention of Solito, but with an exceptionally devoted following among those who know.", url: "https://tailors.hk/worlds-best-tailoring#sartoria-dalcuore" },
  { name: "Dege & Skinner", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1865, description: "Dege & Skinner is the Row's foremost military tailor — a house that has dressed officers of the British armed forces for over 150 years. The military precision of the construction carries directly into their civilian bespoke: a clean, structured silhouette with an exactness that is unmistakably Savile Row.", url: "https://tailors.hk/worlds-best-tailoring#dege-and-skinner" },
  { name: "Welsh & Jefferies", city: "London", country: "United Kingdom", tradition: "Savile Row", founded: 1720, description: "Welsh & Jefferies traces its origins to the 1720s, making it the oldest surviving tailoring house on Savile Row. It is rarely discussed outside the most devoted connoisseur circles — a house that has never sought attention, never modernised its aesthetic, and never compromised its standard.", url: "https://tailors.hk/worlds-best-tailoring#welsh-and-jefferies" },
  { name: "Turnbull & Asser", city: "London", country: "United Kingdom", tradition: "British", founded: 1885, description: "Founded in 1885, Turnbull & Asser is the essential Jermyn Street shirtmaker — Churchill's shirtmaker, a royal warrant holder, and the house that dressed James Bond. Their bespoke shirts are made in their Gloucester factory to an exacting standard.", url: "https://tailors.hk/worlds-best-tailoring#turnbull-and-asser" },
  { name: "Sartoria Vestrucci", city: "Florence", country: "Italy", tradition: "Florentine", founded: 1935, description: "Sartoria Vestrucci is one of Florence's most serious tailoring houses — a quiet atelier with an exceptionally refined hand and a devoted following among those who know. Less celebrated internationally than Liverano & Liverano, the construction and finish are equally serious.", url: "https://tailors.hk/worlds-best-tailoring#sartoria-vestrucci" },
  { name: "Ferdinando Caraceni", city: "Milan", country: "Italy", tradition: "Italian", founded: 1925, description: "Ferdinando Caraceni is the other branch of the great Caraceni tailoring dynasty — a separate house from A. Caraceni, with its own distinguished lineage and devoted clientele. Founded by Ferdinando, a cousin of Augusto, the house maintains the Roman-Milanese bespoke tradition with the same rigour.", url: "https://tailors.hk/worlds-best-tailoring#ferdinando-caraceni" },
  { name: "Arnys", city: "Paris", country: "France", tradition: "Parisian", founded: 1933, description: "Arnys is the Parisian tailor of artists and intellectuals — a house with a devoted following that has always valued the relaxed, the considered, and the unconventional. The Forestière jacket, Arnys's most iconic creation, is a garment of extraordinary simplicity: a field jacket elevated to the level of art.", url: "https://tailors.hk/worlds-best-tailoring#arnys" },
  { name: "Camps de Luca", city: "Paris", country: "France", tradition: "Parisian", founded: 1938, description: "Camps de Luca is the most technically rigorous bespoke house in Paris — a benchmark for French tailoring construction that is rarely discussed outside the most devoted connoisseur circles. The construction is meticulous: full canvas, entirely handmade, with a precision that reflects the French tradition of craft as discipline.", url: "https://tailors.hk/worlds-best-tailoring#camps-de-luca" },
  { name: "Ascot Chang", city: "Hong Kong", country: "Hong Kong", tradition: "Hong Kong", founded: 1953, description: "Founded in 1953, Ascot Chang is the most established shirtmaker in Hong Kong — a house with over seventy years of continuous operation and a client base that spans the city's business and diplomatic community. Their bespoke shirts are made in-house: the collar, the cuff, the placket, and the buttonholes are each executed by hand.", url: "https://tailors.hk/worlds-best-tailoring#ascot-chang" },
  { name: "Dorsia", city: "Hong Kong", country: "Hong Kong", tradition: "Hong Kong", founded: 2010, description: "Dorsia is a contemporary Hong Kong menswear house offering bespoke and made-to-measure suits, shirts, and tailored separates. The house is positioned at the intersection of traditional bespoke craft and contemporary design sensibility. Construction standards — full canvas, hand-finishing, multiple fittings — are consistent with the best bespoke houses in the city.", url: "https://tailors.hk/worlds-best-tailoring#dorsia" },
  { name: "Sartoria Caliendo", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1961, description: "Founded in February 1961 by Biagio Caliendo, who began tailoring at the age of six, Sartoria Caliendo is one of the most respected ateliers in the Neapolitan tradition. The house is defined by its extraordinary spalla camicia — the gathered, puckered shirt-sleeve shoulder that creates a distinctive 'waterfall' effect.", url: "https://tailors.hk/worlds-best-tailoring#caliendo" },
  { name: "Luca Avitabile", city: "Naples", country: "Italy", tradition: "Neapolitan", founded: 1948, description: "Luca Avitabile carries on a family shirtmaking legacy that began in Naples in 1948. Each shirt is hand-cut by Luca himself, with a focus on perfect fit and the use of refined fabrics from the finest mills. The house is particularly celebrated for its collar roll.", url: "https://tailors.hk/worlds-best-tailoring#luca-avitabile" },
  { name: "Atelier Saman Amel", city: "Stockholm", country: "Sweden", tradition: "Scandinavian", founded: 2015, description: "Atelier Saman Amel was founded in Stockholm in 2015 by childhood friends Saman Amel and Dag Granath, with the ambition to build a house where craftsmanship sits at the very centre of modernity. Rooted in the Neapolitan tradition of handwork but filtered through Scandinavian restraint.", url: "https://tailors.hk/worlds-best-tailoring#saman-amel" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "The World's Best Tailoring Houses",
  "description": "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo. 47 houses profiled.",
  "url": "https://tailors.hk/worlds-best-tailoring",
  "numberOfItems": 47,
  "itemListElement": TAILORS_SSR.map((tailor, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": tailor.name,
    "url": tailor.url,
    "description": tailor.description,
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "The World's Best 47 Tailoring Houses — A Complete Global Directory",
  "description": "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo.",
  "url": "https://tailors.hk/worlds-best-tailoring",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailors.hk" },
      { "@type": "ListItem", "position": 2, "name": "World's Best Tailoring Houses", "item": "https://tailors.hk/worlds-best-tailoring" },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Server-rendered semantic layer — crawlable by Google, visually hidden */}
      <div aria-hidden="false" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        <h1>The World&apos;s Best Tailoring Houses — A Complete Global Directory</h1>
        <p>The definitive index of the world&apos;s finest tailors — from Savile Row to Naples, Hong Kong to Tokyo. 47 tailoring houses profiled across 8 traditions and 12 cities.</p>
        <h2>Savile Row — London, United Kingdom</h2>
        <p>Savile Row is the global benchmark for structured English bespoke tailoring. The Row&apos;s houses — Anderson &amp; Sheppard, Huntsman, Henry Poole, Norton &amp; Sons, Dege &amp; Skinner, Welsh &amp; Jefferies, Chittleborough &amp; Morgan, Richard James, Ozwald Boateng, Edward Sexton, Thom Sweeney — represent over three centuries of continuous craft.</p>
        <h2>Neapolitan — Naples, Italy</h2>
        <p>The Neapolitan tradition — soft shoulder, floating canvas, spalla camicia — is the defining alternative to the structured English school. Houses profiled: Kiton, Cesare Attolini, Isaia, Rubinacci, Luigi Borrelli, G. Inglese, Solito, Orazio Luciano, Sartoria Dalcuore, Sartoria Caliendo, Luca Avitabile.</p>
        <h2>Italian — Milan, Rome, Florence, Vicenza</h2>
        <p>The broader Italian tradition encompasses Brioni (Rome), Ermenegildo Zegna (Milan), Liverano &amp; Liverano (Florence), A. Caraceni (Milan), Ferdinando Caraceni (Milan), Boglioli (Milan), Loro Piana (Quarona), Brunello Cucinelli (Solomeo), Belvest (Vicenza), Sartoria Vestrucci (Florence).</p>
        <h2>Parisian — Paris, France</h2>
        <p>The Parisian tailoring tradition is defined by technical rigour and intellectual precision. Houses profiled: Cifonelli, Berluti, Charvet, Arnys, Camps de Luca.</p>
        <h2>Hong Kong</h2>
        <p>Hong Kong&apos;s tailoring tradition blends Shanghainese precision with British influence. Houses profiled: W.W. Chan &amp; Sons, Ascot Chang, Dorsia.</p>
        <h2>British — Beyond Savile Row</h2>
        <p>Houses profiled: Magnus &amp; Novus (Hong Kong), Turnbull &amp; Asser (London).</p>
        <h2>American</h2>
        <p>Houses profiled: Ralph Lauren Purple Label (New York), Tom Ford (New York).</p>
        <h2>Japanese</h2>
        <p>Houses profiled: Ring Jacket (Osaka).</p>
        <h2>Korean</h2>
        <p>Houses profiled: B&amp;Tailor (Seoul).</p>
        <h2>Scandinavian</h2>
        <p>Houses profiled: Atelier Saman Amel (Stockholm).</p>
        <ul>
          {TAILORS_SSR.map((tailor) => (
            <li key={tailor.name}>
              <h3>{tailor.name} — {tailor.city}, {tailor.country} (est. {tailor.founded})</h3>
              <p>{tailor.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <WorldTailorsClient />
    </>
  );
}
