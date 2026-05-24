/**
 * TAILORS.HK — Shared Enquiry Utilities
 *
 * Every enquiry message includes:
 *  1. Source page — so you know exactly where the client came from
 *  2. Client selections — garment, mill, tier, fabric, price, service preference
 *  3. Atelier Direct standard inclusions — context-aware:
 *       - Expedited Order (2–3 weeks) only shown when service = MTM
 *       - Bespoke and generic enquiries omit Expedited Order
 *
 * Standard inclusions (all commissions):
 *   ◆ Full Floating Canvas Construction
 *   ◆ Hand-Padded Lapels
 *   ◆ Hand-Stitched Finishing
 *   ◆ Full Measurement Archive
 *   ◆ Expedited Order — 2–3 weeks (MTM only)
 */

export const WHATSAPP_NUMBER = "85265088780";

/** Build the inclusions block. Expedited Order only shown for MTM. */
export function buildInclusionsBlock(isMTM = false): string {
  return [
    ``,
    `*Atelier Direct — Included as Standard at Every Commission:*`,
    `◆ Full Floating Canvas Construction`,
    `◆ Hand-Padded Lapels`,
    `◆ Hand-Stitched Finishing`,
    `◆ Working Surgeon's Cuffs (HK$2,500 — Included)`,
    `◆ Full Measurement Archive`,
    ...(isMTM ? [`◆ Expedited Order — 2–3 weeks (Made-to-Measure)`] : []),
    ``,
    `_These are standard inclusions. Most tailoring houses charge separately for each._`,
  ].join("\n");
}

/**
 * Build a WhatsApp URL from message lines.
 * @param lines   Message body lines
 * @param isMTM   Whether to include Expedited Order in inclusions
 */
export function buildWhatsAppUrl(lines: string[], isMTM = false): string {
  const full = lines.join("\n") + buildInclusionsBlock(isMTM);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(full)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-specific message builders
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Product page — product name, ID, mill, service preference, price.
 * Expedited Order shown only when service = "Made-to-Measure".
 */
export function productEnquiryUrl(opts: {
  productName: string;
  productId: string;
  category: string;
  mill?: string;
  millOrigin?: string;
  service: "Bespoke" | "Made-to-Measure";
  price: string;
  referenceSize?: string;
}): string {
  const isMTM = opts.service === "Made-to-Measure";
  return buildWhatsAppUrl([
    `*ATELIER DIRECT ENQUIRY — TAILORS.HK*`,
    `Source: Product Page — ${opts.category}`,
    ``,
    `Garment: ${opts.productName} (Ref. ${opts.productId})`,
    ...(opts.mill ? [`Cloth Mill: ${opts.mill}${opts.millOrigin ? ` · ${opts.millOrigin}` : ``}`] : []),
    `Service: ${opts.service}`,
    `Atelier Direct Rate: ${opts.price}`,
    ...(opts.referenceSize ? [`Reference Size: ${opts.referenceSize} (for reference only — will be measured individually)`] : []),
    ``,
    `I would like to discuss this commission. Please advise on availability and next steps.`,
  ], isMTM);
}

/**
 * Atelier Direct page — tier card enquiry.
 * Bespoke-only service; no Expedited Order.
 */
export function atelierTierEnquiryUrl(opts: {
  tier: string;
  price: string;
}): string {
  return buildWhatsAppUrl([
    `*ATELIER DIRECT ENQUIRY — TAILORS.HK*`,
    `Source: Atelier Direct — ${opts.tier} Tier`,
    ``,
    `Commission: ${opts.tier} Tier`,
    `Atelier Direct Rate: From ${opts.price}`,
    ``,
    `I would like to enquire about Atelier Direct. Please advise on availability and next steps.`,
  ], false);
}

/**
 * Pricing quiz — garment, construction, fabric, price range.
 * Expedited Order shown when construction = half canvas (MTM context).
 */
export function quizEnquiryUrl(opts: {
  garment: string;
  construction: string;
  fabric: string;
  priceLow: number;
  priceHigh: number;
  isMTM?: boolean;
}): string {
  const fmt = (n: number) => `HK$${n.toLocaleString()}`;
  return buildWhatsAppUrl([
    `*ATELIER DIRECT ENQUIRY — TAILORS.HK*`,
    `Source: Pricing Guide`,
    ``,
    `Garment: ${opts.garment}`,
    `Construction: ${opts.construction}`,
    `Fabric: ${opts.fabric}`,
    `Atelier Direct Rate: ${fmt(opts.priceLow)} – ${fmt(opts.priceHigh)}`,
    ``,
    `I would like to discuss this commission. Please advise on availability and next steps.`,
  ], opts.isMTM ?? false);
}

/**
 * TailoredMenswear listing page — garment category + Atelier Direct rate.
 * Service not yet known; omit Expedited Order.
 */
export function menswearEnquiryUrl(opts: {
  garment: string;
  price: string;
}): string {
  return buildWhatsAppUrl([
    `*ATELIER DIRECT ENQUIRY — TAILORS.HK*`,
    `Source: Tailored Menswear — ${opts.garment}`,
    ``,
    `Garment Category: ${opts.garment}`,
    `Atelier Direct Rate: From ${opts.price}`,
    ``,
    `I would like to enquire about a commission. Please advise on availability and next steps.`,
  ], false);
}

/**
 * Contact form submission — full brief.
 * Expedited Order shown only when enquiry type = "mtm".
 */
export function contactFormUrl(message: string, isMTM = false): string {
  const full = message + buildInclusionsBlock(isMTM);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(full)}`;
}

/**
 * Generic page enquiry — pages without specific selection state.
 * No service context; omit Expedited Order.
 */
export function pageEnquiryUrl(page: string, note?: string): string {
  return buildWhatsAppUrl([
    `*ATELIER DIRECT ENQUIRY — TAILORS.HK*`,
    `Source: ${page}`,
    ``,
    ...(note ? [note, ``] : []),
    `I found you via Tailors.hk and would like to enquire about Atelier Direct.`,
    `Please advise on availability and next steps.`,
  ], false);
}

/**
 * Tailor Finder Brief results — full quiz summary with all answers and recommendation.
 * Bespoke-only context; no Expedited Order.
 */
export function tailorFinderBriefUrl(opts: {
  occasion: string;
  garment: string;
  budget: string;
  fitPriority: string;
  experience: string;
  timeline: string;
  recommendationTitle: string;
  recommendationService: string;
  recommendationPrice: string;
}): string {
  return buildWhatsAppUrl([
    `*TAILOR FINDER BRIEF — TAILORS.HK*`,
    `Source: Tailor Finder Brief`,
    ``,
    `*Brief Summary:*`,
    `Occasion: ${opts.occasion}`,
    `Garment: ${opts.garment}`,
    `Budget: ${opts.budget}`,
    `Priority: ${opts.fitPriority}`,
    `Experience: ${opts.experience}`,
    `Timeline: ${opts.timeline}`,
    ``,
    `*Recommendation:*`,
    `${opts.recommendationTitle} — ${opts.recommendationService}`,
    `${opts.recommendationPrice}`,
    ``,
    `I would like to proceed with this recommendation. Please advise on availability and next steps.`,
  ], false);
}
