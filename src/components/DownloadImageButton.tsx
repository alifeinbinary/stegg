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
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { createPngWithMetadata } from '../utils/save';
import { clearContx } from '../utils/translate';

interface DownloadImageButtonProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    encryptedText: string;
    setEncryptedText: React.Dispatch<React.SetStateAction<string>>;
    setDecryptedText: React.Dispatch<React.SetStateAction<string>>;
    encryptionEnabled: boolean;
    setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    setOutput: React.Dispatch<React.SetStateAction<string[]>>;
}

const DownloadImageButton: React.FC<DownloadImageButtonProps> = ({ canvasRef, input, setInput, password, setPassword, encryptedText, setEncryptedText, setDecryptedText, encryptionEnabled, setEncryptionEnabled, setOutput }) => {

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

    const handleDownload = async () => {
        if (canvasRef.current && input) {
            if (encryptionEnabled) {
                await createPngWithMetadata(canvasRef.current, encryptedText, encryptionEnabled, password);
            } else {
                await createPngWithMetadata(canvasRef.current, input, encryptionEnabled, password);
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
            <button data-tooltip-target="tooltip-save" data-tooltip-trigger="hover" type="submit" tabIndex={0} id="btn-download" onClick={handleDownload} disabled={!input.length} className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center rounded-lg ${handleSaveVisibility() ? 'cursor-not-allowed text-gray-600 bg-gray-200 focus:ring-0 hover:ring-transparent' : 'text-white bg-blue-900 hover:bg-blue-800 focus:ring-blue-200 focus:ring-4'}`}>
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span className='sr-only'>Download</span>
            </button><div id="tooltip-save" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Save to disk
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </>
    );
};

export default DownloadImageButton;