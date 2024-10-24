import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { FileSearch, Github, Menu } from 'lucide-react';
import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze' },
    { href: '/reports', label: 'Reports' },
    { href: '/username-search', label: 'Username Search' },
  ];

  return (
    <nav className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-primary flex items-center"
            >
              <FileSearch className="mr-2 h-8 w-8 md:h-10 md:w-10" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-2xl md:text-3xl">
                CrimeSift
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    router.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Link
              href="https://github.com/yourusername/crimesift"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
            >
              <Button
                variant="ghost"
                size="sm"
                className="ml-4 flex items-center"
              >
                <Github className="mr-2 h-5 w-5 text-foreground" />
                GitHub
              </Button>
            </Link>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/sign-in')}
              >
                Sign In
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-4 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  router.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://github.com/yourusername/crimesift"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
