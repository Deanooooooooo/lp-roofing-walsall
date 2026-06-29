import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deanooooooooo.github.io/lp-roofing-walsall"),
  title: "L.P Roofing | Roofing Contractor in Walsall",
  description:
    "Walsall roofing contractor for new roofs, re-roofs, dry systems and roof maintenance enquiries.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "L.P Roofing | Roofing Contractor in Walsall",
    description:
      "New roofs, re-roofs, dry systems and roof maintenance enquiries around Walsall.",
    url: "https://deanooooooooo.github.io/lp-roofing-walsall/",
    images: ["/assets/hero-roof-atmosphere.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "L.P Roofing | Roofing Contractor in Walsall",
    description:
      "Walsall roofing contractor for new roofs, re-roofs, dry systems and maintenance.",
    images: ["/assets/hero-roof-atmosphere.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
