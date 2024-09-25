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

import { Tooltip } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { createPngWithMetadata } from '../utils/save';
import { clearContx } from '../utils/translate';
import { useImageState } from '../utils/stores';
import { useTranslation } from 'react-i18next';

const DownloadImageButton: React.FC = () => {

    const { t } = useTranslation();

    const {
        canvasRef,
        input, setInput,
        setOutput,
        encryptionEnabled, setEncryptionEnabled,
        password, setPassword,
        encryptedText, setEncryptedText,
        setDecryptedText
    } = useImageState();

    const handleSaveVisibility = () => {
        if (encryptionEnabled) {
            if (!password || !input) {
                return true;
            } else {
                return false;
            }
        } else {
            if (input.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    };

    const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const action = "download";

        if (canvasRef && canvasRef.current && input) {
            if (encryptionEnabled) {
                await createPngWithMetadata(canvasRef.current, encryptedText, encryptionEnabled, password, action);
            } else {
                await createPngWithMetadata(canvasRef.current, input, encryptionEnabled, password, action);
            }

            clearContx(canvasRef);
        }

        setInput("");
        setPassword("");
        setEncryptedText("");
        setDecryptedText("");
        setEncryptionEnabled(false);
        setOutput([]);
    };

    return (
        <>
            <Tooltip content={input.length ? t("downloadimagebutton.tooltip.title") : t("downloadimagebutton.tooltip.hint")} placement="top">
                <label htmlFor="btn-download" className="sr-only">{t("downloadimagebutton.label")}</label>
                <button onClick={handleDownload} disabled={!input.length} type="submit" tabIndex={0} id="btn-download" className={`inline-flex justify-center items-center h-9 w-9 text-sm font-medium text-center transition ease-in-out duration-300 rounded-lg ${handleSaveVisibility() ? 'cursor-not-allowed text-gray-600 bg-gray-200/[0.5] focus:ring-0 hover:ring-transparent' : 'text-white bg-sagegreen/[0.8] dark:bg-sagegreen dark:text-slate-900 dark:hover:bg-gray-300 hover:bg-sagegreen/[1.0] focus:ring-4'}`}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    <span className='sr-only'>{t("downloadimagebutton.label")}</span>
                </button>
            </Tooltip>
        </>
    );
};

export default DownloadImageButton;