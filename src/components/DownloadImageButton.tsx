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
import { CustomFlowbiteTheme, Dropdown, Tooltip } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { displayDimensions, createPngWithMetadata } from "../utils/save";
import { useImageState } from "../utils/stores";
import { clearContx } from "../utils/translate";
import { toast } from "react-toastify";

const customDropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4",
    content: "py-1 focus:outline-none",
    floating: {
        animation: "transition-opacity",
        arrow: {
            base: "absolute z-10 h-2 w-2 rotate-45",
            style: {
                dark: "bg-gray-900 dark:bg-gray-700",
                light: "bg-white",
                auto: "bg-white dark:bg-gray-700",
            },
            placement: "-4px",
        },
        base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700 dark:text-gray-200",
        divider: "my-1 h-px bg-gray-100 dark:bg-slate-600",
        header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
            container: "",
            base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:bg-slate-600 dark:focus:text-white",
            icon: "mr-2 h-4 w-4",
        },
        style: {
            dark: "bg-gray-900 text-white dark:bg-gray-700",
            light: "border border-gray-200 bg-white text-gray-900",
            auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
        },
        target: "text-white bg-sagegreen/[0.8] dark:bg-sagegreen dark:text-slate-900 dark:hover:bg-slate-300 hover:bg-sagegreen/[1.0] enabled:hover:bg-sagegreen/[1.0] dark:enabled:bg-sagegreen/[0.8] dark:enabled:hover:bg-sagegreen/[1.0] focus:ring-blue-300 focus:ring-4 w-fit",
    },
    inlineWrapper: "flex items-center",
};

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
