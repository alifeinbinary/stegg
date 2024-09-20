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

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Button, List, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import { useImageState } from "../utils/stores";
import { clearContx } from "../utils/translate";
import DownloadImageButton from "./DownloadImageButton";
import Slider from "./NodeSize";
import { Password } from "./Password";
import PostImageButton from "./PostImageButton";

export const TextArea: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);

    const {
        input,
        setInput,
        setOutput,
        password,
        setPassword,
        encryptionEnabled,
        setEncryptionEnabled,
        setEncryptedText,
        decryptedText,
        setDecryptedText,
        stringToDecrypt,
        setStringToDecrypt,
    } = useImageState();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const buttonTheme: CustomFlowbiteTheme["button"] = {
        color: {
            primary: "bg-none",
        },
        base: "flex-none",
        inner: {
            base: "px-0",
        },
    };

    return (
        <div className="w-full">
            <span className="flex flex-row justify-between pt-2 text-white">
                <div className="grid w-full grid-cols-2 xs:grid-cols-2">
                    <h4 className="h4 sm:visible md:visible lg:visible mb-2 text-left text-2xl font-bold xs:invisible dark:text-white">
                        Encrypt
                    </h4>
                    <p className="col-span-1 flex flex-row-reverse text-right font-medium xs:mr-0 xs:pb-2 xs:text-right">
                        {/* <!-- Modal toggle --> */}
                        <Button
                            onClick={() => setOpenModal(true)}
                            theme={buttonTheme}
                            color={"primary"}
                            type="button"
                        >
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="tranistion-colors ml-1 text-lg text-seablue duration-300 ease-linear hover:text-white"
                            />
                        </Button>
                    </p>
                </div>
            </span>
            {/* <!-- Main modal --> */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>How to use this app</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="text-base leading-relaxed">
                            <List>
                                <List.Item className="text-gray-700 dark:text-gray-100">
                                    Type your message, click to encrypt if
                                    desired, and save/share - only those with
                                    the password can access it.
                                </List.Item>
                                <List.Item className="text-gray-700 dark:text-gray-100">
                                    Drop image in here and use the password
                                    given to decode the message.
                                </List.Item>
                            </List>
                        </div>
                    </div>
                    <h5 className="text-md mt-5 font-bold text-gray-800 dark:text-gray-200">
                        Caveats
                    </h5>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-100">
                        As a security measure, some operating systems, notably
                        iOS, strip metadata from images to prevent malicious
                        code from executing on your phone. This means that
                        images you pass along to a third party won't be able to
                        be decrypted if they have been sent from your iPhone.
                    </p>
                    <h5 className="text-md mt-5 font-bold text-gray-800 dark:text-gray-200">
                        Security disclaimer
                    </h5>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-100">
                        Images shared to the feed are stored on a server until
                        they are deleted or expire, however, the plain text
                        message is never sent to our servers. All encryption is
                        calculated by your web browser, so only the encrypted
                        message is stored to the image's metadata, which{" "}
                        <i>is</i> temporarily hosted on our servers. This novel
                        app is meant for educational and entertainment purposes.
                        That being said, it uses 128-bit AES encryption, so it's
                        about as secure as you can get.
                    </p>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer> */}
            </Modal>
            <form className="h-full min-h-48">
                <div className="sm:mb-0 sm:rounded-none sm:rounded-t-lg mb-4 min-h-48 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-slate-900 xs:mb-0 xs:rounded-none xs:rounded-t-lg">
                    <div className="flex items-center justify-between border-b px-3 py-2 dark:border-slate-700">
                        <div className="sm:divide-x sm:rtl:divide-x-reverse flex flex-wrap items-center divide-gray-200 dark:divide-gray-600">
                            <div className="sm:ps-4 flex flex-wrap items-center space-x-1 rtl:space-x-reverse">
                                <DownloadImageButton />
                            </div>
                        </div>
                        <Slider />
                        <div className="sm:w-56 flex">
                            <Password
                                password={password}
                                setPassword={setPassword}
                                setEncryptedText={setEncryptedText}
                                encryptionEnabled={encryptionEnabled}
                                setEncryptionEnabled={setEncryptionEnabled}
                                setOutput={setOutput}
                                decryptedText={decryptedText}
                                setDecryptedText={setDecryptedText}
                                stringToDecrypt={stringToDecrypt}
                                setStringToDecrypt={setStringToDecrypt}
                            />
                        </div>
                    </div>
                    <div className="light:bg-white px-4 py-2 dark:bg-slate-700">
                        <textarea
                            rows={4}
                            id="text-input"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                if (e.target.value.trim() === "") {
                                    setEncryptedText("");
                                    clearContx(canvasRef);
                                    setOutput([]);
                                }
                            }}
                            data-testid="text-input"
                            maxLength={254}
                            tabIndex={0}
                            className="block h-full min-h-28 w-full border-0 bg-white px-0 text-base text-gray-800 focus:ring-0 dark:!bg-slate-700 dark:text-white dark:placeholder-gray-400"
                            placeholder={`${decryptedText ? decryptedText : "Type your thoughts"}`}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end border-b px-3 py-2 dark:border-gray-600">
                        <div className="sm:divide-x sm:rtl:divide-x-reverse flex flex-wrap items-center divide-gray-200 dark:divide-gray-600">
                            <div className="sm:ps-4 flex flex-wrap items-center space-x-1 rtl:space-x-reverse">
                                <PostImageButton />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
