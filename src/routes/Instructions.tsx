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

import { json, LoaderFunction } from "react-router-dom";

const Instructions: React.FC = () => {
    return (
        <div>
            <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white w-2/3">Instructions</h1>

            <p className="mb-6 font-light text-gray-500 lg:text-lg dark:text-gray-400 w-2/3">Click on the "How it Works" tab to see how to use the image generator.</p>
        </div>
    );
}

export const instructionsLoader: LoaderFunction = async () => {
    return json({});
}

export default Instructions;