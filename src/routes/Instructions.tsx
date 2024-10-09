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

import { faFloppyDisk, faKeyboard, faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Instructions: React.FC = () => {
    return (

        <div className="grid gap-12 grid-cols-2 sm:grid-cols-1">
            <div className="ml-4 mt-4">
                <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white w-2/3">Instructions</h1>
                <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mb-10 ms-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                            <FontAwesomeIcon icon={faKeyboard} className="w-3.5 h-3.5 text-green-500 dark:text-green-400" />
                        </span>
                        <h3 className="font-medium leading-tight">Type your message</h3>
                        <p className="text-sm">Using the <b>Create</b> field you can type the message that you would like to be hidden within the image you're about to create.</p>
                    </li>
                    <li className="mb-10 ms-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                        </span>
                        <h3 className="font-medium leading-tight">Choose a password</h3>
                        <p className="text-sm">If you want to secure the embedded message in the image behind powerful encryption then toggle the lock icon and type a password. You will need to share this password with others if you want them to be able to decode the message, so be sure to remember it.</p>
                    </li>
                    <li className="mb-10 ms-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <FontAwesomeIcon icon={faFloppyDisk} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                        </span>
                        <h3 className="font-medium leading-tight">Save the image</h3>
                        <p className="text-sm">This is the best time to save the image in it's highest quality. The image will be saved to your computer or device as a .png file after selecting from the dropdown menu of image dimensions. </p>
                    </li>
                    <li className="ms-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                        </span>
                        <h3 className="font-medium leading-tight">Post (optional)</h3>
                        <p className="text-sm">You can share the image publicly by clicking the Post button. You can choose to enter a name or psuedonym that will be shown alongside the image or leave it blank to post anonymously.</p>
                        <p className="text-sm mt-2">Click the "copy link" button on your newly created posted in the feed and share it with any third-parties along with the password.</p>
                    </li>
                </ol>
                <p className="mt-8 font-bold">All image and database information associated with the post will be deleted after 1 week.</p>
            </div>

            <div className="mt-16">
                <div className=" p-4 bg-white rounded shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Steganography</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">noun</p>
                    <blockquote className="pl-4 border-l-4 border-gray-300 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            the practice of hiding secret information within a nonsecret message, image, or other medium in such a way that the very existence of the secret information is not apparent
                        </p>
                        <footer className="text-xs text-gray-500 dark:text-gray-400">
                            — Merriam-Webster Dictionary
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default Instructions;