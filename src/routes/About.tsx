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

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
    const contentRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (contentRef.current) {
            const updateContentHeight = () => {
                const newHeight = contentRef.current?.scrollHeight;
                if (newHeight) {
                    setContentHeight(newHeight);
                }
            };

            updateContentHeight();

            window.addEventListener('resize', updateContentHeight);

            return () => {
                window.removeEventListener('resize', updateContentHeight);
            };
        }
    }, [contentRef, location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                const { width, height } = contentRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [contentRef]);

    useEffect(() => {
        if (dimensions.width !== 0 && dimensions.height !== 0) {
            const updateContentHeight = () => {
                const newHeight = contentRef.current?.scrollHeight;
                if (newHeight) {
                    setContentHeight(newHeight);
                }
            };

            updateContentHeight();
        }
    }, [dimensions, contentRef]);

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
                    initial={{ height: 'auto' }}
                    animate={{ height: contentHeight }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        overflow: 'hidden',
                        transitionProperty: 'height',
                        transitionDuration: '0.5s',
                        transitionTimingFunction: 'ease-in-out',
                    }}
                >
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div ref={contentRef} className='pb-8'>
                                <Outlet />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}

export default About;