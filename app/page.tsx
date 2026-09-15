import Link from 'next/link'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface Post {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  excerpt?: string
}

export default async function HomePage() {
  const posts: Post[] = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      excerpt
    }`
  )

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Modern Writer Blog
        </h1>
        <p className="text-gray-600 mt-2">
          Latest posts and updates published via Sanity CMS.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-500">
          No posts found. Log in to{' '}
          <Link href="/studio" className="text-blue-600 underline">
            /studio
          </Link>{' '}
          to publish your first post!
        </p>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              {post.publishedAt && (
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(post.publishedAt).toLocaleDateString()}
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
  )
}