import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SurfSense - Personal AI Assistant for World Wide Web Surfers.",
	description:
		"Save anything you see or browse on the Internet and save it to ask AI about it.",
	openGraph: {
		images: [
			{
				url: "https://surfsense.net/og-image.png",
				width: 1200,
				height: 630,
				alt: "SurfSense - A Knowledge Graph Brain for World Wide Web Surfers.",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "https://surfsense.net",
		creator: "https://surfsense.net",
		title: "SurfSense - Personal AI Assistant for World Wide Web Surfers.",
		description:
			"Save anything you see or browse on the Internet and save it to ask AI about it.",
		images: [
			{
				url: "https://surfsense.net/og-image.png",
				width: 1200,
				height: 630,
				alt: "SurfSense - Personal AI Assistant for World Wide Web Surfers.",
			},
		],
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={cn(
            inter.className,
            "bg-white dark:bg-black antialiased h-full w-full"
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme="light"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  );
}
