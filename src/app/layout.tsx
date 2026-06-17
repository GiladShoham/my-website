import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FALLBACK_SITE_URL = 'https://gilad-website.netlify.app';

// Validate NEXT_PUBLIC_SITE_URL so a malformed value (e.g. missing protocol)
// can't throw from `new URL()` and break the build/SSR.
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (!fromEnv) return FALLBACK_SITE_URL;
  try {
    return new URL(fromEnv).toString();
  } catch {
    console.warn(
      `Invalid NEXT_PUBLIC_SITE_URL "${fromEnv}"; falling back to ${FALLBACK_SITE_URL}`
    );
    return FALLBACK_SITE_URL;
  }
}

const siteUrl = resolveSiteUrl();

// Social share image. Forced to a 1200x630 JPEG (not f_auto) because social
// scrapers don't reliably render WebP/AVIF; smart-cropped to the subject.
const ogImage = {
  url: 'https://res.cloudinary.com/dzc7cp7jh/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_jpg/v1772482350/Gilad-Shoham_Session-402_1141_qrgyij.jpg',
  width: 1200,
  height: 630,
  alt: 'Gilad Shoham',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gilad Shoham - Dev Leader, Angel Investor, Speaker',
    template: '%s | Gilad Shoham',
  },
  description:
    'Personal website of Gilad Shoham - Open Source advocate, angel investor, public speaker, and smart home expert.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Gilad Shoham - Dev Leader, Angel Investor, Speaker',
    description:
      'Personal website of Gilad Shoham - Open Source advocate, angel investor, public speaker, and smart home expert.',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gilad Shoham - Dev Leader, Angel Investor, Speaker',
    description:
      'Personal website of Gilad Shoham - Open Source advocate, angel investor, public speaker, and smart home expert.',
    images: [ogImage],
  },
};

// Runs before paint to apply the saved theme and avoid a flash of the wrong theme.
const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EYCW4KN85N"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EYCW4KN85N');
          `}
        </Script>
      </body>
    </html>
  );
}
