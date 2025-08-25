import { Headphones, Mic, BookOpen, Music, Briefcase, Heart, Brain, Trophy, Zap, Scale, Clock, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoriesProps {
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

const categories = [
  { name: 'Technology', icon: Zap, color: 'from-blue-500 to-cyan-500', count: '2.3k' },
  { name: 'Comedy', icon: Mic, color: 'from-yellow-500 to-orange-500', count: '1.8k' },
  { name: 'Education', icon: BookOpen, color: 'from-green-500 to-emerald-500', count: '1.5k' },
  { name: 'Music', icon: Music, color: 'from-purple-500 to-pink-500', count: '987' },
  { name: 'Business', icon: Briefcase, color: 'from-gray-600 to-gray-800', count: '1.2k' },
  { name: 'Health', icon: Heart, color: 'from-red-500 to-rose-500', count: '856' },
  { name: 'Science', icon: Brain, color: 'from-indigo-500 to-blue-500', count: '743' },
  { name: 'Sports', icon: Trophy, color: 'from-green-600 to-lime-500', count: '634' },
  { name: 'Politics', icon: Scale, color: 'from-slate-600 to-gray-700', count: '542' },
  { name: 'History', icon: Clock, color: 'from-amber-600 to-orange-600', count: '423' },
  { name: 'Arts', icon: Palette, color: 'from-violet-500 to-purple-600', count: '387' },
  { name: 'All Podcasts', icon: Headphones, color: 'from-primary to-accent', count: '12k+' },
];

export function Categories({ selectedCategory, onCategorySelect, className }: CategoriesProps) {
  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Explore Categories
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <Card
              key={category.name}
              className={cn(
                "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card",
                "bg-gradient-card border-border",
                isSelected && "ring-2 ring-primary shadow-glow"
              )}
              onClick={() => onCategorySelect(category.name)}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                category.color
              )} />
              
              <div className="relative p-4 text-center">
                <div className="flex justify-center mb-3">
                  <div className={cn(
                    "p-3 rounded-full bg-gradient-to-br transition-transform group-hover:scale-110",
                    category.color
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {category.count} podcasts
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}