import { createClient } from "next-sanity";
import Link from "next/link";

// Force Next.js to render this page dynamically to prevent build-time prerender errors
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
    <main className="max-w-4xl mx-auto px-4 py-12 font-sans">
      <header className="mb-12 border-b pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            My Sanity Blog
          </h1>
          <p className="text-gray-600 mt-2">
            Published posts from Sanity Studio.
          </p>
        </div>
        <Link 
          href="/studio"
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Go to Studio
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No published posts found yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Log into <Link href="/studio" className="underline text-black">Sanity Studio</Link> to create and publish your first article!
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => (
            <article 
              key={post._id} 
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              {post.publishedAt && (
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              {post.excerpt && (
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}