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
import { useTranslation } from "react-i18next";

const Instructions: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="mb-2">
            <h1 className="mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-600 md:text-5xl lg:text-6xl dark:text-white w-2/3">{t('instructions')}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-12">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 pb-3">{t('instructionsPage.creating')}</h2>
                    <ol className="relative ml-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-greengrass rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-greengrass">
                                <FontAwesomeIcon icon={faKeyboard} className="w-3.5 h-3.5 text-lightergreen dark:text-lightergreen" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.typeYourMessage')}</h3>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('instructionsPage.typeYourMessageDesc') }} />
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.choosePassword')}</h3>
                            <p className="text-sm">{t('instructionsPage.choosePasswordDesc')}</p>
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faFloppyDisk} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.saveImage')}</h3>
                            <p className="text-sm">{t('instructionsPage.saveImageDesc')}</p>
                        </li>
                        <li className="ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.postOptional')}</h3>
                            <p className="text-sm">{t('instructionsPage.postOptionalDesc')}</p>
                            <p className="text-sm mt-2">{t('instructionsPage.postOptionalDesc2')}</p>
                        </li>
                    </ol>
                </div>

                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 pb-3">{t('instructionsPage.decoding')}</h2>
                    <ol className="relative ml-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-greengrass rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-greengrass">
                                <FontAwesomeIcon icon={faUpload} className="w-3.5 h-3.5 text-lightergreen dark:text-lightergreen" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.dragAndDrop')}</h3>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('instructionsPage.dragAndDropDesc') }} />
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faUnlock} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.enterPassword')}</h3>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('instructionsPage.enterPasswordDesc') }} />
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <FontAwesomeIcon icon={faEgg} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <h3 className="font-medium leading-tight dark:text-gray-300 pb-1">{t('instructionsPage.decodingPublicSteggs')}</h3>
                            <p className="text-sm mt-2">{t('instructionsPage.decodingPublicSteggsDesc')}</p>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="p-4 mt-8 mb-2 text-md text-quailegg rounded-lg bg-eggblue/[0.5] dark:bg-gray-800 dark:text-eggblue" role="alert">
                <span className="font-bold">{t('instructionsPage.fyi')}</span> {t('instructionsPage.fyiText')}
            </div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                <span className="absolute px-3 font-medium text-gray-300 -translate-x-1/2 bg-white left-1/2 3dark:text-white dark:bg-slate-900"><FontAwesomeIcon icon={faAsterisk} className="w-5 h-5 me-1" aria-hidden="true" /></span>
            </div>
            <div className="max-w-md p-4 mt-4 bg-white rounded shadow-md dark:bg-slate-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('instructionsPage.steganography')}</h2>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                <p className="text-sm text-gray-500 dark:text-gray-400 pt-1 pb-2">{t('instructionsPage.steganographyPronunciation')}</p>
                <blockquote className="pl-4 border-l-4 border-gray-300 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('instructionsPage.steganographyDefinition')}
                    </p>
                    <footer className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                        {t('instructionsPage.steganographySource')}
                    </footer>
                </blockquote>
            </div>
        </div>
    );
}

export default Instructions;