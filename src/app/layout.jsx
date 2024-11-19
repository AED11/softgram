'use client'
import { useEffect, useState } from 'react'
import './globals.css' // for global styles, including dark mode styles
import BottomNavigation from '@/components/layout/bottom-navigation/bottom-navigation'
import MiniSideBar from '@/components/layout/mini-side-bar/mini-side-bar'
import SideBar from '@/components/layout/side-bar/side-bar'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
	useEffect(() => {
		const prefersDarkMode = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches

		if (prefersDarkMode) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}

		// Listen for color scheme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleColorSchemeChange = e => {
			if (e.matches) {
				document.body.classList.add('dark')
			} else {
				document.body.classList.remove('dark')
			}
		}

		mediaQuery.addEventListener('change', handleColorSchemeChange)
		return () => {
			mediaQuery.removeEventListener('change', handleColorSchemeChange)
		}
	}, [])
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const pathname = usePathname()

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const getBarType = () => {
		if (windowWidth <= 767) {
			return 'bottom'
		}
		if (
			windowWidth <= 1279 ||
			pathname === '/search' ||
			pathname.includes('chat')
		) {
			return 'minibar'
		}
		return 'bar'
	}
	const barType = getBarType()
	const renderBar = children => {
		switch (barType) {
			case 'bottom':
				return <BottomNavigation />
			case 'minibar':
				return <MiniSideBar />
			case 'bar':
			default:
				return <SideBar>{children}</SideBar>
		}
	}

	return (
		<html lang='en'>
			<body className='h-full'>{renderBar(children)}</body>
		</html>
	)
}
