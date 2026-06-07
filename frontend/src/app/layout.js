import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";

export const metadata = {
  title: "Rayala Viswanath | Fullstack AI Engineer",
  description: "Portfolio of Rayala Viswanath, a Fullstack AI Engineer building scalable AI integrate web systems and platforms. Open to full-time opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
