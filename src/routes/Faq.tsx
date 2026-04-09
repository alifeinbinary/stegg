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


import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * The Faq component displays the frequently asked questions.
 *
 * @remarks
 * This component displays the most frequently asked questions with their answers.
 *
 * @returns The Faq component.
 */
const Faq: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
                <div className="grid xs:grid-cols-1 grid-cols-2 sm:grid-cols-1 pt-8 text-left border-t border-gray-200 gap-16 dark:border-gray-700">
                    <div>
                        <div className="mb-10">
                            <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                <FontAwesomeIcon className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" icon={faQuestionCircle} />
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400"></p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-10">
                            <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                <FontAwesomeIcon className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" icon={faQuestionCircle} />
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400"><a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">roadmap</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq