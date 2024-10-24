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
    <ClerkProvider {...pageProps}>
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
