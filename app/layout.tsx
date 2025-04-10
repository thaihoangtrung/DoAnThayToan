import localFont from "next/font/local";
import "./globals.css";
import NavBarPage from "@/components/navbar";
import FooterPage from "@/components/footer";
import { cn } from "@/lib/utils";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});




export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={cn(geistSans.variable, geistMono.variable, "mdl-js")}>
      <body className="antialiased">
        <NavBarPage />
        {children}
        <FooterPage />
      </body>
    </html>
  );
}
