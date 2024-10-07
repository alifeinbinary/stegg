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

import { json, LoaderFunction, Outlet } from 'react-router-dom';

/**
 * The main component for the root route.
 *
 * This component renders the main content for the root route, including the
 * introduction, how it works, and the technology involved.
 *
 * @returns The JSX element for the root route.
 */
const Root = () => {

    return (
        <>
            <Outlet />
        </>
    );
}

export const rootLoader: LoaderFunction = async () => {
    return json({});
}

export default Root;