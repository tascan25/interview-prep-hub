import { useState, useEffect, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { BlogCard } from '@/components/common/BlogCard';
import { SearchBar } from '@/components/common/SearchBar';
import { FilterPanel } from '@/components/common/FilterPanel';
import { BlogCardSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { blogApi } from '@/services/api';
import { useApp } from '@/context/AppContext';
import type { Blog } from '@/data/mockData';

const availableTags = ['React', 'JavaScript', 'Python', 'CSS', 'System Design', 'Backend', 'Frontend'];

export default function BlogsPage() {
  const { searchQuery, setSearchQuery } = useApp();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const response = await blogApi.getAll(1, 50, {
          search: searchQuery,
          tags: selectedTags.length > 0 ? selectedTags : undefined,
          difficulty: selectedDifficulty || undefined,
        });
        setBlogs(response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [searchQuery, selectedTags, selectedDifficulty]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
    setSelectedDifficulty(null);
    setSearchQuery('');
  };

  const filteredBlogs = useMemo(() => blogs, [blogs]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Interview Questions</h1>
          <p className="text-muted-foreground">
            Browse {blogs.length} curated interview questions from top tech companies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search questions..."
            className="max-w-xl"
          />
          
          <FilterPanel
            selectedTags={selectedTags}
            selectedDifficulty={selectedDifficulty}
            availableTags={availableTags}
            onTagToggle={handleTagToggle}
            onDifficultyChange={setSelectedDifficulty}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <EmptyState type="search" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
