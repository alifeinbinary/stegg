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

import { useRef } from 'react'
import { clearContx } from '../utils/translate';
import Slider from './Slider';
import Password from './Password';
import DownloadImageButton from './DownloadImageButton';
import PostImageButton from './PostImageButton';
import { useImageState } from '../utils/stores';

export const TextArea: React.FC = () => {

    const {
        input, setInput,
        setOutput,
        password, setPassword,
        encryptionEnabled, setEncryptionEnabled,
        setEncryptedText,
        decryptedText, setDecryptedText,
        stringToDecrypt, setStringToDecrypt,
    } = useImageState();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <div className='w-full'>
            <h4 className="mb-2 h4 sm:hidden xs:hidden text-2xl text-left font-bold dark:text-white">Encrypt</h4>
            <form className='min-h-48 h-full'>
                <div className="w-full min-h-48 mb-4 sm:mb-0 xs:mb-0 border border-gray-200 rounded-lg sm:rounded-none sm:rounded-t-lg xs:rounded-none xs:rounded-t-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                <DownloadImageButton />
                            </div>
                        </div>
                        <Slider />
                        <div className="flex sm:w-56">
                            <Password password={password} setPassword={setPassword} setEncryptedText={setEncryptedText} encryptionEnabled={encryptionEnabled} setEncryptionEnabled={setEncryptionEnabled} setOutput={setOutput} decryptedText={decryptedText} setDecryptedText={setDecryptedText} stringToDecrypt={stringToDecrypt} setStringToDecrypt={setStringToDecrypt} />
                        </div>
                        <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Enable encryption to secure your message.
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-white dark:bg-gray-800">
                        <label htmlFor="editor" className="sr-only">Download</label>
                        <textarea rows={4} id="text-input" value={input} onChange={(e) => {
                            setInput(e.target.value);
                            if (e.target.value.trim() === '') {
                                setEncryptedText('');
                                clearContx(canvasRef);
                                setOutput([]);
                            }
                        }} data-testid="text-input" maxLength={512} tabIndex={0} className="block w-full min-h-28 h-full px-0 text-base text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder={`${decryptedText ? decryptedText : 'Type your thoughts'}`} required ></textarea>
                    </div>
                    <div className='flex items-center justify-end px-3 py-2 border-b dark:border-gray-600'>
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                <PostImageButton />
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}   