import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ReportsProvider } from '@/contexts/ReportsContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pageVariants = {
    initial: { opacity: 0, y: '100%' },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: '-100%' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <ClerkProvider 
      {...pageProps}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: 'hsl(221.2 83.2% 53.3%)',
          colorTextOnPrimaryBackground: 'white',
        },
        elements: {
          card: 'shadow-none bg-background',
          headerTitle: 'hidden',
          headerSubtitle: 'hidden',
          socialButtonsBlockButton: 'border-2 border-muted-foreground text-foreground hover:bg-muted transition-colors',
          formFieldLabel: 'text-foreground font-medium',
          formFieldInput: 'bg-muted border-2 border-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-shadow',
          footerActionLink: 'text-primary hover:text-primary/90 transition-colors',
        },
      }}
    >
      <ReportsProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          value={{ light: 'light', dark: 'dark', dim: 'dim' }}
        >
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <main className="container mx-auto px-4 py-8">
                <Component {...pageProps} />
              </main>
            </motion.div>
          </AnimatePresence>
        </ThemeProvider>
      </ReportsProvider>
    </ClerkProvider>
  );
}

export default MyApp;