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
}

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top Navigation & Brand Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center flex-shrink-0 justify-center font-bold text-lg shadow">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Modern Writer
            </span>
          </div>

          <Link
            href="/studio"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            Studio Login
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* About Me Section */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200 to-rose-300 flex items-center justify-center flex-shrink-0 shadow-inner">
            <span className="text-3xl">✍️</span>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to my creative space! I share essays, personal reflections, and detailed writings on life, culture, and food. Explore my latest published work below.
            </p>
          </div>
        </section>

        {/* Recent Writings Feed */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-bold text-gray-900">Published Writings</h3>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No published articles found yet.</p>
              <p className="text-sm text-gray-400 mt-2">
                Log into{" "}
                <Link href="/studio" className="underline text-black font-semibold">
                  Sanity Studio
                </Link>{" "}
                to publish your first writing piece!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h4>
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400 font-medium mb-3">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}