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

import { addMetadata } from "meta-png";
import { toast } from "react-toastify";

let toastId: string;

function saveBlob(blobWithMetadata: Blob, fileName: string) {
    toast.update(toastId, {
        render: "Saving image for download.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
    });

    const url = URL.createObjectURL(blobWithMetadata);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function returnBlob(blobWithMetadata: Blob, fileName: string) {
    toast.update(toastId, {
        render: "Returning blob",
        type: "info",
        isLoading: false,
        autoClose: 2000,
    });

    const url = URL.createObjectURL(blobWithMetadata);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // document.body.appendChild(link);
    // link.click();

    // document.body.removeChild(link);

    return { fileName, url };
}

async function addMetadataToPng(
    blob: Blob,
    encryptedText: string,
    encryptionEnabled: string,
    password: string,
): Promise<Blob> {
    toast.update(toastId, { render: "Adding metadata to PNG", type: "info" });

    const buffer = await blob.arrayBuffer();
    const pngData = new Uint8Array(buffer);
    const inputText = (
        document.getElementById("text-input") as HTMLInputElement
    ).value;

    if (inputText && password && encryptedText) {
        const withMessage = addMetadata(pngData, "Message", encryptedText);
        const withBoolean = addMetadata(
            withMessage,
            "Encrypted",
            encryptionEnabled.toString(),
        );
        return new Blob([withBoolean], { type: "image/png" });
    } else {
        const withMessage = addMetadata(pngData, "Message", inputText);
        const withBoolean = addMetadata(
            withMessage,
            "Encrypted",
            encryptionEnabled.toString(),
        );
        return new Blob([withBoolean], { type: "image/png" });
    }
}

function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
        }, "image/png");
    });
}

async function createPngWithMetadata(
    canvas: HTMLCanvasElement,
    encryptedText: string,
    encryptionEnabled: boolean,
    password: string,
    action: string,
): Promise<{ fileName: string; url: string }> {
    const croppedCanvas = cropImageFromCanvas(canvas);
    const blob = await getCanvasBlob(croppedCanvas);

    toast.update(toastId, {
        render: "Creating PNG with metadata",
        type: "info",
    });
    const blobWithMetadata = await addMetadataToPng(
        blob,
        encryptedText,
        encryptionEnabled.toString(),
        password,
    );

    if (action === "download") {
        toast.update(toastId, {
            render: "Saving image for download",
            type: "success",
        });
        saveBlob(
            blobWithMetadata,
            `alifeinbinary_com-${encryptedText.slice(7, 15)}.png`,
        );
    } else if (action === "post" && encryptedText) {
        toast.update(toastId, {
            render: "Saving image for post",
            type: "info",
            autoClose: 2000,
            isLoading: false,
        });
        const filename = `alifeinbinary_com-${encryptedText.slice(7, 15)}.png`;
        const { url } = returnBlob(blobWithMetadata, filename);

        return {
            fileName: filename,
            url: url,
        };
    } else {
        throw new Error("Invalid action");
    }
    return { fileName: "", url: "" };
}

function cropImageFromCanvas(canvas: HTMLCanvasElement) {
    toast.update(toastId, {
        render: "Trimming the canvas",
        type: "info",
        isLoading: true,
    });

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
        "Decode this image at alifeinbinary.com",
        trimmedWidth - 345,
        trimmedHeight + 40,
    );
    // Draw the trimmed content onto the new canvas
    trimmedCtx.putImageData(
        ctx.getImageData(left, top, trimmedWidth, trimmedHeight),
        0,
        0,
    );

    return trimmedCanvas;
}

export { createPngWithMetadata, cropImageFromCanvas, saveBlob };
