import type { Metadata } from "next";
import {
  Inter,
  Lato,
  Montserrat,
  Nunito_Sans,
  Poppins,
} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading-0",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-body-0",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const poppins = Poppins({
  variable: "--font-heading-1",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body-1",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-heading-2",
  subsets: ["latin"],
});

const nunitoBody = Nunito_Sans({
  variable: "--font-body-2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curriculum Maker",
  description:
    "Crea currículums ATS-friendly con plantillas profesionales y exportación impecable a PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${lato.variable} ${poppins.variable} ${inter.variable} ${nunito.variable} ${nunitoBody.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
