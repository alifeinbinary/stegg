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

const Faq: React.FC = () => {
    return (
        <div>
            <h1>FAQ</h1>
            <p>What is this?</p>
            <p>What is this?</p>
            <p>What is this?</p>
            <p>What is this?</p>
            <p>What is this?</p>
            <p>What is this?</p>
            <p>What is this?</p>
        </div>
    )
}

export const faqLoader: LoaderFunction = async () => {
    return json({});
}

export default Faq