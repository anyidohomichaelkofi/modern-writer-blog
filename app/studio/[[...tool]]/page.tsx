"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "czkqk57k",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  category?: string;
  body?: any;
}

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(12);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Kwame A.",
      text: "This was such an insightful read! Looking forward to more posts.",
      date: "Oct 2, 2026",
    },
  ]);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function fetchPost() {
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
        const data = await client.fetch(query, { slug: resolvedParams.slug });
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [resolvedParams.slug]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: authorName.trim() || "Anonymous Reader",
      text: commentText.trim(),
      date: "Just now",
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setAuthorName("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <Link href="/" className="text-purple-400 underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-purple-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-purple-900/40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-purple-900/50 p-1 group-hover:scale-105 transition-transform">
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
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-bold bg-purple-950/60 border border-purple-800/60 text-purple-300 px-4 py-2 rounded-xl hover:bg-purple-900/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Articles</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-4">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-purple-950 border border-purple-700/50 text-purple-300 text-xs font-bold rounded-lg uppercase tracking-wider">
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
          <p className="text-lg text-slate-300 italic border-l-4 border-purple-600 pl-4 py-1 bg-purple-950/20 rounded-r-lg">
            {post.excerpt}
          </p>
        )}

        <hr className="border-purple-900/40" />

        {/* Article Body */}
        <article className="prose prose-invert prose-purple max-w-none text-slate-200 leading-relaxed text-base md:text-lg space-y-6">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-slate-400">No content available for this post.</p>
          )}
        </article>

        {/* Action Bar (Likes & Share) */}
        <div className="flex items-center justify-between border-y border-purple-900/40 py-4 my-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl border font-bold text-sm transition-all ${
                hasLiked
                  ? "bg-rose-950/80 border-rose-600 text-rose-400"
                  : "bg-purple-950/40 border-purple-800/40 text-purple-300 hover:bg-purple-900/60"
              }`}
            >
              <svg
                className={`w-5 h-5 ${hasLiked ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-currentColor"}`}
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
            </button>

            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{comments.length} Comments</span>
            </div>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center space-x-2 text-xs font-semibold text-purple-300 hover:text-purple-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share Link</span>
          </button>
        </div>

        {/* Discussion / Comments */}
        <section className="space-y-8 pt-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Discussion ({comments.length})</span>
          </h2>

          <form onSubmit={handleAddComment} className="bg-slate-950 p-6 rounded-2xl border border-purple-900/40 space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Leave a comment</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-black/60 border border-purple-900/60 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <textarea
                rows={3}
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-black/60 border border-purple-900/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Post Comment</span>
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-slate-950/60 border border-purple-900/20 rounded-2xl p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-purple-900/80 flex items-center justify-center text-purple-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm text-slate-200">
                      {comment.author}
                    </span>
                  </div>
                  <span className="text-xs text-purple-400/60">
                    {comment.date}
                  </span>
                </div>
                <p className="text-sm text-slate-300 pl-9">{comment.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}