import { ReactNode } from 'react';
import { FileQuestion, Search, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  type?: 'search' | 'bookmarks' | 'history' | 'default';
  title?: string;
  description?: string;
  action?: ReactNode;
}

const emptyStates = {
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  bookmarks: {
    icon: Bookmark,
    title: 'No bookmarks yet',
    description: 'Start saving interview questions to access them quickly later.',
  },
  history: {
    icon: FileQuestion,
    title: 'No reading history',
    description: 'Questions you read will appear here for easy reference.',
  },
  default: {
    icon: FileQuestion,
    title: 'Nothing here',
    description: 'There\'s nothing to display at the moment.',
  },
};

export function EmptyState({ type = 'default', title, description, action }: EmptyStateProps) {
  const state = emptyStates[type];
  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title || state.title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description || state.description}</p>
      {action || (
        type !== 'default' && (
          <Link to="/blogs">
            <Button>Explore Questions</Button>
          </Link>
        )
      )}
    </div>
  );
}
