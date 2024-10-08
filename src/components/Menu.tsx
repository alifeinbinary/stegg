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
import { faEarthAmericas, faEgg } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../hooks/useTheme';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

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

    const colours = [
        "#ffeedd", // 0.97
        "#eebbaa", // 0.83
        "#ff8866", // 0.78
        "#ddeecc", // 0.76
        "#aaddcc", // 0.74
        "#ccaabb", // 0.73
        "#aabb99", // 0.69
        "#88aa99", // 0.67
        "#bb9988", // 0.65
        "#887766", // 0.63
        "#667755", // 0.62
        "#557777", // 0.59
        "#886677", // 0.58
        "#442233", // 0.45
        "#331111", // 0.43
        "#330011", // 0.42
        "#223311", // 0.38
        "#554433", // 0.36
    ];

    function calculateLuminance(hexColor: string) {
        const r = parseInt(hexColor.substring(1, 3), 16) / 255;
        const g = parseInt(hexColor.substring(3, 5), 16) / 255;
        const b = parseInt(hexColor.substring(5, 7), 16) / 255;

        const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

        return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    }

    const lightColourList = colours.filter(color => calculateLuminance(color) > 0.5);
    const darkColourList = colours.filter(color => calculateLuminance(color) <= 0.5);

    const colourList = theme === 'light' ? darkColourList : lightColourList;

    useLayoutEffect(() => {
        const svg = document.querySelector('svg');
        const path = svg?.querySelector('path');
        const word = document.querySelector('#navbar');
        const letters = word?.querySelectorAll('span');

        if (letters && word && path && theme && svg) {
            let intervalId: string | number | NodeJS.Timeout | undefined;

            const animateLoop = () => {
                intervalId = setInterval(() => {
                    const randomColourIndex = Math.floor(Math.random() * colourList.length);
                    const randomColour = colourList[randomColourIndex];
                    if (path) {
                        path.style.transition = 'fill 1s ease-in-out';
                        path.style.fill = randomColour;
                    }
                    letters?.forEach((letter, _index) => {
                        let randomLetterColourIndex = Math.floor(Math.random() * colourList.length);
                        while (randomLetterColourIndex === randomColourIndex) {
                            randomLetterColourIndex = Math.floor(Math.random() * colourList.length);
                        }
                        letter.style.transition = 'color 1.5s ease-in-out';
                        letter.style.color = colourList[randomLetterColourIndex];
                    });
                }, 1000);
            };

            const handleMouseOver = () => {
                animateLoop();
            };

            const handleMouseOut = () => {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            };

            word.addEventListener('mouseover', handleMouseOver);
            word.addEventListener('mouseout', handleMouseOut);

            return () => {
                word.removeEventListener('mouseover', handleMouseOver);
                word.removeEventListener('mouseout', handleMouseOut);
                if (intervalId) {
                    clearInterval(intervalId);
                }
            };
        }
    }, [theme]);

    return (
        <div>
            <Navbar id='navbar' fluid rounded className='rounded-lg pl-1 pr-2.5' theme={customNavbarTheme}>
                <Navbar className='bg-transparent px-2.5 py-0 dark:border-gray-700 dark:bg-transparent sm:px-4'>
                    <FontAwesomeIcon className="mr-3 h-8 w-auto sm:h-9 xs:h-7 xs:mr-2 text-orange dark:text-lightorange" icon={faEgg} />
                    <span className="self-center whitespace-nowrap text-2xl xs:text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                        <Link to={"/"} id='stegg'>
                            <div id="stegg">
                                <span>s</span>
                                <span>t</span>
                                <span>e</span>
                                <span>g</span>
                                <span>g</span>
                            </div></Link>
                        <p id="tagline" className='tagline text-xs font-medium'>{t('make-something')}</p>
                    </span>
                </Navbar>
                <menu className='flex items-end list-none'>
                    <Link to={"/about/instructions/"}>
                        <Navbar className='block py-3 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mr-2 xs:mr-0 dark:bg-transparent transition duration-500 ease-in-out'>
                            {t('menu.about')}
                        </Navbar>
                    </Link>
                    <Navbar.Link className='mr-2 xs:mr-0' role='button' title='Change Language' aria-label='Change Language'>
                        <Dropdown inline label={<FontAwesomeIcon icon={faEarthAmericas} aria-label='Language selection dropdown menu' title='Language selection dropdown menu' className='w-6 h-6 text-2xl' />} dismissOnClick={true} floatingArrow={true} theme={customLngDropdownTheme}>
                            <Dropdown.Item aria-label='English' onClick={() => changeLanguage('en')}>English 🇬🇧</Dropdown.Item>
                            <Dropdown.Item aria-label='Spanish' onClick={() => changeLanguage('es')}>Spanish 🇪🇸</Dropdown.Item>
                            <Dropdown.Item aria-label='French' onClick={() => changeLanguage('fr')}>French 🇫🇷</Dropdown.Item>
                        </Dropdown>
                    </Navbar.Link>
                    <Navbar.Link aria-label='Change Theme' className='transition duration-500 ease-in-out'>
                        <DarkThemeToggle onClick={toggleTheme} defaultValue={theme} theme={customToggleTheme} className='text-2xl' />
                    </Navbar.Link>
                </menu>
            </Navbar>
        </div>
    )
}

export default Menu