import { MainNavbar } from "@/components/homepage/NavBar";
import "../globals.css";
import { Footer } from "@/components/homepage/Footer";

// import { Footer } from "@/components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="py-1 px-4 text-left md:text-center font-medium font-sans tracking-tight text-sm bg-gradient-to-r text-white from-pink-500 via-purple-500 to-indigo-500">Update<span className="px-1 py-1 rounded-sm font-bold">SurfSense</span> - Currently Surfsense work's only by self hosting. Managed versions will be updated after some work.</div>
      <MainNavbar />
      {children}
      <Footer />
    </main>
  );
}
