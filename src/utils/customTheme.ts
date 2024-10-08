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

import { CustomFlowbiteTheme } from "flowbite-react/components/Flowbite";

export const customDropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4",
    content: "py-1 focus:outline-none",
    floating: {
        animation: "transition-opacity",
        arrow: {
            base: "absolute z-10 h-2 w-2 rotate-45",
            style: {
                dark: "bg-gray-900 dark:bg-gray-700",
                light: "bg-white",
                auto: "bg-white dark:bg-gray-700",
            },
            placement: "-4px",
        },
        base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700 dark:text-gray-200",
        divider: "my-1 h-px bg-gray-100 dark:bg-slate-600",
        header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
            container: "",
            base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:bg-slate-600 dark:focus:text-white",
            icon: "mr-2 h-4 w-4",
        },
        style: {
            dark: "bg-gray-900 text-white dark:bg-gray-700",
            light: "border border-gray-200 bg-white text-gray-900",
            auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
        },
        target: "text-white bg-sagegreen/[0.8] dark:bg-sagegreen dark:text-slate-900 dark:hover:bg-slate-300 hover:bg-sagegreen/[1.0] enabled:hover:bg-sagegreen/[1.0] dark:enabled:bg-sagegreen/[0.8] dark:enabled:hover:bg-sagegreen/[1.0] focus:ring-blue-300 focus:ring-4 w-fit",
    },
    inlineWrapper: "flex items-center",
};

export const customNavbarTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
        base: "w-full bg-white dark:bg-slate-900 px-0 py-2.5",
    },
    link: {
        base: "block py-1 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition duration-500 ease-in-out",
        active: {
            on: "bg-blue-700 text-white md:bg-transparent md:text-blue-700",
            off: "",
        },
        disabled: {
            on: "text-gray-400 hover:cursor-not-allowed",
            off: "",
        },
    },
};

export const customLngDropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "xs:hidden w-4 h-4 ml-1 text-gray-500 dark:text-gray-400",
    inlineWrapper:
        "flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
};

export const customToggleTheme: CustomFlowbiteTheme["darkThemeToggle"] = {
    root: {
        base: "rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 text-2xl",
        icon: "w-6 h-6",
    },
};

export const lockTooltip: CustomFlowbiteTheme["tooltip"] = {
    target: "flex",
};
