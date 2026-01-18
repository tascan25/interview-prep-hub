import { useState, useEffect } from 'react';
import { Bookmark, History, User, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { BlogCard } from '@/components/common/BlogCard';
import { EmptyState } from '@/components/common/EmptyState';
import { BlogCardSkeleton } from '@/components/common/Skeleton';
import { useApp } from '@/context/AppContext';
import { blogApi } from '@/services/api';
import type { Blog } from '@/data/mockData';

export default function DashboardPage() {
  const { user, bookmarks, readingHistory } = useApp();
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Blog[]>([]);
  const [historyBlogs, setHistoryBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const bookmarkedPromises = bookmarks.map(id => blogApi.getById(id));
        const historyPromises = readingHistory.slice(0, 10).map(id => blogApi.getById(id));
        
        const [bookmarkedResults, historyResults] = await Promise.all([
          Promise.all(bookmarkedPromises),
          Promise.all(historyPromises)
        ]);
        
        setBookmarkedBlogs(bookmarkedResults.filter((b): b is Blog => b !== null));
        setHistoryBlogs(historyResults.filter((b): b is Blog => b !== null));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [bookmarks, readingHistory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 p-6 rounded-xl bg-card border border-border">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-16 w-16 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <div className="hidden sm:flex gap-4 text-center">
            <div className="px-4">
              <p className="text-2xl font-bold text-primary">{bookmarks.length}</p>
              <p className="text-sm text-muted-foreground">Saved</p>
            </div>
            <div className="px-4 border-l border-border">
              <p className="text-2xl font-bold">{readingHistory.length}</p>
              <p className="text-sm text-muted-foreground">Read</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookmarks">
          <TabsList className="mb-8">
            <TabsTrigger value="bookmarks" className="gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
              <span className="sm:hidden">({bookmarks.length})</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : bookmarkedBlogs.length === 0 ? (
              <EmptyState type="bookmarks" />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : historyBlogs.length === 0 ? (
              <EmptyState type="history" />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {historyBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-xl">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Profile Settings</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="mt-1 text-foreground">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="mt-1 text-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Profile editing will be available when authentication is enabled.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
