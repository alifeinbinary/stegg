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
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { clearContx } from '../utils/translate';
// import { useAppState } from '../utils/stores';
import { PasswordProps } from '../types';

export const Password: React.FC<PasswordProps> = ({ password, setPassword, setEncryptionEnabled, encryptionEnabled, setOutput, setDecryptedText, decryptedText, setStringToDecrypt, stringToDecrypt, setEncryptedText }) => {


    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        <label className='relative inline-flex cursor-pointer select-none items-center'>
            <input
                type='checkbox'
                checked={encryptionEnabled ? encryptionEnabled : false}
                onChange={handleCheckboxChange}
                className='sr-only'
                data-tooltip-target="tooltip-encryption"
                data-testid="toggle-encryption"
                aria-checked={encryptionEnabled}
            />
            <div id="tooltip-encryption" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Enable AES 128-bit encryption
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div tabIndex={0} className='shadow-card p-1 flex h-[46px] items-center justify-center rounded-md text-gray-900 bg-gray-200'>
                <span
                    className={`flex h-9 w-9 items-center transition ease-in-out duration-300 justify-center rounded ${!encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-bergundy hover:bg-deepbergundy text-white'
                        }`}
                >
                    <FontAwesomeIcon icon={faLock} className="w-4 h-4" aria-hidden="true" />
                </span>
                <span
                    className={`flex h-9 w-9 items-center transition ease-in-out duration-300 justify-center rounded ${encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-lightbergundy hover:bg-bergundy text-white'
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
                }} data-testid="password-input" value={password} type="text" tabIndex={0} id="password-input" disabled={!encryptionEnabled} className={`text-base ml-1 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-bergundy focus:border-bergundy block flex-1 min-w-0 max-w-40 w-full border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bergundy dark:focus:border-bergundy`} placeholder={encryptionEnabled ? 'Enter a secret key' : 'Enable encryption'} />
            </div>
        </label>
    )
}

export default Password