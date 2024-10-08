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

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { json, Link, LoaderFunction, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from 'flowbite-react/components/Navbar';
import { CustomFlowbiteTheme } from 'flowbite-react/components/Flowbite';
import { motion, AnimatePresence } from 'framer-motion';

const customNavbarTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
        base: "w-full bg-white dark:bg-slate-900 px-0 pb-2.5 items-end justify-end",
        inner: {
            base: "mx-auto flex flex-wrap justify-end",
        },
    },
};

const About: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [contentHeight, setContentHeight] = useState<string | number>('auto');
    const [isHeightTransitionDone, setIsHeightTransitionDone] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentElement = contentWrapperRef.current;
        if (contentElement) {
            // Reset state to hide content and prepare for height animation
            setIsContentVisible(false);
            setIsHeightTransitionDone(false);

            // Measure new content height without showing it
            const height = contentElement.scrollHeight;
            setContentHeight(`${height}px`);

            // Once height animation completes, show content
            setTimeout(() => {
                setIsHeightTransitionDone(true); // Height animation done, now show content
                setIsContentVisible(true); // Trigger the fade-in
            }); // Match this duration to the height animation timing
        }
    }, [location.pathname]);

    const spring = {
        type: "spring",
        damping: 10,
        stiffness: 50
    }

    return (
        <div>
            <Navbar theme={customNavbarTheme} className='border-b-2 dark:border-slate-500 border-forestgreen/[0.5]'>
                <Link to={"/about/instructions/"} className='block py-2 px-3 text-white dark:bg-slate-700 dark:hover:bg-slate-500 bg-forestgreen/[0.5] hover:bg-forestgreen/[0.8] rounded md:bg-transparent md:text-slate-700 md:p-0 dark:text-white md:dark:text-slate-500 transition duration-500 ease-in-out'>
                    {t('instructions')}
                </Link>
                <Link to={"/about/how-it-works/"} className='block ml-4 py-2 px-3 text-white dark:bg-slate-700 dark:hover:bg-slate-500 bg-forestgreen/[0.5] hover:bg-forestgreen/[0.8] rounded md:bg-transparent md:text-slate-700 md:p-0 dark:text-white md:dark:text-slate-500 transition duration-500 ease-in-out'>
                    {t('how-it-works')}
                </Link>
            </Navbar>
            <div>
                <motion.div
                    initial={{ height: 0, opacity: 0, visibility: 'visible' }}
                    animate={{ height: contentHeight, opacity: 1 }}
                    style={{ height: contentHeight }} // Animate height change
                    transition={spring}
                    exit={{ opacity: 0, visibility: 'hidden' }}
                >
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={location.pathname}
                            ref={contentWrapperRef}
                            initial={{ opacity: 0 }} // Start hidden and off-layout
                            animate={
                                isHeightTransitionDone && isContentVisible
                                    ? { opacity: 1 } // Only after height transition, show content
                                    : {}
                            }
                            transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
                        >
                            {isContentVisible ? <Outlet /> : null}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}

export const aboutLoader: LoaderFunction = async () => {
    return json({});
}

export default About;