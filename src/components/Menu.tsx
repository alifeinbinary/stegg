/*
 *   Copyright (c) 2024 Andrew Halliwell

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useTranslation } from 'react-i18next';
import { Navbar, Dropdown, DarkThemeToggle } from "flowbite-react"
import { customNavbarTheme, customLngDropdownTheme, customToggleTheme } from '../utils/customTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../hooks/useTheme';
import { Link } from 'react-router-dom';
const Menu: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    // Detect system theme on page load and apply it to the HTML document
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        console.debug("Language changed to:", lng);
    }
    return (
        <div>
            <Navbar fluid rounded theme={customNavbarTheme}>
                <Navbar className='bg-transparent px-2 py-0 dark:border-gray-700 dark:bg-transparent sm:px-4'>
                    <img width={48} height={48} src="./binary-translate.webp" className="mr-3 h-12 w-auto sm:h-9 xs:h-7 xs:mr-2" alt="Flib" />
                    <span className="self-center whitespace-nowrap text-2xl xs:text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                        <Link to={"/"}>{t('title')}</Link>
                    </span>
                </Navbar>
                <menu className='flex items-end list-none'>
                    <Navbar className='block py-3 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mr-2 xs:mr-0 dark:bg-transparent'>
                        <Link to={"/about"}>{t('menu.about')}</Link>
                    </Navbar>
                    <Navbar.Link className='mr-2 xs:mr-0' role='button' title='Change Language' aria-label='Change Language'>
                        <Dropdown inline label={<FontAwesomeIcon icon={faGlobe} aria-label='Language selection dropdown menu' title='Language selection dropdown menu' className='w-6 h-6 text-2xl' />} dismissOnClick={true} floatingArrow={true} theme={customLngDropdownTheme}>
                            <Dropdown.Item aria-label='English' onClick={() => changeLanguage('en')}>English 🇬🇧</Dropdown.Item>
                            <Dropdown.Item aria-label='Spanish' onClick={() => changeLanguage('es')}>Spanish 🇪🇸</Dropdown.Item>
                            <Dropdown.Item aria-label='French' onClick={() => changeLanguage('fr')}>French 🇫🇷</Dropdown.Item>
                        </Dropdown>
                    </Navbar.Link>
                    <Navbar.Link aria-label='Change Theme'>
                        <DarkThemeToggle onClick={toggleTheme} defaultValue={theme} theme={customToggleTheme} className='text-2xl' />
                    </Navbar.Link>
                </menu>
            </Navbar>
        </div>
    )
}

export default Menu