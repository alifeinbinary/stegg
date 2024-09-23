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
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "flowbite-react";
import { useCreateBinaryFeedImage } from "../api/createBinaryFeedImage";
import { useCreateBinaryImagePost } from "../api/createBinaryImagePost";
import { useGetPreSignedPostPayload } from "../api/getPreSignedPostPayload";
import { clearContx } from "../utils/translate";
import { createPngWithMetadata } from "../utils/save";
import { usePostState, useImageState } from "../utils/stores";
import { toast } from "react-toastify";
import { uploadFileToS3 } from "../api/uploadFileToS3";

const PostImageButton: React.FC = () => {

    const {
        author, setAuthor
    } = usePostState();

    const {
        canvasRef,
        input,
        password,
        encryptedText,
        encryptionEnabled,
        setOutput
    } = useImageState();

    const { getPreSignedPostPayload } = useGetPreSignedPostPayload();
    const { createBinaryFeedImage } = useCreateBinaryFeedImage();
    const { createBinaryImagePost } = useCreateBinaryImagePost();

    const handlePostVisibility = () => {
        if (encryptionEnabled) {
            if (!input || !password) {
                return true;
            } else {
                return false;
            }
        } else if (!encryptionEnabled) {
            if (!input) {
                return true;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    const fetchBlobAndGetSize = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return { blob, size: blob.size };
    };

    const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const toastId = toast("Processing image...", { autoClose: false, isLoading: true });

        if (canvasRef && canvasRef.current && input) {

            if (encryptionEnabled) {

                toast.update(toastId, {
                    render: "Embedding metadata...",
                    type: "info",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 0.0
                });

                // CREATE PNG WITH METADATA
                const { fileName, url } = await createPngWithMetadata(canvasRef.current, encryptedText, encryptionEnabled, password, "post");

                console.debug("fileName", fileName, "url", url);
                toast.update(toastId, {
                    render: "Determining the size of the image...",
                    type: "info",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 0.14
                })

                // GET BLOB FROM PNG AND FILE SIZE
                const { blob, size } = await fetchBlobAndGetSize(url);

                console.debug("blob", blob, "size", size);
                toast.update(toastId, {
                    render: "Getting presigned post payload...",
                    type: "info",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 0.28
                })

                // GET PRE-SIGNED POST PAYLOAD
                const { data } = await getPreSignedPostPayload({
                    name: fileName,
                    type: "image/png",
                    size: size,
                })

                console.debug("data", data);
                toast.update(toastId, {
                    render: "Uploading to S3 bucket...",
                    type: "info",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 0.42
                })

                const preSignedPostPayload = data?.fileManager.getPreSignedPostPayload.data;

                console.debug("preSignedPostPayload", preSignedPostPayload);

                // UPLOAD FILE TO STORAGE
                await uploadFileToS3(
                    preSignedPostPayload,
                    blob,
                );

                // CONNECT THE FILE UPLOAD TO THE DATABASE REFERENCE OF THE IMAGE FILE
                const fileInput = {
                    ...preSignedPostPayload.file,
                    tags: ["binary-image"],
                    aliases: [],
                    location: { folderId: "66dab76c9c00420008532f91" },
                };
                delete fileInput.__typename;

                console.debug("fileInput", fileInput);
                toast.update(toastId, {
                    render: "Creating binary feed image...",
                    type: "info",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 0.57
                })

                const createdFile = await createBinaryFeedImage(fileInput);

                console.debug("createdFile", createdFile);
                toast.update(toastId, {
                    render: "Creating binary image post...",
                    type: "info",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 0.71
                })

                // CREATE BINARY IMAGE POST ENTRY WITH IMAGE, AUTHOR, AND DATE
                const authorOrAnon = author ? author : "Anon";
                await createBinaryImagePost(authorOrAnon, preSignedPostPayload.file.key);

                console.debug("Image uploaded successfully");
                toast.update(toastId, {
                    type: "success",
                    render: "Image uploaded successfully",
                    isLoading: false,
                    autoClose: 2000,
                    progress: 1.0
                })

            } else {
                // IF ENCRYPTION IS DISABLED
                console.debug("Encryption disabled");
                toast.update(toastId, {
                    type: "warning",
                    render: "Encryption disabled. Only encrypted messages can be posted.",
                    isLoading: false,
                    autoClose: 2000
                });
            }
            clearContx(canvasRef);
            setOutput([]);
        } else {
            // IF NO CANVAS IMAGE OR INPUT TEXT EXISTS
            console.debug("No canvasRef or input");
            toast.update(toastId, {
                type: "warning",
                render: "No image to upload.",
                isLoading: false,
                autoClose: 2000
            })
        }
    };

    return (
        <div tabIndex={0} className='shadow-card p-1 flex h-[46px] items-center justify-center rounded-md text-gray-900 bg-gray-200 dark:bg-seablue'>
            <input onChange={(e) => {
                setAuthor(e.target.value);
            }} data-testid="user-input" value={author} type="text" tabIndex={0} id="user-input" disabled={false} className={`text-base rounded-none rounded-l-lg max-w-40 bg-gray-100 dark:bg-gray-100 border text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 transition-width ease-in-out duration-1000 ${handlePostVisibility() ? 'w-0 px-0 py-2.5' : 'w-full p-2.5'} border-gray-200 focus:border-gray-200 dark:bg-gray-200 dark:border-seablue dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-none dark:focus:border-none`} placeholder={"Author Name"} />
            <Tooltip content={password.length && input.length ? "Post image to the feed" : "Please enter a message and password before posting"} placement="bottom">
                <button onClick={(e) => {
                    handleButtonClick(e)
                }} disabled={!password.length || !input.length} className={`flex p-2 h-full w-20 ml-1 items-center justify-center transition ease-in-out duration-300 rounded text-base ${handlePostVisibility() ? 'cursor-not-allowed text-gray-600 bg-gray-200/[0.5] focus:ring-0 hover:ring-transparent' : 'text-white bg-sagegreen/[0.8] hover:bg-sagegreen/[1.0] focus:ring-blue-200 focus:ring-4'}`}>
                    Post <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 pl-2" aria-hidden="true" />
                </button>
            </Tooltip>
        </div>
    );
};

export default PostImageButton;