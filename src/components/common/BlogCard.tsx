import { Link } from 'react-router-dom';
import { Clock, Eye, Bookmark, BookmarkCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import type { Blog } from '@/data/mockData';

interface BlogCardProps {
  blog: Blog;
  variant?: 'default' | 'compact' | 'featured';
}

const difficultyColors = {
  easy: 'bg-difficulty-easy/10 text-difficulty-easy border-difficulty-easy/20',
  medium: 'bg-difficulty-medium/10 text-difficulty-medium border-difficulty-medium/20',
  hard: 'bg-difficulty-hard/10 text-difficulty-hard border-difficulty-hard/20',
};

export function BlogCard({ blog, variant = 'default' }: BlogCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useApp();
  const bookmarked = isBookmarked(blog.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(blog.id);
    } else {
      addBookmark(blog.id);
    }
  };

  if (variant === 'compact') {
    return (
      <Link
        to={`/blog/${blog.slug}`}
        className="group block p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all card-hover"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {blog.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {blog.readTime} min
              </span>
              <Badge variant="outline" className={difficultyColors[blog.difficulty]}>
                {blog.difficulty}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-primary"
            onClick={handleBookmark}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        to={`/blog/${blog.slug}`}
        className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all card-hover relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={difficultyColors[blog.difficulty]}>
              {blog.difficulty}
            </Badge>
            {blog.company && (
              <Badge variant="secondary">{blog.company}</Badge>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {blog.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {blog.readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {blog.views.toLocaleString()}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
              onClick={handleBookmark}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group block p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all card-hover"
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className={difficultyColors[blog.difficulty]}>
          {blog.difficulty}
        </Badge>
        {blog.company && (
          <Badge variant="secondary">{blog.company}</Badge>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
        {blog.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {blog.excerpt}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.slice(0, 3).map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{blog.author.name}</p>
            <p className="text-xs text-muted-foreground">{blog.author.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {blog.readTime}m
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {blog.views.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
