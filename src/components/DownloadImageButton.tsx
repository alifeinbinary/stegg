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

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Tooltip } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { displayDimensions, createPngWithMetadata } from "../utils/save";
import { useImageState } from "../utils/stores";
import { clearContx } from "../utils/translate";
import { toast } from "react-toastify";
import { customDropdownTheme } from "../utils/customTheme";

/**
 * DownloadImageButton is a component that generates a dropdown menu with different image
 * dimensions that can be downloaded with the input text embedded in the image.
 *
 * If the encryptionEnabled state is true, the component will only be clickable if the
 * password and input states are not empty.
 *
 * When the user clicks the download button, the component will call the createPngWithMetadata
 * function to generate a PNG image with the input text embedded in the image, and the
 * image dimensions set to the selected value from the dropdown menu.
 *
 * The component will also call the clearContx function to clear the canvas context.
 *
 * The component will display a tooltip with the input length and the translation for
 * "downloadimagebutton.tooltip.title" if the input length is greater than 0.
 * Otherwise, the tooltip will display the translation for "downloadimagebutton.tooltip.hint".
 *
 * The component will also display a label with the translation for "downloadimagebutton.label".
 * The label will be hidden from screen readers.
 *
 * The component will be disabled if the input length is 0.
 */
const DownloadImageButton: React.FC = () => {
    const { t } = useTranslation();

    const {
        canvasRef,
        input,
        setInput,
        setOutput,
        encryptionEnabled,
        setEncryptionEnabled,
        password,
        setPassword,
        encryptedText,
        setEncryptedText,
        setDecryptedText,
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

    const handleDownload = async (key: string) => {
        const action = "download";
        const toastId = toast("Saving...", { autoClose: false, isLoading: true });

        if (canvasRef && canvasRef.current && input) {
            const canvas = canvasRef.current;
            await createPngWithMetadata(canvas, key, action, encryptionEnabled, encryptedText, input, toastId);
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
            <Tooltip
                content={
                    input.length
                        ? t("downloadimagebutton.tooltip.title")
                        : t("downloadimagebutton.tooltip.hint")
                }
                placement="top-start"
                trigger="hover"
            >
                <label htmlFor="btn-download" className="sr-only">
                    {t("downloadimagebutton.label")}
                </label>
                <Dropdown
                    theme={customDropdownTheme}
                    id="btn-download"
                    disabled={!input.length}
                    tabIndex={0}
                    placement="bottom-start"
                    dismissOnClick={true}
                    className={`inline-flex items-center justify-center rounded-lg text-center text-sm font-medium transition duration-300 ease-in-out dark:hover:bg-slate-800 ${handleSaveVisibility() ? "cursor-not-allowed bg-gray-200/[0.5] text-gray-600 hover:ring-transparent focus:ring-0" : "bg-gray-100 text-white focus:ring-4 dark:bg-slate-800 dark:text-slate-900"}`}
                    label={
                        <>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            <span className="sr-only">
                                {t("downloadimagebutton.label")}
                            </span>
                        </>
                    }
                >
                    <Dropdown.Header>Select dimensions</Dropdown.Header>
                    {Object.keys(displayDimensions).map((key) => (
                        <Dropdown.Item
                            onClick={() => {
                                handleDownload(key);
                            }}
                            key={key}
                        >
                            {key.replace("x", " x ")}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </Tooltip>
        </>
    );
};

export default DownloadImageButton;
