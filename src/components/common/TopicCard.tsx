import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Topic } from '@/data/mockData';

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      to={`/topics/${topic.slug}`}
      className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all card-hover"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl">
          {topic.icon}
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      
      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
        {topic.name}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {topic.description}
      </p>
      
      <p className="text-sm text-primary font-medium">
        {topic.questionCount} questions
      </p>
    </Link>
  );
}
