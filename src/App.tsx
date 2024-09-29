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

import { lazy, Suspense } from "react";
import { Flowbite, Spinner } from "flowbite-react";
import "./App.css";

const Header = lazy(() => import("./components/Header"));
const Translate = lazy(() => import("./components/Translate"));
const Feed = lazy(() => import("./components/Feed"));
const DebugConsole = lazy(() => import("./components/DebugConsole"));
const Footer = lazy(() => import("./components/Footer"));

/**
 * The main entry point for the React application.
 *
 * This component renders the entire interface, including the header, the
 * translate component, the feed, the debug console, and the footer.
 *
 * The Flowbite component is used to provide a layout and styling for the
 * application.
 *
 * Each of the main components (Header, Translate, Feed, and DebugConsole) are
 * rendered as a Suspense component, which allows them to be loaded lazily
 * and provides a fallback loading indicator while they are loading.
 *
 * The Footer component is also rendered as a Suspense component, but it is
 * not lazy-loaded, so it will always be rendered.
 */
function App() {

  return (
    <>
      <Flowbite>
        <div id="app" className="bg-forestgreen/[0.5] dark:bg-slate-600 transition-colors duration-500 ease-in-out">
          <div className="container px-4 mx-auto max-w-6xl">
            {/* Header */}
            <Suspense fallback={<span className="w-full xs:h-[1740px] sm:h-[1485px] md:h-[1190px] lg:h-[1005px] flex items-center justify-center"><Spinner /></span>}>
              <Header />
            </Suspense>

            {/* Translate */}
            <Suspense fallback={<span className="w-full md:h-[374px] sm:h-[486px] flex items-center justify-center"><Spinner /></span>}>
              <Translate />
            </Suspense>

            {/* Feed */}
            <Suspense fallback={<span className="w-full sm:h-[1422px] md:h-[2142px] lg:h-[2553px] flex items-center justify-center"><Spinner /></span>}>
              <Feed />
            </Suspense>

            {/* Debug console */}
            <Suspense fallback={<span className="w-full h-16 flex items-center justify-center"><Spinner /></span>}>
              <DebugConsole />
            </Suspense>
          </div>
        </div>
        {/* Footer */}
        <Suspense fallback={<span className="w-full h-16 flex items-center justify-center"><Spinner /></span>}>
          <Footer />
        </Suspense>
      </Flowbite>
    </>
  );
}

export default App;
