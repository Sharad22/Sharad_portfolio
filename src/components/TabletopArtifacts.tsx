import React from "react";

// --- Stainless Steel Engineering Ruler ---
export const SteelRuler = ({ className = "" }: { className?: string }) => {
  const mmTicks = Array.from({ length: 141 }, (_, i) => i);

  return (
    <div
      className={`select-none pointer-events-none drop-shadow-[0_16px_22px_rgba(0,0,0,0.5)] ${className}`}
      style={{ filter: "drop-shadow(0 18px 24px rgba(0, 0, 0, 0.45))" }}
    >
      <svg
        viewBox="0 0 460 62"
        width="460"
        height="62"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="steelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="12%" stopColor="#e2e8f0" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Ruler Base */}
        <rect x="0" y="0" width="460" height="62" rx="4" fill="url(#steelGrad)" stroke="#475569" strokeWidth="0.8" />
        
        {/* Beveled Top & Bottom Edge Highlights */}
        <line x1="1" y1="2" x2="459" y2="2" stroke="url(#bevelGrad)" strokeWidth="1.5" />
        <line x1="1" y1="60" x2="459" y2="60" stroke="#334155" strokeWidth="1" />

        {/* Hanging Hole on Left */}
        <circle cx="20" cy="31" r="7.5" fill="#0b2e59" stroke="#475569" strokeWidth="1.5" />
        <circle cx="20" cy="31" r="6" fill="#082347" />

        {/* Millimeter & Centimeter Ticks */}
        {mmTicks.map((mm) => {
          const x = 45 + mm * 2.8;
          if (x > 445) return null;
          const isCm = mm % 10 === 0;
          const isHalfCm = mm % 5 === 0 && !isCm;
          const tickHeight = isCm ? 18 : isHalfCm ? 12 : 7;
          const cmNumber = mm / 10;

          return (
            <g key={mm}>
              <line
                x1={x}
                y1={0}
                x2={x}
                y2={tickHeight}
                stroke="#1e293b"
                strokeWidth={isCm ? 1.2 : 0.8}
                strokeOpacity={isCm ? 0.95 : 0.75}
              />
              {isCm && cmNumber > 0 && (
                <text
                  x={x}
                  y={29}
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="monospace"
                  fill="#0f172a"
                  textAnchor="middle"
                >
                  {cmNumber}
                </text>
              )}
            </g>
          );
        })}

        {/* Ruler Branding Details */}
        <text
          x="240"
          y="48"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1.2"
          fill="#334155"
          textAnchor="middle"
        >
          STAINLESS STEEL · 30 CM · CRBOT-9
        </text>

        {/* Sub-inch ticks on bottom edge */}
        {Array.from({ length: 65 }, (_, idx) => {
          const x = 45 + idx * 6.2;
          if (x > 445) return null;
          const isMajor = idx % 4 === 0;
          const h = isMajor ? 11 : 6;
          return (
            <line
              key={`b-${idx}`}
              x1={x}
              y1={62 - h}
              x2={x}
              y2={62}
              stroke="#334155"
              strokeWidth={isMajor ? 1 : 0.6}
              strokeOpacity={0.7}
            />
          );
        })}
      </svg>
    </div>
  );
};

// --- Sharpened Wooden Drafting Pencil ---
export const DraftingPencil = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 14px 18px rgba(0, 0, 0, 0.42))" }}
    >
      <svg
        viewBox="0 0 280 26"
        width="280"
        height="26"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hexagonal Pencil Facet Gradients (Yellow / Gold) */}
          <linearGradient id="pencilTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient id="pencilMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="pencilBot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>

          {/* Sharpened Cedar Wood Cone */}
          <linearGradient id="woodCone" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="50%" stopColor="#FAEDCD" />
            <stop offset="100%" stopColor="#CCD5AE" />
          </linearGradient>

          {/* Metal Ferrule */}
          <linearGradient id="ferruleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Hexagonal Barrel Facets */}
        <rect x="52" y="3" width="186" height="6.5" fill="url(#pencilTop)" />
        <rect x="52" y="9.5" width="186" height="7" fill="url(#pencilMid)" />
        <rect x="52" y="16.5" width="186" height="6.5" fill="url(#pencilBot)" />

        {/* Hot Stamped Gold Brand Label */}
        <text
          x="142"
          y="15"
          fontSize="6.5"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
          fill="#713F12"
          textAnchor="middle"
        >
          SG · PRODUCT DESIGN HB · 2B
        </text>

        {/* Sharpened Wood Cone (Tapering from x=52 to lead tip x=14) */}
        <polygon points="52,3 52,23 15,13" fill="url(#woodCone)" stroke="#B08968" strokeWidth="0.5" />
        
        {/* Subtle Wood Scallops at Sharpening Edge */}
        <path d="M52 3 Q50 6.5 52 10 Q50 13 52 16.5 Q50 19.5 52 23" fill="#D4A373" stroke="#A98467" strokeWidth="0.5" />

        {/* Pure Graphite Lead Tip */}
        <polygon points="24,10 10,13 24,16" fill="#1E293B" />
        <polygon points="18,11.5 10,13 18,14.5" fill="#0F172A" />

        {/* Aluminum Crimped Ferrule */}
        <rect x="238" y="3" width="22" height="20" rx="1.5" fill="url(#ferruleGrad)" stroke="#334155" strokeWidth="0.5" />
        <line x1="244" y1="3" x2="244" y2="23" stroke="#334155" strokeWidth="1" />
        <line x1="250" y1="3" x2="250" y2="23" stroke="#334155" strokeWidth="1" />
        <line x1="255" y1="3" x2="255" y2="23" stroke="#F8FAFC" strokeWidth="0.8" />

        {/* Pink Rubber Eraser */}
        <rect x="260" y="4.5" width="17" height="17" rx="3" fill="#F472B6" stroke="#DB2777" strokeWidth="0.5" />
        <path d="M260 4.5 L274 4.5 Q277 13 274 21.5 L260 21.5 Z" fill="#FB7185" />
        <line x1="262" y1="6" x2="272" y2="6" stroke="#FDA4AF" strokeWidth="1" />
      </svg>
    </div>
  );
};

// --- Vinyl Drafting Eraser ---
export const VinylEraser = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 14px 18px rgba(0, 0, 0, 0.42))" }}
    >
      <svg
        viewBox="0 0 110 60"
        width="110"
        height="60"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="eraserRubber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="sleeveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* White Eraser Rubber Body with Chamfered Edges */}
        <polygon points="8,10 98,10 106,18 106,50 16,50 8,42" fill="url(#eraserRubber)" stroke="#94A3B8" strokeWidth="0.7" />
        
        {/* Rubber Bevel Highlight */}
        <line x1="8" y1="10" x2="98" y2="10" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="98" y1="10" x2="106" y2="18" stroke="#FFFFFF" strokeWidth="1" />

        {/* Cobalt Blue Cardboard Protective Sleeve */}
        <polygon points="26,10 82,10 88,18 88,50 32,50 26,42" fill="url(#sleeveBlue)" stroke="#172554" strokeWidth="0.8" />
        
        {/* Sleeve Top Foil Stripe */}
        <line x1="28" y1="13" x2="80" y2="13" stroke="#60A5FA" strokeWidth="1.5" />
        <line x1="33" y1="47" x2="86" y2="47" stroke="#60A5FA" strokeWidth="1.5" />

        {/* Eraser Sleeve Typography */}
        <text
          x="56"
          y="28"
          fontSize="8.5"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.8"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          SG ERASER
        </text>
        <text
          x="56"
          y="38"
          fontSize="6"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.5"
          fill="#BFDBFE"
          textAnchor="middle"
        >
          DUST FREE · VINYL
        </text>
      </svg>
    </div>
  );
};

// --- Polaroid Photo Card with Washi Tape ---
export const PolaroidCard = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 18px 24px rgba(0, 0, 0, 0.45))" }}
    >
      <div className="relative bg-white p-2.5 pb-6 rounded-md shadow-lg border border-slate-200/90 w-40 sm:w-44 text-slate-800">
        {/* Translucent Washi Tape on Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-amber-100/70 border border-amber-300/60 backdrop-blur-xs rounded-xs shadow-2xs rotate-[-3deg] z-10" />

        {/* Photo Container */}
        <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-slate-900 border border-slate-200/80">
          <img
            src="https://drive.google.com/thumbnail?id=1-KWDit6K-sBkewEvq7x0ToRR4WdxWPxO&sz=w600"
            alt="Sharadindu Guin"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              // Fallback to direct uc if thumbnail proxy has issue
              (e.target as HTMLImageElement).src = "https://drive.google.com/uc?export=view&id=1-KWDit6K-sBkewEvq7x0ToRR4WdxWPxO";
            }}
          />
          {/* Subtle Vintage Photo Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Handwritten / Script Note Below Photo */}
        <div className="pt-2.5 text-center">
          <span className="font-editorial italic text-sm sm:text-base font-semibold tracking-wide text-slate-800 block">
            Welcome~ ✨
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
            Sharadindu G.
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Pastel Yellow Sticky Note ---
export const StickyNote = ({
  text = "Move things around, have fun!",
  subtitle = "Think human · Solve systems ⚡",
  className = ""
}: {
  text?: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 14px 18px rgba(0, 0, 0, 0.38))" }}
    >
      <div className="relative bg-gradient-to-br from-[#FEF08A] to-[#FDE047] text-slate-900 p-4 rounded-xs shadow-md border-t border-white/60 w-44 sm:w-48 transform">
        {/* Top Paper Shadow / Crease */}
        <div className="w-full h-1 bg-black/5 rounded-xs mb-2" />
        <p className="font-editorial italic text-xs sm:text-sm font-semibold leading-snug text-slate-900">
          "{text}"
        </p>
        <span className="text-[10px] font-bold text-amber-800/80 block mt-2 tracking-wide font-sans">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

// --- Red Geometric Origami Crane ---
export const OrigamiCrane = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 16px 20px rgba(0, 0, 0, 0.45))" }}
    >
      <svg
        viewBox="0 0 100 90"
        width="100"
        height="90"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Origami Facets with Dynamic Shading */}
        <polygon points="50,15 90,40 50,55" fill="#EF4444" stroke="#DC2626" strokeWidth="0.5" />
        <polygon points="50,15 10,40 50,55" fill="#B91C1C" stroke="#991B1B" strokeWidth="0.5" />
        <polygon points="50,55 90,40 65,85" fill="#DC2626" />
        <polygon points="50,55 10,40 35,85" fill="#991B1B" />
        <polygon points="50,55 65,85 50,75" fill="#F87171" />
        <polygon points="50,55 35,85 50,75" fill="#7F1D1D" />
        {/* Head / Beak */}
        <polygon points="10,40 0,32 5,42" fill="#991B1B" />
        {/* Tail */}
        <polygon points="90,40 98,25 88,38" fill="#F87171" />
      </svg>
    </div>
  );
};

// --- 3D Perspective White Gaming / Design Die ---
export const PlayfulDice = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 16px 20px rgba(0, 0, 0, 0.45))" }}
    >
      <svg
        viewBox="0 0 70 70"
        width="70"
        height="70"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Face */}
        <polygon points="35,5 65,22 35,38 5,22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
        {/* Left Face */}
        <polygon points="5,22 35,38 35,65 5,48" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
        {/* Right Face */}
        <polygon points="35,38 65,22 65,48 35,65" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />

        {/* Pips on Top Face (e.g. 3 dots) */}
        <circle cx="20" cy="22" r="2.6" fill="#0F172A" />
        <circle cx="35" cy="21.5" r="2.6" fill="#0F172A" />
        <circle cx="50" cy="21" r="2.6" fill="#0F172A" />

        {/* Pips on Left Face (e.g. 5 dots) */}
        <circle cx="15" cy="34" r="2.4" fill="#0F172A" />
        <circle cx="26" cy="38" r="2.4" fill="#0F172A" />
        <circle cx="20" cy="46" r="2.4" fill="#0F172A" />
        <circle cx="15" cy="45" r="2.4" fill="#0F172A" />
        <circle cx="26" cy="51" r="2.4" fill="#0F172A" />

        {/* Pips on Right Face (e.g. 6 dots) */}
        <circle cx="44" cy="40" r="2.4" fill="#0F172A" />
        <circle cx="55" cy="34" r="2.4" fill="#0F172A" />
        <circle cx="44" cy="48" r="2.4" fill="#0F172A" />
        <circle cx="55" cy="42" r="2.4" fill="#0F172A" />
        <circle cx="44" cy="56" r="2.4" fill="#0F172A" />
        <circle cx="55" cy="50" r="2.4" fill="#0F172A" />
      </svg>
    </div>
  );
};
