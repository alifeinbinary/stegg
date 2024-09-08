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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useDropzone } from "react-dropzone"
import { getMetadata } from "meta-png"
import { toast } from "react-toastify"
import { DropzoneProps } from "../types"

export const FileUploader: React.FC<DropzoneProps> = ({ setInput, setEncryptionEnabled, setStringToDecrypt, password, setPassword, setDecryptedText }) => {
    const onDrop = (acceptedFiles: File[]) => {

        const strToBool = (str: string): boolean => {
            if (str.toLowerCase() === 'true') return true;
            if (str.toLowerCase() === 'false') return false;
            throw new Error('Invalid boolean string');
        };

        setInput("");
        if (!password) {
            setPassword('');
            setDecryptedText('');
        }

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onloadend = () => {
                // Get the binary string from the image file and make it a Uint8Array
                const binaryStr = reader.result
                const imageArray = new Uint8Array(binaryStr as ArrayBuffer)

                // Pull metadata values from the png image
                try {
                    const stringToDecrypt = getMetadata(imageArray as Uint8Array, 'Message')
                    const encryptionState = getMetadata(imageArray as Uint8Array, 'Encrypted')?.toLowerCase();

                    if (!encryptionState && !stringToDecrypt) {
                        toast.error("Image not compatible with the translator or it has had it's metadata stripped in transit.",
                            {
                                autoClose: 5000,
                                pauseOnHover: true
                            }
                        );
                        return
                    } else if (!encryptionState && stringToDecrypt) {
                        setInput(stringToDecrypt as string)
                        toast.error('No encryption state found, however, a message is contained within the PNG file.');
                    } else if (encryptionState && !stringToDecrypt) {
                        toast.error('An encryption state was found, however, there is no message found within the PNG file.');
                    } else if (encryptionState && stringToDecrypt) {
                        if (strToBool(encryptionState)) {
                            setEncryptionEnabled(true)
                            setStringToDecrypt(stringToDecrypt as string)
                            toast.info("Please provide the secret key to decrypt the message", {
                                autoClose: 4000,
                                pauseOnHover: true
                            });
                        } else {
                            setEncryptionEnabled(false)
                            setPassword('')
                            setStringToDecrypt(stringToDecrypt as string)
                        }
                        return
                    } else {
                        return
                    }
                } catch (error) {
                    toast.error("Only PNG files generated with this translator are supported.", {
                        autoClose: 5000,
                        pauseOnHover: true
                    });
                    console.log("Error: " + error);
                    return
                }
            }
            reader.readAsArrayBuffer(file)
        })
    }

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop, noClick: true, noKeyboard: true, accept: { 'image/png': ['.png'] } })
    return (
        <div className='w-full h-full'>
            <h4 className="mb-2 h4 text-2xl sm:hidden xs:hidden text-left font-bold dark:text-white">Decrypt</h4>
            <div className="flex items-center justify-center w-full h-64 xs:h-32">
                <label {...getRootProps()} onChange={() => onDrop(acceptedFiles)} tabIndex={0} htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full px-2 border-2 border-gray-300 border-dashed rounded-lg xs:rounded-none xs:rounded-b-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center ">
                        <FontAwesomeIcon icon={faUpload} className="w-10 h-10 mb-3 text-gray-400 sm:hidden xs:hidden" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop to extract message</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG format only</p>
                    </div>
                    <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
        </div>
    )
}
