import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crypto Ödeme Sistemi',
  description: 'Güvenli ve hızlı crypto ödemeleri için',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
