import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';

const platforms = [
  { name: 'WhatsApp', url: 'https://web.whatsapp.com/' },
  { name: 'Discord', url: 'https://discord.com/' },
  { name: 'Instagram', url: 'https://www.instagram.com/' },
];

export default function UsernameSearchPage() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, boolean>>(
    {}
  );

  const handleSearch = () => {
    // Mock search function - replace with actual API call
    const mockResults = Object.fromEntries(
      platforms.map((platform) => [platform.name, Math.random() > 0.5])
    );
    setSearchResults(mockResults);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold">Username Search</h1>

      <Card>
        <CardHeader>
          <CardTitle>Search for a username across platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username to search"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="w-full md:w-auto animate-pulse-slow"
          >
            Search
          </Button>
        </CardContent>
      </Card>

      {Object.keys(searchResults).length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {platforms.map((platform, index) => (
                <li
                  key={platform.name}
                  className="flex items-center space-x-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={`/${platform.name.toLowerCase()}-logo-color.svg`}
                    alt={`${platform.name} logo`}
                    width={32}
                    height={32}
                    className="animate-bounce-slow"
                  />
                  <div className="flex-grow">
                    <span className="font-semibold">{platform.name}</span>
                    {searchResults[platform.name] ? (
                      <div className="flex items-center space-x-2 text-green-500">
                        <CheckCircle2 className="w-5 h-5 animate-pulse-slow" />
                        <span>Found</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-red-500">
                        <XCircle className="w-5 h-5 animate-pulse-slow" />
                        <span>Not found</span>
                      </div>
                    )}
                  </div>
                  {searchResults[platform.name] && (
                    <a
                      href={`${platform.url}${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline animate-pulse-slow"
                    >
                      View Profile
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
