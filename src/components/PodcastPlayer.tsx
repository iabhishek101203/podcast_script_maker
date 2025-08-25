import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface PodcastPlayerProps {
  currentPodcast?: {
    id: string;
    title: string;
    host: string;
    coverImage: string;
    audioUrl: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onFavorite: (id: string) => void;
  isFavorite?: boolean;
  className?: string;
}

export function PodcastPlayer({
  currentPodcast,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onFavorite,
  isFavorite = false,
  className
}: PodcastPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentPodcast]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  if (!currentPodcast) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-player-background border-t border-player-border shadow-player backdrop-blur-lg z-50",
      className
    )}>
      <audio
        ref={audioRef}
        src={currentPodcast.audioUrl}
        onPlay={() => {}}
        onPause={() => {}}
      />

      <div className="container mx-auto px-4 py-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Podcast Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={currentPodcast.coverImage}
              alt={currentPodcast.title}
              className="h-12 w-12 rounded-md object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-sm text-foreground truncate">
                {currentPodcast.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {currentPodcast.host}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onFavorite(currentPodcast.id)}
              className={cn(
                "h-8 w-8 p-0 hover:bg-primary/10 flex-shrink-0",
                isFavorite && "text-primary"
              )}
            >
              <Heart className={cn(
                "h-4 w-4",
                isFavorite && "fill-current"
              )} />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 mx-6">
            <Button
              size="sm"
              variant="ghost"
              onClick={onPrevious}
              className="h-10 w-10 p-0 hover:bg-muted"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              size="lg"
              onClick={onPlayPause}
              className="h-12 w-12 p-0 bg-primary hover:bg-primary/90 shadow-glow"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={onNext}
              className="h-10 w-10 p-0 hover:bg-muted"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="h-8 w-8 p-0 hover:bg-muted flex-shrink-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}