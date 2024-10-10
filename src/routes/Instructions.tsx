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

import { faAsterisk, faEgg, faFloppyDisk, faKeyboard, faLock, faPaperPlane, faUnlock, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";

const Instructions: React.FC = () => {
    return (
        <div className="mb-2">
            <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-600 md:text-5xl lg:text-6xl dark:text-white w-2/3">{t('instructions')}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-12">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 pb-3">Creating</h2>
                    <ol className="relative ml-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-greengrass rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-greengrass">
                                <FontAwesomeIcon icon={faKeyboard} className="w-3.5 h-3.5 text-lightergreen dark:text-lightergreen" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Type your message</h3>
                            <p className="text-sm">Using the <b>Create</b> field you can type the message that you would like to be hidden within the image you're about to create.</p>
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Choose a password</h3>
                            <p className="text-sm">If you want to secure the embedded message in the image behind powerful encryption then toggle the lock icon and type a password. You will need to share this password with others if you want them to be able to decode the message, so be sure to remember it.</p>
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faFloppyDisk} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Save the image</h3>
                            <p className="text-sm">This is the best time to save the image in it's highest quality. The image will be saved to your computer or device as a .png file after selecting from the dropdown menu of image dimensions. </p>
                        </li>
                        <li className="ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Post (optional)</h3>
                            <p className="text-sm">You can share the image publicly by clicking the Post button. You can choose to enter a name or psuedonym that will be shown alongside the image or leave it blank to post anonymously.</p>
                            <p className="text-sm mt-2">Click the "copy link" button on your newly created posted in the feed and share it with any third-parties along with the password.</p>
                        </li>
                    </ol>
                </div>

                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 pb-3">Decoding</h2>
                    <ol className="relative ml-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-greengrass rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-greengrass">
                                <FontAwesomeIcon icon={faUpload} className="w-3.5 h-3.5 text-lightergreen dark:text-lightergreen" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Drag and drop</h3>
                            <p className="text-sm">You can drop a stegg that's been passed along to you into the <b>Decode</b> field.</p>
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faUnlock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Enter a password</h3>
                            <p className="text-sm">If your stegg is valid then you'll notice the <FontAwesomeIcon icon={faUnlock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" /> icon under the <b>Create</b> field activate by turning green. You can now enter the password the was given to you by the stegg's creator in the password field. If you're password is correct, the secret message will be revealed in the <b>Create</b> text area.</p>
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faEgg} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">Decoding public steggs</h3>
                            <p className="text-sm mt-2">The same goes for any public steggs in the feed. Just click the <FontAwesomeIcon icon={faUnlock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" /> icon underneath the stegg and enter the password. If the password is correct, the secret message will be revealed in place of the image.</p>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="p-4 mt-8 mb-2 text-md text-quailegg rounded-lg bg-eggblue/[0.5] dark:bg-gray-800 dark:text-eggblue" role="alert">
                <span className="font-bold">FYI:</span> All image data and database records associated with the a public stegg are deleted after 1 week from its original posted date.
            </div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <span className="absolute px-3 font-medium text-gray-300 -translate-x-1/2 bg-white left-1/2 3dark:text-white dark:bg-slate-900"><FontAwesomeIcon icon={faAsterisk} className="w-5 h-5 me-1" aria-hidden="true" /></span>
            </div>
            <div className="max-w-md p-4 mt-4 bg-white rounded shadow-md dark:bg-slate-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Steganography</h2>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                <p className="text-sm text-gray-500 dark:text-gray-400 pt-1 pb-2">steg·​a·​nog·​ra·​phy |  ste-gə-ˈnä-grə-fē </p>
                <blockquote className="pl-4 border-l-4 border-gray-300 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        the practice of hiding secret information within a nonsecret message, image, or other medium in such a way that the very existence of the secret information is not apparent
                    </p>
                    <footer className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                        — Merriam-Webster Dictionary
                    </footer>
                </blockquote>
            </div>
        </div>
    );
}

export default Instructions;