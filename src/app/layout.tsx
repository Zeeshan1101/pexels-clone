import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const appURL = new URL(
    process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL as string}`
        : `http://localhost:3000`,
);

export const metadata: Metadata = {
    metadataBase: appURL,
    title: "Pexels Clone",
    description: "Simple Image Search App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
