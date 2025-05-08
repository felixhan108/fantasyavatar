import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import ExpBar from '@/components/Interface/ExpBar';
import BottomMenu from '@/components/modules/BottomMenu';
import Inventory from '@/components/template/Inventory';
import Chat from '@/components/template/chat';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FantasyAvatar',
  description: 'World of Fantasy Avatar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] w-full max-w-[375px] mx-auto">
          <ExpBar />
          <h1 className="mt-5 text-4xl font-bold">FantasyAvatar</h1>
          <main className="w-full flex flex-col row-start-2 items-center sm:items-start">
            {children}
          </main>
          <footer className="fixed bottom-0 w-full flex gap-[10px] flex-wrap items-center justify-center flex-col bg-white dark:bg-black">
            <a
              className="flex items-center gap-4 hover:underline hover:underline-offset-4"
              href="https://felixhan108.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
              Go to Developer Blog →
            </a>
            <BottomMenu />
            <Chat />
            <Inventory />
          </footer>
        </div>
      </body>
    </html>
  );
}
