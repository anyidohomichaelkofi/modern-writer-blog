import Image from "next/image";
import Link from "next/link";
// ... keep your existing imports and font setups ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-slate-100 font-sans">
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
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}