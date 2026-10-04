import { createClient } from "next-sanity";
import Link from "next/link";

export const dynamic = "force-dynamic";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "czkqk57k",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  category?: string;
}

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch Sanity posts:", error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  const categories = [
    {
      title: "Opportunities",
      desc: "Scholarships, jobs, internships, online opportunities, and learning programs.",
      icon: "🎓",
    },
    {
      title: "Career & Skills",
      desc: "Career paths, digital skills, freelancing, AI, and tools for the future.",
      icon: "🚀",
    },
    {
      title: "Money & Online Income",
      desc: "Earning online, digital products, freelancing, and starting small businesses.",
      icon: "💡",
    },
    {
      title: "Life & Personal Growth",
      desc: "Personal lessons, handling challenges, and navigating life with confidence.",
      icon: "🌱",
    },
    {
      title: "Education & Learning",
      desc: "Courses, educational resources, and continuous self-development.",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans scroll-smooth">
      {/* Sticky Header */}
     <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/40">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
    {/* Logo Container */}
    <Link href="/" className="flex items-center space-x-3 shrink-0">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-900/50">
        X
      </div>
      <span className="text-2xl font-black tracking-tight text-white">
        Xorse
      </span>
    </Link>

    {/* Navigation Links - Hidden on mobile, flex on desktop */}
    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
      <Link href="#about" className="hover:text-purple-300 transition-colors">
        About
      </Link>
      <Link href="#pillars" className="hover:text-purple-300 transition-colors">
        Pillars
      </Link>
      <Link href="#writings" className="hover:text-purple-300 transition-colors">
        Writings
      </Link>
      <Link href="#contact" className="hover:text-purple-300 transition-colors">
        Contact
      </Link>
    </nav>

    {/* Mobile Quick Action Button */}
    <Link
      href="#writings"
      className="md:hidden text-xs font-bold bg-purple-950 border border-purple-800/60 text-purple-300 px-3.5 py-1.5 rounded-xl hover:bg-purple-900 transition-colors"
    >
      Read Articles
    </Link>
  </div>
</header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <span className="inline-block px-4 py-1.5 bg-purple-950/80 border border-purple-700/50 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
          Knowledge for your next step
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Opportunities. Life lessons. Guidance for young leaders.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Welcome to a space created for young people who want to learn, grow,
          discover opportunities, and navigate life with knowledge and confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#writings"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50"
          >
            Explore Writings
          </a>
          <a
            href="#contact"
            className="bg-slate-900 border border-purple-800/60 text-purple-200 px-6 py-3.5 rounded-xl font-bold hover:bg-purple-950/50 transition-all shadow-sm"
          >
            Share an Opportunity
          </a>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 space-y-24 pb-20">
        {/* Categories / Pillars */}
        <section id="categories" className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white">
              What You'll Find Here
            </h2>
            <p className="text-purple-300/70 max-w-lg mx-auto">
              Explore resources, articles, and opportunities curated across key pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 p-6 rounded-2xl border border-purple-900/40 hover:border-purple-600/60 shadow-lg transition-all space-y-3"
              >
                <div className="text-3xl">{cat.icon}</div>
                <h3 className="text-xl font-bold text-white">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About Xorse */}
        <section
          id="about"
          className="bg-gradient-to-br from-purple-950/40 to-slate-950 rounded-3xl border border-purple-900/50 p-8 md:p-12 shadow-xl space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold text-3xl flex-shrink-0 shadow-lg shadow-purple-900/60">
              X
            </div>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white">
                  Hi, I'm Xorse
                </h2>
                <p className="text-lg font-medium text-purple-300">
                  Learning, growing, and creating impact—one piece of information at a time.
                </p>
              </div>

              <p>
                I'm a young girl who believes that young people have so much potential, but sometimes we simply need access to the right information, opportunities, and guidance to help us move forward.
              </p>

              <div className="space-y-3 bg-black/60 p-6 rounded-2xl border border-purple-900/40">
                <h3 className="text-lg font-bold text-white">
                  Why I Started This Platform
                </h3>
                <p className="text-sm text-slate-300">
                  Growing up and trying to figure out life comes with many questions: What career should I pursue? How do I handle difficult situations? How do I make money or find scholarships?
                </p>
                <p className="text-sm text-slate-300">
                  I don't have all the answers, but I created this platform as a place where we can explore possibilities, share experiences, and grow together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Published Writings Feed */}
        <section id="writings" className="space-y-8">
          <div className="flex justify-between items-end border-b border-purple-900/40 pb-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white">
                Published Writings
              </h2>
              <p className="text-purple-300/70 text-sm mt-1">
                Articles and updates published directly from Sanity Studio.
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-slate-950/60 rounded-3xl border border-dashed border-purple-900/50 space-y-3">
              <p className="text-purple-200 font-semibold text-lg">
                No articles published yet.
              </p>
              <p className="text-sm text-purple-300/60">
                Check back soon for new articles and opportunities!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="block group"
                >
                  <article className="bg-slate-950/80 p-6 rounded-2xl border border-purple-900/40 group-hover:border-purple-500 transition-all flex flex-col justify-between space-y-4 shadow-lg h-full">
                    <div className="space-y-2">
                      {post.category && (
                        <span className="inline-block px-3 py-1 bg-purple-950 border border-purple-700/50 text-purple-300 text-xs font-bold rounded-lg uppercase">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </h3>
                      {post.publishedAt && (
                        <p className="text-xs text-purple-400/80 font-medium">
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}
                      {post.excerpt && (
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Contact & Opportunity Submissions */}
        <section
          id="contact"
          className="bg-gradient-to-br from-purple-950 to-black text-white rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl border border-purple-800/50"
        >
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white">Contact Xorse</h2>
            <p className="text-purple-200/80 max-w-xl">
              Have a question, suggestion, or a legitimate opportunity to share with young people? Reach out using the details below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4 bg-black/50 p-6 rounded-2xl border border-purple-800/40">
              <h3 className="text-lg font-bold text-purple-400">Direct Contact</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:essahfaith80@gmail.com" className="underline hover:text-purple-400 transition-colors">
                    essahfaith80@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Phone / WhatsApp:</strong> 0537137885
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-black/50 p-6 rounded-2xl border border-purple-800/40">
              <h3 className="text-lg font-bold text-purple-400">
                Want to Share an Opportunity?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When sending over a scholarship, internship, or job opportunity, please include: Name of Opportunity, Who can apply, Location, Requirements, Deadline, and Application link.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-900/40 bg-black py-8 text-center text-xs text-purple-300/60 space-y-2">
  <p>© {new Date().getFullYear()} Xorse. All rights reserved.</p>
  <div>
    <Link href="/privacy" className="hover:text-purple-300 underline transition-colors">
      Privacy Policy
    </Link>
  </div>
</footer>
    </div>
  );
}