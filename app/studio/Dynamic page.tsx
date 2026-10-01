import { createClient } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  body?: any[];
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    body
  }`;

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

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

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-purple-950 border border-purple-700/50 text-purple-300 text-xs font-bold rounded-lg uppercase">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-sm text-purple-400 font-medium">
              Published on{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {post.excerpt && (
          <p className="text-lg text-slate-300 italic border-l-2 border-purple-600 pl-4 py-1">
            {post.excerpt}
          </p>
        )}

        <hr className="border-purple-900/40" />

        <div className="prose prose-invert prose-purple max-w-none text-slate-300 leading-relaxed space-y-4">
          {/* Display main text or content fallback */}
          {post.body && Array.isArray(post.body) ? (
            post.body.map((block: any, idx: number) => {
              if (block._type === "block" && block.children) {
                return (
                  <p key={idx} className="text-base md:text-lg">
                    {block.children.map((c: any) => c.text).join("")}
                  </p>
                );
              }
              return null;
            })
          ) : (
            <p className="text-slate-400">Content coming soon...</p>
          )}
        </div>
      </main>
    </div>
  );
}