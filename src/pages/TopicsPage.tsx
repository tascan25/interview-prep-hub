import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { TopicCard } from '@/components/common/TopicCard';
import { BlogCard } from '@/components/common/BlogCard';
import { BlogCardSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { topicApi, blogApi } from '@/services/api';
import type { Topic, Blog } from '@/data/mockData';

export default function TopicsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topicBlogs, setTopicBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (topicSlug) {
          const topic = await topicApi.getBySlug(topicSlug);
          setSelectedTopic(topic);
          if (topic) {
            const blogs = await blogApi.getByCategory(topic.name);
            setTopicBlogs(blogs);
          }
        } else {
          const allTopics = await topicApi.getAll();
          setTopics(allTopics);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [topicSlug]);

  // Topic detail view
  if (topicSlug) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All topics
          </Link>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : selectedTopic ? (
            <>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-4xl">
                  {selectedTopic.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{selectedTopic.name}</h1>
                  <p className="text-muted-foreground">
                    {selectedTopic.description}
                  </p>
                </div>
              </div>

              {topicBlogs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topicBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  type="default"
                  title="No questions yet"
                  description={`We're still adding ${selectedTopic.name} questions. Check back soon!`}
                />
              )}
            </>
          ) : (
            <EmptyState
              type="default"
              title="Topic not found"
              description="The topic you're looking for doesn't exist."
            />
          )}
        </div>
      </Layout>
    );
  }

  // Topics list view
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Topics</h1>
          <p className="text-muted-foreground">
            Browse interview questions by technology and skill area
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border animate-pulse">
                <div className="h-12 w-12 bg-secondary rounded-lg mb-4" />
                <div className="h-6 bg-secondary rounded mb-2" />
                <div className="h-4 bg-secondary rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
