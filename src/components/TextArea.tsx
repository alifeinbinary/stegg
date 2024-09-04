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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { clearContx } from '../utils/translate';
import Slider from './Slider';
import DownloadImageButton from './DownloadImageButton';

interface TextAreaProps {
    encryptionEnabled: boolean;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    encryptedText: string;
    setEncryptedText: React.Dispatch<React.SetStateAction<string>>;
    setDecryptedText: React.Dispatch<React.SetStateAction<string>>;
    stringToDecrypt: string;
    setStringToDecrypt: React.Dispatch<React.SetStateAction<string>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setOutput: React.Dispatch<React.SetStateAction<string[]>>;
    setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    handleDecrypt: (encryptedText: string, password: string, setDecryptedText: React.Dispatch<React.SetStateAction<string>>) => void;
    decryptedText: string;
    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
}

export const TextArea: React.FC<TextAreaProps> = ({ encryptionEnabled, password, setPassword, encryptedText, setEncryptedText, setDecryptedText, stringToDecrypt, setStringToDecrypt, input, setInput, setOutput, setEncryptionEnabled, canvasRef, decryptedText, size, setSize }) => {

    const handleCheckboxChange = () => {
        setEncryptionEnabled(!encryptionEnabled)
        toast.info("Encryption " + (!encryptionEnabled ? "enabled. You will need to provide the secret key to third parties whom you share the image with" : "disabled. Message will be embedded as plain text."), {
            autoClose: 4000,
            pauseOnHover: true
        });
        if (encryptionEnabled) {
            setPassword('');
        } else {
            setDecryptedText('');
            setOutput([]);
        }
        if (decryptedText && stringToDecrypt) {
            setEncryptedText('');
            setStringToDecrypt('');
        }
        if (stringToDecrypt && password === '') {
            setEncryptedText('');
            setStringToDecrypt('');
            clearContx(canvasRef);
            setOutput([]);
        }
    }

    return (
        <div className='w-full'>
            <h4 className="mb-2 h4 sm:hidden xs:hidden  text-left font-bold dark:text-white">Encrypt</h4>
            <form className='min-h-48 h-full'>
                <div className="w-full min-h-48 mb-4 sm:mb-0 xs:mb-0 border border-gray-200 rounded-lg sm:rounded-none sm:rounded-t-lg xs:rounded-none xs:rounded-t-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                <DownloadImageButton canvasRef={canvasRef} input={input} setInput={setInput} password={password} setPassword={setPassword} encryptedText={encryptedText} setEncryptedText={setEncryptedText} setDecryptedText={setDecryptedText} encryptionEnabled={encryptionEnabled} setEncryptionEnabled={setEncryptionEnabled} setOutput={setOutput} />
                            </div>
                        </div>
                        <Slider size={size} setSize={setSize} />
                        <div className="flex lg:w-72 md:w-60 sm:w-56">
                            <label className='relative inline-flex cursor-pointer select-none items-center'>
                                <input
                                    type='checkbox'
                                    checked={encryptionEnabled}
                                    onChange={handleCheckboxChange}
                                    className='sr-only'
                                    data-tooltip-target="tooltip-encryption"
                                />
                                <div id="tooltip-encryption" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Enable AES 128-bit encryption
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
                                <div tabIndex={0} className='shadow-card p-1 flex h-[46px] items-center justify-center rounded-md text-gray-900 bg-gray-200'>
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded ${!encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-blue-900 hover:bg-blue-800 text-white'
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={faLock} className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded ${encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-blue-900 hover:bg-blue-800 text-white'
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={faUnlock} className="w-4 h-4" aria-hidden="true" />
                                    </span>
                                    <input onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (e.target.value.trim() === '') {
                                            setEncryptedText('');
                                            setDecryptedText('')
                                            clearContx(canvasRef);
                                        }
                                    }} value={password} type="text" tabIndex={0} id="password-input" disabled={!encryptionEnabled} className={`text-base ml-1 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-900 focus:border-blue-900 block flex-1 min-w-0 w-full border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900`} placeholder={encryptionEnabled ? 'Enter a secret key' : 'Enable encryption'} />

                                </div>
                            </label>
                        </div>
                        <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Enable encryption to secure your message.
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                        <label htmlFor="editor" className="sr-only">Download</label>
                        <textarea rows={4} id="text-input" value={input} onChange={(e) => {
                            setInput(e.target.value);
                            if (e.target.value.trim() === '') {
                                setEncryptedText('');
                                clearContx(canvasRef);
                                setOutput([]);
                            }
                        }} maxLength={512} tabIndex={0} className="block w-full min-h-28 h-full px-0 text-base text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder={`${decryptedText ? decryptedText : 'Type your thoughts '}`} required ></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}   