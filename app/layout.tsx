import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'AziAuth - Secure Authentication',
  description: 'A secure authentication system with Clerk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50">
          <Header />
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
