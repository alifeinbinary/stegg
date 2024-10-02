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

// import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import { Navbar } from 'flowbite-react/components/Navbar';
import Technical from './Technical';
import Simple from './Simple';

const About: React.FC = () => {
    // const { t } = useTranslation();
    return (
        <div>
            <Navbar>
                <Link to={"/about/"}>
                    <Navbar>
                        Simple
                    </Navbar>
                </Link>
                <Link to={"/about/technical"}>
                    <Navbar>
                        Technical
                    </Navbar>
                </Link>
            </Navbar>
            <Routes>
                <Route path='/about/' element={<Simple />} />
                <Route path='/about/technical' element={<Technical />} />
            </Routes>
            <Simple />
        </div>
    )
}

export default About;