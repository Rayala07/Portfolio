import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
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
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
