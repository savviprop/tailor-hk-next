"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — TAILOR FINDER BRIEF
 * Design: Technical Editorial — Barlow Condensed + JetBrains Mono
 * Interactive shortlisting tool — 6 questions, personalised recommendation
 */

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "@/lib/wouter-shim";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, MessageSquare, Mail, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import { tailorFinderBriefUrl } from "@/lib/whatsapp";

// ── Design system fonts ──────────────────────────────────────────────────────
const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; value: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: "occasion",
    question: "What is the primary occasion?",
    subtitle: "Tell us what you are dressing for.",
    options: [
      { label: "Business & Professional", value: "business", description: "Daily office wear, client meetings, corporate events" },
      { label: "Formal & Black Tie",      value: "formal",   description: "Weddings, galas, black tie events" },
      { label: "Social & Leisure",        value: "social",   description: "Smart casual, dinners, social occasions" },
      { label: "Corporate Uniform",       value: "corporate",description: "Company-wide wardrobe programme" },
    ],
  },
  {
    id: "garment",
    question: "Which garment do you need?",
    subtitle: "Select the primary piece you are looking to commission.",
    options: [
      { label: "Suit",          value: "suit",     description: "Two-piece or three-piece" },
      { label: "Shirt",         value: "shirt",    description: "Dress shirt or business shirt" },
      { label: "Blazer",        value: "blazer",   description: "Sport coat or blazer" },
      { label: "Trousers",      value: "trousers", description: "Tailored trousers" },
      { label: "Overcoat",      value: "overcoat", description: "Wool or cashmere overcoat" },
      { label: "Full Wardrobe", value: "wardrobe", description: "Multiple pieces as a coordinated wardrobe" },
    ],
  },
  {
    id: "budget",
    question: "What is your budget?",
    subtitle: "This helps us recommend the right service level.",
    options: [
      { label: "Under HK$5,000",           value: "entry",   description: "Entry-level tailoring and shirts" },
      { label: "HK$5,000 – HK$15,000",     value: "mid",     description: "Quality made-to-measure suits and garments" },
      { label: "HK$15,000 – HK$30,000",    value: "premium", description: "Premium bespoke suits and tailoring" },
      { label: "HK$30,000+",               value: "luxury",  description: "Full bespoke with luxury fabrics" },
    ],
  },
  {
    id: "fit_priority",
    question: "What matters most to you?",
    subtitle: "Your priority helps us match you to the right approach.",
    options: [
      { label: "Perfect Fit Above All", value: "fit",    description: "I want a garment built precisely for my body" },
      { label: "Fabric & Quality",      value: "fabric", description: "I want the finest materials available" },
      { label: "Speed & Convenience",   value: "speed",  description: "I need the garment within a short timeframe" },
      { label: "Value for Money",       value: "value",  description: "I want the best quality at a fair price" },
    ],
  },
  {
    id: "experience",
    question: "Have you been tailored before?",
    subtitle: "Your experience level helps us prepare the right consultation.",
    options: [
      { label: "First Time",           value: "first",   description: "This is my first tailoring experience" },
      { label: "Some Experience",      value: "some",    description: "I have had one or two garments made before" },
      { label: "Regular Client",       value: "regular", description: "I commission tailored garments regularly" },
      { label: "Experienced Collector",value: "expert",  description: "I have an established wardrobe and clear preferences" },
    ],
  },
  {
    id: "timeline",
    question: "When do you need the garment?",
    subtitle: "This helps us plan the fitting schedule.",
    options: [
      { label: "Within 2 Weeks", value: "urgent",   description: "I have an upcoming occasion" },
      { label: "Within 1 Month", value: "soon",     description: "Reasonably soon but not urgent" },
      { label: "1–3 Months",     value: "standard", description: "Standard bespoke timeline" },
      { label: "No Rush",        value: "flexible", description: "I am planning ahead" },
    ],
  },
];

interface Recommendation {
  title: string;
  description: string;
  service: string;
  price: string;
  href: string;
  highlights: string[];
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { occasion, garment, budget, fit_priority } = answers;

  if (occasion === "corporate") {
    return {
      title: "Corporate Reward Programme",
      description: "For companies and organisations looking to dress their teams with distinction. Our dedicated corporate stylists will work with you to create a coordinated wardrobe that reflects your brand.",
      service: "Corporate Tailoring",
      price: "From HK$12,800 (Corporate Rate)",
      href: "/corporate-rewards",
      highlights: [
        "Corporate rates from HK$12,800 (RRP HK$33,800)",
        "Dedicated corporate stylist",
        "HK$1,000 credit per commission",
        "Referral rewards for colleagues",
      ],
    };
  }

  if (garment === "shirt") {
    return {
      title: "Bespoke Dress Shirt",
      description: "A custom-fitted dress shirt in premium two-ply cotton or linen. Every detail — collar, cuff, placket, and monogram — is chosen by you.",
      service: "Tailored Shirts",
      price: "From HK$880",
      href: "/tailored-menswear",
      highlights: [
        "Premium two-ply cotton and linen options",
        "Custom collar and cuff style",
        "Monogramming available",
        "Perfect fit guaranteed",
      ],
    };
  }

  if (budget === "luxury" || (budget === "premium" && fit_priority === "fit")) {
    return {
      title: "Full Bespoke Suit",
      description: "The pinnacle of tailoring. A fully canvassed, hand-finished bespoke suit constructed from scratch to your exact measurements, in your choice of luxury fabric.",
      service: "Bespoke Tailoring",
      price: "From HK$12,800",
      href: "/tailored-menswear",
      highlights: [
        "Pattern created exclusively for your proportions",
        "Fully canvassed construction",
        "Hand-sewn buttonholes and pick-stitched lapels",
        "Multiple fittings until perfect",
      ],
    };
  }

  if (occasion === "formal") {
    return {
      title: "The Executive Three-Piece Suit",
      description: "A three-piece bespoke suit with matching waistcoat — the definitive choice for formal occasions and black tie events.",
      service: "Formal Tailoring",
      price: "From HK$16,800",
      href: "/tailored-menswear",
      highlights: [
        "Three-piece construction with waistcoat",
        "Formal fabric options available",
        "Hand-finished throughout",
        "Suitable for black tie and weddings",
      ],
    };
  }

  if (garment === "overcoat") {
    return {
      title: "Tailored Overcoat",
      description: "A luxurious overcoat in cashmere or premium wool — designed to command presence in any setting.",
      service: "Tailored Overcoats",
      price: "From HK$10,800",
      href: "/tailored-menswear",
      highlights: [
        "Cashmere and wool options",
        "Full or half canvas construction",
        "Multiple length options",
        "Hand-finished details",
      ],
    };
  }

  return {
    title: "The Essential Bespoke Suit",
    description: "Our signature two-piece bespoke suit — the ideal starting point for any professional wardrobe. Fully canvassed, hand-finished, and built to your exact measurements.",
    service: "Bespoke Tailoring",
    price: "From HK$12,800",
    href: "/tailored-menswear",
    highlights: [
      "Fully canvassed construction",
      "30+ measurements taken",
      "Multiple fittings included",
      "Measurement record retained for future commissions",
    ],
  };
}

export default function TailorFinderQuiz() {
  useSEO({
    title: "Tailor Finder Brief — Find Your Perfect Tailoring Style | Tailors.hk",
    description: "Answer a few questions about your style, budget, and requirements. Tailors.hk's brief matches you with the right tailoring service and style recommendations.",
    canonical: "https://tailors.hk/tailor-finder-quiz",
    keywords: "tailor finder brief, best tailor for me Hong Kong, tailoring style brief, suit style brief",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Tailor Finder Brief", url: "/tailor-finder-quiz" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Tailor Finder Brief",
        "url": "https://tailors.hk/tailor-finder-quiz",
        "description": "Interactive brief to match you with the right tailoring service and style"
      }
    ],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const [briefSent, setBriefSent] = useState(false);
  const [briefSending, setBriefSending] = useState(false);

  const question = questions[currentStep];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setComplete(false);
  };

  const recommendation = complete ? getRecommendation(answers) : null;

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navigation />

      {/* Page header */}
      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "56px 0 40px" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ INTERACTIVE TOOL</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "16px" }}>
            Tailor Finder Brief
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#777", maxWidth: "520px" }}>
            Answer six questions about your occasion, preferences, and budget. We will shortlist the tailoring service that best matches your needs.
          </p>
        </div>
      </section>

      <section style={{ flex: 1, padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: "680px" }}>

          {!complete ? (
            <>
              {/* Progress */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#111" }}>
                    {Math.round(((currentStep + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div style={{ height: "2px", backgroundColor: "#e5e5e5" }}>
                  <div style={{
                    height: "2px",
                    backgroundColor: "#111",
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>

              {/* Question */}
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "8px" }}>
                  {question.question}
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
                  {question.subtitle}
                </p>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      style={{
                        width: "100%", textAlign: "left", padding: "18px 20px", cursor: "pointer",
                        backgroundColor: selected ? "#111" : "#fff",
                        border: selected ? "1px solid #111" : "1px solid #e2e2e2",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                        <div>
                          <p style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: selected ? "#fff" : "#111", marginBottom: option.description ? "4px" : 0 }}>
                            {option.label}
                          </p>
                          {option.description && (
                            <p style={{ fontFamily: F.body, fontSize: "12px", color: selected ? "rgba(255,255,255,0.6)" : "#888", lineHeight: 1.5 }}>
                              {option.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight size={14} style={{ flexShrink: 0, color: selected ? "rgba(255,255,255,0.5)" : "#ccc", marginTop: "2px" }} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back */}
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "#888",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  <ArrowLeft size={12} /> Previous Question
                </button>
              )}
            </>
          ) : (
            recommendation && (
              <div>
                {/* Result header */}
                <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={18} style={{ color: "#111" }} />
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888" }}>
                    Your Recommendation
                  </span>
                </div>

                {/* Result card */}
                <div style={{ border: "1px solid #e2e2e2", padding: "32px", marginBottom: "32px" }}>
                  <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px" }}>
                    {recommendation.service}
                  </p>
                  <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "14px" }}>
                    {recommendation.title}
                  </h2>
                  <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#555", marginBottom: "20px" }}>
                    {recommendation.description}
                  </p>
                  <p style={{ fontFamily: F.display, fontSize: "20px", fontWeight: 600, letterSpacing: "0.06em", color: "#111", marginBottom: "24px" }}>
                    {recommendation.price}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {recommendation.highlights.map((h, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <CheckCircle2 size={13} style={{ color: "#111", flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontFamily: F.body, fontSize: "13px", color: "#555", lineHeight: 1.6 }}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <Link href={recommendation.href}>
                      <span className="btn-filled" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        VIEW THIS SERVICE <ArrowRight size={12} />
                      </span>
                    </Link>
                    <Link href="/contact?type=bespoke">
                      <span className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        BOOK A CONSULTATION
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Brief summary + outreach CTAs */}
                <div style={{ border: "1px solid #e2e2e2", padding: "28px 32px", marginBottom: "32px" }}>
                  <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>YOUR BRIEF SUMMARY</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "24px" }}>
                    {[
                      { label: "OCCASION", value: questions[0].options.find(o => o.value === answers.occasion)?.label ?? answers.occasion },
                      { label: "GARMENT", value: questions[1].options.find(o => o.value === answers.garment)?.label ?? answers.garment },
                      { label: "BUDGET", value: questions[2].options.find(o => o.value === answers.budget)?.label ?? answers.budget },
                      { label: "PRIORITY", value: questions[3].options.find(o => o.value === answers.fit_priority)?.label ?? answers.fit_priority },
                      { label: "EXPERIENCE", value: questions[4].options.find(o => o.value === answers.experience)?.label ?? answers.experience },
                      { label: "TIMELINE", value: questions[5].options.find(o => o.value === answers.timeline)?.label ?? answers.timeline },
                    ].map((row) => (
                      <div key={row.label} style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 0" }}>
                        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "3px" }}>{row.label}</div>
                        <div style={{ fontFamily: F.body, fontSize: "13px", color: "#111" }}>{row.value}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
                    SEND THIS BRIEF TO OUR ATELIER
                  </p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a
                      href={tailorFinderBriefUrl({
                        occasion: questions[0].options.find(o => o.value === answers.occasion)?.label ?? answers.occasion,
                        garment: questions[1].options.find(o => o.value === answers.garment)?.label ?? answers.garment,
                        budget: questions[2].options.find(o => o.value === answers.budget)?.label ?? answers.budget,
                        fitPriority: questions[3].options.find(o => o.value === answers.fit_priority)?.label ?? answers.fit_priority,
                        experience: questions[4].options.find(o => o.value === answers.experience)?.label ?? answers.experience,
                        timeline: questions[5].options.find(o => o.value === answers.timeline)?.label ?? answers.timeline,
                        recommendationTitle: recommendation.title,
                        recommendationService: recommendation.service,
                        recommendationPrice: recommendation.price,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-filled"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                    >
                      <MessageSquare size={12} /> SEND VIA WHATSAPP
                    </a>
                    <button
                      disabled={briefSending || briefSent}
                      onClick={async () => {
                        if (briefSent || briefSending || !recommendation) return;
                        setBriefSending(true);
                        const message = [
                          `Tailor Finder Brief — Tailors.hk`,
                          ``,
                          `Occasion: ${questions[0].options.find(o => o.value === answers.occasion)?.label ?? answers.occasion}`,
                          `Garment: ${questions[1].options.find(o => o.value === answers.garment)?.label ?? answers.garment}`,
                          `Budget: ${questions[2].options.find(o => o.value === answers.budget)?.label ?? answers.budget}`,
                          `Fit Priority: ${questions[3].options.find(o => o.value === answers.fit_priority)?.label ?? answers.fit_priority}`,
                          `Experience: ${questions[4].options.find(o => o.value === answers.experience)?.label ?? answers.experience}`,
                          `Timeline: ${questions[5].options.find(o => o.value === answers.timeline)?.label ?? answers.timeline}`,
                          ``,
                          `Recommendation: ${recommendation.title} — ${recommendation.service}`,
                          recommendation.price,
                        ].join("\n");
                        try {
                          await emailjs.send(
                            "service_4fsz82g",
                            "template_rkwyske",
                            { subject: `Tailor Finder Brief — ${recommendation.title}`, message, reply_to: "noreply@tailors.hk", from_name: "Tailor Finder" },
                            "pPJMTC_ZpirSxcVr9"
                          );
                          setBriefSent(true);
                        } catch {
                          // silently fail
                        } finally {
                          setBriefSending(false);
                        }
                      }}
                      className="btn-outline"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: briefSent ? "default" : "pointer", opacity: briefSending ? 0.6 : 1, border: "none" }}
                    >
                      {briefSent
                        ? <><Check size={12} /> BRIEF SENT</>
                        : briefSending
                          ? <><Mail size={12} /> SENDING…</>
                          : <><Mail size={12} /> EMAIL THIS BRIEF</>}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "#888",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  <RotateCcw size={12} /> Start Again
                </button>
              </div>
            )
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
