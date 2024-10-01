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

import { createBrowserRouter } from 'react-router-dom';
import PostPage, { postLoader } from './routes/PostPage';
import Root, { rootLoader } from "./routes/Root";
import Faq, { faqLoader } from "./routes/Faq";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Root />,
        loader: rootLoader,
        children: [
            {
                path: "f/:id",
                element: <PostPage key={undefined} id={''} author={''} posted={new Date()} image={''} width={0} height={0} />,
                loader: postLoader,
            },
            {
                path: "faq",
                element: <Faq />,
                loader: faqLoader,
            },
        ],
    },
]);

export default router