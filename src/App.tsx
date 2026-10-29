import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  X,
  Briefcase,
  User,
  Palette,
  FileText,
  Home,
  Menu,
  Phone,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Award,
  GraduationCap,
  Search,
  Layout,
  Layers,
  Cpu,
  Smartphone,
  Sliders,
  Eye,
  Target,
  Lightbulb,
  Repeat,
  Zap,
  BookOpen,
  Compass,
  Code,
  Workflow,
  PenTool,
  Lock,
  Download
} from "lucide-react";

// --- Custom Icon Components ---
const BehanceIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M8.22 7.82h2.22c1.48 0 2.22.68 2.22 2.04 0 1.05-.6 1.62-1.4 1.86 1.02.2 1.68.85 1.68 2.13 0 1.55-.95 2.25-2.5 2.25H8.22V7.82zm1.65 2.61h.65c.52 0 .82-.22.82-.67 0-.44-.3-.63-.82-.63h-.65v1.3zm0 3.79h.73c.58 0 .93-.24.93-.72 0-.49-.35-.73-.93-.73h-.73v1.45zM15.42 10.1h3.35v.7h-3.35v-.7zm3.4 3.32c-.08 1.43-1.12 2.4-2.6 2.4-1.63 0-2.68-1.1-2.68-2.68 0-1.6 1.08-2.68 2.65-2.68 1.55 0 2.53 1.02 2.53 2.63v.35h-3.62c.07.72.58 1.18 1.25 1.18.62 0 1.03-.28 1.18-.75h1.29zm-1.32-1.42c-.05-.63-.48-1.03-1.16-1.03-.63 0-1.08.4-1.16 1.03h2.32z" />
  </svg>
);

const FigmaIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

// --- Smart Image Component with Fallback Resilience ---
const SmartImage = ({
  src,
  alt,
  className = "",
  fallbackTitle = "",
  loading = "lazy"
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: "lazy" | "eager";
}) => {
  const [errorStage, setErrorStage] = useState(0);

  const getUrl = () => {
    if (!src) return "";
    if (src.includes("drive.google.com")) {
      const id = src.match(/\/d\/([^/]+)/)?.[1] || src.match(/id=([^&]+)/)?.[1];
      if (id) {
        if (errorStage === 0) return `https://lh3.googleusercontent.com/d/${id}=s2560`;
        if (errorStage === 1) return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
        if (errorStage === 2) return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }
    return src;
  };

  const currentUrl = getUrl();

  if (errorStage >= 3 || !currentUrl) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-[#0F2B5B] via-[#1E3A8A] to-[#040915] flex flex-col items-center justify-center p-6 text-white text-center select-none ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 border border-white/20 shadow-md">
          <Smartphone size={24} className="text-cyan-300" />
        </div>
        <span className="text-sm font-bold tracking-tight text-white">{fallbackTitle || alt}</span>
        <span className="text-[11px] text-cyan-200 mt-1 font-semibold uppercase tracking-wider">Product Design Case Study</span>
      </div>
    );
  }

  return (
    <img
      src={currentUrl}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      loading={loading}
      decoding="async"
      onError={() => setErrorStage((prev) => prev + 1)}
    />
  );
};

// --- Google Drive Direct Link Converter ---
const getDriveDirectLink = (url: string) => {
  if (!url) return url;
  if (url.includes("drive.google.com")) {
    const id = url.match(/\/d\/([^/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
    if (id) {
      return `https://lh3.googleusercontent.com/d/${id}=s2560`;
    }
  }
  return url;
};

// --- Resume / CV Google Drive URL ---
const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1XoPevazrJeuR_xy3gQBH8HZWX9BtsaTg/view?usp=sharing";

// --- Projects / Case Studies Data ---
const PROJECTS = [
  {
    id: "rupeeease-lending-onboarding",
    title: "RupeeEase Lending Onboarding",
    subheading: "Lending App Onboarding Dropoff",
    desc: "Redesigned lending onboarding flow to reduce customer dropoff due to lack of trust and easy KYC flow in a payday lending App.",
    image: "https://drive.google.com/file/d/1CKmWIPcbHE3s9oVx2O7_J3v5RuxS1bIi/view?usp=drive_link",
    category: "Fintech",
    categories: ["Fintech", "App"],
    caseStudyImages: [
      "https://drive.google.com/file/d/1CKmWIPcbHE3s9oVx2O7_J3v5RuxS1bIi/view?usp=drive_link",
      "https://drive.google.com/file/d/1ud7Z038tA9NfTH-VkAmUblWaCzhMc4P1/view?usp=drive_link",
      "https://drive.google.com/file/d/1uT0mHvy1NhlXsAwnSVicAkKXMPQ0wMdK/view?usp=drive_link",
      "https://drive.google.com/file/d/1VHIvWz6-Ovq-lx10Cl77LZdCJI-VTkbw/view?usp=drive_link",
      "https://drive.google.com/file/d/1ZGtNAC_oVbLNq6LnhFY6U5vj1xT1oGbP/view?usp=drive_link"
    ]
  },
  {
    id: "tracme-health",
    title: "TrackMe Health App",
    subheading: "Personal Health & Wellness Tracker",
    desc: "A personal health and fitness companion designed to encourage consistent habit logging, track daily vitals, and surface intuitive visual telemetry for users.",
    image: "https://drive.google.com/file/d/1BBevJi8ND0ca7LnlXF8aM72yY8kDvorp/view?usp=drive_link",
    category: "Mobile App",
    caseStudyImages: [
      "https://drive.google.com/file/d/1BBevJi8ND0ca7LnlXF8aM72yY8kDvorp/view?usp=drive_link",
      "https://drive.google.com/file/d/1a2yoCZMR7rDsqxtNkJAuXiik77XKa4Tu/view?usp=drive_link",
      "https://drive.google.com/file/d/10NTcEYlDVPqftmWui5fKjzEAcGl3ULPY/view?usp=drive_link",
      "https://drive.google.com/file/d/1HdR_Ml2jSCmNOd3GMMdL94sttb1GiGZi/view?usp=drive_link",
      "https://drive.google.com/file/d/1K8wCBTnz8km0lmgEBCc19zIE_vrHgWb_/view?usp=drive_link",
      "https://drive.google.com/file/d/11HfdWUNGNcdELOKITuGwQ3_wHsl3kf9P/view?usp=drive_link",
      "https://drive.google.com/file/d/1kgU3M48PSA0gy_pQJmYT_BOfUd7O-roR/view?usp=drive_link",
      "https://drive.google.com/file/d/1KXQLGW4QBoF0zqWXT7geFh7h4gDBo4IG/view?usp=drive_link",
      "https://drive.google.com/file/d/1sI-U7jaUkJ9XOPxPulT55jXtjRDof57s/view?usp=drive_link",
      "https://drive.google.com/file/d/16iFJapUMpfyymR-M9letAQo2qZZDMRnd/view?usp=drive_link",
      "https://drive.google.com/file/d/1ult6mnAsFknSwaBaCfzG24Dv8mIuUMw5/view?usp=drive_link",
      "https://drive.google.com/file/d/16w7Ju3pk4re7NgpVyDzHANX-7LthA6o5/view?usp=drive_link",
      "https://drive.google.com/file/d/1X1g5FbODFlDpGUywwzaprDgm_Ft4FfWr/view?usp=drive_link",
      "https://drive.google.com/file/d/1tbJJ426BiZb2LMcR9pCLMlRdkW7iDTfE/view?usp=drive_link",
      "https://drive.google.com/file/d/1WnhLN7O_UZxM8IrXPiHoGA2yZ3vs2pa2/view?usp=drive_link",
      "https://drive.google.com/file/d/17qvRtVLzk2XWYL2YP2DBv5N4BmJBC2gA/view?usp=drive_link",
      "https://drive.google.com/file/d/1hEq0iC47zmMyVzF_UTpqg5YgNov-JlfX/view?usp=drive_link",
      "https://drive.google.com/file/d/1ggeEsrFsqLn-43BDgNijJv9SoqgCDv1B/view?usp=drive_link",
      "https://drive.google.com/file/d/1IxTtnQlKncxEKAVYZ0oqAkMOo5M_c_Cm/view?usp=drive_link",
      "https://drive.google.com/file/d/1_1uPUMOKuR5jcKSiPI33XNXf4z1BDIAp/view?usp=drive_link",
      "https://drive.google.com/file/d/1l_Dys9C0on9jee5_kELulo50u6d1RFoH/view?usp=drive_link",
      "https://drive.google.com/file/d/1f5MY19WAj3CfhiyaBwZ-K9xJQuXPvKnq/view?usp=drive_link",
      "https://drive.google.com/file/d/1wtZc3WVK_OF-olkuNmCy0SUuwxFk5vMd/view?usp=drive_link",
      "https://drive.google.com/file/d/1FeMkdw_AJNk7mDs0avC5U4GLJKRuErzr/view?usp=drive_link",
      "https://drive.google.com/file/d/1ad7wwAER8AyzSLDYecUKj1Z97OuQULxv/view?usp=drive_link",
      "https://drive.google.com/file/d/1YazVRvy7VP8cad8ig6YzL3-MugCwXIRX/view?usp=drive_link",
      "https://drive.google.com/file/d/1zY2sDmBGqLE-9bEtTHuxbITvWv4IP6t0/view?usp=drive_link",
      "https://drive.google.com/file/d/1VecMr71g2fYUvzOpatstYf-xbeKMIzcg/view?usp=drive_link"
    ]
  },
  {
    id: "snapdeal-redesign",
    title: "Snapdeal App Redesign",
    subheading: "E-Commerce Shopping Experience",
    desc: "A comprehensive redesign concept for the Snapdeal mobile app aimed at modernizing the visual interface, reducing checkout friction, and improving product discovery for millions of shoppers.",
    image: "https://drive.google.com/file/d/1JqucgKNboUjL42Z_QMvQ3QcLIV6Tl6_v/view?usp=drive_link",
    category: "Mobile App",
    caseStudyImages: [
      "https://drive.google.com/file/d/1JqucgKNboUjL42Z_QMvQ3QcLIV6Tl6_v/view?usp=drive_link",
      "https://drive.google.com/file/d/1hoe9zUAzEo4QLq_X565fNq5T0dTOgaX_/view?usp=drive_link",
      "https://drive.google.com/file/d/1A7RtkZvgagScDc5OTHUB6SjziC6abXc-/view?usp=drive_link",
      "https://drive.google.com/file/d/1BFD3Z8a9jNJoKcox1JWgkURWLxrmZigN/view?usp=drive_link",
      "https://drive.google.com/file/d/1czHRmkjuWM8tOIcoaAxmt5nvMfQ0Mx_s/view?usp=drive_link",
      "https://drive.google.com/file/d/1Bm-wuqf-DvMAL4_2YvIPQS8Fu37erLtX/view?usp=drive_link",
      "https://drive.google.com/file/d/1oFoT2N4kYXUfAnduuZ6yirm2sFYYleuR/view?usp=drive_link",
      "https://drive.google.com/file/d/1ZzY9ALhMGL5Vgf6dTirIaswRdJ-QrVwC/view?usp=drive_link",
      "https://drive.google.com/file/d/1j99XkBMc2G7paoMfInc7KVkWKeJbVcNe/view?usp=drive_link",
      "https://drive.google.com/file/d/1rJgb9KLYlc_uetQL7V9NbrBj_yCV7lxn/view?usp=drive_link",
      "https://drive.google.com/file/d/1Hqci3pLHxsGNd1ACafw62WpGat8p699L/view?usp=drive_link",
      "https://drive.google.com/file/d/12AM1SREMQPXRbFteqOv_JcRVvkN74B_A/view?usp=drive_link",
      "https://drive.google.com/file/d/1jRnghPHG09pbrQwpIU4FHytidO7_80ns/view?usp=drive_link",
      "https://drive.google.com/file/d/18XaCwYAi85dqOtu40cgA7lpyUuQEljCu/view?usp=drive_link",
      "https://drive.google.com/file/d/1eFhkIKvWVpAChLk70HqcE83Qeq92hROc/view?usp=drive_link",
      "https://drive.google.com/file/d/1sS-hpLQY-qz4l6SDqTADlGgSrfT6zUPj/view?usp=drive_link",
      "https://drive.google.com/file/d/1b0yS9hkO12Q4EhtUV26Udv9NZ_PQ_-MK/view?usp=drive_link",
      "https://drive.google.com/file/d/1KX3Wf2bh1iLI7fcZDI_fH8dz7uNvrdQA/view?usp=drive_link",
      "https://drive.google.com/file/d/1I0C3UnRH-FCK7bN58byTNY0StofqEx-v/view?usp=drive_link",
      "https://drive.google.com/file/d/1JRFjTNvetEMS_F3rZMwrCFmEqYdLUPxY/view?usp=drive_link",
      "https://drive.google.com/file/d/1CRfkGihTIrhX3TbOmG5Kd88utcgfLvMe/view?usp=drive_link",
      "https://drive.google.com/file/d/1Q61Ntn8V59EQskdVP00P9qfmVBQOdHfK/view?usp=drive_link",
      "https://drive.google.com/file/d/111TzgAmrPX56QzThUI5-aUP-qaiAY776/view?usp=drive_link",
      "https://drive.google.com/file/d/1b8SG7M-zZ5EOgbp49PVPXgiWchFEyUNZ/view?usp=drive_link",
      "https://drive.google.com/file/d/1gYBGlMBrQihxxAwU06j7XLRdTKv7mVN0/view?usp=drive_link",
      "https://drive.google.com/file/d/18A8KKaQVv93Ui1cT-RnjxWm8WYT6GFT_/view?usp=drive_link"
    ]
  },
  {
    id: "daisy-lane",
    title: "Daisy Lane Landing Page",
    subheading: "Floral E-Commerce & Brand Storytelling",
    desc: "A modern, high-converting landing page designed for a boutique floral brand, focusing on delightful visual hierarchy, fluid shop navigation, and seamless mobile checkout.",
    image: "https://drive.google.com/file/d/1eFzG7ngv5Vw-2CsetNWJ4R7LUDINnFeu/view?usp=drive_link",
    category: "Web Design",
    caseStudyImages: [
      "https://drive.google.com/file/d/1eFzG7ngv5Vw-2CsetNWJ4R7LUDINnFeu/view?usp=drive_link",
      "https://drive.google.com/file/d/1TyLjuPM9cOCA7U77fq375fy3KlSln7di/view?usp=drive_link",
      "https://drive.google.com/file/d/1LTxhsXhhGDSTDGxZBwz0C56q3xQYYBIU/view?usp=drive_link",
      "https://drive.google.com/file/d/1-JDOdtl4-9xcTeevf5hQ5qbHS6_QHz04/view?usp=drive_link",
      "https://drive.google.com/file/d/1LBNFiD8Kvb_SNcvMbjKS2Mq8ov0o4s19/view?usp=drive_link",
      "https://drive.google.com/file/d/1vcFlTsndRmjqTFLrGS28aXwvj7KmsWhU/view?usp=drive_link",
      "https://drive.google.com/file/d/15X7NEm_ltFpL0FhT8aoIhX7I2pSuTsDa/view?usp=drive_link"
    ]
  },
  {
    id: "roi-interior-design",
    title: "ROI Interior Design Website",
    subheading: "Landing Page Design & Visual Identity",
    desc: "A contemporary, high-conversion landing page designed for ROI Interior Design, bringing spatial architecture to life through sophisticated typography, rich project galleries, and frictionless client consultation booking.",
    image: "https://drive.google.com/file/d/1t7kZiuqS4fsgwKN0j1dcOUl7kVpfN4fg/view?usp=drive_link",
    category: "Web Design",
    categories: ["Web Design", "Landing Page"],
    caseStudyImages: [
      "https://drive.google.com/file/d/1t7kZiuqS4fsgwKN0j1dcOUl7kVpfN4fg/view?usp=drive_link",
      "https://drive.google.com/file/d/1N8V8qm5rTl0v3AmeLZqQw0tl3Zv75B1t/view?usp=drive_link",
      "https://drive.google.com/file/d/1KMgeyhZfkHlMnYWYqcoc3kXbQ2RE5-UI/view?usp=drive_link",
      "https://drive.google.com/file/d/10skXw1wSJ3GOXUTpk0NOzGJJKBmWBanp/view?usp=drive_link",
      "https://drive.google.com/file/d/1yDZBaeL_jOPb9MsggApPoRa7wmZ_0wys/view?usp=drive_link"
    ]
  },
  {
    id: "ux-report-dashboard",
    title: "UX Report Dashboard",
    subheading: "SaaS Analytics & Usability Evaluation Platform",
    desc: "A clean, efficient SaaS dashboard designed for product designers and research leads to organize usability test findings, track heuristic scores, and share insights with stakeholders.",
    image: "https://drive.google.com/file/d/1QYgtoMoOaBhdPq3HIKXoIQvAszyjxWxL/view?usp=drive_link",
    category: "Web App",
    caseStudyImages: [
      "https://drive.google.com/file/d/1lr2oFoNI9AIiCGm_I34kdDjvwl0RYykw/view?usp=drive_link",
      "https://drive.google.com/file/d/1G_pyTm7Ed3jQuAm80ujrhqbW027H5SUy/view?usp=drive_link",
      "https://drive.google.com/file/d/1go46XTcTHFXI5k0iPthOWc8V0iQCNn1L/view?usp=drive_link",
      "https://drive.google.com/file/d/1vGRRQbvUMY8satB20uORnGOorFHAjysf/view?usp=drive_link"
    ]
  },
  {
    id: "sports-dating-app",
    title: "Sports Dating App",
    subheading: "Social Dating app for players",
    desc: "A playful social matchmaking experience connecting active singles through athletic interests, skill levels, and favorite game formats. It replaces awkward small talk by turning workout sessions, tennis rallies, and casual weekend court meetups into natural first dates.",
    image: "https://drive.google.com/file/d/17bQ2M2hAEsiHymnhDrmV_xaNZETBzISA/view?usp=drive_link",
    category: "Mobile App",
    categories: ["Mobile App", "Social"],
    isLocked: true,
    lockTheme: "rose",
    confidentialLabel: "Proprietary Social Dating App",
    caseStudyImages: []
  },
  {
    id: "erp-migration-sandbox",
    title: "ERP migration Sandbox",
    subheading: "Enterprise IT and consultancy",
    desc: "A collaborative migration command center where implementation engineers and client IT teams map legacy workflows, test automated configuration agents in a safe clone environment, and sign off on go-live readiness.",
    image: "https://drive.google.com/file/d/1lr2oFoNI9AIiCGm_I34kdDjvwl0RYykw/view?usp=drive_link",
    category: "Saas",
    categories: ["Saas", "B2B"],
    isLocked: true,
    lockTheme: "amber",
    confidentialLabel: "Proprietary Enterprise IT System",
    caseStudyImages: []
  },
  {
    id: "partner-sync-commission-ledger",
    title: "Partner Sync & Commission Ledger",
    subheading: "Sales & Proposal Tool",
    desc: "A centralized portal that automates partner referral tracking and monthly commission calculations. It replaces messy spreadsheets to eliminate payout errors and keep reseller payments accurate and on time.",
    image: "https://drive.google.com/file/d/1QYgtoMoOaBhdPq3HIKXoIQvAszyjxWxL/view?usp=drive_link",
    category: "Saas",
    categories: ["Saas", "B2B"],
    isLocked: true,
    lockTheme: "emerald",
    confidentialLabel: "Proprietary Sales & Ledger Portal",
    caseStudyImages: []
  }
];

// --- Artwork Gallery Assets ---
const ARTS = [
  { id: 1, title: "Ethereal Landscape", category: "Digital Art", img: "https://drive.google.com/file/d/1A8oFHEdcaWoNF_GNVGPLNe0v__ympwxw/view?usp=drive_link" },
  { id: 2, title: "Lord Shiva", category: "Digital Art", img: "https://drive.google.com/file/d/1H0E6pRoJuSSmRF0HX34syp2Ux1cOnQou/view?usp=drive_link" },
  { id: 3, title: "Radha Krishna", category: "Digital Art", img: "https://drive.google.com/file/d/1DxZ6UeP0_ILU1oMrpzzFJxrQlwcvivPX/view?usp=drive_link" },
  { id: 4, title: "Monochrome Portrait", category: "Digital Art", img: "https://drive.google.com/file/d/1pMD0g9QQCn-iuE5jL_MgY3Lzo5ehxja2/view?usp=drive_link" },
  { id: 5, title: "Cyberpunk Vision", category: "Digital Art", img: "https://drive.google.com/file/d/1IVCR9TSdrxLVnw3At4-FeWyjU9M-4FHb/view?usp=drive_link" },
  { id: 6, title: "Abstract Concept", category: "Digital Art", img: "https://drive.google.com/file/d/126zqc28q13OeBtfiq5qsJCKqfLIpa_TC/view?usp=drive_link" },
  { id: 7, title: "Divine Aura", category: "Digital Art", img: "https://drive.google.com/file/d/1katH7mOkIAnIQljiPp_grN7k54syXgoS/view?usp=drive_link" },
  { id: 8, title: "Neon Dreams", category: "Digital Art", img: "https://drive.google.com/file/d/1dVwRD9I8SnKzfIOdAWXFa9865cjDN9nO/view?usp=drive_link" },
  { id: 9, title: "Surreal Mind", category: "Digital Art", img: "https://drive.google.com/file/d/1bDgTybOfFA8qIDJskPRJmYX022WAV2Gc/view?usp=drive_link" },
  { id: 10, title: "Future City", category: "Digital Art", img: "https://drive.google.com/file/d/15hCkmcuYynDnmDQPjg0jIj7QZvCEyZQo/view?usp=drive_link" },
  { id: 11, title: "Mystic Forest", category: "Digital Art", img: "https://drive.google.com/file/d/1-GTP8NxdNOWXFW0djNrBJ9T1TmfODmsn/view?usp=drive_link" },
  { id: 12, title: "Cosmic Journey", category: "Digital Art", img: "https://drive.google.com/file/d/1TeLKH8v7kkM5xDQKkZih-Z_JDZknP_zH/view?usp=drive_link" },
  { id: 13, title: "Urban Sketch", category: "Digital Art", img: "https://drive.google.com/file/d/1BWEeJOCQ3azYo4THxMx0fC_2ASYSP5Mj/view?usp=drive_link" },
  { id: 14, title: "Fantasy Realm", category: "Digital Art", img: "https://drive.google.com/file/d/1KQUyrZuYJE85ay-L00_tPXVdfP5iLe3y/view?usp=drive_link" },
  { id: 15, title: "Digital Canvas", category: "Digital Art", img: "https://drive.google.com/file/d/1dUNtP6OVpHvJzBitM8i_G-EQaTPOl7dA/view?usp=drive_link" }
];

// --- Design Arsenal Skills & Capabilities Data ---
const DESIGN_ARSENAL = [
  {
    title: "Figma Mastery",
    icon: FigmaIcon,
    accent: "from-purple-500 to-indigo-600",
    bgAccent: "bg-purple-50 text-purple-700 border-purple-100",
    pastelBg: "bg-[#F3F5FA]",
    pastelBorder: "border-[#DCE2F0]",
    desc: "Advanced component architecture, auto layout 5.0, design tokens, responsive variables, and scalable design system maintenance.",
    highlights: ["Auto Layout & Variants", "Design Tokens & Variables", "Design System Libraries", "Interactive Motion Specs"]
  },
  {
    title: "UX Research & Strategy",
    icon: Search,
    accent: "from-blue-500 to-cyan-600",
    bgAccent: "bg-blue-50 text-blue-700 border-blue-100",
    pastelBg: "bg-[#F7F5F0]",
    pastelBorder: "border-[#E8E2D8]",
    desc: "User interviews with 15+ participants, heuristic evaluations, competitive analysis, journey mapping, and qualitative synthesis.",
    highlights: ["Participant Interviews", "Affinity Mapping", "Heuristic Audits", "Usability Testing"]
  },
  {
    title: "Visual & UI Design",
    icon: Layout,
    accent: "from-pink-500 to-rose-600",
    bgAccent: "bg-pink-50 text-pink-700 border-pink-100",
    pastelBg: "bg-[#F8F2F5]",
    pastelBorder: "border-[#EADEE4]",
    desc: "Crafting polished typography hierarchies, spatial geometry, color systems, micro-interactions, and accessible interface layouts.",
    highlights: ["Typographic Systems", "60-30-10 Color Theory", "Spatial Grid Math", "WCAG AA Contrast"]
  },
  {
    title: "Wireframing & IA",
    icon: Layers,
    accent: "from-emerald-500 to-teal-600",
    bgAccent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pastelBg: "bg-[#F1F6F4]",
    pastelBorder: "border-[#D8E6E0]",
    desc: "Structuring intuitive user flows, information architecture maps, rapid low-fidelity sketching, and interactive wireframes.",
    highlights: ["Information Architecture", "User Flow Diagrams", "Low-Fi Wireframes", "Task Analysis"]
  },
  {
    title: "Prototyping & Motion",
    icon: Zap,
    accent: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-50 text-amber-700 border-amber-100",
    pastelBg: "bg-[#FAF5EF]",
    pastelBorder: "border-[#ECE2D5]",
    desc: "Building interactive, high-fidelity prototypes with Smart Animate, micro-transitions, and touch-responsive gesture feedback.",
    highlights: ["Interactive Prototypes", "Smart Animate Transitions", "Gesture Interactions", "Micro-animations"]
  },
  {
    title: "3D & Spatial Visualization",
    icon: Cpu,
    accent: "from-cyan-500 to-blue-600",
    bgAccent: "bg-cyan-50 text-cyan-700 border-cyan-100",
    pastelBg: "bg-[#F0F6F8]",
    pastelBorder: "border-[#D4E5EC]",
    desc: "60+ 3D models created for AR/VR platforms at Ikarus 3D & Frido, bridging physical product visualization with digital UI.",
    highlights: ["3D Product Modeling", "AR/VR Asset Prep", "Texture & Material Pass", "Spatial UI Elements"]
  },
  {
    title: "Systems Thinking & Enterprise UX",
    icon: Workflow,
    accent: "from-violet-500 to-indigo-700",
    bgAccent: "bg-violet-50 text-violet-700 border-violet-100",
    pastelBg: "bg-[#F4F3F9]",
    pastelBorder: "border-[#E0DDF0]",
    desc: "Leveraging SAP Production Planning consulting background to simplify multi-step enterprise workflows and business logic.",
    highlights: ["Workflow Simplification", "Complex Business Logic", "Cross-Functional Sync", "Enterprise Software UX"]
  }
];

// --- Creative Process Workflow Data ---
const CREATIVE_PROCESS = [
  {
    step: "01",
    phase: "Discovery & Research",
    subtitle: "Empathize & Understand",
    icon: Search,
    color: "from-blue-600 to-cyan-500",
    pastelBg: "bg-[#F3F5FA]",
    pastelBorder: "border-[#DCE2F0]",
    desc: "Deep diving into business goals, conducting 15+ user interviews, synthesizing user pain points, and auditing competitive solutions to ground design in real user needs.",
    deliverables: ["User Interview Synthesis", "Competitive Audits", "Empathy Maps", "Problem Statements"]
  },
  {
    step: "02",
    phase: "Define & Strategy",
    subtitle: "Structure & Architecture",
    icon: Target,
    color: "from-cyan-600 to-teal-500",
    pastelBg: "bg-[#F7F5F0]",
    pastelBorder: "border-[#E8E2D8]",
    desc: "Mapping out user personas, defining core task flows, creating information architecture (IA), and establishing measurable success metrics for the experience.",
    deliverables: ["User Journey Maps", "Information Architecture", "Core Task Flows", "Design Scope"]
  },
  {
    step: "03",
    phase: "Ideate & Wireframe",
    subtitle: "Explore & Iterate",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-500",
    pastelBg: "bg-[#FAF5EF]",
    pastelBorder: "border-[#ECE2D5]",
    desc: "Rapidly sketching multiple layout concepts, building mid-fidelity wireframes, testing navigation structures, and refining interaction models through quick team feedback loops.",
    deliverables: ["Rapid Concept Sketches", "Mid-Fi Wireframes", "Layout Explorations", "Navigation Testing"]
  },
  {
    step: "04",
    phase: "Prototype & Visual UI",
    subtitle: "Craft & Polish",
    icon: Palette,
    color: "from-pink-600 to-purple-600",
    pastelBg: "bg-[#F8F2F5]",
    pastelBorder: "border-[#EADEE4]",
    desc: "Applying design tokens, color systems, and typographic hierarchy to craft pixel-perfect, accessible UI components and animated interactive prototypes in Figma.",
    deliverables: ["Design Systems & Tokens", "Hi-Fi UI Mockups", "Interactive Motion Prototypes", "Component Libraries"]
  },
  {
    step: "05",
    phase: "Test & Handoff",
    subtitle: "Evaluate & Deliver",
    icon: CheckCircle2,
    color: "from-emerald-600 to-green-500",
    pastelBg: "bg-[#F1F6F4]",
    pastelBorder: "border-[#D8E6E0]",
    desc: "Running usability evaluations with target users, iterating based on qualitative feedback, preparing design system specs, and collaborating seamlessly with engineers for handoff.",
    deliverables: ["Usability Testing Report", "Design Iterations", "Developer Redlines & Tokens", "Production Handoff Specs"]
  }
];

// --- Case Study Overlay Modal ---
const CaseStudyOverlay = ({ project, onClose }: { project: any; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 35, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 35, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        className="relative w-full h-full max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-900 border border-blue-100 mb-1">
              {project.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-full text-xs font-medium transition-colors shadow-sm"
          >
            <X size={16} />
            <span>Close</span>
          </button>
        </div>

        {/* Scrollable Case Study Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 bg-[#F6F8FC]">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {project.subheading}
            </h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {project.desc}
            </p>
          </div>

          {/* Seamless Case Study Slides - Zero gaps, sharp edges (no rounded corners) */}
          <div className="flex flex-col max-w-5xl mx-auto shadow-2xl rounded-none overflow-hidden bg-white border-0">
            {project.caseStudyImages.map((imgUrl: string, idx: number) => (
              <div
                key={`cs-img-${idx}`}
                className="w-full bg-white rounded-none border-0 p-0 m-0 overflow-hidden leading-none block"
              >
                <SmartImage
                  src={imgUrl}
                  alt={`${project.title} - Slide ${idx + 1}`}
                  fallbackTitle={project.title}
                  loading="eager"
                  className="w-full h-auto block rounded-none border-0 p-0 m-0 align-top object-contain"
                />
              </div>
            ))}
          </div>

          <div className="text-center py-12 border-t border-slate-200 max-w-md mx-auto">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Interested in similar work?</h4>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-[#0F2B5B] to-[#2563EB] text-white rounded-full font-medium text-sm hover:opacity-95 transition-opacity shadow-md"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Translucent Floating Navigation Bar ---
const TranslucentFloatingNavbar = ({
  activeTab,
  onTabChange
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse dropdown when user scrolls significantly
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const initialY = window.scrollY;
    const handleScroll = () => {
      // Only close if user actually scrolled the page, never on micro-touches
      if (Math.abs(window.scrollY - initialY) > 30) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", id: "home", icon: Home },
    { label: "Experience", id: "experience", icon: Briefcase },
    { label: "About", id: "about", icon: User },
    { label: "Contact", id: "contact", icon: Phone },
    {
      label: "Resume",
      id: "resume",
      icon: FileText,
      href: RESUME_DRIVE_URL,
      isExternal: true
    },
    { label: "My Arts", id: "my-arts", icon: Palette }
  ];

  const handleTabClick = (item: typeof navItems[0]) => {
    if (item.isExternal && item.href) {
      // Synchronously trigger window.open to keep browser user activation token intact
      window.open(item.href, "_blank", "noopener,noreferrer");
      setMobileMenuOpen(false);
      return;
    }
    setMobileMenuOpen(false);
    onTabChange(item.id);
  };

  const activeNavItem = navItems.find((item) => item.id === activeTab) || navItems[0];
  const ActiveIcon = activeNavItem.icon;

  return (
    <>
      {/* Fullscreen Overlay when Mobile Menu is Open - Collapses Dropdown on First Click Anywhere */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-5 lg:px-8 pointer-events-none">
        <nav className="pointer-events-auto bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_8px_32px_0_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-6 lg:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 md:gap-2 lg:gap-4 max-w-7xl w-full transition-all duration-300">
          {/* Brand / Logo */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onTabChange("home");
            }}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <img
              src="/pwa-192x192.png"
              alt="SG Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-contain shadow-xs border border-slate-900/10 group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="tracking-tight font-bold hidden md:inline xl:text-sm text-xs">Sharadindu Guin</span>
            <span className="tracking-tight font-bold md:hidden">SG</span>
          </button>

          {/* Active Tab Center Indicator for Mobile */}
          <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-[#0F2B5B]/10 to-[#2563EB]/10 border border-blue-200/60 rounded-full text-[11px] font-bold text-slate-800 shadow-2xs">
            <ActiveIcon size={13} className="text-blue-600 shrink-0" />
            <span>{activeNavItem.label}</span>
          </div>

          {/* Desktop & Tablet Navigation Links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 shrink-0">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              if (item.isExternal && item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1.5 lg:px-3 lg:py-1.5 text-[11px] lg:text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1 lg:gap-1.5 whitespace-nowrap cursor-pointer shrink-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  >
                    <Icon size={12} className="text-slate-500" />
                    <span>{item.label}</span>
                    <ExternalLink size={9} className="opacity-70" />
                  </a>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => handleTabClick(item)}
                  className={`px-2 py-1.5 lg:px-3 lg:py-1.5 text-[11px] lg:text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1 lg:gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#0F2B5B] to-[#2563EB] shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon size={12} className={isActive ? "text-white" : "text-slate-500"} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action: Let's Talk CTA & Mobile Toggle */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTabChange("contact");
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 lg:px-4 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all shadow-2xs shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>Let's Talk</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-700 hover:text-slate-900 focus:outline-none rounded-full hover:bg-slate-100/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown (Frosted Liquid Glass Design) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="pointer-events-auto absolute top-16 inset-x-4 bg-white/95 text-slate-900 backdrop-blur-3xl border border-white/90 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/10 p-3 flex flex-col gap-1 md:hidden"
              >
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  if (item.isExternal && item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setTimeout(() => setMobileMenuOpen(false), 200);
                        }}
                        style={{ touchAction: "manipulation" }}
                        className="px-4 py-3 text-sm font-semibold rounded-xl flex items-center justify-between transition-all text-slate-800 hover:text-slate-950 hover:bg-slate-100/90"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-slate-600" />
                          <span className="tracking-wide">{item.label}</span>
                        </div>
                        <ExternalLink size={15} className="text-slate-400" />
                      </a>
                    );
                  }
                  return (
                    <button
                      key={item.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClick(item);
                      }}
                      className={`px-4 py-3 text-sm font-semibold rounded-xl flex items-center justify-between transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#0F2B5B] to-[#2563EB] text-white shadow-md"
                          : "text-slate-800 hover:text-slate-950 hover:bg-slate-100/90"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? "text-white" : "text-slate-600"} />
                        <span className="tracking-wide">{item.label}</span>
                      </div>
                      <ChevronRight size={15} className={isActive ? "text-white/80" : "text-slate-400"} />
                    </button>
                  );
                })}

              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};

// --- Creative & Dynamic Product Designer Hero Section ---
const CreativeHeroSection = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#081226] via-[#0E1D3A] to-[#060D1B] text-white pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-2xl border-b border-blue-900/50">
      {/* Background Subtle Gradient & Grid Accents */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Sharadindu Guin · Product Designer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-3xl">
          Crafting digital products that bridge{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
            human intent
          </span>{" "}
          & complex systems.
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
          Combining a Computer Science degree, 3D multimedia background, and UI/UX postgraduate specialization from <strong>IIT Roorkee</strong> to turn complex software workflows into clear, elegant, high-converting digital products.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => {
              const el = document.getElementById("projects-grid");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 hover:opacity-95 transition-all shadow-lg shadow-cyan-900/30 hover:scale-[1.02] border border-cyan-300/30 cursor-pointer"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight size={18} />
          </button>
          <button
            onClick={() => onNavigate("about")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all shadow-xs cursor-pointer"
          >
            <User size={16} className="text-cyan-300" />
            <span>My Journey</span>
          </button>
        </div>

        {/* Quick Credentials Strip */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-300 max-w-2xl">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-cyan-400 shrink-0" />
            <span>IIT Roorkee UI/UX</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-cyan-400 shrink-0" />
            <span>2+ Yrs Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-cyan-400 shrink-0" />
            <span>8+ Case Studies</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Design Arsenal Section ---
const DesignArsenalSection = () => {
  return (
    <section className="py-12 border-t border-slate-200/80 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>CORE CAPABILITIES</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Design Arsenal
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            Mastery across end-to-end UI/UX product design, systems architecture, rapid prototyping, and research frameworks.
          </p>
        </div>

        {/* Arsenal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESIGN_ARSENAL.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`${item.pastelBg || "bg-white"} ${item.pastelBorder || "border-slate-200/90"} rounded-3xl p-6 sm:p-7 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-sm`}>
                      <Icon size={20} />
                    </div>
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${item.bgAccent}`}>
                      Skill Area
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900/10 flex flex-wrap gap-1.5">
                  {item.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium bg-white/80 text-slate-700 rounded-md border border-slate-900/5 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Creative Process Section ---
const CreativeProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-12 border-t border-slate-200/80 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/60 my-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Compass size={14} />
              <span>METHODOLOGY</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              My Creative Process
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            A structured, user-centered framework designed to transform ambiguous user needs into high-converting, scalable digital experiences.
          </p>
        </div>

        {/* Process Timeline Steps Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {CREATIVE_PROCESS.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;
            const isLast = idx === 4;
            return (
              <button
                key={item.phase}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-3xl text-left border transition-all flex flex-col justify-between h-32 relative cursor-pointer ${
                  isLast ? "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1" : "col-span-1"
                } ${
                  isSelected
                    ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20 text-slate-900 scale-[1.02]"
                    : `${item.pastelBg || "bg-slate-50"} ${item.pastelBorder || "border-slate-200"} hover:border-blue-300 text-slate-700`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isSelected ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-900/10"}`}>
                    {item.step}
                  </span>
                  <Icon size={18} className={isSelected ? "text-blue-600" : "text-slate-500"} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold leading-tight line-clamp-1 mb-0.5 text-slate-900">
                    {item.phase}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Expanded Showcase Card */}
        <AnimatePresence mode="wait">
          {CREATIVE_PROCESS[activeStep] && (
            <motion.div
              key={CREATIVE_PROCESS[activeStep].phase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className={`${CREATIVE_PROCESS[activeStep].pastelBg || "bg-slate-50"} ${CREATIVE_PROCESS[activeStep].pastelBorder || "border-slate-200"} border rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start justify-between gap-8`}
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-blue-600 tracking-wider">
                    {CREATIVE_PROCESS[activeStep].step}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                      {CREATIVE_PROCESS[activeStep].phase}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {CREATIVE_PROCESS[activeStep].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {CREATIVE_PROCESS[activeStep].desc}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="w-full lg:w-80 bg-white rounded-2xl p-5 border border-slate-900/10 shrink-0 shadow-2xs">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-blue-600" />
                  <span>Key Deliverables</span>
                </span>
                <ul className="space-y-2">
                  {CREATIVE_PROCESS[activeStep].deliverables.map((deliv) => (
                    <li key={deliv} className="text-xs font-medium text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Helper for NDA project themes (different color blur backgrounds)
const getLockTheme = (theme?: string) => {
  if (theme === "emerald") {
    return {
      containerBg: "bg-gradient-to-br from-[#021f18] via-[#06141d] to-[#042820]",
      orb1: "bg-emerald-500/40",
      orb2: "bg-teal-400/35",
      overlayMesh: "from-emerald-950/70 via-slate-950/60 to-teal-950/70"
    };
  }
  if (theme === "rose" || theme === "fuchsia") {
    return {
      containerBg: "bg-gradient-to-br from-[#24061a] via-[#10081d] to-[#1c0724]",
      orb1: "bg-rose-500/45",
      orb2: "bg-pink-400/35",
      overlayMesh: "from-rose-950/75 via-slate-950/65 to-pink-950/75"
    };
  }
  // Default is amber
  return {
    containerBg: "bg-gradient-to-br from-[#1a1205] via-[#0f1422] to-[#261505]",
    orb1: "bg-amber-500/35",
    orb2: "bg-orange-500/25",
    overlayMesh: "from-amber-950/70 via-slate-950/60 to-yellow-950/70"
  };
};

// --- Home / Selected Case Studies Screen ---
const HomeScreen = ({
  onSelectProject,
  onNavigate
}: {
  onSelectProject: (proj: any) => void;
  onNavigate: (tab: string) => void;
}) => {
  const [lockedToast, setLockedToast] = useState<{
    title: string;
    message: string;
  } | null>(null);

  return (
    <div className="w-full pb-20">
      {/* Creative Hero Section */}
      <CreativeHeroSection onNavigate={onNavigate} />

      {/* Main Content Container with Padding */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12">
        {/* Selected Work Section */}
        <section id="projects-grid" className="pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1.5">
                FEATURED WORK
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Case Studies & Projects ({PROJECTS.length})
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md">
              Click on any case study to explore full user flows, research documentation, wireframes, and design systems.
            </p>
          </div>

          {/* Case Study Cards Grid - 3 cards in a row on Desktop & Tablet, 1 on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROJECTS.map((project: any) => {
              const isLocked = Boolean(project.isLocked);
              const categories = project.categories || [project.category];
              const lockTheme = getLockTheme(project.lockTheme);

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isLocked) {
                      setLockedToast({
                        title: project.title,
                        message: `${project.title} is confidential under a Non-Disclosure Agreement (NDA). Research and internal workflows are restricted.`
                      });
                      setTimeout(() => setLockedToast(null), 3800);
                      return;
                    }
                    onSelectProject(project);
                  }}
                  className={`bg-white rounded-3xl border transition-all flex flex-col group shadow-[0_0_20px_rgba(15,23,42,0.14)] hover:shadow-[0_0_30px_rgba(15,23,42,0.22)] ${
                    isLocked
                      ? "border-slate-300/90 hover:border-slate-400 cursor-not-allowed select-none"
                      : "border-slate-300/90 hover:border-slate-400 cursor-pointer hover:-translate-y-1"
                  }`}
                >
                  {/* Inset Thumbnail Container with Padding on All 4 Sides & Rounded Corners (No border stroke on image) */}
                  <div className="p-3 sm:p-3.5 pb-1 sm:pb-1.5">
                    <div
                      className={`relative overflow-hidden aspect-[16/10] rounded-2xl ${
                        isLocked ? lockTheme.containerBg : "bg-slate-900"
                      }`}
                    >
                      {/* Glowing chromatic blur orbs behind and within thumbnail */}
                      {isLocked && (
                        <>
                          <div
                            className={`absolute -top-10 -right-10 w-44 h-44 rounded-full ${lockTheme.orb1} blur-2xl pointer-events-none`}
                          />
                          <div
                            className={`absolute -bottom-8 -left-8 w-40 h-40 rounded-full ${lockTheme.orb2} blur-2xl pointer-events-none`}
                          />
                        </>
                      )}

                      <SmartImage
                        src={project.image}
                        alt={project.title}
                        fallbackTitle={project.title}
                        className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                          isLocked
                            ? "blur-md scale-110 opacity-35 mix-blend-luminosity pointer-events-none"
                            : "group-hover:scale-105"
                        }`}
                      />

                      {/* Locked Confidential NDA Overlay - Lock icon & text in crisp white */}
                      {isLocked && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-b ${lockTheme.overlayMesh} backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-center z-10 pointer-events-none`}
                        >
                          <div className="w-12 h-12 rounded-2xl border border-white/30 bg-slate-900/80 backdrop-blur-md flex items-center justify-center shadow-xl mb-2 text-white">
                            <Lock size={22} className="text-white" />
                          </div>
                          <span className="px-3 py-1 rounded-full border border-white/30 bg-slate-900/80 text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-xs backdrop-blur-md">
                            Confidential · NDA
                          </span>
                          <span className="text-[10px] text-white/85 mt-1 font-medium">
                            {project.confidentialLabel || "Proprietary Enterprise IT System"}
                          </span>
                        </div>
                      )}

                      {/* Locked Pill - Crisp White */}
                      {isLocked && (
                        <div className="absolute top-3 left-3 z-20 pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 border border-white/30 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs text-white">
                            <Lock size={10} className="text-white" />
                            <span className="text-white">Locked</span>
                          </span>
                        </div>
                      )}

                      {/* Category Pills (e.g. Saas, B2B) */}
                      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 flex-wrap justify-end">
                        {categories.map((cat: string) => (
                          <span
                            key={cat}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 sm:p-5 pt-3 sm:pt-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {project.title}
                        </h3>
                        {isLocked && (
                          <span className="p-1 rounded-md shrink-0 mt-0.5 bg-blue-50 text-blue-600">
                            <Lock size={14} />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                        {project.subheading}
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.desc}
                      </p>
                    </div>

                    {/* Card Footer: Blue "Confidential under NDA" text like other case study cards */}
                    {isLocked ? (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold">
                        <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                          <Lock size={13} className="text-blue-600" />
                          <span>Confidential under NDA</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">Access Restricted</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform pt-2">
                        <span>View Case Study</span>
                        <ArrowUpRight size={15} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* NDA Confidential Notification Toast (Consistent for both NDA case studies) */}
      <AnimatePresence>
        {lockedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-[250] bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-xl flex items-center justify-between gap-3.5 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-500/20 text-blue-400 border border-blue-400/30 shadow-xs">
                <Lock size={18} />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="font-bold text-white">Confidential Case Study</p>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                    NDA
                  </span>
                </div>
                <p className="text-slate-300 leading-snug">{lockedToast.message}</p>
              </div>
            </div>
            <button
              onClick={() => setLockedToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Experience Screen ---
const ExperienceScreen = () => {
  const experiences = [
    {
      role: "UI/UX & Product Designer",
      company: "Freelance",
      location: "Remote",
      period: "06/2025 – Present",
      bullets: [
        "Designed 17 onboarding and trust-building flow for a payday lending app, simplifying verification, clarifying information hierarchy and adding progress indicators to reduce user anxiety and drop-off. Tested with 5 users, 4 completed unaided.",
        "Led end-to-end UX for a sports matchmaking and venue-booking platform (sports dating app) with three role-based experiences: a player app for creating matches and tournaments, messaging partners and booking nearby venues, an admin dashboard, and a venue-owner portal, with profile-specific login for each. I interviewed users on trust and safety concerns before redesigning key screens to make early interactions feel safer.",
        "Owned research-to-handoff design for a health and fitness tracking app covering vitals, activity logging and progress visualization, building personas from 15+ interviews, mapping user journeys and delivering high-fidelity designs with developer-ready specs."
      ]
    },
    {
      role: "3D Visualization & Design Collaborator(Intern)",
      company: "Ikarus 3D",
      location: "Mohali, Punjab",
      period: "06/2024 – 10/2024",
      bullets: [
        "Designed AR/VR-ready 3D assets for spatial interfaces, working from product and dev specs and building for how users view and interact with objects in 3D space.",
        "Joined prototype design reviews with product and dev teams and revised assets across agile sprints based on feedback, the same critique-and-iterate loop I now use in UX."
      ]
    },
    {
      role: "Associate SAP Consultant",
      company: "Wipro Technologies Ltd",
      location: "Pune, Maharashtra",
      period: "05/2019 – 05/2022",
      bullets: [
        "Mapped end-to-end business workflows (plan, produce, confirm, receive) for 3 global manufacturers (Whirlpool, Electrolux, Viskase) into user journeys and process flows, so every screen supported a clear step.",
        "Studied how planners, supervisors and plant operators at 3 global manufacturers used complex B2B software to run their daily work, then shaped the system around each role’s tasks and decisions.",
        "Mapped end-to-end business workflows (plan, produce, confirm, receive) into user journeys and process flows, so every screen supported a clear step in the chain.",
        "Ran requirement workshops with business owners, plant teams and IT across 20+ implementation cycles, balancing competing needs into one agreed design before build.",
        "Observed users on SAP GUI during UAT and training, and recorded where they hesitated, made errors or used workarounds. These observations are what moved me into UX design.",
        "Learned how enterprise products work as a business: role-based access, approvals, compliance, data accuracy and the cost of an error that spreads downstream."
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-200/80 pb-8">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
            CAREER PATH
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Professional Experience
          </h1>
          <p className="text-slate-600 text-base max-w-2xl leading-relaxed">
            1+ year of freelance UI/UX & Product Design experience across fintech, health, fitness, and sports platforms, backed by 3 years of enterprise SAP consultant work at Wipro.
          </p>
        </div>

        <a
          href={RESUME_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-md shadow-blue-500/20 shrink-0 self-start transition-all hover:scale-105"
        >
          <FileText size={16} />
          <span>View / Download CV</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Timeline List */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={`cv-exp-${idx}`}
            className="bg-white rounded-3xl border border-slate-300/90 p-6 sm:p-8 shadow-[0_0_20px_rgba(15,23,42,0.14)] hover:shadow-[0_0_30px_rgba(15,23,42,0.22)] transition-all hover:-translate-y-0.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">
                  {exp.company} <span className="text-slate-400 font-normal">· {exp.location}</span>
                </p>
              </div>
              <span className="inline-block px-3.5 py-1.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full shrink-0 self-start border border-slate-200/60">
                {exp.period}
              </span>
            </div>

            <ul className="space-y-3">
              {exp.bullets.map((b, bIdx) => (
                <li key={`bullet-${idx}-${bIdx}`} className="text-slate-600 text-sm leading-relaxed flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- About Screen ---
const AboutScreen = () => {
  return (
    <div className="pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Image Column */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white aspect-[4/5] group">
            <SmartImage
              src="https://drive.google.com/file/d/1-KWDit6K-sBkewEvq7x0ToRR4WdxWPxO/view?usp=drivesdk"
              alt="Sharadindu Guin"
              fallbackTitle="Sharadindu Guin"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent text-white pointer-events-none">
              <span className="text-sm font-bold uppercase tracking-wider block">Sharadindu Guin</span>
              <span className="text-xs text-slate-300">Product Designer · UI/UX</span>
            </div>
          </div>
        </div>

        {/* Text Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
              ABOUT ME
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Beyond the Interface
            </h1>
          </div>

          <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
            I'm a Product Designer whose journey spans technology consulting, 3D visualization, and digital product design.
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At Wipro, I developed a systematic approach to complex business workflows. My experience at Frido and Ikarus 3D strengthened my visual thinking and understanding of product collaboration.
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Today, I bring these perspectives into mobile apps, web experiences, and digital products. My work combines user research, information architecture, interaction design, wireframing, prototyping, usability testing, and accessibility to create experiences that are intuitive and purposeful.
          </p>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200">
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">2+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Years Exp.</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">8+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Case Studies</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">15+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Artworks</span>
            </div>
          </div>

          {/* Resume Action */}
          <div>
            <a
              href={RESUME_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#0F2B5B] to-[#2563EB] hover:opacity-95 transition-all shadow-md"
            >
              <FileText size={16} />
              <span>View Full Resume</span>
              <ExternalLink size={14} className="opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Education Qualifications (Individual Unenclosed Cards) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              ACADEMIC & PROFESSIONAL CREDENTIALS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Education & Qualifications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Qualification 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-300/90 shadow-[0_0_20px_rgba(15,23,42,0.14)] hover:shadow-[0_0_30px_rgba(15,23,42,0.22)] transition-all flex flex-col justify-between hover:border-blue-400 group">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                POSTGRADUATE CERTIFICATION
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                UI/UX Design Specialization
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                iHUB Divya Sampark, <strong>IIT Roorkee</strong>
              </p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200/80 self-start">
              User Research & Systemic UX
            </span>
          </div>

          {/* Qualification 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-300/90 shadow-[0_0_20px_rgba(15,23,42,0.14)] hover:shadow-[0_0_30px_rgba(15,23,42,0.22)] transition-all flex flex-col justify-between hover:border-blue-400 group">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                MASTER OF ARTS (MA)
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                MA in Multimedia
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                International Academy of Computer Graphics (IACG), Hyderabad
              </p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200/80 self-start">
              3D Art, Motion & Visual Systems
            </span>
          </div>

          {/* Qualification 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-300/90 shadow-[0_0_20px_rgba(15,23,42,0.14)] hover:shadow-[0_0_30px_rgba(15,23,42,0.22)] transition-all flex flex-col justify-between hover:border-blue-400 group">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                BACHELOR OF TECHNOLOGY
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                B.Tech in Computer Science
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Siksha 'O' Anusandhan (SOA) University, Bhubaneswar
              </p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200/80 self-start">
              Software Systems & Logic
            </span>
          </div>
        </div>
      </div>

      {/* Design Arsenal Section */}
      <DesignArsenalSection />

      {/* Creative Process Section */}
      <CreativeProcessSection />
    </div>
  );
};

// --- My Arts Screen ---
const MyArtsScreen = ({ onSelectArt }: { onSelectArt: (art: any) => void }) => {
  return (
    <div className="pt-28 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
            CREATIVE GALLERY
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            My Arts ({ARTS.length})
          </h1>
        </div>
        <p className="text-slate-600 text-sm max-w-md">
          A gallery of 3D concept art, digital illustrations, visual experiments, and personal creative explorations.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTS.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArt(art)}
            className="bg-white rounded-3xl border border-slate-300/90 overflow-hidden shadow-[0_0_20px_rgba(15,23,42,0.14)] hover:shadow-[0_0_30px_rgba(15,23,42,0.22)] transition-all cursor-pointer group flex flex-col hover:-translate-y-1"
          >
            <div className="p-3 sm:p-3.5 pb-1">
              <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src={getDriveDirectLink(art.img)}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-slate-900 shadow-md">
                    View High-Res
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-5 pt-2 bg-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{art.title}</h3>
                <span className="text-xs text-slate-400 font-medium">{art.category}</span>
              </div>
              <Palette size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Contact Screen ---
const ContactScreen = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#060D1E] via-[#040915] to-[#02050B] text-white pt-28 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      {/* Radiant Ambient Light Orbs */}
      <div className="absolute -top-24 -right-20 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl w-full mx-auto"
      >
        <div className="bg-white text-slate-900 border border-slate-200/90 rounded-3xl p-8 sm:p-14 shadow-2xl text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>GET IN TOUCH</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Let’s discuss opportunities or create something extraordinary.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            I'm currently available for product design roles, design consultations, and select freelance partnerships.
          </p>

          {/* Primary Contact CTA Button */}
          <div className="mb-12">
            <a
              href="mailto:guinsharadindu0@gmail.com"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 hover:opacity-95 transition-all shadow-lg shadow-blue-500/20 hover:scale-105"
            >
              <Mail size={18} />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Contact Method Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200 text-xs font-semibold text-slate-700">
            <a
              href="mailto:guinsharadindu0@gmail.com"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={14} className="text-blue-600" />
              <span className="truncate">Email Me</span>
            </a>
            <a
              href="tel:+919131025086"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 transition-all flex items-center justify-center gap-2"
            >
              <Phone size={14} className="text-blue-600" />
              <span>+91-9131025086</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sharadindu-guin-574772211/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 transition-all flex items-center justify-center gap-2"
            >
              <Linkedin size={14} className="text-blue-600" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.behance.net/guinsharad513d"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 transition-all flex items-center justify-center gap-2"
            >
              <BehanceIcon size={14} className="text-blue-600" />
              <span>Behance</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="py-8 px-6 sm:px-10 lg:px-16 bg-white/80 border-t border-slate-200/80 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900">Sharadindu Guin</span> · Product Designer & UI/UX
        </div>
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedArt, setSelectedArt] = useState<any>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] bg-gradient-to-t from-[#DCE8F5] via-[#EAF1F8] to-[#F4F7FA] text-[#0F172A] font-sans antialiased relative flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Translucent Floating Navigation Bar */}
      <TranslucentFloatingNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Screen Views with Smooth Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <HomeScreen
                onSelectProject={setSelectedProject}
                onNavigate={handleTabChange}
              />
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="experience-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ExperienceScreen />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutScreen />
            </motion.div>
          )}

          {activeTab === "my-arts" && (
            <motion.div
              key="arts-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MyArtsScreen onSelectArt={setSelectedArt} />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Artwork Lightbox Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArt(null)}
            className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2.5 flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-slate-950 rounded-2xl">
                <img
                  src={getDriveDirectLink(selectedArt.img)}
                  alt={selectedArt.title}
                  className="max-w-full max-h-[80vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedArt.title}</h3>
                  <span className="text-xs text-slate-500 font-medium">{selectedArt.category}</span>
                </div>
                <button
                  onClick={() => setSelectedArt(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
