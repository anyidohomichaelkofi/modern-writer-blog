import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Xorse",
  description: "Privacy Policy for Xorse website and platform.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 4, 2026";

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-purple-900/40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-900/50">
              X
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Xorse
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-bold bg-purple-950 border border-purple-800/60 text-purple-300 px-4 py-2 rounded-xl hover:bg-purple-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-2 border-b border-purple-900/40 pb-6">
          <h1 className="text-3xl md:text-4xl font-black text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-purple-400">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to <strong>Xorse</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting any personal information you share with us while accessing our platform, articles, and services. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>
              We collect minimal information to ensure a smooth reader experience:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Personal Information You Provide:</strong> If you reach out to us via email or WhatsApp to share opportunities or inquiries, we may collect your name, email address, phone number, and message contents.
              </li>
              <li>
                <strong className="text-slate-200">Automatically Collected Technical Data:</strong> Like most websites, our hosting platform (Vercel) automatically collects basic technical browser logs, including IP address, device type, operating system, and pages visited for security and stability purposes.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <p>We use collected data solely to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
              <li>Provide, maintain, and improve our blog content and website features.</li>
              <li>Respond to direct messages, inquiries, or submitted opportunities.</li>
              <li>Monitor platform security and prevent abuse or unauthorized access.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">4. Cookies and Analytics</h2>
            <p>
              We may use essential cookies and web analytics tools (such as Google Search Console) to understand overall website traffic, search queries, and content engagement. These tools help us optimize site performance without tracking individual personally identifiable activity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">5. Third-Party Services</h2>
            <p>
              Our website is built using Next.js, hosted on Vercel, and manages content via Sanity Studio. These third-party services process data strictly according to their respective security and privacy standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">6. Data Protection & Rights</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. You have the right to request access to or deletion of any personal communications sent to us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-white">7. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or your data, please contact us:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 text-sm space-y-1">
              <p><strong className="text-white">Email:</strong> essahfaith80@gmail.com</p>
              <p><strong className="text-white">Phone / WhatsApp:</strong> +233 53 713 7885</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-900/40 bg-black py-8 text-center text-xs text-purple-300/60">
        <p>© {new Date().getFullYear()} Xorse. All rights reserved.</p>
      </footer>
    </div>
  );
}