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

import { saveAs } from "file-saver";
import { addMetadata } from "meta-png";
import { Id, toast } from "react-toastify";
import { Dimensions } from "../types";

// Common display dimensions
const displayDimensions: { [key: string]: Dimensions } = {
    "1920x1080": { width: 1920, height: 1080 },
    "1366x768": { width: 1366, height: 768 },
    "3840x2160": { width: 3840, height: 2160 },
    "2560x1440": { width: 2560, height: 1440 },
    "3200x1800": { width: 3200, height: 1800 },
    "2880x1620": { width: 2880, height: 1620 },
    "2560x1600": { width: 2560, height: 1600 },
    "2048x1536": { width: 2048, height: 1536 },
    "1680x1050": { width: 1680, height: 1050 },
    "1600x900": { width: 1600, height: 900 },
    "968x544": { width: 968, height: 544 },
};

/**
 * Given a trimmed canvas element and a string key into the display dimensions
 * map, scale the canvas to the appropriate size and return the blob.
 *
 * This function takes the original image dimensions and scales the height to
 * fit the display height, while maintaining the aspect ratio. The result is a
 * blob representing the resized image.
 *
 * @param trimmedCanvas The canvas element to scale.
 * @param key The string key into the display dimensions map.
 * @returns A promise resolving to a blob representing the resized image.
 */
async function scaleCanvas(
    trimmedCanvas: HTMLCanvasElement,
    key: string,
    action: string,
): Promise<Blob> {
    const fileAndFunction = "save.scaleCanvas: ";
    const img = new Image();
    const url = URL.createObjectURL(await getCanvasBlob(trimmedCanvas));
    img.src = url;

    return new Promise((resolve, reject) => {
        img.onload = async () => {
            console.debug(fileAndFunction, "img", img);
            const originalWidth = img.width;
            const originalHeight = img.height;

            const { width, height } = displayDimensions[key];

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;

            await img.decode(); // Wait for the image to be decoded

            const scaleFactor = width / originalWidth;
            const newHeight = originalHeight * scaleFactor;

            if (action === "download") {
                console.debug(
                    fileAndFunction + "img.dimensions start",
                    img.width,
                    img.height,
                );

                if (newHeight > height) {
                    const newWidth = originalWidth * (height / originalHeight);
                    const scaleFactor = newWidth / originalWidth;
                    const newHeight = originalHeight * scaleFactor;
                    img.height = newHeight - newHeight * 0.1;
                    img.width = newWidth - newWidth * 0.1;
                } else {
                    // 0.1 for 10% padding
                    img.height = newHeight - newHeight * 0.1;
                    img.width = width - width * 0.1;
                }
                console.debug(
                    fileAndFunction + "img.dimensions end",
                    img.width,
                    img.height,
                );

                canvas.width = width; // Display width
                canvas.height = height; // Display height
                console.debug(
                    fileAndFunction + "canvas.dimensions final",
                    canvas.width,
                    canvas.height,
                );
                const posX = (width - img.width) / 2;
                const posY = (height - img.height) / 2;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, posX, posY, img.width, img.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                        URL.revokeObjectURL(url); // Clean up the object URL
                    } else {
                        reject(new Error("Failed to create blob"));
                    }
                }, "image/png");
            } else if (action === "post") {
                console.debug(
                    fileAndFunction + "img.dimensions post",
                    img.width,
                    img.height,
                );

                img.width = width;
                img.height = newHeight;
                console.debug(
                    fileAndFunction + "img.dimensions",
                    img.width,
                    img.height,
                );

                canvas.width = width; // Display width
                canvas.height = newHeight; // Display height
                console.debug(
                    fileAndFunction + "img.dimensions:",
                    canvas.width,
                    canvas.height,
                );
                const posX = (width - img.width) / 2;
                const posY = (newHeight - img.height) / 2;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, posX, posY, img.width, img.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                        URL.revokeObjectURL(url); // Clean up the object URL
                    } else {
                        reject(new Error("Failed to create blob"));
                    }
                }, "image/png");
            }
        };
    });
}

// function createCanvas(width: number, height: number): HTMLCanvasElement {
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     return canvas;
// }

// function drawImage(
//     ctx: CanvasRenderingContext2D,
//     img: HTMLImageElement,
//     imgWidth: number,
//     imgHeight: number,
//     displayWidth: number,
//     displayHeight: number,
// ) {
//     const posX = (displayWidth - imgWidth) / 2;
//     const posY = (displayHeight - imgHeight) / 2;
//     ctx.imageSmoothingEnabled = true;
//     ctx.imageSmoothingQuality = "high";
//     ctx.drawImage(img, posX, posY, imgWidth, imgHeight);
// }

/**
 * Trim the transparent pixels from the edges of a canvas and draw a
 * watermark onto the trimmed image.
 *
 * @param canvas The canvas to trim
 * @returns A promise resolving to the trimmed canvas
 */
function trimImageFromCanvas(
    canvas: HTMLCanvasElement,
): Promise<HTMLCanvasElement> {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let top = height,
        left = width,
        right = 0,
        bottom = 0;

    // Loop through each pixel to find the bounding box of non-transparent pixels
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3]; // Get alpha value of the pixel
            if (alpha > 0) {
                // If the pixel is not fully transparent
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
            }
        }
    }

    // Calculate the trimmed width and height
    const trimmedWidth = right - left + 1;
    const trimmedHeight = bottom - top + 1;

    // Create a new canvas to store the trimmed content
    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight + 50;
    const trimmedCtx = trimmedCanvas.getContext("2d");
    if (!trimmedCtx) throw new Error("Failed to get trimmed canvas context");

    // Draw a watermark onto the trimmed canvas
    trimmedCtx.font = "100 18px Tahoma";
    trimmedCtx.fontKerning = "none";
    trimmedCtx.fillStyle = "#ffeedd";
    trimmedCtx.fillText(
        "Decode this image at feed.alifeinbinary.com",
        trimmedWidth - 400,
        trimmedHeight + 40,
    );
    // Draw the trimmed content onto the new canvas
    trimmedCtx.putImageData(
        ctx.getImageData(left, top, trimmedWidth, trimmedHeight),
        0,
        0,
    );

    return Promise.resolve(trimmedCanvas);
}

/**
 * Saves a blob to disk with the given filename.
 * @param {Blob} blob The blob to save to disk.
 * @param {string} fileName The filename to save the blob as.
 */
function saveToDisk(blob: Blob, fileName: string) {
    const blobUrl = URL.createObjectURL(blob);

    console.debug("save: Scaled image Blob:", blobUrl);
    if (fileName) {
        fetch(blobUrl)
            .then((response) => response.blob())
            .then((blob) => saveAs(blob, fileName));
        // URL.revokeObjectURL(blobUrl); // Clean up the object URL
    } else {
        console.error("save: Failed to get filename");
    }
}

/**
 * Take a blob with metadata and return a new blob scaled to the desired
 * width, with the original height scaled accordingly.
 * @param {Blob} blobWithMetadata The blob with image data and metadata.
 * @param {string} fileName The filename to save the blob as.
 * @returns {Promise<{fileName: string, scaledDataURL: string}>} A promise
 * that resolves with an object containing the filename and a data URL for
 * the scaled image.
 */
// function postToServer(blobWithMetadata: Blob, fileName: string) {
//     const img = new Image();
//     const url = URL.createObjectURL(blobWithMetadata);
//     img.src = url;

//     img.onload = async () => {
//         console.debug("save.returbBlob: Image: ", img);
//         const originalWidth = img.width;
//         const originalHeight = img.height;

//         const newWidth = 968;
//         const scaleFactor = newWidth / originalWidth;

//         await img.decode(); // Wait for the image to be decoded

//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d")!;

//         canvas.width = newWidth; // New width
//         canvas.height = originalHeight * scaleFactor; // New height
//         console.debug(
//             "returnBlob: Scaled image dimensions:",
//             canvas.width,
//             canvas.height,
//         );

//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//         const scaledDataURL = canvas.toDataURL("image/png");
//         URL.revokeObjectURL(url); // Clean up the object URL

//         // console.debug("Scaled image Blob:", scaledDataURL);
//         if (fileName) {
//             const link = document.createElement("a");
//             link.href = scaledDataURL;
//             link.download = fileName;
//             console.debug("save: ", "fileName", fileName, "url", url);
//             return { fileName, scaledDataURL };
//         } else {
//             console.error("save: Failed to get filename");
//         }
//     };
//     console.debug("save: ", "fileName", fileName, "url", url);
//     return { fileName, url };
// }

/**
 * Takes a PNG blob and adds two metadata chunks to it: "Message" containing
 * the given string, and "Encrypted" containing a boolean indicating whether
 * the message is encrypted.
 *
 * @param blob The source PNG blob.
 * @param message The string to add as a metadata chunk.
 * @param encryptionEnabled Whether the message is encrypted.
 * @returns A new blob with the added metadata chunks.
 */
async function addMetadataToPng(
    blob: Blob,
    message: string,
    encryptionEnabled: boolean,
): Promise<Blob> {
    const buffer = await blob.arrayBuffer();
    const pngData = new Uint8Array(buffer);

    const withMessage = addMetadata(pngData, "Message", message);
    const withBoolean = addMetadata(
        withMessage,
        "Encrypted",
        encryptionEnabled.toString(),
    );
    return Promise.resolve(new Blob([withBoolean], { type: "image/png" }));
}

/**
 * Given an encrypted text, returns a filename for the PNG file.
 *
 * The filename is of the form: "alifeinbinary_com-<first 8 characters of the encrypted text>.png"
 *
 * @param encryptionEnabled Whether the text is encrypted.
 * @param encryptedText The encrypted text.
 * @throws Error If no encrypted text is provided.
 * @returns A filename for the PNG file.
 */
function getFilename(
    encryptionEnabled: boolean,
    encryptedText: string,
): Promise<string> {
    if (encryptedText) {
        console.debug(
            "save.createPngWithMetadata: Encrypted Text",
            encryptedText,
        );
        const filename = `alifeinbinary_com-${encryptionEnabled ? encryptedText.slice(7, 15) : Math.floor(Math.random() * 10000)}.png`;

        return Promise.resolve(filename); // Return filename;
    } else {
        throw new Error("No encrypted text provided");
    }
}

/**
 * Get a PNG blob from a canvas.
 * @param {HTMLCanvasElement} canvas The canvas to get a blob from.
 * @returns {Promise<Blob>} A promise that resolves with the blob.
 */
function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Failed to create blob"));
            }
        }, "image/png");
    });
}

/**
 * Given a canvas, key, action, encryptionEnabled, encryptedText, input, and
 * toastId, creates a PNG blob with the image data and the encrypted text or
 * input as metadata.
 *
 * If the action is "download", the function will trim the canvas, scale the
 * image to the selected dimensions, add metadata to the image, and then
 * download the image to the user's disk.
 *
 * If the action is "post", the function will scale the canvas, add metadata to
 * the image, and then return a promise that resolves with a blob and a
 * filename.
 *
 * @param {HTMLCanvasElement} canvas The canvas to get a blob from.
 * @param {string} key The string key into the display dimensions map.
 * @param {string} action The action to perform. Can be either "download" or
 * "post".
 * @param {boolean} encryptionEnabled Whether the text is encrypted.
 * @param {string} encryptedText The encrypted text.
 * @param {string} input The input text.
 * @param {Id} toastId The toast Id.
 * @returns {Promise<{ payloadImage: Blob; filename: string }>} A promise that
 * resolves with a blob and a filename.
 */
function createPngWithMetadata(
    canvas: HTMLCanvasElement,
    key: string,
    action: string,
    encryptionEnabled: boolean,
    encryptedText: string,
    input: string,
    toastId: Id,
): Promise<{ payloadImage: Blob; filename: string }> {
    return new Promise((resolve, reject) => {
        if (action === "download" && canvas instanceof HTMLCanvasElement) {
            const fileAndFunction = "save.createPngWithMetadata[download]: ";
            console.debug(fileAndFunction + "canvas", canvas);
            toast.update(toastId, {
                render: "Trimming canvas",
                type: "info",
                isLoading: false,
                autoClose: 2000,
                progress: 0.14,
            });
            trimImageFromCanvas(canvas).then(async function (trimmedCanvas) {
                console.debug(fileAndFunction + "trimmedCanvas", trimmedCanvas);
                if (trimmedCanvas instanceof HTMLCanvasElement) {
                    toast.update(toastId, {
                        render: "Scaling image to selected dimensions",
                        type: "info",
                        isLoading: false,
                        autoClose: 2000,
                        progress: 0.16,
                    });
                    scaleCanvas(trimmedCanvas, key, action).then(
                        async function (scaledCanvas) {
                            console.debug(
                                fileAndFunction + "scaledCanvas",
                                scaledCanvas,
                            );
                            if (scaledCanvas instanceof Blob) {
                                toast.update(toastId, {
                                    render: "Adding metadata to image",
                                    type: "info",
                                    isLoading: false,
                                    autoClose: 2000,
                                    progress: 0.18,
                                });
                                const message = encryptionEnabled
                                    ? encryptedText
                                    : input;
                                addMetadataToPng(
                                    scaledCanvas,
                                    message,
                                    encryptionEnabled,
                                ).then(function (payloadImage) {
                                    console.debug(
                                        fileAndFunction + "payloadImage",
                                        payloadImage,
                                    );
                                    if (payloadImage instanceof Blob) {
                                        toast.update(toastId, {
                                            render: "Creating filename",
                                            type: "info",
                                            isLoading: false,
                                            autoClose: 2000,
                                            progress: 0.2,
                                        });
                                        getFilename(
                                            encryptionEnabled,
                                            message,
                                        ).then(function (filename) {
                                            console.debug(
                                                fileAndFunction + "filename",
                                                filename,
                                            );
                                            if (filename) {
                                                toast.update(toastId, {
                                                    render: "Saving image to disk",
                                                    type: "success",
                                                    isLoading: false,
                                                    autoClose: 2000,
                                                    progress: 1.0,
                                                });
                                                saveToDisk(
                                                    payloadImage,
                                                    filename,
                                                );
                                            }
                                        });
                                    } else {
                                        toast.update(toastId, {
                                            render: "Blob is not a Blob",
                                            type: "error",
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                        throw new Error("Blob is not a Blob");
                                    }
                                });
                            } else {
                                toast.update(toastId, {
                                    render: "Blob is not a Blob",
                                    type: "error",
                                    isLoading: false,
                                    autoClose: 2000,
                                });
                                throw new Error("Blob is not a Blob");
                            }
                        },
                    );
                } else {
                    toast.update(toastId, {
                        render: "Canvas is not a HTMLCanvasElement",
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                    });
                    throw new Error("Canvas is not a HTMLCanvasElement");
                }
            });
        } else if (action === "post") {
            const fileAndFunction = "save.createPngWithMetadata[post]: ";
            console.debug(fileAndFunction + "canvas", canvas);
            toast.update(toastId, {
                render: "Scaling canvas",
                type: "info",
                isLoading: false,
                autoClose: 2000,
                progress: 0.14,
            });
            scaleCanvas(canvas, key, action).then(
                async function (scaledCanvas) {
                    console.debug(
                        fileAndFunction + "scaledCanvas",
                        scaledCanvas,
                    );
                    if (scaledCanvas instanceof Blob) {
                        toast.update(toastId, {
                            render: "Adding metadata to image",
                            type: "info",
                            isLoading: false,
                            autoClose: 2000,
                            progress: 0.18,
                        });
                        addMetadataToPng(
                            scaledCanvas,
                            encryptedText,
                            encryptionEnabled,
                        ).then(function (payloadImage) {
                            console.debug(
                                fileAndFunction + "payloadImage",
                                payloadImage,
                            );
                            if (payloadImage instanceof Blob) {
                                toast.update(toastId, {
                                    render: "Creating file name",
                                    type: "info",
                                    isLoading: false,
                                    autoClose: 2000,
                                    progress: 0.2,
                                });
                                getFilename(
                                    encryptionEnabled,
                                    encryptedText,
                                ).then(function (filename) {
                                    console.debug(
                                        fileAndFunction + "filename",
                                        filename,
                                    );
                                    if (filename) {
                                        toast.update(toastId, {
                                            render: "Saving image to disk",
                                            type: "info",
                                            isLoading: false,
                                            autoClose: 2000,
                                            progress: 0.22,
                                        });

                                        resolve({ payloadImage, filename });
                                    } else {
                                        toast.update(toastId, {
                                            render: "No file name",
                                            type: "error",
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                        reject(new Error("No file name"));
                                    }
                                });
                            } else {
                                toast.update(toastId, {
                                    render: "Blob is not a Blob",
                                    type: "error",
                                    isLoading: false,
                                    autoClose: 2000,
                                });
                                throw new Error("Blob is not a Blob");
                            }
                        });
                    } else {
                        toast.update(toastId, {
                            render: "Blob is not a Blob",
                            type: "error",
                            isLoading: false,
                            autoClose: 2000,
                        });
                        throw new Error("Blob is not a Blob");
                    }
                },
            );
        } else {
            toast.update(toastId, {
                render: "Invalid action",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
            reject(new Error("Invalid action: " + action));
        }
    });
}

export { createPngWithMetadata, displayDimensions, saveToDisk };
