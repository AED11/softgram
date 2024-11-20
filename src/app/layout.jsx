'use client';

import { useEffect, useState } from 'react';
import './globals.css'; // для глобальных стилей, включая стили темной темы
import BottomNavigation from '@/components/layout/bottom-navigation/bottom-navigation';
import MiniSideBar from '@/components/layout/mini-side-bar/mini-side-bar';
import SideBar from '@/components/layout/side-bar/side-bar';
import { usePathname } from 'next/navigation';
import TranslatorProvider from '@/components/providers/translator-provider'
import ThemeWrapper from '@/components/providers/theme-provider'

export default function RootLayout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const pathname = usePathname();

  // Логика для выбора типа боковой панели в зависимости от ширины окна
  const getBarType = () => {
    if (windowWidth <= 767) {
      return 'bottom';
    }
    if (windowWidth <= 1279 || pathname === '/search' || pathname.includes('chat')) {
      return 'minibar';
    }
    return 'bar';
  };

  const barType = getBarType();
  const renderBar = (children) => {
    switch (barType) {
      case 'bottom':
        return <BottomNavigation>{children}</BottomNavigation>;
      case 'minibar':
        return <MiniSideBar>{children}</MiniSideBar>;
      case 'bar':
      default:
        return <SideBar>{children}</SideBar>;
    }
  };

  // Слушаем изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <TranslatorProvider>
      <html lang="en">
        {/* Ensure there is no space or text node here */}
        <body className="h-full">
						<ThemeWrapper>
						{renderBar(children)}

						</ThemeWrapper>
        </body>
      </html>
    </TranslatorProvider>
  );
}
