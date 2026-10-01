import { createClient } from "next-sanity";

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans scroll-smooth">
      {/* Sticky Header - Reader Only */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              X
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Xorse
            </span>
          </div>

          <nav className="flex items-center space-x-6 md:space-x-8 font-medium text-slate-600 text-sm">
            <a href="#about" className="hover:text-black transition-colors">
              About
            </a>
            <a href="#categories" className="hover:text-black transition-colors">
              Pillars
            </a>
            <a href="#writings" className="hover:text-black transition-colors">
              Writings
            </a>
            <a href="#contact" className="hover:text-black transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
          Knowledge for your next step
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Opportunities. Life lessons. Guidance for young leaders.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Welcome to a space created for young people who want to learn, grow,
          discover opportunities, and navigate life with knowledge and confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#writings"
            className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
          >
            Explore Writings
          </a>
          <a
            href="#contact"
            className="bg-white border border-slate-300 text-slate-700 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-sm"
          >
            Share an Opportunity
          </a>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 space-y-24 pb-20">
        {/* Categories / Pillars */}
        <section id="categories" className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">
              What You'll Find Here
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Explore resources, articles, and opportunities curated across key pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="text-3xl">{cat.icon}</div>
                <h3 className="text-xl font-bold text-slate-900">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About Xorse */}
        <section
          id="about"
          className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-white flex items-center justify-center font-bold text-3xl flex-shrink-0 shadow-lg">
              X
            </div>
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900">
                  Hi, I'm Xorse
                </h2>
                <p className="text-lg font-medium text-slate-600">
                  Learning, growing, and creating impact—one piece of information at a time.
                </p>
              </div>

              <p>
                I'm a young girl who believes that young people have so much potential, but sometimes we simply need access to the right information, opportunities, and guidance to help us move forward.
              </p>

              <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Why I Started This Platform
                </h3>
                <p className="text-sm">
                  Growing up and trying to figure out life comes with many questions: What career should I pursue? How do I handle difficult situations? How do I make money or find scholarships?
                </p>
                <p className="text-sm">
                  I don't have all the answers, but I created this platform as a place where we can explore possibilities, share experiences, and grow together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Published Writings Feed */}
        <section id="writings" className="space-y-8">
          <div className="flex justify-between items-end border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Published Writings
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Articles and updates published directly from Sanity Studio.
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
              <p className="text-slate-600 font-semibold text-lg">
                No articles published yet.
              </p>
              <p className="text-sm text-slate-400">
                Check back soon for new articles and opportunities!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg uppercase">
                        {post.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-slate-900">
                      {post.title}
                    </h3>
                    {post.publishedAt && (
                      <p className="text-xs text-slate-400 font-medium">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    {post.excerpt && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Contact & Opportunity Submissions */}
        <section
          id="contact"
          className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 space-y-8 shadow-xl"
        >
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-extrabold">Contact Xorse</h2>
            <p className="text-slate-400 max-w-xl">
              Have a question, suggestion, or a legitimate opportunity to share with young people? Reach out using the details below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4 bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-lg font-bold text-amber-400">Direct Contact</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:essahfaith80@gmail.com" className="underline hover:text-white">
                    essahfaith80@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Phone / WhatsApp:</strong> 0537137885
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-lg font-bold text-amber-400">
                Want to Share an Opportunity?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When sending over a scholarship, internship, or job opportunity, please include: Name of Opportunity, Who can apply, Location, Requirements, Deadline, and Application link.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Xorse. All rights reserved.</p>
      </footer>
    </div>
  );
}