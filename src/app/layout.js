import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ServicesAI - Australian Government AI Assistant',
  description: 'National AI Assistant for Australian Public Services - Centrelink, Medicare, and Child Support',
  keywords: 'AI, Assistant, Australia, Government, Services, Centrelink, Medicare, Child Support',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
