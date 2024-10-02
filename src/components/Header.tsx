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

import { lazy } from 'react'
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faStar } from '@fortawesome/free-solid-svg-icons'
// import { RouterProvider } from 'react-router-dom';
import Menu from '../components/Menu';
// import router from '../routes';
// import { Spinner } from 'flowbite-react';
import Root from '../routes/Root';
import { Route, Routes } from 'react-router-dom';
import Error from '../routes/Error';


const About = lazy(() => import('../routes/About'))
// const Faq = lazy(() => import('../routes/Faq'))
const PostPage = lazy(() => import('../routes/PostPage'))

/**
 * The Header component is a React functional component that renders the main header of the app.
 * It is responsible for rendering the navigation menu and the main header content.
 * The Header component is the main entry point for the app and is responsible for routing the user to the correct page.
 * The Header component is also responsible for managing the app's state and passing it down to its child components.
 * @function
 * @returns {ReactElement} The rendered Header component.
 */
const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div id="header" className='lg:w-[1120px] lg:w-[1005px]'>
            <section className="px-6 sm:px-2 xs:px-1 pt-8">
                <Menu />
                <div className="py-4 mt-3 px-4 bg-white dark:bg-slate-900 rounded-lg text-left mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="relative max-w-screen-lg text-gray-800 sm:text-lg dark:text-gray-400">
                        <Routes>
                            <Route path="/" element={<Root />} errorElement={<Error />} />
                            <Route path="/about" element={<About />} errorElement={<Error />} />
                            <Route path='/@/:id' element={<PostPage />} errorElement={<Error />} />
                        </Routes>
                        <Root />
                    </div>
                </div>
            </section >
            <span className='flex-row flex items-center pt-2 px-6 justify-between text-white'>
                <div className='grid grid-cols-2 xs:grid-cols-1 w-full text-sm'>
                    <p className='mb-4 ml-2 xs:ml-0 xs:mb-1 font-medium col-span-1 text-left xs:text-center'><FontAwesomeIcon className='text-sm text-yellow-200' icon={faStar} /> {t('forkthisproject')}<a className='text-orange hover:text-blue-200 hover:underline dark:text-orange' href='https://github.com/alifeinbinary/binary-translate' target='_blank'>Github</a></p>
                    <p className='font-medium mr-2 xs:mr-0 col-span-1 text-right xs:text-center'>{t('likemywork')} <a href='https://www.linkedin.com/in/alifeinbinary/' target='_blank' className='text-orange hover:text-blue-200 hover:underline dark:text-orange'> {t('hireme')}</a> <FontAwesomeIcon icon={faFaceSmile} className="ml-1 text-lg text-yellow-200" /></p>
                </div>
            </span>
        </div >
    );
};

export default Header;