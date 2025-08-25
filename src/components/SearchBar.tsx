import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  className?: string;
}

const categories = [
  'Technology', 'Comedy', 'Education', 'Music', 'Business', 'Health',
  'Science', 'Sports', 'Politics', 'True Crime', 'History', 'Arts'
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  className
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    onSearchChange('');
  };

  const clearFilters = () => {
    selectedCategories.forEach(category => {
      onCategoryToggle(category);
    });
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search podcasts, episodes, or hosts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-10 pr-20 h-12 bg-muted/50 border-border focus:bg-card focus:border-primary/50 transition-all duration-200",
            isFocused && "shadow-glow"
          )}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {searchQuery && (
            <Button
              size="sm"
              variant="ghost"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "h-8 w-8 p-0 hover:bg-primary/10",
                  selectedCategories.length > 0 && "text-primary"
                )}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                Categories
                {selectedCategories.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearFilters}
                    className="h-6 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                  >
                    Clear
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                  className={cn(
                    "cursor-pointer",
                    selectedCategories.includes(category) && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  {category}
                  {selectedCategories.includes(category) && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="gap-1 hover:bg-primary/10 cursor-pointer"
              onClick={() => onCategoryToggle(category)}
            >
              {category}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}