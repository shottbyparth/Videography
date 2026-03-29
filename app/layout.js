import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const dmSans = DM_Sans({ weight: ['300','400','500'], subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Shottbyparth | Videographer & Creative Director',
  description: 'Portfolio of Shottbyparth — Videographer & Creative Director',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable}`}>
      <body className="bg-[#050505] text-white font-body antialiased">
        <div className="grain" aria-hidden="true" />
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
