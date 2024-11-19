import useDarkSide from '@/hook/useDarkSide'
import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

export default function Switcher() {
	const [colorTheme, setTheme] = useDarkSide()
	const [darkSide, setDarkSide] = useState(
		colorTheme === 'light' ? true : false
	)

	const toggleDarkMode = checked => {
		setTheme(colorTheme)
		setDarkSide(checked)
	}

	return (
		<>
			<div>
				<DarkModeSwitch
					// color='dark'
					moonColor='white'
					sunColor='dark'
					checked={darkSide}
					onChange={toggleDarkMode}
					size={20}
				/>
			</div>
		</>
	)
}
