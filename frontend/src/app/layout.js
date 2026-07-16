import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Rayala Viswanath | Fullstack AI Engineer",
  description: "Portfolio of Rayala Viswanath, a Fullstack AI Engineer building scalable AI integrate web systems and platforms. Open to full-time opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts to eliminate render-blocking latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/*
          beforeInteractive guarantees this runs before React hydration and before
          the browser can fire its automatic scroll-restoration on reload.
          A raw <script> tag or useLayoutEffect both arrive too late —
          the browser restores scroll during HTML parsing before JS bundles download.
        */}
        <Script id="disable-scroll-restore" strategy="beforeInteractive">
          {`history.scrollRestoration = 'manual';`}
        </Script>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
