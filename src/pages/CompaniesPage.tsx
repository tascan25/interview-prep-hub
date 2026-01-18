import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CompanyCard } from '@/components/common/CompanyCard';
import { BlogCard } from '@/components/common/BlogCard';
import { CompanyCardSkeleton, BlogCardSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { companyApi, blogApi } from '@/services/api';
import type { Company, Blog } from '@/data/mockData';

export default function CompaniesPage() {
  const { companyName } = useParams<{ companyName: string }>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyBlogs, setCompanyBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (companyName) {
          const company = await companyApi.getByName(companyName);
          setSelectedCompany(company);
          if (company) {
            const blogs = await blogApi.getByCompany(company.name);
            setCompanyBlogs(blogs);
          }
        } else {
          const allCompanies = await companyApi.getAll();
          setCompanies(allCompanies);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [companyName]);

  // Company detail view
  if (companyName) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All companies
          </Link>

          {loading ? (
            <div>
              <CompanyCardSkeleton />
              <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : selectedCompany ? (
            <>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-4xl">
                  {selectedCompany.logo}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{selectedCompany.name}</h1>
                  <p className="text-muted-foreground">
                    {selectedCompany.questionCount} interview questions
                  </p>
                </div>
              </div>

              {companyBlogs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companyBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  type="default"
                  title="No questions yet"
                  description={`We're still adding questions from ${selectedCompany.name}. Check back soon!`}
                />
              )}
            </>
          ) : (
            <EmptyState
              type="default"
              title="Company not found"
              description="The company you're looking for doesn't exist."
            />
          )}
        </div>
      </Layout>
    );
  }

  // Companies list view
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Companies</h1>
          <p className="text-muted-foreground">
            Browse interview questions by company
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
