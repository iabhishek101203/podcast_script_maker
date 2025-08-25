import { useState } from 'react';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}

export function Header({ onMenuToggle, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg",
      className
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden h-9 w-9 p-0"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <div className="h-4 w-4 bg-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Pulse Listen
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" className="font-medium hover:text-primary">
            Home
          </Button>
          <Button variant="ghost" className="font-medium hover:text-primary">
            Discover
          </Button>
          <Button variant="ghost" className="font-medium hover:text-primary">
            Library
          </Button>
          <Button variant="ghost" className="font-medium hover:text-primary">
            Favorites
          </Button>
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Upgrade to Pro
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Button variant="ghost" className="justify-start font-medium">
              Home
            </Button>
            <Button variant="ghost" className="justify-start font-medium">
              Discover
            </Button>
            <Button variant="ghost" className="justify-start font-medium">
              Library
            </Button>
            <Button variant="ghost" className="justify-start font-medium">
              Favorites
            </Button>
            <Button variant="outline" className="justify-start mt-2">
              Upgrade to Pro
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}