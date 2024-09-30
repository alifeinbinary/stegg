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

import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import { faAsterisk, faCodeFork, faFaceSmile, faGlobe, faLock, faStar } from '@fortawesome/free-solid-svg-icons'
import { faReact, faFontAwesome, faNodeJs, faNpm, faAws, faFirefoxBrowser } from '@fortawesome/free-brands-svg-icons'
import { useTheme } from '../hooks/useTheme';
import { customNavbarTheme, customLngDropdownTheme, customToggleTheme } from '../utils/customTheme';

/**
 * The Header component is a React functional component that renders the main header of the app.
 * It is responsible for rendering the navigation menu and the main header content.
 * The Header component is the main entry point for the app and is responsible for routing the user to the correct page.
 * The Header component is also responsible for managing the app's state and passing it down to its child components.
 * @function
 * @returns {ReactElement} The rendered Header component.
 */
const Header: React.FC = () => {
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
        <div id="header" className='lg:w-[1120px] lg:w-[1005px]'>
            <section className="px-6 sm:px-2 xs:px-1 pt-8">
                <div className="py-4 px-4 bg-white dark:bg-slate-900 rounded-lg text-left mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="relative max-w-screen-lg text-gray-800 sm:text-lg dark:text-gray-400">
                        <Navbar fluid rounded theme={customNavbarTheme}>
                            <Navbar.Brand href="/">
                                <img width={48} height={48} src="./binary-translate.webp" className="mr-3 h-12 w-auto sm:h-9 xs:h-7 xs:mr-2" alt="Binary Translate" />
                                <span className="self-center whitespace-nowrap text-2xl xs:text-sm tracking-tight font-bold text-gray-900 dark:text-white">{t('title')}</span>
                            </Navbar.Brand>
                            <menu className='flex items-end list-none'>
                                <Navbar.Link className='mr-2 xs:mr-0' role='button' href='#' title='Change Language' aria-label='Change Language'>
                                    <Dropdown inline label={<FontAwesomeIcon icon={faGlobe} aria-label='Language selection dropdown menu' title='Language selection dropdown menu' className='w-6 h-6 text-2xl' />} dismissOnClick={true} floatingArrow={true} theme={customLngDropdownTheme}>
                                        <Dropdown.Item aria-label='English' onClick={() => changeLanguage('en')}>English 🇬🇧</Dropdown.Item>
                                        <Dropdown.Item aria-label='Spanish' onClick={() => changeLanguage('es')}>Spanish 🇪🇸</Dropdown.Item>
                                        <Dropdown.Item aria-label='French' onClick={() => changeLanguage('fr')}>French 🇫🇷</Dropdown.Item>
                                    </Dropdown>
                                </Navbar.Link>
                                <Navbar.Link href='#' aria-label='Change Theme'>
                                    <DarkThemeToggle onClick={toggleTheme} defaultValue={theme} theme={customToggleTheme} className='text-2xl' />
                                </Navbar.Link>
                            </menu>
                        </Navbar>
                        <p className="mb-4 pt-2 font-bold dark:text-gray-100">{t('description.intro')}</p>
                        <p className="mb-4 font-base dark:text-gray-100"><b>{t('description.howitworks')}</b> <Trans i18nKey="description.paragraph1" components={{ b: <b />, FontAwesomeIcon: <FontAwesomeIcon icon={faLock} /> }}>This app takes the text input from <b>Encrypt</b> field and writes it to the metadata of a newly created PNG file that is generated from the <b>Canvas</b>. The canvas image depicts the message as binary data: nodes that are filled represent 1's and nodes that are outlined represent 0's. If someone was patient enough, they could translate the message back to text just by interpreting the image as unicode values. That's why there is a <FontAwesomeIcon icon={faLock} className='px-1' /> toggle that deteremines whether the message is embedded with 128-bit AES encryption or as plain text.</Trans></p>
                        <p className="mb-4 font-base dark:text-gray-100"><Trans i18nKey="description.paragraph2" components={{ b: <b />, }}>Once you click <b>Save</b> or <b>Post</b>, the file will be downloaded to your device or posted to the <b>Feed</b>, respectively. Whomever you share the image with would be able to extract and decipher the text by dragging the PNG file into the <b>Decrypt</b> zone and entering the passkey you provided them with, if it's encrypted. Likewise, you'll be able to decipher whichever posts you possess the password for.</Trans></p>
                        <p className='mb-4 font-base dark:text-gray-100'><Trans i18nKey="description.paragraph3" components={{ b: <b />, a: <a /> }}>I realise that nobody asked for this, I just made it as a fun way to send secret messages to the people who visit my site <a className='text-orange font-medium hover:underline dark:text-orange' href='https://www.alifeinbinary.com'>alifeinbinary.com</a> and thought it would be a fun project to share as open source for those who are wanting to learn about the technology within.</Trans></p>
                        <div className='mb-4'>
                            <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Technology involved</h2>
                            <div className='grid grid-cols-2 xs:grid-cols-1 gap-4'>
                                <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-100">
                                    <Trans i18nKey="technology1" components={{ li: <li /> }}>
                                        <li>
                                            Typescript
                                        </li>
                                        <li>
                                            React
                                        </li>
                                        <li>
                                            HTML Canvas
                                        </li>
                                        <li>
                                            Cryptography in the browser
                                        </li>
                                        <li>
                                            Image generation and consumption
                                        </li>
                                    </Trans>
                                </ul>
                                <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-100">
                                    <Trans i18nKey="technology2" components={{ li: <li /> }}>
                                        <li>
                                            Embedding metadata in files
                                        </li>
                                        <li>
                                            CRUD operations to a serverless API on AWS using GraphQL
                                        </li>
                                        <li>
                                            File storage on AWS S3 managed by a cron job
                                        </li>
                                        <li>
                                            Jest tests
                                        </li>
                                        <li>
                                            Internationalisation
                                        </li>
                                    </Trans>
                                </ul>
                            </div>
                        </div>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                            <span className="absolute px-3 font-medium text-gray-300 -translate-x-1/2 bg-white left-1/2 3dark:text-white dark:bg-slate-900"><FontAwesomeIcon icon={faAsterisk} className="w-5 h-5 me-1" aria-hidden="true" /></span>
                        </div>
                        <div className='grid grid-cols-2 pt-6 sm:grid-cols-1 xs:grid-cols-1 w-full relative'>
                            <div className='mb-4'>
                                <figure className="max-w-screen-md bg-gray-100 p-5 rounded-lg dark:bg-gray-700">
                                    <div className="flex items-center mb-4 text-lightorange">
                                        <FontAwesomeIcon icon={faStar} className="w-5 h-5 me-1" aria-hidden="true" />
                                        <span className='text-gray-300 flex items-center'>
                                            <FontAwesomeIcon icon={faStar} className="w-5 h-5 me-1" aria-hidden="true" />
                                            <FontAwesomeIcon icon={faStar} className="w-5 h-5 me-1" aria-hidden="true" />
                                            <FontAwesomeIcon icon={faStar} className="w-5 h-5 me-1" aria-hidden="true" />
                                            <FontAwesomeIcon icon={faStar} className="w-5 h-5 me-1" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <blockquote>
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{t('review')}</p>
                                    </blockquote>
                                    <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                                        <img className="w-6 h-6 rounded-full" src="./diane.webp" alt="profile picture" width={75} height={75} />
                                        <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                                            <cite className="pe-3 font-medium text-gray-900 dark:text-white">Diane</cite>
                                            <cite className="ps-3 text-sm text-gray-500 dark:text-gray-300">{t('byline')}</cite>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className='mb-4 absolute lg:absolute md:absolute sm:absolute xs:relative bottom-0 right-0'>
                                <h3 className='mb-1 mt-4 text-lg tracking-tight font-bold text-gray-900 dark:text-white'>{t('createdwith')}</h3>
                                <div className='text-3xl flex flex-row'>
                                    <a href="https://nodejs.org/" aria-label="Node JS" target="_blank"><FontAwesomeIcon icon={faNodeJs} className="hover:text-forestgreen transition-colors duration-500 ease-in-out" /></a>
                                    <a href="https://www.npmjs.com/" aria-label="NPM" target="_blank"><FontAwesomeIcon icon={faNpm} className="ml-2 hover:text-orange transition-colors duration-500 ease-in-out" /></a>
                                    <a href="https://react.dev/" aria-label="React" target="_blank"><FontAwesomeIcon icon={faReact} className='ml-2 hover:text-eggblue transition-colors duration-500 ease-in-out' /></a>
                                    <a href="https://aws.amazon.com/" aria-label="Amazon Web Services" target="_blank"><FontAwesomeIcon icon={faAws} className="ml-2 hover:text-eggblue transition-colors duration-500 ease-in-out" /></a>
                                    <a href='https://fontawesome.com/' aria-label="Font Awesome" target='_blank'><FontAwesomeIcon icon={faFontAwesome} className="ml-2 hover:text-orange transition-colors duration-500 ease-in-out" /></a>
                                    <a href="https://www.mozilla.org/en-CA/firefox/new/" aria-label="Mozilla Firefox" target="_blank"><FontAwesomeIcon icon={faFirefoxBrowser} className="ml-2 hover:text-orange transition-colors duration-500 ease-in-out" /></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section >
            <span className='flex-row flex items-center pt-2 px-6 justify-between text-white'>
                <div className='grid grid-cols-2 xs:grid-cols-1 w-full'>
                    <p className='mb-4 ml-2 xs:ml-0 xs:mb-1 font-medium col-span-1 text-left xs:text-center'><FontAwesomeIcon className='text-sm' icon={faCodeFork} /> {t('forkthisproject')}<a className='text-orange hover:text-blue-200 hover:underline dark:text-orange' href='https://github.com/alifeinbinary/binary-translate' target='_blank'>Github</a></p>
                    <p className='font-medium mr-2 xs:mr-0 col-span-1 text-right xs:text-center'>{t('likemywork')} <a href='https://www.linkedin.com/in/alifeinbinary/' target='_blank' className='text-orange hover:text-blue-200 hover:underline dark:text-orange'> {t('hireme')}</a> <FontAwesomeIcon icon={faFaceSmile} className="ml-1 text-lg text-yellow-200" /></p>
                </div>
            </span>
        </div >
    );
};

export default Header;