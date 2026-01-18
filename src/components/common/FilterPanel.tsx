import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FilterPanelProps {
  selectedTags: string[];
  selectedDifficulty: string | null;
  availableTags: string[];
  onTagToggle: (tag: string) => void;
  onDifficultyChange: (difficulty: string | null) => void;
  onClearAll: () => void;
}

const difficulties = ['easy', 'medium', 'hard'];

export function FilterPanel({
  selectedTags,
  selectedDifficulty,
  availableTags,
  onTagToggle,
  onDifficultyChange,
  onClearAll,
}: FilterPanelProps) {
  const hasFilters = selectedTags.length > 0 || selectedDifficulty;

  return (
    <div className="space-y-4">
      {/* Difficulty */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Difficulty</h4>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <Badge
              key={diff}
              variant={selectedDifficulty === diff ? 'default' : 'outline'}
              className={`cursor-pointer capitalize transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
              onClick={() => onDifficultyChange(selectedDifficulty === diff ? null : diff)}
            >
              {diff}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Topics</h4>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className={`cursor-pointer transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
