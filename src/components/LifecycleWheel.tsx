import { useState } from "react";

interface Phase {
  id: number;
  name: string;
  years: string;
  color: string;
  activeColor: string;
  bullets: string[];
  tagline: string;
}

const phases: Phase[] = [
  {
    id: 1,
    name: "Installation & Baseline",
    years: "Years 0–5",
    color: "#B8DDD9",
    activeColor: "#9ACFCA",
    bullets: [
      "Roof is performing at its best — early care matters.",
      "Register and understand warranty coverage",
      "Confirm proper drainage and ventilation",
      "Establish a baseline condition",
    ],
    tagline: "Early awareness protects long-term roof performance.",
  },
  {
    id: 2,
    name: "Watch & Maintain",
    years: "Years 5–10",
    color: "#7FCCC8",
    activeColor: "#5EBFBB",
    bullets: [
      "Early signs of wear begin to appear.",
      "Keep gutters clear and roof clean",
      "Watch for staining, moss, or shingle wear",
      "Check after major storms",
    ],
    tagline: "Routine care helps slow roof aging.",
  },
  {
    id: 3,
    name: "Inspect & Preserve",
    years: "Years 10–15",
    color: "#4FAFAB",
    activeColor: "#3A9E9A",
    bullets: [
      "Preventive care becomes more important.",
      "Schedule periodic roof health assessments",
      "Address minor repairs early",
      "Maintain flashing, seals, and drainage",
    ],
    tagline: "Small actions help protect the longevity of the roof.",
  },
  {
    id: 4,
    name: "Restore & Extend",
    years: "Midlife",
    color: "#2A9490",
    activeColor: "#1F7E7A",
    bullets: [
      "Aging increases, but options still exist.",
      "Consider rejuvenation as shingles lose flexibility",
      "Improve performance and weather resistance",
      "Extend functional roof life",
    ],
    tagline: "Strategic maintenance may help delay replacement.",
  },
  {
    id: 5,
    name: "Plan Ahead",
    years: "Later Years",
    color: "#1B7A78",
    activeColor: "#125F5D",
    bullets: [
      "Clear planning prevents costly surprises.",
      "Monitor more frequently",
      "Plan replacement before failure",
      "Prepare for the next roofing cycle",
    ],
    tagline: "Proactive planning protects the home and reduces stress.",
  },
];

// --- SVG Math ---
const CX = 200;
const CY = 200;
const OUTER_R = 148;
const INNER_R = 95;
const LOGO_R = 83; // white circle / logo size — decoupled from INNER_R
const GAP_DEG = 3;
const SEG_DEG = 360 / phases.length - GAP_DEG; // ~66° each
const START_OFFSET = -90; // start from top

const toRad = (deg: number) => (deg * Math.PI) / 180;

const polarToXY = (
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } => ({
  x: Math.round((cx + r * Math.cos(toRad(angleDeg))) * 1000) / 1000,
  y: Math.round((cy + r * Math.sin(toRad(angleDeg))) * 1000) / 1000,
});

// Arrow segment: chevron point on leading edge, V-notch on trailing edge
const arrowSegmentPath = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startDeg: number,
  endDeg: number
): string => {
  const midR = (outerR + innerR) / 2;
  const depth = 17; // degrees — controls sharpness of both notch and point

  const overlapDeg = 3; // how far tips extend into the gap on both ends

  // Trailing edge (start): notch bites inward, tip extends back past startDeg into the gap
  const trailTip = polarToXY(cx, cy, midR, startDeg + depth - 10);
  const o1 = polarToXY(cx, cy, outerR, startDeg - overlapDeg);
  const i2 = polarToXY(cx, cy, innerR, startDeg - overlapDeg);

  // Leading edge (end): point extends past endDeg into the gap
  const leadTip = polarToXY(cx, cy, midR, endDeg + overlapDeg);
  const o2 = polarToXY(cx, cy, outerR, endDeg - depth + 10);
  const i1 = polarToXY(cx, cy, innerR, endDeg - depth + 7);

  const large = endDeg - startDeg > 180 ? 1 : 0;

  return [
    `M${o1.x},${o1.y}`,                    // outer trailing edge
    `L${trailTip.x},${trailTip.y}`,        // inward notch tip
    `L${i2.x},${i2.y}`,                    // inner trailing edge
    `A${innerR},${innerR} 0 ${large} 1 ${i1.x},${i1.y}`, // inner arc forward
    `L${leadTip.x},${leadTip.y}`,          // leading point (inward to midR)
    `L${o2.x},${o2.y}`,                    // back to outer arc
    `A${outerR},${outerR} 0 ${large} 0 ${o1.x},${o1.y}`, // outer arc reverse
    "Z",
  ].join(" ");
};

// --- Component ---
export default function LifecycleWheel() {
  const [active, setActive] = useState<Phase | null>(null);

  const handleSegmentClick = (phase: Phase) => {
    console.log('Clicked phase:', phase);
    setActive((prev) => (prev?.id === phase.id ? null : phase));
  };

  return (
    <div className="lc-wrap">
      {/* Wheel */}
      <div className="lc-wheel">
        {/* Title lockup */}
        <div style={{ lineHeight: 1, marginBottom: -10}}>
          <div className="lc-title-small">Healthy Roof</div>
          <div className="lc-title-large">Lifecycle</div>
        </div>
        <svg viewBox="0 0 400 400" width="400" height="400" aria-label="Healthy Roof Lifecycle diagram">
          {phases.map((phase, i) => {
            const startDeg = START_OFFSET + i * (SEG_DEG + GAP_DEG);
            const endDeg = startDeg + SEG_DEG;
            const midDeg = (startDeg + endDeg) / 2;
            const isActive = active?.id === phase.id;
            const outerR = isActive ? OUTER_R + 10 : OUTER_R;
            const labelPos = polarToXY(CX, CY, (outerR + INNER_R) / 2, midDeg);

            return (
              <g
                key={phase.id}
                onClick={() => handleSegmentClick(phase)}
                role="button"
                aria-label={`Phase ${phase.id}: ${phase.name}`}
                aria-pressed={isActive}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSegmentClick(phase)}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <path
                  d={arrowSegmentPath(CX, CY, outerR, INNER_R, startDeg, endDeg)}
                  fill={isActive ? phase.activeColor : phase.color}
                  style={{
                    transition: "all 0.22s ease",
                    opacity: active && !isActive ? 0.4 : 1,
                    filter: isActive
                      ? "drop-shadow(0 3px 10px rgba(27,122,120,0.45))"
                      : "none",
                  }}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize={isActive ? 20 : 18}
                  fontWeight="700"
                  style={{
                    transition: "font-size 0.2s",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {phase.id}
                </text>
              </g>
            );
          })}

          {/* Center logo */}
          <g transform={`translate(${CX}, ${CY})`} aria-hidden="true">
            <circle r={LOGO_R} fill="white" />
            <image
              href="/images/hr-logo-turquoise.png"
              x={-LOGO_R * 0.5}
              y={-LOGO_R * 0.6}
              width={LOGO_R * 1.0}
              height={LOGO_R * 1.0}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </svg>
      </div>

      {/* Detail Panel */}
      <div className="lc-detail">
        {active ? (
          <div className="lc-phase" key={active.id}>
            <span className="lc-phase-label">Phase {active.id}</span>
            <h2 className="lc-phase-name">{active.name}</h2>
            <p className="lc-phase-years">{active.years}</p>
            <ul className="lc-phase-bullets">
              {active.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <p className="lc-phase-tagline">{active.tagline}</p>
          </div>
        ) : (
          <div className="lc-empty">
            <img src="/images/hr-logo-turquoise.png" alt="Healthy Roof" width="64" height="64" style={{ objectFit: "contain" }} />
            <p>Select a phase to explore the Healthy Roof Lifecycle.</p>
          </div>
        )}
      </div>

      <style>{`
        .lc-title-small {
          text-align: center;
          margin-bottom: -15px;
          margin-left: 15px;
          font-size: .85rem;
          font-family: "futura-100", sans-serif;
          font-weight: 500;
          color: #148888;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .lc-title-large {
          font-size: 3rem;
          font-family: "futura-100", sans-serif;
          font-weight: 500;
          color: #148888;
          letter-spacing: -0.02em;
          line-height: 1;
          text-align: center;
        }
        @media (min-width: 640px) {
          .lc-title-small { font-size: 1.15rem; margin-left: 21px; margin-bottom: -19px; }
          .lc-title-large { font-size: 4rem; }
        }
        .lc-wrap {
          display: flex;
          align-items: center;
          gap: 40px;
          font-family: 'Gill Sans', 'Trebuchet MS', Calibri, sans-serif;
          max-width: 820px;
          margin: 0 auto;
          padding: 32px 24px;
        }
        .lc-wheel {
          flex-shrink: 0;
        }
        .lc-detail {
          flex: 1;
          min-width: 400px;
          min-height: 280px;
          display: flex;
          align-items: center;
        }
        .lc-phase {
          animation: lc-slide-in 0.22s ease;
        }
        @keyframes lc-slide-in {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .lc-phase-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #4FAFAB;
          margin-bottom: 6px;
        }
        .lc-phase-name {
          font-size: 28px;
          font-weight: 700;
          color: #1B7A78;
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .lc-phase-years {
          font-size: 14px;
          color: #4FAFAB;
          font-weight: 600;
          margin: 0 0 18px;
        }
        .lc-phase-bullets {
          padding-left: 20px;
          margin: 0 0 18px;
          color: #2d2d2d;
        }
        .lc-phase-bullets li {
          margin-bottom: 7px;
          font-size: 15px;
          line-height: 1.55;
        }
        .lc-phase-tagline {
          font-style: italic;
          font-size: 13px;
          color: #4FAFAB;
          margin: 0;
          border-left: 3px solid #B8DDD9;
          padding-left: 12px;
        }
        .lc-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #148888;
          gap: 16px;
          font-size: 15px;
          width: 100%;
          padding: 24px;
        }
        @media (max-width: 620px) {
          .lc-wrap {
            flex-direction: column;
            gap: 24px;
          }
          .lc-wheel svg {
            width: 300px;
            height: 300px;
          }
          .lc-detail {
            min-width: unset;
            min-height: unset;
          }
        }
      `}</style>
    </div>
  );
}
