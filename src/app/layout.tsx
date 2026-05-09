import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/ui/CookieConsent'

export const metadata: Metadata = {
  title: 'eufyMake - Make it Real | UV Printing Starts Here',
  description: 'The World\'s First Personal 3D-Texture UV Printer. Create stunning designs on metal, wood, glass, and more with Amass3D™ Technology.',
  keywords: ['UV printer', '3D printer', 'personal printer', 'creative tools', 'eufyMake'],
  openGraph: {
    title: 'eufyMake - Make it Real',
    description: 'The World\'s First Personal 3D-Texture UV Printer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
