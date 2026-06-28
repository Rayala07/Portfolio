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
  // Uses the brand logo from /public
  return (
    <img
      src="/nextjs-logo.png"
      alt="Next.js"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
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
  // Uses the brand logo from /public
  return (
    <img
      src="/expressjs-logo.png"
      alt="Express.js"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
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
  // Uses the brand logo from /public
  return (
    <img
      src="/postman-logo.png"
      alt="Postman"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
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
  // Uses the brand logo from /public
  return (
    <img
      src="/postgresql-logo.png"
      alt="PostgreSQL"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

export function MysqlLogo({ size = 64 }) {
  // Uses the brand logo from /public
  return (
    <img
      src="/mysql-logo.png"
      alt="MySQL"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

export function RedisLogo({ size = 64 }) {
  // Uses the brand logo from /public
  return (
    <img
      src="/redis-logo.png"
      alt="Redis"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

export function PineconeLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <text x="40" y="44" textAnchor="middle"
        fill="rgba(245,243,240,0.82)"
        fontSize="13" fontWeight="600"
        fontFamily="'Space Grotesk', Arial, sans-serif"
        letterSpacing="0.3">Pinecone</text>
    </svg>
  );
}

// ─────────────────────────────── CLOUD & DEVOPS ──────────────────────────────

export function DockerLogo({ size = 64 }) {
  // Uses the brand logo from /public
  return (
    <img
      src="/docker-logo.png"
      alt="Docker"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

export function AwsLogo({ size = 64 }) {
  // Uses the brand logo from /public
  return (
    <img
      src="/aws-logo.png"
      alt="AWS"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
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
