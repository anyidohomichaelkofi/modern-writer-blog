import "./globals.css"; // <--- CRITICAL: This line loads Tailwind CSS!
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Xorse | Knowledge for your next step",
  description: "Opportunities, life lessons, and guidance for young leaders.",
  verification: {
    google: "<meta name="YCb5IwQKIBYy1LIT_ZxAwA4KxfQlxyix7W43KELOZk4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-slate-100 font-sans antialiased selection:bg-purple-900 selection:text-white">
        {/* Global Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-purple-900/50 p-1">
                <Image
                  src="/xorse-quill-logo.png"
                  alt="Xorse Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Xorse
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-purple-200/80">
              <Link href="/#about" className="hover:text-purple-400 transition-colors">
                About
              </Link>
              <Link href="/#categories" className="hover:text-purple-400 transition-colors">
                Pillars
              </Link>
              <Link href="/#writings" className="hover:text-purple-400 transition-colors">
                Writings
              </Link>
              <Link href="/#contact" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </nav>

            <Link
              href="/#writings"
              className="md:hidden text-xs font-bold bg-purple-950 border border-purple-800/60 text-purple-300 px-3.5 py-1.5 rounded-xl hover:bg-purple-900 transition-colors"
            >
              Read Articles
            </Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}