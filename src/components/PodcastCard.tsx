import { useState } from 'react';
import { Play, Pause, Heart, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PodcastCardProps {
  id: string;
  title: string;
  host: string;
  description: string;
  coverImage: string;
  duration: string;
  category: string;
  publishedAt: string;
  isFavorite?: boolean;
  isPlaying?: boolean;
  onPlay: (id: string) => void;
  onFavorite: (id: string) => void;
  className?: string;
}

export function PodcastCard({
  id,
  title,
  host,
  description,
  coverImage,
  duration,
  category,
  publishedAt,
  isFavorite = false,
  isPlaying = false,
  onPlay,
  onFavorite,
  className
}: PodcastCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className={cn(
      "group relative overflow-hidden bg-gradient-card border-border hover:border-primary/20 transition-all duration-300 hover:shadow-card hover:scale-[1.02]",
      className
    )}>
      <div className="aspect-square relative overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="lg"
            onClick={() => onPlay(id)}
            className="bg-primary/90 hover:bg-primary shadow-glow backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
        </div>

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-accent/90 text-accent-foreground backdrop-blur-sm">
          {category}
        </Badge>

        {/* Duration */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 rounded-md text-xs text-white backdrop-blur-sm">
          <Clock className="h-3 w-3" />
          {duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">
          by {host}
        </p>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {publishedAt}
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onFavorite(id)}
              className={cn(
                "h-8 w-8 p-0 hover:bg-primary/10",
                isFavorite && "text-primary hover:text-primary"
              )}
            >
              <Heart className={cn(
                "h-4 w-4 transition-colors",
                isFavorite && "fill-current"
              )} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-accent/10"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}