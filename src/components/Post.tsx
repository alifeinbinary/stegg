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
import { faUser, faDownload } from "@fortawesome/free-solid-svg-icons";
import { getMetadata } from "meta-png";
import { PostProps } from "../types";
import Password from "./Password";
import { usePostState } from "../utils/stores";
import { Suspense, useEffect } from "react";
import { handleDecrypt } from "../utils/encryption";
import { useTranslation } from "react-i18next";
import { Spinner } from "flowbite-react/components/Spinner";
import { saveAs } from "file-saver";

/**
 * A single post in the feed, displaying the image and allowing the user to input a password to decrypt the image.
 * 
 * @param id The ID of the post
 * @param author The author of the post
 * @param posted The date the post was posted
 * @param image The URL of the image in the post
 * @param width The width of the image in the post
 * @param height The height of the image in the post
 * @returns A JSX element representing the post
 */
function Post({ id, author, posted, image, width, height }: PostProps) {

    const { t } = useTranslation();

    const postState = usePostState((state) => state.posts[id]);
    const setPostState = usePostState((state) => state.setPostState);

    // Initialize the state for this post if it doesn't exist
    useEffect(() => {
        if (!postState) {
            setPostState(id, {
                input: "",
                password: "",
                output: [],
                image: image as string,
                width: width,
                height: height,
                encryptedText: "",
                decryptedText: "",
                author: author,
                stringToDecrypt: "",
                encryptionEnabled: false,
            });
        }
    }, [id, image, author, postState, setPostState]);

    // const handleSaveVisibility = () => {
    //     if (postState?.encryptionEnabled) {
    //         return !(postState.password && postState.input);
    //     }
    //     return !postState?.input.length;
    // };

    const handleImageDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (postState?.image) {
            const url = postState?.image;
            const filename = url.split("/").pop();
            if (filename) {
                fetch(url)
                    .then(response => response.blob())
                    .then(blob => saveAs(blob, filename));
            } else {
                console.log("Failed to get filename");
            }
        } else {
            console.log("No image to download");
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
            const imageArray = await convertUrlToUint8Array(postState?.image as string);
            const stringToDecrypt = getMetadata(imageArray, "Message");
            if (postState?.password && stringToDecrypt) {
                handleDecrypt(stringToDecrypt, postState.password, (decrypted) =>
                    setPostState(id, { decryptedText: decrypted })
                );
            }
        };
        if (postState?.password) convertImage();
    }, [postState?.password, id, postState?.image, setPostState]);

    return (
        <div className="group/image transition duration-350 ease-out pb-4" id={id} key={id}>
            <div className="flex flex-shrink-0 pb-0">
                <div className="flex items-top bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 p-4 xs:pb-0 rounded-t-lg">
                    <div className="px-3 xs:px-0">
                        <p className="items-center text-left text-base leading-6 font-medium text-gray-900 dark:text-white">
                            <span className="text-gray-900 dark:text-white xs:flex items-center">{author}<FontAwesomeIcon className="mx-2" icon={faUser} /></span>
                            <span className="dark:text-white text-sm xs:text-xs leading-5 font-medium text-gray-700 group-hover:text-gray-300 transition ease-out duration-150">{t('post.posted')} {new Date(posted).toDateString()}
                            </span>
                            <br />
                            <span className="text-xs dark:text-gray-300 leading-5 font-medium text-gray-500 group-hover:text-gray-300 transition ease-out duration-150">
                                ID: {id.toString().match(/^[^#]+/)![0].slice(0, 9)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="min-h-max">
                    <div className="flex items-center justify-center pt-5 pb-3 px-7 xs:px-4 xs:pt-5 xs:pb-0 bg-gray-50 xs:min-h-[140px] h-full dark:bg-slate-900 group-hover/image:dark:bg-slate-700 rounded-tr-lg transition-colors duration-300 peer/image">
                        {!postState?.image ? <Spinner color="gray" aria-label="Loading" /> : null}
                        {postState?.decryptedText ? (
                            <p className="flex items-center justify-center break-words text-wrap text-xl text-left w-full font-medium text-gray-900 dark:text-white flex-shrink pb-10 min-h-[415px]" style={{ overflowWrap: "anywhere" }}>
                                {postState.decryptedText}
                            </p>
                        ) : (
                            <Suspense fallback={<Spinner color="gray" aria-label="Loading" />}>
                                <img className="remove-watermark" src={postState?.image} alt={"Binary image " + id} width={postState?.width} height={postState?.height} />
                            </Suspense>
                        )}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="max-w-56 bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 px-3 py-2 rounded-b-lg xs:rounded-b-lg xs:rounded-bl-lg">
                        <div className="flex items-center">
                            <div className="flex-1 flex items-center p-3 xs:px-1 xs:py-2 dark:text-white text-lg text-gray-400 hover:text-red-600 dark:hover:text-red-600 transition duration-350 ease-in-out">
                                <button aria-label="Download image" title="Download image" className="inline-flex h-9 w-9 items-center transition ease-in-out duration-300 cursor-pointer px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-gray-200 hover:ring-transparent text-gray-900 hover:bg-lightgreen hover:text-white focus:ring-blue-200 focus:ring-4" onClick={handleImageDownload}>
                                    <FontAwesomeIcon icon={faDownload} />
                                </button>
                            </div>
                            {/* <div className="flex-1 flex items-center p-3 dark:text-white text-lg text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition duration-350 ease-in-out">
                                <button aria-label="Send image by email" title="Send image by email" className="inline-flex h-9 w-9 items-center transition ease-in-out duration-300 cursor-pointer px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-gray-200 hover:ring-transparent text-gray-900 hover:bg-seablue hover:text-white focus:ring-blue-200 focus:ring-4" onClick={() => toast.info("Image downloaded.")} disabled={handleSaveVisibility()}>
                                    <FontAwesomeIcon icon={faShare} />
                                </button>
                            </div> */}
                            {/* <div className="flex-1 flex items-center p-3 dark:text-white text-lg text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition duration-350 ease-in-out">
                                <button aria-label="Delete post" className="inline-flex h-9 w-9 items-center transition ease-in-out duration-300 cursor-pointer px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-gray-200 hover:ring-transparent text-gray-900 hover:bg-orange hover:text-white focus:ring-blue-200 focus:ring-4" onClick={() => toast.info("Image downloaded.")} disabled={handleSaveVisibility()}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center width-auto max-w-72 bg-gray-50 dark:bg-slate-900 group-hover/image:dark:bg-slate-700 px-3 py-2 rounded-b-lg xs:rounded-b-lg xs:rounded-br-lg">
                        <Password
                            password={postState?.password || ""}
                            setPassword={(value) => setPostState(id, { password: value })}
                            encryptionEnabled={postState?.encryptionEnabled || false}
                            setEncryptionEnabled={(value) => setPostState(id, { encryptionEnabled: value })}
                            decryptedText={postState?.decryptedText || ""}
                            setDecryptedText={(value) => setPostState(id, { decryptedText: value })}
                            setOutput={(value) => setPostState(id, { output: value })}
                            stringToDecrypt={postState?.stringToDecrypt || ""}
                            setStringToDecrypt={(value) => setPostState(id, { stringToDecrypt: value })}
                            setEncryptedText={(value) => setPostState(id, { encryptedText: value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
