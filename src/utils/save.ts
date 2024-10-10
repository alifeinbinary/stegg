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
import { CreatePngWithMetadataResult, Dimensions } from "../types";

// Common display dimensions
const displayDimensions: { [key: string]: Dimensions } = {
    "3840x2160": { width: 3840, height: 2160 },
    "3200x1800": { width: 3200, height: 1800 },
    "2880x1620": { width: 2880, height: 1620 },
    "2560x1600": { width: 2560, height: 1600 },
    "2560x1440": { width: 2560, height: 1440 },
    "2048x1536": { width: 2048, height: 1536 },
    "1920x1080": { width: 1920, height: 1080 },
    "1680x1050": { width: 1680, height: 1050 },
    "1600x900": { width: 1600, height: 900 },
    "1366x768": { width: 1366, height: 768 },
    "968x544": { width: 968, height: 544 },
};

/**
 * Trim the transparent pixels from the edges of a canvas and draw a
 * watermark onto the trimmed image.
 *
 * @param canvas The canvas to trim
 * @returns A promise resolving to the trimmed canvas
 */
function trimImageFromCanvas(
    canvas: HTMLCanvasElement,
    watermark: boolean,
): Promise<HTMLCanvasElement> {
    if (!canvas) throw new Error("Canvas is not defined");
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

    trimmedCtx.imageSmoothingEnabled = true;
    trimmedCtx.imageSmoothingQuality = "high";

    if (watermark) {
        // Draw a watermark onto the trimmed canvas
        trimmedCtx.font = "normal 36px Tahoma";
        trimmedCtx.fontKerning = "none";
        trimmedCtx.textRendering = "geometricPrecision";
        trimmedCtx.fillStyle = "#ffeedd";
        trimmedCtx.fillText(
            "Decode this image at stegg.alifeinbinary.com",
            trimmedWidth - 750,
            trimmedHeight + 42,
        );
    }

    // Draw the trimmed content onto the new canvas
    trimmedCtx.putImageData(
        ctx.getImageData(left, top, trimmedWidth, trimmedHeight),
        0,
        0,
    );

    return Promise.resolve(trimmedCanvas);
}

/**
 * Takes a trimmed canvas, a key (from displayDimensions), and an action (either "download" or "upload"), and returns a new canvas with the image scaled down to fit within the given dimensions.
 * If the action is "download", the image is scaled down to fit within the given dimensions with 10% padding.
 * If the action is "upload", the image is scaled down to fit within the given dimensions with no padding.
 * @param trimmedCanvas The trimmed canvas containing the image to be scaled.
 * @param key The key to use when looking up the display dimensions.
 * @param action The action to take when scaling the image, either "download" or "upload".
 * @returns A new canvas with the scaled image.
 */
async function scaleCanvas(
    trimmedCanvas: HTMLCanvasElement,
    key: string,
    action: string,
): Promise<HTMLCanvasElement> {
    const img = new Image();
    const url = URL.createObjectURL(await getCanvasBlob(trimmedCanvas));
    img.src = url;

    return new Promise((resolve, reject) => {
        img.onload = async () => {
            const { width: displayWidth, height: displayHeight } =
                displayDimensions[key];
            const originalWidth = img.width;
            const originalHeight = img.height;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            await img.decode();

            let scaledWidth = displayWidth;
            let scaledHeight = (originalHeight / originalWidth) * scaledWidth;

            if (action === "download" && scaledHeight > displayHeight) {
                scaledHeight = displayHeight;
                scaledWidth = (originalWidth / originalHeight) * scaledHeight;
            }

            if (action === "download") {
                scaledWidth *= 0.9; // Apply 10% padding
                scaledHeight *= 0.9;
            }

            canvas.width = displayWidth;
            canvas.height =
                action === "download" ? displayHeight : scaledHeight;

            const posX = (canvas.width - scaledWidth) / 2;
            const posY = (canvas.height - scaledHeight) / 2;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, posX, posY, scaledWidth, scaledHeight);

            URL.revokeObjectURL(url);

            if (canvas) {
                resolve(canvas);
            } else {
                reject(new Error("Failed to create canvas"));
            }
        };
        img.onerror = () => {
            URL.revokeObjectURL(url); // Clean up on error
            reject(new Error("Failed to load image"));
        };
    });
}

/**
 * Saves a blob to disk with the given filename.
 * @param {Blob} blob The blob to save to disk.
 * @param {string} fileName The filename to save the blob as.
 */
function saveToDisk(blob: Blob, fileName: string) {
    const fileAndFunction = "save.saveToDisk: ";
    const blobUrl = URL.createObjectURL(blob);

    console.debug(fileAndFunction + "blobUrl: ", blobUrl);
    if (fileName) {
        fetch(blobUrl)
            .then((response) => response.blob())
            .then((blob) => saveAs(blob, fileName));
        // URL.revokeObjectURL(blobUrl); // Clean up the object URL
    } else {
        console.error(fileAndFunction + "Failed to get filename");
    }
}

/**
 * Takes a canvas, a string message, and a boolean encryptionEnabled, and returns a new PNG blob with the message and encryptionEnabled set as metadata.
 * @param {HTMLCanvasElement} canvas The canvas to get the PNG data from.
 * @param {string} message The message to add to the PNG metadata.
 * @param {boolean} encryptionEnabled The boolean to add to the PNG metadata, indicating whether the message is encrypted or not.
 * @returns {Promise<Blob>} A promise resolving to a new PNG blob with the metadata added.
 */
async function addMetadataToPng(
    canvas: HTMLCanvasElement,
    message: string,
    encryptionEnabled: boolean,
): Promise<Blob> {
    if (!canvas) {
        throw new Error("Canvas is not defined");
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get canvas context");
    }
    // Get the binary data of the PNG blob
    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Failed to create blob"));
            }
        }, "image/png");
    });
    const buffer = await blob.arrayBuffer();
    const pngData = new Uint8Array(buffer);

    const withVersion = addMetadata(pngData, "Stegversion", "1.0");

    const withMessage = addMetadata(withVersion, "Message", message);
    const withBoolean = addMetadata(
        withMessage,
        "Encrypted",
        encryptionEnabled.toString(),
    );
    return Promise.resolve(new Blob([withBoolean]));
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
 * Creates a PNG blob from a canvas with metadata and either downloads the image
 * or returns a blob and filename for posting.
 *
 * @param {HTMLCanvasElement} canvas The canvas to get a blob from.
 * @param {string} key The string key into the display dimensions map.
 * @param {string} action The action to perform: 'download' or 'post'.
 * @param {boolean} encryptionEnabled Whether the text is encrypted.
 * @param {string} encryptedText The encrypted text.
 * @param {string} input The input text.
 * @param {Id} toastId The toast Id.
 * @returns {Promise<{ payloadImage: Blob; filename: string }>} A promise that
 * resolves with a blob and a filename.
 */
async function createPngWithMetadata(
    canvas: HTMLCanvasElement,
    key: string,
    action: string,
    encryptionEnabled: boolean,
    encryptedText: string,
    input: string,
    toastId: Id,
): Promise<CreatePngWithMetadataResult> {
    const message = encryptionEnabled ? encryptedText : input;

    /**
     * Handles an error while generating a PNG blob by updating the toast
     * with the error message and returning the error.
     * @param {string} errMsg The error message.
     * @returns {Error} The error with the message.
     */
    const handleBlobError = (errMsg: string) => {
        toast.update(toastId, {
            render: errMsg,
            type: "error",
            isLoading: false,
            autoClose: 2000,
        });
        return new Error(errMsg);
    };

    /**
     * A function that takes an information message and a progress value,
     * and updates the toast with the message and progress.
     *
     * This function is used to update the toast when creating a PNG blob.
     *
     * @param {string} infoMsg The message to display in the toast.
     * @param {number} progress The progress of the PNG blob creation, between 0 and 1.
     */
    const handleBlobInfo = (infoMsg: string, progress: number) => {
        toast.update(toastId, {
            render: infoMsg,
            type: "info",
            isLoading: true,
            progress,
        });
    };

    /**
     * A function that takes a canvas, adds metadata to the PNG, and
     * resolves with a CreatePngWithMetadataResult.
     *
     * This function calls handleBlobInfo to update the toast with
     * the progress of creating the PNG, and handleBlobError if there
     * is an error.
     *
     * @param {HTMLCanvasElement} canvas The canvas to add metadata to.
     * @returns {Promise<CreatePngWithMetadataResult>} A promise that
     * resolves with a CreatePngWithMetadataResult.
     */
    const handleMetadataAndResolve = async (canvas: HTMLCanvasElement) => {
        handleBlobInfo("Adding metadata to PNG", 0.18);
        const payloadImage = await addMetadataToPng(
            canvas,
            message,
            encryptionEnabled,
        );

        if (!(payloadImage instanceof Blob))
            throw handleBlobError("Payload is not a Blob");

        handleBlobInfo("Creating filename", 0.2);
        const filename = await getFilename(encryptionEnabled, message);
        if (!filename) throw handleBlobError("No filename");

        return {
            payloadImage,
            filename,
            outputWidth: canvas.width,
            outputHeight: canvas.height,
        };
    };

    try {
        if (action === "download") {
            handleBlobInfo("Trimming and scaling canvas", 0.14);

            const trimmedCanvas = await trimImageFromCanvas(canvas, true);
            const scaledCanvas = await scaleCanvas(trimmedCanvas, key, action);

            const { payloadImage, filename } =
                await handleMetadataAndResolve(scaledCanvas);

            handleBlobInfo("Saving image to disk", 1.0);
            saveToDisk(payloadImage, filename);
            return { payloadImage, filename, outputWidth: 0, outputHeight: 0 };
        } else if (action === "post") {
            handleBlobInfo("Scaling canvas", 0.14);

            const trimmedCanvas = await trimImageFromCanvas(canvas, true);
            const scaledCanvas = await scaleCanvas(trimmedCanvas, key, action);

            return await handleMetadataAndResolve(scaledCanvas);
        } else {
            throw handleBlobError("Invalid action");
        }
    } catch (error: any) {
        throw handleBlobError(error.message);
    }
}

export { createPngWithMetadata, displayDimensions, saveToDisk };
