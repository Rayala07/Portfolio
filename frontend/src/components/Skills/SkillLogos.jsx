'use client';

// ── All logos are pure inline SVG — zero react-icons dependency ──────────────
// Each component accepts a `size` prop (default 64). ViewBox varies per brand.

// ─────────────────────────────── LANGUAGES ───────────────────────────────────

export function JavaScriptLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect width="80" height="80" fill="#F7DF1E" />
      {/* Official JS logo: bold "JS" in dark charcoal, bottom-left aligned */}
      <text
        x="10" y="70"
        fill="#323330"
        fontSize="50"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, Helvetica, sans-serif"
        letterSpacing="-2"
      >JS</text>
    </svg>
  );
}

export function TypeScriptLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect width="80" height="80" fill="#3178C6" />
      <text
        x="10" y="70"
        fill="#ffffff"
        fontSize="50"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, Helvetica, sans-serif"
        letterSpacing="-2"
      >TS</text>
    </svg>
  );
}

export function Html5Logo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Shield shape — outer (left half, darker) */}
      <polygon points="8,4 72,4 66,70 40,78 14,70" fill="#E44D26" />
      {/* Right half: slightly brighter for depth */}
      <polygon points="40,10 66,10 61,65 40,72" fill="#EF652A" />
      {/* "HTML" label at top */}
      <text x="40" y="22" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.5">HTML</text>
      {/* Large "5" numeral — the key identifier */}
      <text x="40" y="62" textAnchor="middle" fill="white" fontSize="40" fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif">5</text>
    </svg>
  );
}

export function CssLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <polygon points="8,4 72,4 66,70 40,78 14,70" fill="#1572B6" />
      <polygon points="40,10 66,10 61,65 40,72" fill="#33AADD" />
      <text x="40" y="22" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.5">CSS</text>
      <text x="40" y="62" textAnchor="middle" fill="white" fontSize="40" fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif">3</text>
    </svg>
  );
}

export function SqlLogo({ size = 64 }) {
  // Uses the brand logo from /public
  return (
    <img
      src="/sql-language-logo.png"
      alt="SQL"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

export function JavaLogo({ size = 64 }) {
  // Uses the brand logo from /public
  return (
    <img
      src="/java-language-logo.png"
      alt="Java"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

// ─────────────────────────────── FULL STACK ──────────────────────────────────

export function ReactLogo({ size = 64 }) {
  // The canonical React atom: 3 elliptical orbits rotated 0°, 60°, 120°
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="4.8" fill="#61DAFB" />
      <ellipse cx="40" cy="40" rx="36" ry="13"
        fill="none" stroke="#61DAFB" strokeWidth="2.5" />
      <ellipse cx="40" cy="40" rx="36" ry="13"
        fill="none" stroke="#61DAFB" strokeWidth="2.5"
        transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="40" rx="36" ry="13"
        fill="none" stroke="#61DAFB" strokeWidth="2.5"
        transform="rotate(120 40 40)" />
    </svg>
  );
}

export function NextjsLogo({ size = 64 }) {
  // Next.js "N" mark: the bold N with a gradient fade from white to transparent (the actual brand mark)
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect width="80" height="80" fill="#000" rx="6" />
      <defs>
        <linearGradient id="njs-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text
        x="10" y="65"
        fill="url(#njs-g)"
        fontSize="64"
        fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif"
      >N</text>
    </svg>
  );
}

export function TailwindLogo({ size = 64 }) {
  // Tailwind CSS: two wave shapes in brand cyan
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Upper wave */}
      <path
        d="M10 30 C18 14 30 14 40 22 C50 30 62 30 70 14
           L70 26 C62 42 50 42 40 34 C30 26 18 26 10 42 Z"
        fill="#06B6D4"
      />
      {/* Lower wave — offset by 20px down, mirrors the upper */}
      <path
        d="M10 50 C18 34 30 34 40 42 C50 50 62 50 70 34
           L70 46 C62 62 50 62 40 54 C30 46 18 46 10 62 Z"
        fill="#06B6D4"
        opacity="0.7"
      />
    </svg>
  );
}

export function NodejsLogo({ size = 64 }) {
  // Node.js: green hexagon with "node" text inside
  const CX = 40, CY = 40, R = 33;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${CX + R * Math.cos(a)},${CY + R * Math.sin(a)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <polygon points={pts} fill="#3C873A" />
      <text x="40" y="38" textAnchor="middle" fill="white"
        fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">Node</text>
      <text x="40" y="52" textAnchor="middle" fill="white"
        fontSize="11" fontWeight="400" fontFamily="Arial, sans-serif" opacity="0.8">.js</text>
    </svg>
  );
}

export function ExpressLogo({ size = 64 }) {
  // Express.js: minimal white wordmark on transparent (card provides bg)
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <text x="40" y="44" textAnchor="middle"
        fill="rgba(245,243,240,0.88)"
        fontSize="15" fontWeight="600"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="-0.3">express</text>
    </svg>
  );
}

export function RestApiLogo({ size = 64 }) {
  // Custom: purple bracket notation with "API" text
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* { */}
      <path d="M30 16 Q24 16 22 22 L22 34 Q22 40 16 40 Q22 40 22 46 L22 58 Q24 64 30 64"
        stroke="#A89BF2" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* } */}
      <path d="M50 16 Q56 16 58 22 L58 34 Q58 40 64 40 Q58 40 58 46 L58 58 Q56 64 50 64"
        stroke="#A89BF2" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <text x="40" y="44" textAnchor="middle" fill="#A89BF2"
        fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">API</text>
    </svg>
  );
}

export function GithubLogo({ size = 64 }) {
  // Official GitHub Invertocat path (96x96 source viewBox)
  return (
    <svg width={size} height={size} viewBox="0 0 98 96" aria-hidden="true">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69
           2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127
           -13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17
           -4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052
           4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6
           -10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2
           -.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052
           a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63
           9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038
           3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283
           1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526
           0 1.304.89 2.853 3.316 2.364C82.707 89.39 97.707 70.973 97.707 49.217
           97.707 22 75.788 0 48.854 0z"
        fill="white"
      />
    </svg>
  );
}

export function PostmanLogo({ size = 64 }) {
  // Postman: orange background with the send/arrow mark in white
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect width="80" height="80" fill="#FF6C37" rx="6" />
      {/* Postman "P" mark: a circle + stem + diagonal */}
      <circle cx="40" cy="32" r="16" fill="none" stroke="white" strokeWidth="5" />
      <line x1="40" y1="48" x2="40" y2="65" stroke="white" strokeWidth="5" strokeLinecap="round" />
      {/* The distinctive diagonal slash through the circle */}
      <line x1="28" y1="20" x2="52" y2="44" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────── DATABASES ───────────────────────────────────

export function MongodbLogo({ size = 64 }) {
  // MongoDB: the iconic green leaf/teardrop
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Main leaf body */}
      <path
        d="M40 6 C40 6 18 32 18 50 C18 64 28 74 40 76 C52 74 62 64 62 50 C62 32 40 6 40 6 Z"
        fill="#47A248"
      />
      {/* Highlight: right side slightly lighter */}
      <path
        d="M40 14 C40 14 54 36 54 50 C54 62 48 70 40 74"
        fill="#6CC04A" opacity="0.45"
      />
      {/* Central spine line */}
      <line x1="40" y1="54" x2="40" y2="76"
        stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function PostgresqlLogo({ size = 64 }) {
  // PostgreSQL: simplified but recognizable elephant head
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Main head */}
      <ellipse cx="44" cy="36" rx="22" ry="24" fill="#336791" />
      {/* Left ear */}
      <ellipse cx="24" cy="28" rx="10" ry="13" fill="#336791" />
      <ellipse cx="25" cy="28" rx="6.5" ry="9" fill="#1a4a72" opacity="0.5" />
      {/* Trunk — curls down then slightly right */}
      <path d="M22 40 Q10 52 12 66 Q14 72 20 70 Q19 62 22 56"
        stroke="#336791" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* White eye */}
      <circle cx="40" cy="28" r="4.5" fill="white" />
      <circle cx="41" cy="28" r="2.2" fill="#0d2137" />
      {/* Tusk */}
      <path d="M30 54 Q26 64 34 66"
        stroke="#F5F3F0" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function MysqlLogo({ size = 64 }) {
  // MySQL: the distinctive dolphin in blue
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Body */}
      <path d="M8 50 Q8 30 28 22 Q48 14 62 26 Q72 34 68 50
               Q64 60 50 62 Q28 66 8 50 Z" fill="#00618A" />
      {/* Dorsal fin */}
      <path d="M44 22 Q52 8 60 16 Q54 20 48 24" fill="#00618A" />
      {/* Tail */}
      <path d="M8 50 Q2 46 2 38 Q6 32 12 42" fill="#00618A" />
      {/* Tail flukes */}
      <path d="M2 38 Q-2 30 4 28 Q8 34 12 42" fill="#F29111" opacity="0.8" />
      {/* Rostrum */}
      <path d="M62 36 Q76 34 78 40 Q74 46 62 44" fill="#00618A" />
      {/* Eye */}
      <circle cx="54" cy="30" r="3.5" fill="white" />
      <circle cx="55" cy="30" r="1.8" fill="#0d2137" />
    </svg>
  );
}

export function RedisLogo({ size = 64 }) {
  // Redis: the distinctive stacked colored prisms (simplified isometric cubes)
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Bottom stack (darker) */}
      <polygon points="40,60 64,48 40,36 16,48" fill="#A41E11" />
      <polygon points="16,48 40,36 40,60" fill="#7A1209" />
      <polygon points="64,48 40,36 40,60" fill="#912018" />
      {/* Middle stack */}
      <polygon points="40,44 64,32 40,20 16,32" fill="#D82C20" />
      <polygon points="16,32 40,20 40,44" fill="#A41E11" />
      <polygon points="64,32 40,20 40,44" fill="#C42B1C" />
      {/* Top face */}
      <polygon points="16,32 40,20 64,32 40,44" fill="#FF4438" opacity="0.1" />
      <polygon points="16,16 40,4 64,16 40,28" fill="#FF4438" />
      <polygon points="16,16 40,4 40,28" fill="#D82C20" />
      <polygon points="64,16 40,4 40,28" fill="#C42B1C" />
    </svg>
  );
}

export function PineconeLogo({ size = 64 }) {
  // Pinecone: stylized pine tree / triangle mark
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Canopy layers */}
      <polygon points="40,6 56,28 48,28 62,46 52,46 60,62 20,62 28,46 18,46 32,28 24,28" fill="#00D4AA" />
      {/* Trunk */}
      <rect x="36" y="62" width="8" height="10" rx="2" fill="#00D4AA" opacity="0.6" />
    </svg>
  );
}

// ─────────────────────────────── CLOUD & DEVOPS ──────────────────────────────

export function DockerLogo({ size = 64 }) {
  // Docker: Moby the whale with stacked container boxes on its back
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* Whale body */}
      <path
        d="M8 54 Q8 40 22 36 Q36 32 52 36 Q64 38 67 48
           Q72 48 75 51 Q77 54 74 57 Q70 60 66 58
           Q63 60 58 60 L22 60 Q14 60 8 54 Z"
        fill="#2496ED"
      />
      {/* Tail */}
      <path d="M8 54 Q4 50 3 44 Q7 42 12 50" fill="#2496ED" />
      {/* Water spout */}
      <path d="M18 36 Q15 22 20 14 Q23 8 26 12 Q20 18 24 36"
        fill="#2496ED" opacity="0.7" />
      {/* Containers — 5 white boxes on the back */}
      <rect x="22" y="24" width="12" height="10" rx="2" fill="white" opacity="0.92" />
      <rect x="36" y="24" width="12" height="10" rx="2" fill="white" opacity="0.92" />
      <rect x="50" y="24" width="12" height="10" rx="2" fill="white" opacity="0.92" />
      <rect x="22" y="13" width="12" height="10" rx="2" fill="white" opacity="0.92" />
      <rect x="36" y="13" width="12" height="10" rx="2" fill="white" opacity="0.92" />
    </svg>
  );
}

export function AwsLogo({ size = 64 }) {
  // AWS: the iconic "amazon web services" orange wordmark + smile arc
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      {/* "AWS" bold text */}
      <text x="40" y="44" textAnchor="middle"
        fill="#FF9900" fontSize="28" fontWeight="900"
        fontFamily="'Arial Black', Arial, sans-serif">AWS</text>
      {/* Orange smile arc (the Amazon arrow/smile) */}
      <path d="M16 56 Q40 72 64 56"
        stroke="#FF9900" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* Arrow tip on the right of the smile */}
      <path d="M60 56 L64 56 L62 52"
        stroke="#FF9900" strokeWidth="3.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ──────────────────────────── LOGO LOOKUP MAP ────────────────────────────────

export const LOGO_MAP = {
  javascript:  JavaScriptLogo,
  typescript:  TypeScriptLogo,
  html:        Html5Logo,
  css:         CssLogo,
  sql:         SqlLogo,
  java:        JavaLogo,
  react:       ReactLogo,
  nextjs:      NextjsLogo,
  tailwind:    TailwindLogo,
  nodejs:      NodejsLogo,
  expressjs:   ExpressLogo,
  restapis:    RestApiLogo,
  github:      GithubLogo,
  postman:     PostmanLogo,
  mongodb:     MongodbLogo,
  postgresql:  PostgresqlLogo,
  mysql:       MysqlLogo,
  redis:       RedisLogo,
  pinecone:    PineconeLogo,
  docker:      DockerLogo,
  aws:         AwsLogo,
};
