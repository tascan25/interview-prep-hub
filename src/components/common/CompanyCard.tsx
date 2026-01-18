import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Company } from '@/data/mockData';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      to={`/companies/${company.name.toLowerCase()}`}
      className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all card-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl">
            {company.logo}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {company.questionCount} questions
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {company.categories.slice(0, 4).map(category => (
          <Badge key={category} variant="secondary" className="text-xs">
            {category}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
