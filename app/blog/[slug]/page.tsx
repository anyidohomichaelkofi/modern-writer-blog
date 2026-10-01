import { createClient } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

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
  body?: any;
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
    const post = await client.fetch(query, { slug });
    return post || null;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans">
      {/* Navigation Header */}
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
            href="/#writings"
            className="text-sm font-medium text-purple-300 hover:text-purple-100 transition-colors"
          >
            ← Back to Articles
          </Link>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-4">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-purple-950 border border-purple-700/50 text-purple-300 text-xs font-bold rounded-lg uppercase">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-sm text-purple-400/80 font-medium">
              Published on{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </header>

        {post.excerpt && (
          <p className="text-lg text-slate-300 italic border-l-4 border-purple-600 pl-4 py-1">
            {post.excerpt}
          </p>
        )}

        <hr className="border-purple-900/40" />

        {/* Article Body */}
        <article className="prose prose-invert prose-purple max-w-none text-slate-200 leading-relaxed space-y-4">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-slate-400">No content available for this post.</p>
          )}
        </article>
      </main>
    </div>
  );
}