import { SignUp } from '@clerk/nextjs';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { FileSearch } from 'lucide-react';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Card className="w-full max-w-md shadow-2xl border border-primary/20 overflow-hidden">
        <div className="bg-primary p-6 flex flex-col items-center">
          <FileSearch className="text-primary-foreground w-16 h-16 mb-2" />
          <h1 className="text-3xl font-bold text-primary-foreground">
            CrimeSift
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            Create your account
          </p>
        </div>
        <CardContent className="p-6 bg-white">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors',
                card: 'bg-white shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'border-2 border-muted-foreground text-foreground hover:bg-muted transition-colors',
                formFieldLabel: 'text-foreground font-medium',
                formFieldInput:
                  'bg-muted border-2 border-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-shadow',
                footerActionLink:
                  'text-primary hover:text-primary/90 transition-colors',
                dividerLine: 'bg-muted-foreground',
                dividerText: 'text-muted-foreground',
              },
            }}
            redirectUrl="/"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
