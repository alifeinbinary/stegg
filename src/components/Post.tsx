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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDownload, faShare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getMetadata } from "meta-png"
import { PostProps } from "../types";
import Password from "./Password";
import { usePostState } from "../utils/stores";
import { useEffect } from "react";
import { handleDecrypt } from "../utils/encryption";

function Post({ id, author, posted, image }: PostProps) {

    const {
        input,
        password, setPassword,
        encryptionEnabled, setEncryptionEnabled,
        setOutput,
        stringToDecrypt, setStringToDecrypt,
        decryptedText, setDecryptedText,
        setEncryptedText
    } = usePostState();

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

    const convertUrlToUint8Array = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const imageArray = new Uint8Array(arrayBuffer);
        return imageArray;
    };

    useEffect(() => {
        const convertImage = async () => {
            const imageArray = await convertUrlToUint8Array(image as string);
            const stringToDecrypt = getMetadata(imageArray, 'Message')
            if (password.length > 0 && stringToDecrypt) {
                handleDecrypt(stringToDecrypt, password, setDecryptedText);
            }
        };
        convertImage();
    }, [password]);

    useEffect(() => {
        if (decryptedText.length > 0) {
            console.log("decryptedText: ", decryptedText);
        }
    }, [decryptedText]);

    return (
        <div className="group/image transition duration-350 ease-out pb-4" id={id}>
            <div className="flex flex-shrink-0 pb-0">
                <div className="flex items-top bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 p-4 rounded-t-lg">
                    <div className="px-3">
                        <p className="items-center text-left text-base leading-6 font-medium text-gray-900 dark:text-white">
                            {author}
                            <FontAwesomeIcon className="mx-3" icon={faUser} />
                            <span className="ml-1 dark:text-white text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-300 transition ease-out duration-150">
                                Posted {new Date(posted).toDateString()}
                            </span>
                            <br />
                            <span className="text-xs dark:text-gray-300 leading-5 font-medium text-gray-500 group-hover:text-gray-300 transition ease-out duration-150">
                                ID: {id.toString().match(/^[^#]+/)![0]}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-base text-left width-auto font-medium dark:text-white flex-shrink">

                </p>
                <div className="">
                    <div className="flex pt-10 px-7 bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 rounded-tr-lg transition-colors duration-300 peer/image">
                        {decryptedText ? <p className="text-xl text-left width-auto font-medium text-gray-900 dark:text-white flex-shrink pb-10">{decryptedText}</p> : <img
                            className="rounded-2xl feed-image"
                            src={image}
                            alt="Binary Image Post `{id}`"
                        />}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="w-full max-w-56 bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 px-3 py-2 rounded-b-lg xs:rounded-b-none xs:rounded-bl-lg">
                        <div className="flex items-center">
                            <div className="flex-1 flex items-center p-3 dark:text-white text-lg text-gray-400 hover:text-red-600 dark:hover:text-red-600 transition duration-350 ease-in-out">
                                <button className="inline-flex h-9 w-9 items-center transition ease-in-out duration-300 cursor-pointer px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-gray-200 hover:ring-transparent text-gray-900 hover:bg-lightgreen hover:text-white focus:ring-blue-200 focus:ring-4" onClick={() => toast.info("Image downloaded.")} disabled={handleSaveVisibility()}>
                                    <FontAwesomeIcon icon={faDownload} />
                                </button>
                            </div>
                            <div className="flex-1 flex items-center p-3 dark:text-white text-lg text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition duration-350 ease-in-out">
                                <button className="inline-flex h-9 w-9 items-center transition ease-in-out duration-300 cursor-pointer px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-gray-200 hover:ring-transparent text-gray-900 hover:bg-seablue hover:text-white focus:ring-blue-200 focus:ring-4" onClick={() => toast.info("Image downloaded.")} disabled={handleSaveVisibility()}>
                                    <FontAwesomeIcon icon={faShare} />
                                </button>
                            </div>
                            <div className="flex-1 flex items-center p-3 dark:text-white text-lg text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition duration-350 ease-in-out">
                                <button className="inline-flex h-9 w-9 items-center transition ease-in-out duration-300 cursor-pointer px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-gray-200 hover:ring-transparent text-gray-900 hover:bg-orange hover:text-white focus:ring-blue-200 focus:ring-4" onClick={() => toast.info("Image downloaded.")} disabled={handleSaveVisibility()}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-auto max-w-72 bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 px-3 py-2 rounded-b-lg xs:rounded-b-none xs:rounded-br-lg">
                        <Password password={password} setPassword={setPassword} encryptionEnabled={encryptionEnabled} setEncryptionEnabled={setEncryptionEnabled} decryptedText={decryptedText} setDecryptedText={setDecryptedText} setOutput={setOutput} stringToDecrypt={stringToDecrypt} setStringToDecrypt={setStringToDecrypt} setEncryptedText={setEncryptedText} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;