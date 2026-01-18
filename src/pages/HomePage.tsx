import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { BlogCard } from '@/components/common/BlogCard';
import { TopicCard } from '@/components/common/TopicCard';
import { blogApi, topicApi } from '@/services/api';
import { BlogCardSkeleton } from '@/components/common/Skeleton';
import type { Blog, Topic } from '@/data/mockData';

const stats = [
  { icon: Code2, value: '500+', label: 'Interview Questions' },
  { icon: Users, value: '50K+', label: 'Developers' },
  { icon: Zap, value: '25+', label: 'Companies' },
  { icon: TrendingUp, value: '95%', label: 'Success Rate' },
];

export default function HomePage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogs, topicsData] = await Promise.all([
          blogApi.getFeatured(),
          topicApi.getAll()
        ]);
        setFeaturedBlogs(blogs);
        setTopics(topicsData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              🚀 Updated with 2024 interview questions
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Real Interview Questions.{' '}
              <span className="gradient-text">Real Preparation.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master technical interviews with curated questions from top tech companies. 
              Understand what interviewers expect and how to answer at every experience level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blogs">
                <Button size="lg" className="w-full sm:w-auto group">
                  Explore Questions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/companies">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse by Company
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Questions</h2>
              <p className="text-muted-foreground">Most popular interview questions this week</p>
            </div>
            <Link to="/blogs">
              <Button variant="ghost" className="hidden sm:flex">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </>
            ) : (
              featuredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} variant="featured" />
              ))
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/blogs">
              <Button variant="outline">
                View all questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 md:py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse by Topic</h2>
            <p className="text-muted-foreground">Find questions organized by technology and skill area</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.slice(0, 6).map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-border p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to ace your next interview?
              </h2>
              <p className="text-muted-foreground mb-6">
                Start practicing with real interview questions from top tech companies. 
                Save your progress and track which topics you've mastered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/blogs">
                  <Button size="lg">
                    Start Practicing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
