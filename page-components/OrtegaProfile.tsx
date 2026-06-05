"use client";
/**
 * TAILORS.HK — /ortega
 * Ortega Textile AG — Brand Profile Page
 * Design: Atelier Blanc — #f5f4f0 bg, black text, Barlow Condensed display
 * Languages: EN · DE · FR · IT · 日本語 · 中文 · 한국어
 */
import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909";
const IMG = {
  juan:        `${CDN}/FORikawsErKWwTes.jpg`,
  fabricShelf: `${CDN}/xOLNwgrgeqLojQXi.jpg`,
  swatchBook:  `${CDN}/rRfbzhocNvNJbmEA.jpg`,
};

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body: '"Barlow", Arial, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
};
const C = {
  bg: "#f5f4f0", text: "#0a0a0a", muted: "rgba(0,0,0,0.6)",
  faint: "rgba(0,0,0,0.38)", ghost: "rgba(0,0,0,0.1)",
  rule: "rgba(0,0,0,0.12)", ruleFaint: "rgba(0,0,0,0.07)",
  inputBg: "#fff", inputBorder: "rgba(0,0,0,0.18)",
};

type Lang = "en" | "de" | "fr" | "it" | "ja" | "zh" | "ko";
const LANG_LABELS: Record<Lang, string> = { en: "EN", de: "DE", fr: "FR", it: "IT", ja: "日本語", zh: "中文", ko: "한국어" };

interface LangContent {
  tagline: string; heroTitle: string[]; heroSub: string; heroPara: string;
  pillar1Title: string; pillar1Body: string;
  pillar2Title: string; pillar2Body: string;
  pillar3Title: string; pillar3Body: string;
  productionTag: string; productionTitle: string[]; productionP1: string; productionP2: string; productionP3: string;
  stat1Label: string; stat1Unit: string; stat2Label: string; stat2Unit: string; stat3Label: string; stat3Unit: string; stat4Label: string; stat4Unit: string;
  collectionTitle: string; collectionSub: string;
  fabric1Desc: string; fabric2Desc: string; fabric3Desc: string; fabric4Desc: string; fabric5Desc: string; fabric6Desc: string;
  orderTag: string; orderTitle: string;
  order1Title: string; order1Sub: string; order1Body: string; order1Detail: string;
  order2Title: string; order2Sub: string; order2Body: string; order2Detail: string;
  order3Title: string; order3Sub: string; order3Body: string; order3Detail: string;
  quoteLabel: string; quoteText: string; quoteAttr: string;
  ctaTag: string; ctaTitle: string[]; ctaPara: string;
  formName: string; formEmail: string; formCompany: string; formCountry: string;
  formInterest: string; formInterestOpts: string[];
  formCollection: string; formCollectionOpts: string[];
  formOrderType: string; formOrderTypeOpts: string[];
  formQty: string; formQtyOpts: string[];
  formMessage: string; formSubmit: string; formSubmitSending: string; formSuccess: string;
  shareLabel: string; shareCopy: string; shareCopied: string; shareEmail: string; shareWa: string;
  contact1Label: string; contact1Val: string;
  contact2Label: string; contact2Val: string;
  contact3Label: string; contact3Val: string;
}

const T: Record<Lang, LangContent> = {
  en: {
    tagline: "Swiss Shirting · Egyptian Cotton · Founded 2024",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "Switzerland · The CABALLERO Collection",
    heroPara: "Founded by a veteran of Switzerland's finest shirting mills — with two decades at the highest levels of the industry — Ortega Textile AG was built from first principles. No legacy constraints. No compromises. The collection that results from asking a single question: if you could design a shirting mill from scratch, what would you make?",
    pillar1Title: "The Maker",
    pillar1Body: "Juan Antonio Ortega began as a loom mechanic, became a textile technician and designer, and spent two decades rising to CEO of one of Switzerland's most respected shirting mills. In 2024, he left to build the mill he always wanted.",
    pillar2Title: "The Standard",
    pillar2Body: "Width ±1mm. Weight ±2g/m². Colour ΔE < 1.0. No pre-washing required. Every specification decision begins with what the cutter and sewer actually needs — not what is easiest to produce.",
    pillar3Title: "The Material",
    pillar3Body: "A masterfully composed blend of the world's finest ELS cotton fibres. Consistent, reproducible top quality. Fabrics unmatched in nobility, durability, and refinement. In the Soria family, spun to Ne 170/2.",
    productionTag: "Weaving & Finishing",
    productionTitle: ["WOVEN IN EGYPT.", "FINISHED IN EUROPE."],
    productionP1: "The partner weaving mill is located in Alexandria, Egypt — with a production capacity of approximately 3 million metres per year across 80 machines. Loom widths of 190cm, 220cm, and 240cm ensure versatility for any construction.",
    productionP2: "All finishing is carried out exclusively in Europe — Switzerland, Italy, and Austria — guaranteeing the highest European standards of quality, consistency, and long-term performance.",
    productionP3: "Despite being only one year old, Ortega Textile is already present in more than twelve countries. Italy and England play a central role, with the brand represented on Savile Row and Jermyn Street.",
    stat1Label: "Production Capacity", stat1Unit: "Metres / Year",
    stat2Label: "Partner Mill, Alexandria", stat2Unit: "Machines",
    stat3Label: "Global Presence", stat3Unit: "Countries",
    stat4Label: "CABALLERO Stock Collection", stat4Unit: "Articles",
    collectionTitle: "THE COLLECTION",
    collectionSub: "Six families · ~70 articles · Full sample book on request",
    fabric1Desc: "The pinnacle of the collection. Produced exclusively from a single ELS fibre type — Giza — the rarest and most demanding cotton in the world. Three constructions woven on the same machine, each with naturally different shrinkage behaviour. Immediate hand. Effortless drape.",
    fabric2Desc: "The essential professional shirting poplin. Developed by returning to the construction principles of twenty years ago — before the industry modified poplin in favour of efficiency. The result is a perfect poplin, free from artificial treatment.",
    fabric3Desc: "Sister quality to Segovia, spun differently to extract its own distinct character. Engineered to produce a robust poplin with exceptional wearing comfort.",
    fabric4Desc: "Sevilla for uniqueness. Comfort for natural ease. Twill for movement. An ideal balance between business, casual wear, and comfort — a fabric that performs in every situation.",
    fabric5Desc: "The Girona Oxford resolves the wash-performance challenges of traditional Oxford fabrics entirely — providing exceptional stability that remains durable even after repeated washing.",
    fabric6Desc: "The aesthetic of denim without the care requirements. Can be treated exactly like a high-quality dress shirt fabric.",
    orderTag: "How to Work With Ortega",
    orderTitle: "THREE WAYS TO ORDER",
    order1Title: "Stock Service", order1Sub: "CABALLERO Collection",
    order1Body: "Approximately 70 articles permanently available. Order from 1 metre. Cut-length service fully available — aligned with the way bespoke tailors and shirtmakers operate.",
    order1Detail: "From 1m · No minimum",
    order2Title: "Exclusive Development", order2Sub: "House-Exclusive Cloths",
    order2Body: "Custom fabrics created in close collaboration. Replicate existing samples or develop entirely new designs. CAD files provided for approval before production begins.",
    order2Detail: "Sampling: 30–60m · Production: from 60m · Lead time: 10–14 weeks",
    order3Title: "Know-How Services", order3Sub: "Development & Consulting",
    order3Body: "Textile expertise available to other companies — supporting collection development, quality development, and process optimisation across the entire textile value chain.",
    order3Detail: "By arrangement",
    quoteLabel: "On Sustainability",
    quoteText: "\"The perfect shirt should be crafted by one of the tailors or shirtmakers he works with — those who still create everything in their own atelier, investing time, skill, and care into a garment designed to last. To Juan, this is the purest form of sustainability.\"",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "Get in Touch",
    ctaTitle: ["ENQUIRE", "ABOUT ORTEGA"],
    ctaPara: "Tell us a little about your business and what you're looking for. We'll follow up with the right information or a sample book.",
    formName: "Full Name", formEmail: "Email Address", formCompany: "Business / Atelier Name", formCountry: "Country",
    formInterest: "I am interested in",
    formInterestOpts: ["Stock fabrics (CABALLERO Collection)", "Exclusive / house-exclusive development", "Know-how & consulting services", "General information"],
    formCollection: "Collection of interest",
    formCollectionOpts: ["Soria (Ne 170/2 — pinnacle)", "Segovia (Ne 120/2 — professional)", "Salamanca (Ne 100/2)", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "Not sure — send sample book"],
    formOrderType: "I am a",
    formOrderTypeOpts: ["Bespoke tailor", "Shirtmaker / MTM", "Retail buyer / boutique", "Brand / private label", "Distributor", "Other"],
    formQty: "Estimated annual requirement",
    formQtyOpts: ["Under 50m", "50–200m", "200–500m", "500m–2,000m", "Over 2,000m", "Not yet determined"],
    formMessage: "Additional notes (optional)",
    formSubmit: "Send Enquiry", formSubmitSending: "Sending…",
    formSuccess: "Thank you — we'll be in touch shortly.",
    shareLabel: "Share this page",
    shareCopy: "Copy link", shareCopied: "Copied!",
    shareEmail: "Email", shareWa: "WhatsApp",
    contact1Label: "Email", contact1Val: "customer@tailors.hk",
    contact2Label: "Asia Distributor", contact2Val: "Tailors.hk",
    contact3Label: "Mill Address", contact3Val: "Strahlholz 13 · CH-9056 Gais · Switzerland",
  },
  de: {
    tagline: "Schweizer Hemdenstoffe · Ägyptische Baumwolle · Gegründet 2024",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "Schweiz · Die CABALLERO Kollektion",
    heroPara: "Gegründet von einem Veteranen der feinsten Schweizer Hemdenstoff-Webereien — mit zwei Jahrzehnten an der Spitze der Branche — wurde Ortega Textile AG von Grund auf neu aufgebaut. Keine Altlasten. Keine Kompromisse. Eine Kollektion, die aus einer einzigen Frage entstand: Was würden Sie herstellen, wenn Sie eine Hemdenstoff-Weberei von Grund auf neu gestalten könnten?",
    pillar1Title: "Der Gründer",
    pillar1Body: "Juan Antonio Ortega begann als Webmechaniker, wurde Textiltechniker und Designer und stieg in zwei Jahrzehnten zum CEO einer der angesehensten Schweizer Hemdenstoff-Webereien auf. 2024 gründete er seine eigene Weberei.",
    pillar2Title: "Der Standard",
    pillar2Body: "Breite ±1mm · Gewicht ±2g/m² · Farbe ΔE < 1,0 · Kein Vorwaschen erforderlich. Jede Spezifikationsentscheidung beginnt mit dem, was der Zuschneider und Näher tatsächlich benötigt.",
    pillar3Title: "Das Material",
    pillar3Body: "Eine meisterhaft zusammengestellte Mischung der feinsten ELS-Baumwollfasern der Welt. Gleichbleibende, reproduzierbare Spitzenqualität. In der Soria-Familie auf Ne 170/2 gesponnen.",
    productionTag: "Weberei & Veredelung",
    productionTitle: ["IN ÄGYPTEN GEWEBT.", "IN EUROPA VEREDELT."],
    productionP1: "Die Partnerweberei befindet sich in Alexandria, Ägypten — mit einer Produktionskapazität von ca. 3 Millionen Metern pro Jahr auf 80 Maschinen. Webbreiten von 190cm, 220cm und 240cm.",
    productionP2: "Die gesamte Veredelung erfolgt ausschließlich in Europa — Schweiz, Italien und Österreich — und garantiert höchste europäische Qualitätsstandards.",
    productionP3: "Trotz des Alters von nur einem Jahr ist Ortega Textile bereits in mehr als zwölf Ländern präsent, darunter Savile Row und Jermyn Street in London.",
    stat1Label: "Produktionskapazität", stat1Unit: "Meter / Jahr",
    stat2Label: "Partnerweberei, Alexandria", stat2Unit: "Maschinen",
    stat3Label: "Globale Präsenz", stat3Unit: "Länder",
    stat4Label: "CABALLERO Lagerkollektion", stat4Unit: "Artikel",
    collectionTitle: "DIE KOLLEKTION",
    collectionSub: "Sechs Familien · ~70 Artikel · Musterbuch auf Anfrage",
    fabric1Desc: "Der Höhepunkt der Kollektion. Ausschließlich aus einem einzigen ELS-Fasertyp hergestellt — Giza — der seltensten und anspruchsvollsten Baumwolle der Welt. Drei Konstruktionen auf derselben Maschine gewebt, jede mit natürlich unterschiedlichem Einlaufverhalten. Sofortiger Griff. Müheloser Fall.",
    fabric2Desc: "Der unverzichtbare professionelle Hemdenstoff-Popelin. Entwickelt durch Rückkehr zu den Konstruktionsprinzipien von vor zwanzig Jahren — bevor die Industrie Popelin zugunsten der Effizienz veränderte. Das Ergebnis ist ein perfekter Popelin, frei von künstlicher Behandlung.",
    fabric3Desc: "Schwesterqualität zu Segovia, anders gesponnen, um seinen eigenen unverwechselbaren Charakter zu entfalten. Entwickelt, um einen robusten Popelin mit außergewöhnlichem Tragekomfort zu erzeugen.",
    fabric4Desc: "Sevilla für Einzigartigkeit. Comfort für natürliche Leichtigkeit. Twill für Bewegung. Eine ideale Balance zwischen Business, Freizeitkleidung und Komfort — ein Stoff, der in jeder Situation überzeugt.",
    fabric5Desc: "Der Girona Oxford löst die Waschleistungsprobleme traditioneller Oxford-Stoffe vollständig — und bietet außergewöhnliche Stabilität, die auch nach wiederholtem Waschen erhalten bleibt.",
    fabric6Desc: "Die Ästhetik von Denim ohne die Pflegeanforderungen. Kann genauso behandelt werden wie ein hochwertiger Anzughemdenstoff.",
    orderTag: "So arbeiten Sie mit Ortega",
    orderTitle: "DREI BESTELLMÖGLICHKEITEN",
    order1Title: "Lagerservice", order1Sub: "CABALLERO Kollektion",
    order1Body: "Ca. 70 Artikel dauerhaft verfügbar. Bestellung ab 1 Meter. Schnittlängenservice vollständig verfügbar.",
    order1Detail: "Ab 1m · Kein Mindestbestellwert",
    order2Title: "Exklusive Entwicklung", order2Sub: "Hauseigene Stoffe",
    order2Body: "Individuelle Stoffe in enger Zusammenarbeit entwickelt. Bestehende Muster replizieren oder völlig neue Designs entwickeln. CAD-Dateien zur Freigabe vor Produktionsbeginn.",
    order2Detail: "Bemusterung: 30–60m · Produktion: ab 60m · Lieferzeit: 10–14 Wochen",
    order3Title: "Know-how-Dienste", order3Sub: "Entwicklung & Beratung",
    order3Body: "Textilkompetenz für andere Unternehmen — Unterstützung bei Kollektionsentwicklung, Qualitätsentwicklung und Prozessoptimierung.",
    order3Detail: "Nach Vereinbarung",
    quoteLabel: "Über Nachhaltigkeit",
    quoteText: "\"Das perfekte Hemd sollte von einem der Schneider oder Hemdenmacher gefertigt werden, mit denen er zusammenarbeitet — jenen, die noch alles in ihrem eigenen Atelier herstellen, Zeit, Können und Sorgfalt in ein Kleidungsstück investieren, das für die Ewigkeit gemacht ist.\"",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "Kontakt aufnehmen",
    ctaTitle: ["ANFRAGE", "ZU ORTEGA"],
    ctaPara: "Teilen Sie uns etwas über Ihr Unternehmen und Ihre Anforderungen mit. Wir melden uns mit den richtigen Informationen oder einem Musterbuch.",
    formName: "Vollständiger Name", formEmail: "E-Mail-Adresse", formCompany: "Unternehmen / Atelier", formCountry: "Land",
    formInterest: "Ich interessiere mich für",
    formInterestOpts: ["Lagerstoffe (CABALLERO Kollektion)", "Exklusive Hausentwicklung", "Know-how & Beratungsdienstleistungen", "Allgemeine Informationen"],
    formCollection: "Kollektion von Interesse",
    formCollectionOpts: ["Soria (Ne 170/2 — Spitze)", "Segovia (Ne 120/2 — professionell)", "Salamanca (Ne 100/2)", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "Unsicher — Musterbuch zusenden"],
    formOrderType: "Ich bin",
    formOrderTypeOpts: ["Maßschneider", "Hemdenmacher / MTM", "Einzelhändler / Boutique", "Marke / Eigenmarke", "Händler", "Sonstiges"],
    formQty: "Geschätzter Jahresbedarf",
    formQtyOpts: ["Unter 50m", "50–200m", "200–500m", "500m–2.000m", "Über 2.000m", "Noch nicht bestimmt"],
    formMessage: "Zusätzliche Hinweise (optional)",
    formSubmit: "Anfrage senden", formSubmitSending: "Wird gesendet…",
    formSuccess: "Vielen Dank — wir melden uns in Kürze.",
    shareLabel: "Seite teilen",
    shareCopy: "Link kopieren", shareCopied: "Kopiert!",
    shareEmail: "E-Mail", shareWa: "WhatsApp",
    contact1Label: "E-Mail", contact1Val: "customer@tailors.hk",
    contact2Label: "Asien-Distributor", contact2Val: "Tailors.hk",
    contact3Label: "Werksadresse", contact3Val: "Strahlholz 13 · CH-9056 Gais · Schweiz",
  },
  fr: {
    tagline: "Tissus pour chemises suisses · Coton égyptien · Fondée en 2024",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "Suisse · La Collection CABALLERO",
    heroPara: "Fondée par un vétéran des plus grandes manufactures suisses de tissus pour chemises — avec deux décennies au plus haut niveau de l'industrie — Ortega Textile AG a été construite de zéro. Sans contraintes héritées. Sans compromis. Une collection née d'une seule question : si vous pouviez concevoir une manufacture de tissus pour chemises de toutes pièces, que feriez-vous ?",
    pillar1Title: "Le Fondateur",
    pillar1Body: "Juan Antonio Ortega a débuté comme mécanicien de métier à tisser, est devenu technicien textile et designer, et a passé deux décennies à gravir les échelons jusqu'au poste de PDG d'une des manufactures suisses les plus respectées. En 2024, il est parti pour créer la manufacture dont il avait toujours rêvé.",
    pillar2Title: "Le Standard",
    pillar2Body: "Largeur ±1mm · Poids ±2g/m² · Couleur ΔE < 1,0 · Aucun prélavage requis. Chaque décision de spécification part de ce dont le coupeur et le couturier ont réellement besoin.",
    pillar3Title: "La Matière",
    pillar3Body: "Un mélange magistralement composé des meilleures fibres de coton ELS du monde. Qualité supérieure constante et reproductible. Dans la famille Soria, filé à Ne 170/2.",
    productionTag: "Tissage & Finition",
    productionTitle: ["TISSÉ EN ÉGYPTE.", "FINI EN EUROPE."],
    productionP1: "La manufacture partenaire est située à Alexandrie, en Égypte — avec une capacité de production d'environ 3 millions de mètres par an sur 80 machines. Largeurs de métier de 190cm, 220cm et 240cm.",
    productionP2: "Toute la finition est réalisée exclusivement en Europe — Suisse, Italie et Autriche — garantissant les plus hauts standards européens de qualité et de cohérence.",
    productionP3: "Malgré seulement un an d'existence, Ortega Textile est déjà présent dans plus de douze pays, notamment sur Savile Row et Jermyn Street à Londres.",
    stat1Label: "Capacité de production", stat1Unit: "Mètres / An",
    stat2Label: "Manufacture partenaire, Alexandrie", stat2Unit: "Machines",
    stat3Label: "Présence mondiale", stat3Unit: "Pays",
    stat4Label: "Collection stock CABALLERO", stat4Unit: "Articles",
    collectionTitle: "LA COLLECTION",
    collectionSub: "Six familles · ~70 articles · Livre d'échantillons sur demande",
    fabric1Desc: "Le summum de la collection. Produit exclusivement à partir d'un seul type de fibre ELS — Giza — le coton le plus rare et le plus exigeant au monde. Trois constructions tissées sur la même machine, chacune avec un comportement au rétrécissement naturellement différent. Main immédiate. Tombé sans effort.",
    fabric2Desc: "Le popeline de chemiserie professionnelle essentiel. Développé en revenant aux principes de construction d'il y a vingt ans — avant que l'industrie ne modifie le popeline au profit de l'efficacité. Le résultat est un popeline parfait, exempt de traitement artificiel.",
    fabric3Desc: "Qualité sœur de Segovia, filée différemment pour en extraire son propre caractère distinct. Conçue pour produire un popeline robuste avec un confort de port exceptionnel.",
    fabric4Desc: "Sevilla pour l'unicité. Comfort pour la facilité naturelle. Twill pour le mouvement. Un équilibre idéal entre affaires, tenue décontractée et confort — un tissu qui performe dans toutes les situations.",
    fabric5Desc: "Le Girona Oxford résout entièrement les défis de performance au lavage des tissus Oxford traditionnels — offrant une stabilité exceptionnelle qui reste durable même après des lavages répétés.",
    fabric6Desc: "L'esthétique du denim sans les exigences d'entretien. Peut être traité exactement comme un tissu de chemise habillée de haute qualité.",
    orderTag: "Comment travailler avec Ortega",
    orderTitle: "TROIS FAÇONS DE COMMANDER",
    order1Title: "Service Stock", order1Sub: "Collection CABALLERO",
    order1Body: "Environ 70 articles disponibles en permanence. Commande à partir de 1 mètre. Service de coupe entièrement disponible.",
    order1Detail: "À partir de 1m · Sans minimum",
    order2Title: "Développement Exclusif", order2Sub: "Tissus Maison Exclusifs",
    order2Body: "Tissus personnalisés créés en étroite collaboration. Réplication d'échantillons existants ou création de nouveaux designs. Fichiers CAD fournis pour validation avant production.",
    order2Detail: "Échantillonnage : 30–60m · Production : à partir de 60m · Délai : 10–14 semaines",
    order3Title: "Services Know-How", order3Sub: "Développement & Conseil",
    order3Body: "Expertise textile disponible pour d'autres entreprises — soutien au développement de collections, à l'amélioration de la qualité et à l'optimisation des processus.",
    order3Detail: "Sur arrangement",
    quoteLabel: "Sur la Durabilité",
    quoteText: "\"La chemise parfaite devrait être confectionnée par l'un des tailleurs ou chemisiers avec lesquels il travaille — ceux qui créent encore tout dans leur propre atelier, investissant temps, savoir-faire et soin dans un vêtement conçu pour durer.\"",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "Prendre Contact",
    ctaTitle: ["DEMANDE", "D'INFORMATION"],
    ctaPara: "Parlez-nous un peu de votre activité et de ce que vous recherchez. Nous vous répondrons avec les bonnes informations ou un livre d'échantillons.",
    formName: "Nom complet", formEmail: "Adresse e-mail", formCompany: "Entreprise / Atelier", formCountry: "Pays",
    formInterest: "Je suis intéressé par",
    formInterestOpts: ["Tissus en stock (Collection CABALLERO)", "Développement exclusif maison", "Services de conseil et know-how", "Informations générales"],
    formCollection: "Collection d'intérêt",
    formCollectionOpts: ["Soria (Ne 170/2 — summum)", "Segovia (Ne 120/2 — professionnel)", "Salamanca (Ne 100/2)", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "Incertain — envoyer le livre d'échantillons"],
    formOrderType: "Je suis",
    formOrderTypeOpts: ["Tailleur sur mesure", "Chemisier / MTM", "Acheteur retail / boutique", "Marque / label privé", "Distributeur", "Autre"],
    formQty: "Besoin annuel estimé",
    formQtyOpts: ["Moins de 50m", "50–200m", "200–500m", "500m–2 000m", "Plus de 2 000m", "Pas encore déterminé"],
    formMessage: "Notes complémentaires (optionnel)",
    formSubmit: "Envoyer la demande", formSubmitSending: "Envoi en cours…",
    formSuccess: "Merci — nous vous contacterons prochainement.",
    shareLabel: "Partager cette page",
    shareCopy: "Copier le lien", shareCopied: "Copié !",
    shareEmail: "E-mail", shareWa: "WhatsApp",
    contact1Label: "E-mail", contact1Val: "customer@tailors.hk",
    contact2Label: "Distributeur Asie", contact2Val: "Tailors.hk",
    contact3Label: "Adresse manufacture", contact3Val: "Strahlholz 13 · CH-9056 Gais · Suisse",
  },
  it: {
    tagline: "Tessuti per camicie svizzeri · Cotone egiziano · Fondata nel 2024",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "Svizzera · La Collezione CABALLERO",
    heroPara: "Fondata da un veterano dei migliori lanifici svizzeri per camiceria — con due decenni ai vertici del settore — Ortega Textile AG è stata costruita da zero. Nessun vincolo ereditato. Nessun compromesso. Una collezione nata da un'unica domanda: se potessi progettare un lanificio per camiceria da zero, cosa faresti?",
    pillar1Title: "Il Fondatore",
    pillar1Body: "Juan Antonio Ortega ha iniziato come meccanico di telai, è diventato tecnico tessile e designer, e ha trascorso due decenni scalando i vertici fino a diventare CEO di uno dei più rispettati lanifici svizzeri per camiceria. Nel 2024 ha fondato il suo lanificio.",
    pillar2Title: "Lo Standard",
    pillar2Body: "Larghezza ±1mm · Peso ±2g/m² · Colore ΔE < 1,0 · Nessun prelavaggio richiesto. Ogni decisione sulle specifiche parte da ciò di cui il tagliatore e il cucitore hanno realmente bisogno.",
    pillar3Title: "Il Materiale",
    pillar3Body: "Una miscela magistralmente composta delle migliori fibre di cotone ELS del mondo. Qualità superiore costante e riproducibile. Nella famiglia Soria, filato a Ne 170/2.",
    productionTag: "Tessitura & Rifinizione",
    productionTitle: ["TESSUTO IN EGITTO.", "RIFINITO IN EUROPA."],
    productionP1: "Il lanificio partner è situato ad Alessandria, in Egitto — con una capacità produttiva di circa 3 milioni di metri all'anno su 80 macchine. Larghezze telaio di 190cm, 220cm e 240cm.",
    productionP2: "Tutta la rifinizione è effettuata esclusivamente in Europa — Svizzera, Italia e Austria — garantendo i più alti standard europei di qualità e consistenza.",
    productionP3: "Nonostante abbia solo un anno di vita, Ortega Textile è già presente in più di dodici paesi, con rappresentanza su Savile Row e Jermyn Street a Londra.",
    stat1Label: "Capacità produttiva", stat1Unit: "Metri / Anno",
    stat2Label: "Stabilimento partner, Alessandria", stat2Unit: "Macchine",
    stat3Label: "Presenza globale", stat3Unit: "Paesi",
    stat4Label: "Collezione stock CABALLERO", stat4Unit: "Articoli",
    collectionTitle: "LA COLLEZIONE",
    collectionSub: "Sei famiglie · ~70 articoli · Campionario completo su richiesta",
    fabric1Desc: "Il vertice della collezione. Prodotto esclusivamente da un unico tipo di fibra ELS — Giza — il cotone più raro e impegnativo al mondo. Tre costruzioni tessute sulla stessa macchina, ciascuna con un comportamento al restringimento naturalmente diverso. Mano immediata. Caduta senza sforzo.",
    fabric2Desc: "Il popeline da camiceria professionale essenziale. Sviluppato tornando ai principi costruttivi di vent'anni fa — prima che l'industria modificasse il popeline a favore dell'efficienza. Il risultato è un popeline perfetto, privo di trattamenti artificiali.",
    fabric3Desc: "Qualità sorella di Segovia, filata diversamente per estrarne il proprio carattere distinto. Progettata per produrre un popeline robusto con un comfort di indosso eccezionale.",
    fabric4Desc: "Sevilla per l'unicità. Comfort per la naturalezza. Twill per il movimento. Un equilibrio ideale tra business, abbigliamento casual e comfort — un tessuto che performa in ogni situazione.",
    fabric5Desc: "Il Girona Oxford risolve completamente le sfide di performance al lavaggio dei tessuti Oxford tradizionali — offrendo una stabilità eccezionale che rimane duratura anche dopo lavaggi ripetuti.",
    fabric6Desc: "L'estetica del denim senza le esigenze di cura. Può essere trattato esattamente come un tessuto da camicia elegante di alta qualità.",
    orderTag: "Come lavorare con Ortega",
    orderTitle: "TRE MODI PER ORDINARE",
    order1Title: "Servizio Stock", order1Sub: "Collezione CABALLERO",
    order1Body: "Circa 70 articoli disponibili in modo permanente. Ordine da 1 metro. Servizio di taglio completamente disponibile.",
    order1Detail: "Da 1m · Nessun minimo",
    order2Title: "Sviluppo Esclusivo", order2Sub: "Tessuti Esclusivi per la Casa",
    order2Body: "Tessuti personalizzati creati in stretta collaborazione. Replica di campioni esistenti o sviluppo di nuovi design. File CAD forniti per approvazione prima della produzione.",
    order2Detail: "Campionatura: 30–60m · Produzione: da 60m · Tempi: 10–14 settimane",
    order3Title: "Servizi Know-How", order3Sub: "Sviluppo & Consulenza",
    order3Body: "Competenza tessile disponibile per altre aziende — supporto allo sviluppo di collezioni, miglioramento della qualità e ottimizzazione dei processi.",
    order3Detail: "Su accordo",
    quoteLabel: "Sulla Sostenibilità",
    quoteText: "\"La camicia perfetta dovrebbe essere realizzata da uno dei sarti o camiciai con cui lavora — coloro che creano ancora tutto nel proprio atelier, investendo tempo, abilità e cura in un capo progettato per durare.\"",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "Mettiti in Contatto",
    ctaTitle: ["RICHIEDI", "INFORMAZIONI"],
    ctaPara: "Raccontaci un po' della tua attività e di cosa stai cercando. Ti risponderemo con le informazioni giuste o un campionario.",
    formName: "Nome completo", formEmail: "Indirizzo e-mail", formCompany: "Azienda / Atelier", formCountry: "Paese",
    formInterest: "Sono interessato a",
    formInterestOpts: ["Tessuti a stock (Collezione CABALLERO)", "Sviluppo esclusivo per la casa", "Servizi di consulenza e know-how", "Informazioni generali"],
    formCollection: "Collezione di interesse",
    formCollectionOpts: ["Soria (Ne 170/2 — vertice)", "Segovia (Ne 120/2 — professionale)", "Salamanca (Ne 100/2)", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "Non sicuro — invia campionario"],
    formOrderType: "Sono",
    formOrderTypeOpts: ["Sarto su misura", "Camiciaio / MTM", "Buyer retail / boutique", "Brand / private label", "Distributore", "Altro"],
    formQty: "Fabbisogno annuo stimato",
    formQtyOpts: ["Meno di 50m", "50–200m", "200–500m", "500m–2.000m", "Oltre 2.000m", "Non ancora determinato"],
    formMessage: "Note aggiuntive (opzionale)",
    formSubmit: "Invia richiesta", formSubmitSending: "Invio in corso…",
    formSuccess: "Grazie — ti contatteremo a breve.",
    shareLabel: "Condividi questa pagina",
    shareCopy: "Copia link", shareCopied: "Copiato!",
    shareEmail: "E-mail", shareWa: "WhatsApp",
    contact1Label: "E-mail", contact1Val: "customer@tailors.hk",
    contact2Label: "Distributore Asia", contact2Val: "Tailors.hk",
    contact3Label: "Indirizzo stabilimento", contact3Val: "Strahlholz 13 · CH-9056 Gais · Svizzera",
  },
  ja: {
    tagline: "スイス製シャツ地 · エジプト綿 · 2024年創業",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "スイス · CABALLEROコレクション",
    heroPara: "スイス最高峰のシャツ地メーカーで20年以上にわたりトップを務めた職人が、すべてをゼロから設計した新しいシャツ地メーカー。妥協なし。先入観なし。「もし自分でミルを設計するなら、何を作るか？」という問いから生まれたコレクションです。",
    pillar1Title: "創業者について",
    pillar1Body: "フアン・アントニオ・オルテガは機織り職人として出発し、テキスタイル技術者・デザイナーを経て、スイス有数のシャツ地メーカーのCEOに就任。2024年、自らのミルを設立するために独立しました。",
    pillar2Title: "品質基準",
    pillar2Body: "幅±1mm · 重量±2g/m² · 色差ΔE＜1.0 · 水通し不要。すべての仕様は、裁断師や縫製職人が実際に必要とするものを起点に設計されています。",
    pillar3Title: "素材について",
    pillar3Body: "世界最高峰のELS（超長繊維）綿を巧みにブレンド。一貫した最高品質を実現。ソリアファミリーはNe 170/2という極細番手で紡績されています。",
    productionTag: "製織・仕上げ",
    productionTitle: ["エジプトで製織。", "ヨーロッパで仕上げ。"],
    productionP1: "提携製織工場はエジプト・アレクサンドリアに位置し、年間約300万メートルの生産能力を持ちます。190cm・220cm・240cmの幅広い織機幅に対応。",
    productionP2: "仕上げはスイス・イタリア・オーストリアの欧州工場のみで実施。最高水準の品質と一貫性を保証します。",
    productionP3: "創業わずか1年で12カ国以上に展開。ロンドンのサヴィル・ロウおよびジャーミン・ストリートにも採用されています。",
    stat1Label: "生産能力", stat1Unit: "メートル / 年",
    stat2Label: "提携工場（アレクサンドリア）", stat2Unit: "台",
    stat3Label: "グローバル展開", stat3Unit: "カ国以上",
    stat4Label: "CABALLERO在庫コレクション", stat4Unit: "品番",
    collectionTitle: "コレクション",
    collectionSub: "6ファミリー · 約70品番 · サンプルブックはご請求ください",
    fabric1Desc: "コレクションの頂点。世界で最も希少で要求水準の高い綿であるギザ種という単一のELS繊維のみを使用。同一機械で織られた3つの構造体は、それぞれ自然に異なる収縮特性を持ちます。即座の手触り。軽やかなドレープ。",
    fabric2Desc: "プロフェッショナルなシャツ地ポプリンの本質。20年前の構造原理に立ち返って開発されました——業界が効率性を優先してポプリンを変質させる前の姿に。人工的な処理を一切施さない完璧なポプリンです。",
    fabric3Desc: "セゴビアの姉妹品質。独自の個性を引き出すために異なる紡績方法を採用。優れた着用感を持つ堅牢なポプリンを実現するために設計されています。",
    fabric4Desc: "セビリアは個性のために。コンフォートは自然な快適さのために。ツイルは動きのために。ビジネス、カジュアル、コンフォートの理想的なバランス——あらゆる場面で活躍する生地です。",
    fabric5Desc: "ジローナ・オックスフォードは、従来のオックスフォード生地の洗濯耐久性の課題を完全に解決。繰り返しの洗濯後も優れた安定性を維持します。",
    fabric6Desc: "デニムの美学をケアの手間なく。高品質なドレスシャツ生地とまったく同じように扱えます。",
    orderTag: "オルテガとのお取引について",
    orderTitle: "3つのご注文方法",
    order1Title: "在庫サービス", order1Sub: "CABALLEROコレクション",
    order1Body: "約70品番を常時在庫。1メートルから注文可能。カット販売にも完全対応しています。",
    order1Detail: "1mから · 最低注文量なし",
    order2Title: "別注開発", order2Sub: "ハウス専用生地",
    order2Body: "お客様のアトリエ専用の生地を共同開発。既存サンプルの複製または完全新規デザインの開発が可能です。",
    order2Detail: "サンプリング：30〜60m · 生産：60mから · 納期：10〜14週",
    order3Title: "ノウハウサービス", order3Sub: "開発・コンサルティング",
    order3Body: "コレクション開発・品質改善・工程最適化など、テキスタイルバリューチェーン全体にわたる専門知識を提供します。",
    order3Detail: "要相談",
    quoteLabel: "サステナビリティについて",
    quoteText: "「理想のシャツは、自分の生地を使い、アトリエで丁寧に仕立てられたもの。時間と技術と愛情を込めて、長く着られる一着を作ること。それがフアンの考える本当のサステナビリティです。」",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "お問い合わせ",
    ctaTitle: ["オルテガへの", "お問い合わせ"],
    ctaPara: "ご事業内容とご要望をお聞かせください。適切な情報やサンプルブックをご案内いたします。",
    formName: "お名前", formEmail: "メールアドレス", formCompany: "会社名 / アトリエ名", formCountry: "国",
    formInterest: "ご関心の内容",
    formInterestOpts: ["在庫生地（CABALLEROコレクション）", "別注・ハウス専用開発", "ノウハウ・コンサルティングサービス", "一般情報"],
    formCollection: "ご関心のコレクション",
    formCollectionOpts: ["Soria（Ne 170/2 — 最高峰）", "Segovia（Ne 120/2 — プロフェッショナル）", "Salamanca（Ne 100/2）", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "未定 — サンプルブックを送付"],
    formOrderType: "業種",
    formOrderTypeOpts: ["ビスポーク・テーラー", "シャツメーカー / MTM", "小売バイヤー / ブティック", "ブランド / プライベートレーベル", "ディストリビューター", "その他"],
    formQty: "年間推定使用量",
    formQtyOpts: ["50m未満", "50〜200m", "200〜500m", "500〜2,000m", "2,000m以上", "未定"],
    formMessage: "補足事項（任意）",
    formSubmit: "送信する", formSubmitSending: "送信中…",
    formSuccess: "ありがとうございます。近日中にご連絡いたします。",
    shareLabel: "このページをシェア",
    shareCopy: "リンクをコピー", shareCopied: "コピーしました！",
    shareEmail: "メール", shareWa: "WhatsApp",
    contact1Label: "メール", contact1Val: "customer@tailors.hk",
    contact2Label: "アジア代理店", contact2Val: "Tailors.hk",
    contact3Label: "工場住所", contact3Val: "Strahlholz 13 · CH-9056 Gais · スイス",
  },
  zh: {
    tagline: "瑞士衬衫面料 · 埃及棉 · 创立于2024年",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "瑞士 · CABALLERO系列",
    heroPara: "由在瑞士顶级衬衫面料行业深耕二十余年的资深人士创立，Ortega Textile AG 从零开始，重新定义衬衫面料的标准。没有历史包袱，没有妥协。这个系列源于一个问题：如果从头设计一家面料厂，你会做什么？",
    pillar1Title: "创始人",
    pillar1Body: "Juan Antonio Ortega 从织机技师起步，成长为纺织技术员和设计师，最终担任瑞士最受尊敬的衬衫面料厂之一的CEO。2024年，他离开创立了自己的面料厂。",
    pillar2Title: "品质标准",
    pillar2Body: "幅宽±1mm · 克重±2g/m² · 色差ΔE＜1.0 · 无需预洗。每一项规格决策，都以裁缝和缝纫师的实际需求为出发点。",
    pillar3Title: "原材料",
    pillar3Body: "精心调配的世界顶级ELS超长绒棉混纺。品质稳定，可重复再现。Soria系列纺纱支数高达Ne 170/2，属业内最细。",
    productionTag: "织造与后整理",
    productionTitle: ["埃及织造。", "欧洲精整。"],
    productionP1: "合作织造工厂位于埃及亚历山大，年产能约300万米，配备80台织机，幅宽190cm、220cm及240cm。",
    productionP2: "所有后整理工序均在欧洲完成——瑞士、意大利和奥地利——确保最高欧洲标准的品质与一致性。",
    productionP3: "成立仅一年，Ortega Textile 已进入12个以上国家和地区，并在伦敦萨维尔街和杰明街均有合作。",
    stat1Label: "年产能", stat1Unit: "米 / 年",
    stat2Label: "合作工厂（亚历山大）", stat2Unit: "台织机",
    stat3Label: "全球覆盖", stat3Unit: "个以上国家",
    stat4Label: "CABALLERO现货系列", stat4Unit: "款",
    collectionTitle: "系列介绍",
    collectionSub: "六大系列 · 约70款 · 样品册可申请",
    fabric1Desc: "系列之巅。全程采用单一ELS纤维品种——吉扎棉——世界上最稀有、要求最高的棉花。三种组织结构在同一台织机上织造，各具天然不同的缩水特性。触感即现。垂感自然。",
    fabric2Desc: "专业衬衫府绸的本质之作。回归二十年前的织造原理开发而成——彼时行业尚未为效率而改变府绸的本来面目。成品是一款完美的府绸，不含任何人工处理。",
    fabric3Desc: "Segovia的姐妹品质，以不同的纺纱方式提炼出其独特个性。专为呈现坚韧府绸与卓越穿着舒适感而设计。",
    fabric4Desc: "Sevilla代表独特，Comfort代表自然舒适，Twill代表动感。商务、休闲与舒适的理想平衡——一款适应一切场合的面料。",
    fabric5Desc: "Girona Oxford彻底解决了传统牛津布在洗涤性能上的痛点，提供卓越的尺寸稳定性，反复洗涤后依然持久耐用。",
    fabric6Desc: "牛仔布的美学，无需牛仔布的护理。可完全按照高档礼服衬衫面料的方式使用。",
    orderTag: "如何与Ortega合作",
    orderTitle: "三种订购方式",
    order1Title: "现货服务", order1Sub: "CABALLERO系列",
    order1Body: "约70款面料常备库存，最低1米起订。完全支持零剪服务。",
    order1Detail: "最低1米 · 无最低起订量",
    order2Title: "专属开发", order2Sub: "品牌专属面料",
    order2Body: "与您深度合作，开发专属面料。可复制现有样品或全新设计。生产前提供CAD文件供确认。",
    order2Detail: "打样：30–60m · 生产：60m起 · 交期：10–14周",
    order3Title: "专业咨询", order3Sub: "开发与顾问服务",
    order3Body: "为其他企业提供纺织专业知识支持，涵盖系列开发、品质提升及全产业链流程优化。",
    order3Detail: "按需洽谈",
    quoteLabel: "关于可持续性",
    quoteText: "「完美的衬衫，应由与他合作的裁缝或衬衫师傅亲手制作——那些仍在自己工坊里，用时间、技艺和心意，缝制一件经久耐穿的衣裳的人。对Juan而言，这才是最纯粹的可持续。」",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "联系我们",
    ctaTitle: ["询价", "Ortega系列"],
    ctaPara: "请告诉我们您的业务情况和需求，我们将为您提供相关资料或样品册。",
    formName: "姓名", formEmail: "电子邮件", formCompany: "公司 / 工作室名称", formCountry: "国家/地区",
    formInterest: "我感兴趣的是",
    formInterestOpts: ["现货面料（CABALLERO系列）", "专属/品牌专属开发", "专业咨询服务", "一般信息"],
    formCollection: "感兴趣的系列",
    formCollectionOpts: ["Soria（Ne 170/2 — 顶级）", "Segovia（Ne 120/2 — 专业级）", "Salamanca（Ne 100/2）", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "未定 — 请发送样品册"],
    formOrderType: "我是",
    formOrderTypeOpts: ["定制裁缝", "衬衫制作者 / MTM", "零售买手 / 精品店", "品牌 / 自有品牌", "经销商", "其他"],
    formQty: "预计年用量",
    formQtyOpts: ["50m以下", "50–200m", "200–500m", "500–2,000m", "2,000m以上", "暂未确定"],
    formMessage: "补充说明（选填）",
    formSubmit: "发送询价", formSubmitSending: "发送中…",
    formSuccess: "感谢您的询价，我们将尽快与您联系。",
    shareLabel: "分享此页面",
    shareCopy: "复制链接", shareCopied: "已复制！",
    shareEmail: "邮件", shareWa: "WhatsApp",
    contact1Label: "邮箱", contact1Val: "customer@tailors.hk",
    contact2Label: "亚洲经销商", contact2Val: "Tailors.hk",
    contact3Label: "工厂地址", contact3Val: "Strahlholz 13 · CH-9056 Gais · 瑞士",
  },
  ko: {
    tagline: "스위스 셔팅 · 이집트 면 · 2024년 설립",
    heroTitle: ["ORTEGA", "TEXTILE AG."],
    heroSub: "스위스 · CABALLERO 컬렉션",
    heroPara: "스위스 최고의 셔팅 밀에서 20년 이상 최고위직을 역임한 장인이 처음부터 새롭게 설계한 셔팅 밀. 타협 없이, 선입견 없이. '만약 셔팅 밀을 처음부터 설계한다면 무엇을 만들겠는가?'라는 질문에서 탄생한 컬렉션입니다.",
    pillar1Title: "창업자",
    pillar1Body: "Juan Antonio Ortega는 직기 기술자로 시작해 섬유 기술자 및 디자이너를 거쳐, 스위스에서 가장 존경받는 셔팅 밀의 CEO까지 올랐습니다. 2024년, 자신만의 밀을 설립하기 위해 독립했습니다.",
    pillar2Title: "품질 기준",
    pillar2Body: "폭 ±1mm · 중량 ±2g/m² · 색차 ΔE < 1.0 · 사전 세탁 불필요. 모든 사양 결정은 재단사와 봉제사가 실제로 필요로 하는 것에서 출발합니다.",
    pillar3Title: "소재",
    pillar3Body: "세계 최고의 ELS 초장면 면화를 정교하게 블렌딩. 일관된 최고 품질 실현. Soria 패밀리는 Ne 170/2의 극세 방적사로 제직됩니다.",
    productionTag: "제직 및 마감",
    productionTitle: ["이집트에서 제직.", "유럽에서 마감."],
    productionP1: "협력 제직 공장은 이집트 알렉산드리아에 위치하며, 연간 약 300만 미터의 생산 능력을 보유합니다. 190cm, 220cm, 240cm의 다양한 직기 폭으로 모든 구조에 대응합니다.",
    productionP2: "모든 마감 공정은 스위스, 이탈리아, 오스트리아 등 유럽에서만 진행되어 최고 수준의 품질과 일관성을 보장합니다.",
    productionP3: "설립 1년 만에 12개국 이상에 진출. 런던 새빌 로와 저민 스트리트에서도 채택되었습니다.",
    stat1Label: "생산 능력", stat1Unit: "미터 / 년",
    stat2Label: "협력 공장 (알렉산드리아)", stat2Unit: "대",
    stat3Label: "글로벌 진출", stat3Unit: "개국 이상",
    stat4Label: "CABALLERO 재고 컬렉션", stat4Unit: "종",
    collectionTitle: "컬렉션",
    collectionSub: "6개 패밀리 · 약 70종 · 샘플북 요청 가능",
    fabric1Desc: "컬렉션의 정점. 세계에서 가장 희귀하고 까다로운 면화인 기자(Giza) 단일 ELS 섬유만을 사용해 생산됩니다. 동일한 기계에서 제직된 세 가지 구조는 각각 자연스럽게 다른 수축 특성을 지닙니다. 즉각적인 촉감. 자연스러운 드레이프.",
    fabric2Desc: "전문 셔팅 포플린의 정수. 20년 전의 구조 원칙으로 돌아가 개발되었습니다 — 업계가 효율성을 위해 포플린을 변질시키기 전의 모습으로. 인공 처리 없는 완벽한 포플린입니다.",
    fabric3Desc: "Segovia의 자매 품질. 고유한 개성을 끌어내기 위해 다르게 방적되었습니다. 탁월한 착용감을 갖춘 견고한 포플린을 구현하도록 설계되었습니다.",
    fabric4Desc: "Sevilla는 독창성을 위해. Comfort는 자연스러운 편안함을 위해. Twill은 움직임을 위해. 비즈니스, 캐주얼, 편안함의 이상적인 균형 — 모든 상황에서 활약하는 원단입니다.",
    fabric5Desc: "Girona Oxford는 전통 옥스포드 원단의 세탁 내구성 문제를 완전히 해결합니다 — 반복 세탁 후에도 탁월한 안정성을 유지합니다.",
    fabric6Desc: "데님의 미학, 데님의 관리 부담 없이. 고급 드레스 셔츠 원단과 동일하게 취급할 수 있습니다.",
    orderTag: "Ortega와 거래하는 방법",
    orderTitle: "세 가지 주문 방식",
    order1Title: "재고 서비스", order1Sub: "CABALLERO 컬렉션",
    order1Body: "약 70종 상시 재고. 1미터부터 주문 가능. 컷 서비스 완전 지원.",
    order1Detail: "1m부터 · 최소 주문량 없음",
    order2Title: "익스클루시브 개발", order2Sub: "하우스 전용 원단",
    order2Body: "긴밀한 협업을 통해 맞춤 원단 개발. 기존 샘플 복제 또는 완전 신규 디자인 개발 가능.",
    order2Detail: "샘플링: 30–60m · 생산: 60m부터 · 납기: 10–14주",
    order3Title: "노하우 서비스", order3Sub: "개발 및 컨설팅",
    order3Body: "컬렉션 개발, 품질 개선, 공정 최적화 등 섬유 가치 사슬 전반에 걸친 전문 지식을 제공합니다.",
    order3Detail: "협의 후 결정",
    quoteLabel: "지속 가능성에 대하여",
    quoteText: "\"완벽한 셔츠는 그가 함께 일하는 테일러나 셔츠 장인이 만들어야 합니다 — 자신의 아틀리에에서 시간과 기술과 정성을 담아, 오래 입을 수 있는 옷을 만드는 사람들이요.\"",
    quoteAttr: "— Tim Mureau · timmureau.com",
    ctaTag: "문의하기",
    ctaTitle: ["오르테가", "문의하기"],
    ctaPara: "귀사의 비즈니스와 필요한 사항을 알려주세요. 적합한 정보나 샘플북을 안내해 드리겠습니다.",
    formName: "성명", formEmail: "이메일 주소", formCompany: "회사 / 아틀리에명", formCountry: "국가",
    formInterest: "관심 분야",
    formInterestOpts: ["재고 원단 (CABALLERO 컬렉션)", "익스클루시브 / 하우스 전용 개발", "노하우 및 컨설팅 서비스", "일반 정보"],
    formCollection: "관심 컬렉션",
    formCollectionOpts: ["Soria (Ne 170/2 — 최고급)", "Segovia (Ne 120/2 — 프로페셔널)", "Salamanca (Ne 100/2)", "Sevilla Comfort Twill", "Girona Oxford", "Burgos Denim", "미정 — 샘플북 발송 요청"],
    formOrderType: "업종",
    formOrderTypeOpts: ["비스포크 테일러", "셔츠 메이커 / MTM", "리테일 바이어 / 부티크", "브랜드 / 프라이빗 레이블", "유통업체", "기타"],
    formQty: "연간 예상 소요량",
    formQtyOpts: ["50m 미만", "50–200m", "200–500m", "500m–2,000m", "2,000m 이상", "미정"],
    formMessage: "추가 메모 (선택)",
    formSubmit: "문의 보내기", formSubmitSending: "전송 중…",
    formSuccess: "감사합니다 — 곧 연락드리겠습니다.",
    shareLabel: "이 페이지 공유",
    shareCopy: "링크 복사", shareCopied: "복사됨!",
    shareEmail: "이메일", shareWa: "WhatsApp",
    contact1Label: "이메일", contact1Val: "customer@tailors.hk",
    contact2Label: "아시아 디스트리비유터", contact2Val: "Tailors.hk",
    contact3Label: "공장 주소", contact3Val: "Strahlholz 13 · CH-9056 Gais · 스위스",
  },
};

const FABRICS_BASE = [
  { n: "01", name: "Soria", spec: "Ne 170/2 (Poplin) · Ne 150/2 (Twill) · Ne 120/2 (Pinpoint)", fibre: "100% Giza ELS · 36–38mm staple · Uniformity 86–88% · SFI < 5%", descKey: "fabric1Desc" as const },
  { n: "02", name: "Segovia", spec: "Ne 120/2 · Poplin", fibre: "ELS blend · 35–36mm staple · Uniformity 84–87% · SFI < 6%", descKey: "fabric2Desc" as const },
  { n: "03", name: "Salamanca", spec: "Ne 100/2 · Poplin", fibre: "ELS blend · 34–36mm staple · Uniformity 82–85% · SFI < 8%", descKey: "fabric3Desc" as const },
  { n: "04", name: "Sevilla Comfort Twill", spec: "Ne 120/2 · Twill", fibre: "ELS blend · Same yarn as Segovia", descKey: "fabric4Desc" as const },
  { n: "05", name: "Girona Oxford", spec: "Ne 80/2 · Oxford Weave · Stripes / Checks / Plains", fibre: "Blend of three finest ELS cotton types", descKey: "fabric5Desc" as const },
  { n: "06", name: "Burgos Denim", spec: "Ne 80/2 ELS · Warp-dyed", fibre: "Blend of three provenances", descKey: "fabric6Desc" as const },
];

const STATS_NUMS = ["3M", "80", "12+", "70+"];

function Divider() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
      <div style={{ height: "1px", background: C.rule }} />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box" as const,
  fontFamily: F.body, fontSize: "14px", fontWeight: 300,
  color: C.text, background: C.inputBg,
  border: `1px solid ${C.inputBorder}`,
  padding: "11px 14px", outline: "none",
  appearance: "none" as const,
};
const labelStyle: React.CSSProperties = {
  fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.2em",
  color: C.faint, textTransform: "uppercase" as const,
  display: "block", marginBottom: "6px",
};

export default function OrtegaProfile() {
  const [lang, setLang] = useState<Lang>("en");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", country: "", interest: "", collection: "", orderType: "", qty: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const t = T[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText("https://tailors.hk/ortega").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitting(true);
    const subject = encodeURIComponent(`Ortega Textile AG — Enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nCountry: ${formData.country}\n\nInterest: ${formData.interest}\nCollection: ${formData.collection}\nOrder type: ${formData.orderType}\nEstimated qty: ${formData.qty}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:customer@tailors.hk?subject=${subject}&body=${body}`;
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 800);
  };

  const pillars = [
    { n: "01", title: t.pillar1Title, body: t.pillar1Body },
    { n: "02", title: t.pillar2Title, body: t.pillar2Body },
    { n: "03", title: t.pillar3Title, body: t.pillar3Body },
  ];
  const orderRows = [
    { n: "01", title: t.order1Title, sub: t.order1Sub, body: t.order1Body, detail: t.order1Detail },
    { n: "02", title: t.order2Title, sub: t.order2Sub, body: t.order2Body, detail: t.order2Detail },
    { n: "03", title: t.order3Title, sub: t.order3Sub, body: t.order3Body, detail: t.order3Detail },
  ];
  const contactRows = [
    { label: t.contact1Label, value: t.contact1Val },
    { label: t.contact2Label, value: t.contact2Val },
    { label: t.contact3Label, value: t.contact3Val },
  ];

  return (
     <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: F.body }}>
      <Navigation />

       {/* ── LANGUAGE TABS ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: C.bg, borderBottom: `1px solid ${C.ruleFaint}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "flex-end", overflowX: "auto" as const }}>
          {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" as const,
              padding: "12px 14px", border: "none", background: "transparent", cursor: "pointer", whiteSpace: "nowrap" as const,
              color: lang === l ? C.text : C.faint,
              borderBottom: lang === l ? `2px solid ${C.text}` : "2px solid transparent",
            }}>
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 32px 64px" }}>
        <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.28em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "24px" }}>{t.tagline}</div>
        <div style={{ width: "48px", height: "1px", background: C.rule, marginBottom: "24px" }} />
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(56px, 9vw, 100px)", fontWeight: 700, lineHeight: 0.88, letterSpacing: "0.02em", textTransform: "uppercase" as const, color: C.text, margin: "0 0 24px" }}>
          {t.heroTitle[0]}<br />{t.heroTitle[1]}
        </h1>
        <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.faint, marginBottom: "28px" }}>{t.heroSub}</div>
        <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: C.muted, maxWidth: "600px", margin: 0 }}>{t.heroPara}</p>
      </section>

      {/* ── HERO IMAGES — equal height ── */}
      <div className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px 64px" }}>
        <div className="ortega-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3px", height: "420px" }}>
          <div style={{ overflow: "hidden", background: "#e0ddd6" }}>
            <img src={IMG.juan} alt="Juan Antonio Ortega" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          </div>
          <div style={{ overflow: "hidden", background: "#e0ddd6" }}>
            <img src={IMG.fabricShelf} alt="Ortega fabric rolls" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          </div>
        </div>
        <div style={{ marginTop: "8px", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.16em", color: "rgba(0,0,0,0.22)", textTransform: "uppercase" as const }}>
          Photography: Tim Mureau · timmureau.com
        </div>
      </div>

      <Divider />

      {/* ── THREE PILLARS ── */}
      <section className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <div className="ortega-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ borderRight: i < 2 ? `1px solid ${C.ruleFaint}` : "none", paddingRight: i < 2 ? "40px" : "0" }}>
              <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.22em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "12px" }}>{p.n}</div>
              <h3 style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.text, margin: "0 0 12px" }}>{p.title}</h3>
              <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: C.muted, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── PRODUCTION ── */}
      <section className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <div className="ortega-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.22em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "18px" }}>{t.productionTag}</div>
            <h2 style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: C.text, margin: "0 0 24px", lineHeight: 1.0 }}>
              {t.productionTitle[0]}<br />{t.productionTitle[1]}
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.9, color: C.muted, margin: "0 0 16px" }}>{t.productionP1}</p>
            <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.9, color: C.muted, margin: "0 0 16px" }}>{t.productionP2}</p>
            <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.9, color: C.muted, margin: 0 }}>{t.productionP3}</p>
          </div>
          <div>
            {STATS_NUMS.map((num, i) => {
              const labelKey = `stat${i+1}Label` as keyof LangContent;
              const unitKey = `stat${i+1}Unit` as keyof LangContent;
              return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "20px 0", borderBottom: `1px solid ${C.ruleFaint}` }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.2em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "4px" }}>{t[labelKey] as string}</div>
                  <div style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, color: C.muted }}>{t[unitKey] as string}</div>
                </div>
                <div style={{ fontFamily: F.display, fontSize: "42px", fontWeight: 700, color: C.ghost, lineHeight: 1.0 }}>{num}</div>
              </div>
            );})}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── THE COLLECTION ── */}
      <section className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px", flexWrap: "wrap" as const, gap: "12px" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.text, margin: 0 }}>{t.collectionTitle}</h2>
          <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.18em", color: C.faint, textTransform: "uppercase" as const }}>{t.collectionSub}</div>
        </div>
        {FABRICS_BASE.map((f, i) => (
          <div key={i} className="ortega-fabric-row" style={{ padding: "40px 0", borderBottom: `1px solid ${C.rule}` }}>
            {/* Row header: number + name */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "20px" }}>
              <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.2em", color: C.faint, textTransform: "uppercase" as const, minWidth: "28px" }}>{f.n}</div>
              <div style={{ fontFamily: F.display, fontSize: "26px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.text }}>{f.name}</div>
            </div>
            {/* Row body: specs left, description right */}
            <div className="ortega-fabric-inner" style={{ display: "grid", gap: "48px", alignItems: "start" }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", color: "rgba(0,0,0,0.45)", textTransform: "uppercase" as const, lineHeight: 2.0, marginBottom: "8px" }}>{f.spec}</div>
                <div style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.10em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, lineHeight: 2.0 }}>{f.fibre}</div>
              </div>
              <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.9, color: C.muted, margin: 0 }}>{t[f.descKey]}</p>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── THREE WAYS TO ORDER ── */}
      <section className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.22em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "18px" }}>{t.orderTag}</div>
          <h2 style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: C.text, margin: 0 }}>{t.orderTitle}</h2>
        </div>
        <div className="ortega-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {orderRows.map((s, i) => (
            <div key={i} style={{ borderRight: i < 2 ? `1px solid ${C.ruleFaint}` : "none", paddingRight: i < 2 ? "40px" : "0" }}>
              <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.22em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "12px" }}>{s.n}</div>
              <h3 style={{ fontFamily: F.display, fontSize: "20px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.text, margin: "0 0 4px" }}>{s.title}</h3>
              <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.18em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "14px" }}>{s.sub}</div>
              <p style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: C.muted, margin: "0 0 16px" }}>{s.body}</p>
              <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.14em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase" as const, lineHeight: 1.8, borderTop: `1px solid ${C.rule}`, paddingTop: "12px" }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ background: "rgba(0,0,0,0.03)", borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`, padding: "64px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="ortega-quote-grid" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "64px", alignItems: "center" }}>
            <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.faint }}>{t.quoteLabel}</div>
            <blockquote style={{ fontFamily: F.body, fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "rgba(0,0,0,0.65)", margin: 0, fontStyle: "italic", borderLeft: `2px solid ${C.rule}`, paddingLeft: "24px" }}>
              {t.quoteText}
              <span style={{ display: "block", marginTop: "12px", fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.18em", color: C.faint, fontStyle: "normal", textTransform: "uppercase" as const }}>{t.quoteAttr}</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section className="ortega-section-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 32px" }} ref={formRef}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.22em", color: C.faint, textTransform: "uppercase" as const, marginBottom: "18px" }}>{t.ctaTag}</div>
          <h2 style={{ fontFamily: F.display, fontSize: "42px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: C.text, margin: "0 0 20px", lineHeight: 1.0 }}>
            {t.ctaTitle[0]}<br />{t.ctaTitle[1]}
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: C.muted, maxWidth: "560px", margin: 0 }}>{t.ctaPara}</p>
        </div>

        {submitted ? (
          <div style={{ padding: "40px 32px", background: "rgba(0,0,0,0.04)", borderLeft: `3px solid ${C.text}` }}>
            <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.text }}>{t.formSuccess}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Email */}
            <div className="ortega-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>{t.formName} *</label>
                <input required style={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>{t.formEmail} *</label>
                <input required type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            {/* Row 2: Company + Country */}
            <div className="ortega-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>{t.formCompany}</label>
                <input style={inputStyle} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>{t.formCountry}</label>
                <input style={inputStyle} value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} />
              </div>
            </div>
            {/* Row 3: Interest + Order type */}
            <div className="ortega-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>{t.formInterest}</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={formData.interest} onChange={e => setFormData({ ...formData, interest: e.target.value })}>
                  <option value="">—</option>
                  {t.formInterestOpts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t.formOrderType}</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={formData.orderType} onChange={e => setFormData({ ...formData, orderType: e.target.value })}>
                  <option value="">—</option>
                  {t.formOrderTypeOpts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            {/* Row 4: Collection + Qty */}
            <div className="ortega-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>{t.formCollection}</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={formData.collection} onChange={e => setFormData({ ...formData, collection: e.target.value })}>
                  <option value="">—</option>
                  {t.formCollectionOpts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t.formQty}</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={formData.qty} onChange={e => setFormData({ ...formData, qty: e.target.value })}>
                  <option value="">—</option>
                  {t.formQtyOpts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            {/* Message */}
            <div style={{ marginBottom: "28px" }}>
              <label style={labelStyle}>{t.formMessage}</label>
              <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" as const }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
            </div>
            {/* Submit + Contact */}
            <div className="ortega-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
              <button type="submit" disabled={submitting} style={{
                fontFamily: F.display, fontSize: "13px", fontWeight: 700, letterSpacing: "0.22em",
                textTransform: "uppercase" as const, color: C.bg, background: C.text,
                padding: "15px 32px", border: "none", cursor: submitting ? "wait" : "pointer", width: "100%",
              }}>
                {submitting ? t.formSubmitSending : t.formSubmit}
              </button>
              <div>
                {contactRows.map((d, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.ruleFaint}` }}>
                    <div style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.18em", color: C.faint, textTransform: "uppercase" as const, flexShrink: 0, marginRight: "16px" }}>{d.label}</div>
                    <div style={{ fontFamily: F.body, fontSize: "12px", fontWeight: 300, color: C.muted, textAlign: "right" as const }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}
      </section>

      {/* ── ANTHOLOGY LINK ── */}
      <section style={{ borderTop: `1px solid ${C.rule}`, padding: "32px 32px", backgroundColor: "#f8f8f8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "16px" }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.16em", color: "#999", marginBottom: "4px", textTransform: "uppercase" as const }}>FABRIC ANTHOLOGY</div>
            <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#0a0a0a" }}>Browse All 6 Fabric Families</div>
          </div>
          <a href="/ortega-anthology" style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, padding: "12px 24px", backgroundColor: "#0a0a0a", color: "#fff", textDecoration: "none", display: "inline-block" }}>VIEW ANTHOLOGY →</a>
        </div>
      </section>

      {/* ── SHARE BUTTONS ── */}
      <section style={{ borderTop: `1px solid ${C.rule}`, padding: "40px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" as const }}>
          <span style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.2em", color: C.faint, textTransform: "uppercase" as const, marginRight: "8px" }}>{t.shareLabel}</span>
          <button onClick={handleCopy} style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" as const, padding: "9px 18px", border: `1px solid ${C.rule}`, background: "transparent", cursor: "pointer", color: copied ? C.text : C.faint }}>
            {copied ? t.shareCopied : t.shareCopy}
          </button>
          <a href="mailto:?subject=Ortega%20Textile%20AG%20%E2%80%94%20Swiss%20Shirting&body=I%20thought%20you%20might%20be%20interested%20in%20this%3A%20https%3A%2F%2Ftailors.hk%2Fortega" style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" as const, padding: "9px 18px", border: `1px solid ${C.rule}`, color: C.faint, textDecoration: "none" }}>
            {t.shareEmail}
          </a>
          <a href="https://wa.me/?text=Ortega%20Textile%20AG%20%E2%80%94%20Swiss%20Shirting%20%7C%20tailors.hk%2Fortega" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" as const, padding: "9px 18px", border: `1px solid ${C.rule}`, color: C.faint, textDecoration: "none" }}>
            {t.shareWa}
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: `1px solid ${C.rule}`, padding: "28px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 700, letterSpacing: "0.28em", color: C.faint, textTransform: "uppercase" as const }}>TAILORS</span>
          <span style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.18em", color: "rgba(0,0,0,0.28)", textTransform: "uppercase" as const }}>tailors.hk · Tailors Directory</span>
        </div>
      </div>

      <style>{`
        .ortega-fabric-inner { grid-template-columns: 240px 1fr; }
        @media (max-width: 768px) {
          .ortega-hero-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .ortega-hero-grid > div:first-child { height: 200px !important; }
          .ortega-hero-grid > div:last-child { height: 260px !important; }
          .ortega-3col { grid-template-columns: 1fr !important; }
          .ortega-3col > div { border-right: none !important; padding-right: 0 !important; border-bottom: 1px solid rgba(0,0,0,0.07) !important; padding-bottom: 28px !important; }
          .ortega-3col > div:last-child { border-bottom: none !important; padding-bottom: 0 !important; }
          .ortega-2col { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ortega-fabric-inner { grid-template-columns: 1fr !important; gap: 12px !important; }
          .ortega-quote-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .ortega-hero-grid > div:first-child { height: 170px !important; }
          .ortega-hero-grid > div:last-child { height: 220px !important; }
        }
        @media (max-width: 768px) {
          .ortega-section-pad { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </div>
  );
}
