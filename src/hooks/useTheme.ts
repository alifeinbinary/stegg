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

import { useEffect, useState } from "react";

/**
 * useTheme returns an object containing the current theme, either "dark" or "light", and a function to toggle the theme.
 * The theme is determined by the following rules, in order of precedence:
 * 1. The theme stored in localStorage, if any.
 * 2. The prefers-color-scheme media query.
 * 3. Light theme.
 * The toggleTheme function updates the theme in the state and in localStorage.
 * The useEffect hook is used to update the document's class list with the theme.
 * @returns {{theme: string, toggleTheme: () => void}}
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "dark"
            : "light",
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        localStorage.theme = theme === "dark" ? "light" : "dark";
    };

    return { theme, toggleTheme };
};
