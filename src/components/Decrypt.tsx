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
import { Trans, useTranslation } from "react-i18next"

/**
 * Component for decrypting PNG files containing a message.
 * 
 * The component contains a drop zone for the user to upload a PNG file containing a message.
 * The component will automatically extract the message from the PNG file and set the state
 * of the application to the extracted message.
 * 
 * If the PNG file contains an encryption state, the component will automatically set the
 * state of the application to the extracted message and the encryption state.
 * 
 * If the user has not provided a password, the component will prompt the user to enter a
 * password to decrypt the message.
 * 
 * The component will display an error message if the PNG file is not compatible with the
 * translator or has had its metadata stripped in transit.
 * 
 * The component will display an error message if the PNG file contains an encryption state
 * but no message.
 * 
 * The component will display an error message if the PNG file does not contain an encryption
 * state but a message is present.
 * 
 * The component will display an error message if the PNG file contains an encryption state
 * and a message, but the encryption state is invalid.
 * 
 * The component will display an error message if the PNG file contains an encryption state
 * and a message, but the encryption state is valid, but the message is empty.
 * 
 * The component will display an error message if the PNG file contains an encryption state
 * and a message, but the encryption state is valid, and the message is not empty, but the
 * user has not provided a password.
 * 
 * @param {DropzoneProps} props - The properties for the component.
 * @param {string} props.password - The password for decryption.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setDecryptedText - The function to set the decrypted text.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setStringToDecrypt - The function to set the string to decrypt.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setEncryptionEnabled - The function to set the encryption state.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setInput - The function to set the input text.
 * @return {JSX.Element} - The component.
 */
const Decrypt: React.FC<DropzoneProps> = ({ setInput, setEncryptionEnabled, setStringToDecrypt, password, setPassword, setDecryptedText }) => {

    const { t } = useTranslation();

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
        <div className='w-full h-full pt-2 sm:pt-0 xs:pt-0'>
            <h4 className="mb-2 h4 text-2xl sm:hidden xs:hidden text-left font-bold dark:text-white">{t('decrypt.title')}</h4>
            <div {...getRootProps()} className="flex items-center justify-center w-full h-[17em] xs:h-32 mb-4 sm:mb-0 xs:mb-0">
                <label onChange={() => onDrop([...acceptedFiles])} tabIndex={0} htmlFor="dropzone-file" className="flex transition ease-in-out duration-300 flex-col items-center justify-center w-full h-full px-2 border-2 border-gray-300 border-dashed rounded-lg xs:rounded-none xs:rounded-b-lg cursor-pointer bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center text-center">
                        <FontAwesomeIcon icon={faUpload} className="w-10 h-10 mb-3 text-gray-400 sm:hidden xs:hidden" />
                        <Trans i18nKey="decrypt.description" components={{ span: <span />, p: <p /> }}><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop to extract message</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG format only</p></Trans>
                    </div>
                    <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
        </div>
    )
}

export default Decrypt;