import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Bookmark, BookmarkCheck, Share2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { TableOfContents } from '@/components/common/TableOfContents';
import { BlogCard } from '@/components/common/BlogCard';
import { Skeleton } from '@/components/common/Skeleton';
import { blogApi } from '@/services/api';
import { useApp } from '@/context/AppContext';
import type { Blog } from '@/data/mockData';

const difficultyColors = {
  easy: 'bg-difficulty-easy/10 text-difficulty-easy border-difficulty-easy/20',
  medium: 'bg-difficulty-medium/10 text-difficulty-medium border-difficulty-medium/20',
  hard: 'bg-difficulty-hard/10 text-difficulty-hard border-difficulty-hard/20',
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isBookmarked, addBookmark, removeBookmark, addToHistory } = useApp();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      try {
        const blogData = await blogApi.getBySlug(slug);
        setBlog(blogData);
        
        if (blogData) {
          addToHistory(blogData.id);
          const related = await blogApi.getRelated(blogData.id);
          setRelatedBlogs(related);
        }
      } finally {
        setIsInitialLoad(false);
      }
    }
    fetchBlog();
  }, [slug, addToHistory]);

  const bookmarked = blog ? isBookmarked(blog.id) : false;

  const handleBookmark = () => {
    if (!blog) return;
    if (bookmarked) {
      removeBookmark(blog.id);
    } else {
      addBookmark(blog.id);
    }
  };

  const handleShare = async () => {
    if (!blog) return;
    try {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isInitialLoad && !blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-3/4 mb-8" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Question not found</h1>
          <p className="text-muted-foreground mb-8">The question you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>Browse Questions</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to questions
        </Link>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main content */}
          <div>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="outline" className={difficultyColors[blog.difficulty]}>
                  {blog.difficulty}
                </Badge>
                {blog.company && (
                  <Badge variant="secondary">{blog.company}</Badge>
                )}
                {blog.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {blog.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">{blog.author.name}</p>
                    <p className="text-xs">{blog.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {blog.views.toLocaleString()} views
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant={bookmarked ? 'default' : 'outline'}
                  onClick={handleBookmark}
                >
                  {bookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Content */}
            <div className="border-t border-border pt-8">
              <MarkdownRenderer content={blog.content} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents content={blog.content} />
          </aside>
        </div>

        {/* Related blogs */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">Related Questions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map(related => (
                <BlogCard key={related.id} blog={related} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
