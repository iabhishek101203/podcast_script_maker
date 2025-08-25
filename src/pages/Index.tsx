import { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { Categories } from '@/components/Categories';
import { PodcastCard } from '@/components/PodcastCard';
import { PodcastPlayer } from '@/components/PodcastPlayer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import podcast cover images
import techPulseImage from '@/assets/podcast-tech-pulse.jpg';
import laughTrackImage from '@/assets/podcast-laugh-track.jpg';
import mindExpandImage from '@/assets/podcast-mind-expand.jpg';
import beatsVibesImage from '@/assets/podcast-beats-vibes.jpg';

// Mock data
const mockPodcasts = [
  {
    id: '1',
    title: 'The Future of AI Development',
    host: 'Tech Pulse Network',
    description: 'Exploring the latest trends in artificial intelligence and machine learning with industry experts.',
    coverImage: techPulseImage,
    duration: '45:20',
    category: 'Technology',
    publishedAt: '2 days ago',
    audioUrl: '/mock-audio.mp3'
  },
  {
    id: '2',
    title: 'Comedy Gold: Stand-Up Stories',
    host: 'Laugh Track Studios',
    description: 'Behind-the-scenes stories from your favorite comedians and their journey to success.',
    coverImage: laughTrackImage,
    duration: '32:15',
    category: 'Comedy',
    publishedAt: '1 day ago',
    audioUrl: '/mock-audio.mp3'
  },
  {
    id: '3',
    title: 'Learning Psychology Fundamentals',
    host: 'Mind Expand Academy',
    description: 'Deep dive into cognitive psychology and how our minds process information and learn.',
    coverImage: mindExpandImage,
    duration: '52:30',
    category: 'Education',
    publishedAt: '3 days ago',
    audioUrl: '/mock-audio.mp3'
  },
  {
    id: '4',
    title: 'Electronic Music Evolution',
    host: 'Beats & Vibes',
    description: 'The history and evolution of electronic music from the 80s to modern day.',
    coverImage: beatsVibesImage,
    duration: '38:45',
    category: 'Music',
    publishedAt: '5 days ago',
    audioUrl: '/mock-audio.mp3'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPodcast, setCurrentPodcast] = useState<typeof mockPodcasts[0] | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePlay = (id: string) => {
    const podcast = mockPodcasts.find(p => p.id === id);
    if (podcast) {
      setCurrentPodcast(podcast);
      setIsPlaying(!isPlaying || currentPodcast?.id !== id);
      toast({
        title: isPlaying && currentPodcast?.id === id ? 'Paused' : 'Now Playing',
        description: `${podcast.title} by ${podcast.host}`,
      });
    }
  };

  const handleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
    
    const podcast = mockPodcasts.find(p => p.id === id);
    toast({
      title: favorites.includes(id) ? 'Removed from Favorites' : 'Added to Favorites',
      description: podcast?.title,
    });
  };

  const filteredPodcasts = mockPodcasts.filter(podcast => {
    const matchesSearch = searchQuery === '' || 
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(podcast.category);
    
    const matchesSelectedCategory = selectedCategory === '' || 
      selectedCategory === 'All Podcasts' || 
      podcast.category === selectedCategory;

    return matchesSearch && matchesCategory && matchesSelectedCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12 mb-12">
          <div className="relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending Now
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                Discover Amazing
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {' '}Podcasts
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Explore thousands of podcasts across all genres. From comedy to education, 
                find your next favorite show and never miss an episode.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-glow">
                  Start Listening
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  Browse Categories
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-md">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary mb-1">
                <Users className="h-5 w-5" />
                12K+
              </div>
              <p className="text-sm text-muted-foreground">Podcasts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-accent mb-1">
                <Star className="h-5 w-5" />
                4.9
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary mb-1">
                <Clock className="h-5 w-5" />
                50M+
              </div>
              <p className="text-sm text-muted-foreground">Hours</p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-12">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
          />
        </section>

        {/* Categories */}
        <section className="mb-12">
          <Categories
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </section>

        {/* Podcast Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory && selectedCategory !== 'All Podcasts' 
                ? `${selectedCategory} Podcasts` 
                : 'Featured Podcasts'}
            </h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPodcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                {...podcast}
                isFavorite={favorites.includes(podcast.id)}
                isPlaying={currentPodcast?.id === podcast.id && isPlaying}
                onPlay={handlePlay}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
          
          {filteredPodcasts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No podcasts found matching your criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                  setSelectedCategory('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Sticky Podcast Player */}
      <PodcastPlayer
        currentPodcast={currentPodcast}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => {
          const currentIndex = mockPodcasts.findIndex(p => p.id === currentPodcast?.id);
          const nextPodcast = mockPodcasts[(currentIndex + 1) % mockPodcasts.length];
          setCurrentPodcast(nextPodcast);
        }}
        onPrevious={() => {
          const currentIndex = mockPodcasts.findIndex(p => p.id === currentPodcast?.id);
          const prevPodcast = mockPodcasts[(currentIndex - 1 + mockPodcasts.length) % mockPodcasts.length];
          setCurrentPodcast(prevPodcast);
        }}
        onFavorite={handleFavorite}
        isFavorite={currentPodcast ? favorites.includes(currentPodcast.id) : false}
      />
    </div>
  );
};

export default Index;