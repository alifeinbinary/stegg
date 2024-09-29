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
import { CustomFlowbiteTheme, Tooltip } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { clearContx } from '../utils/translate';
// import { useAppState } from '../utils/stores';
import { PasswordProps } from '../types';
import { useTranslation } from "react-i18next";

export const Password: React.FC<PasswordProps> = ({ password, setPassword, setEncryptionEnabled, encryptionEnabled, setOutput, setDecryptedText, decryptedText, setStringToDecrypt, stringToDecrypt, setEncryptedText }) => {

    const { t } = useTranslation();

    const toastId = useRef("save");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleCheckboxChange = () => {
        setEncryptionEnabled(!encryptionEnabled)
        toast.update(toastId.current, {
            render: "Encryption " + (!encryptionEnabled ? "enabled." : "disabled. Message will be embedded as plain text."),
            type: "info",
            isLoading: false,
            autoClose: 1000,
        })
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

    const lockTooltop: CustomFlowbiteTheme["tooltip"] = {
        target: "flex",
    }

    return (
        <label className='relative inline-flex cursor-pointer select-none items-center'>
            <input
                type='checkbox'
                name='encryption'
                checked={encryptionEnabled ? encryptionEnabled : false}
                onChange={handleCheckboxChange}
                className='sr-only'
                data-tooltip-target="tooltip-encryption"
                data-testid="toggle-encryption"
                aria-checked={encryptionEnabled}
            />
            <div tabIndex={0} className='shadow-card p-1 flex h-[46px] items-center justify-center rounded-md text-gray-900 bg-gray-200 dark:bg-seablue'>
                <Tooltip content={t('password.tooltip.content')} trigger="hover" placement="top" theme={lockTooltop}>
                    <span
                        className={`flex h-9 w-9 items-center transition ease-in-out duration-300 justify-center rounded-l-md ${!encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-sagegreen/[0.8] hover:bg-sagegreen/[1.0] text-white'
                            }`}
                    >
                        <FontAwesomeIcon icon={faLock} className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span
                        className={`flex h-9 w-9 items-center transition ease-in-out duration-300 justify-center rounded-r-md ${encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-lightbergundy hover:bg-bergundy text-white'
                            }`}
                    >
                        <FontAwesomeIcon icon={faUnlock} className="w-4 h-4" aria-hidden="true" />
                    </span>
                </Tooltip>
                <input onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.trim() === '') {
                        setEncryptedText('');
                        setDecryptedText('')
                        clearContx(canvasRef);
                    }
                }} data-testid="password-input" value={password} type="text" tabIndex={0} id="password-input" disabled={!encryptionEnabled} className={`text-base ml-1 rounded-none rounded-e-lg bg-gray-100 border text-gray-900 focus:ring-transparent focus:border-gray-200 block flex-1 min-w-0 max-w-40 w-full border-gray-200 p-2.5 dark:bg-gray-200 dark:text-gray-900 dark:border-seablue dark:placeholder-gray-400 dark:focus:ring-transparent dark:focus:border-seablue`} placeholder={encryptionEnabled ? t("password.hint") : t("password.enable")} />
            </div>
        </label>
    )
}

export default Password