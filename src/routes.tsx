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

import { createHashRouter } from 'react-router-dom';
import App, { appLoader } from './App';
import Error from './routes/Error';
import PostPage, { postPageLoader } from './routes/PostPage';
import HowItWorks, { howItWorksLoader } from './routes/HowItWorks';
import Instructions, { instructionsLoader } from './routes/Instructions';
import About, { aboutLoader } from './routes/About';

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        loader: appLoader,
        errorElement: <Error />,
        children: [
            {
                path: "/:id",
                element: <PostPage />,
                loader: postPageLoader,
            },
            {
                path: "/about",
                element: <About />,
                loader: aboutLoader,
                children: [
                    {
                        path: "/about/instructions",
                        element: <Instructions />,
                        loader: instructionsLoader,
                    },
                    {
                        path: "/about/how-it-works",
                        element: <HowItWorks />,
                        loader: howItWorksLoader,
                    },
                ],
            },
        ],
    },
],
    { basename: import.meta.env.VITE_PUBLIC_URL }
);

export default router