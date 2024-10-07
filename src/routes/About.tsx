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
import { json, Link, LoaderFunction, Outlet } from 'react-router-dom';
import { Navbar } from 'flowbite-react/components/Navbar';
import { customNavbarTheme } from '../utils/customTheme';


const About: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Navbar fluid rounded theme={customNavbarTheme}>
                <Link to={"/about/instructions/"}>
                    <Navbar>
                        {t('instructions')}
                    </Navbar>
                </Link>
                <Link to={"/about/how-it-works/"}>
                    <Navbar>
                        {t('how-it-works')}
                    </Navbar>
                </Link>
            </Navbar>
            <Outlet />
        </div>
    )
}

export const aboutLoader: LoaderFunction = async () => {
    return json({});
}

export default About;