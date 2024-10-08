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

import { useRouteError } from "react-router-dom";

interface RouteError {
    statusText?: string;
    message?: string;
}

const Error = () => {
    const error = useRouteError() as RouteError;

    return (
        <div>
            <h1>Oops!</h1>
            <p>We couldn't find the steg you are looking for. It's either expired (we delete stegs after one week) or the URL was malformed.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
};

export default Error;