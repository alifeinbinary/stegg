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

import { toast } from "react-toastify";
interface PreSignedPostPayloadProps {
    data: {
        fields: {
            [key: string]: string;
            "Content-Type": string;
            policy: string;
            "x-amz-algorithm": string;
            "x-amz-credential": string;
            "x-amz-date": string;
            "x-amz-signature": string;
        };
        url: string;
    };
    file: {
        id: string;
        key: string;
        name: string;
        size: number;
        type: string;
    };
}

export const uploadFileToS3 = (
    presignedPostData: PreSignedPostPayloadProps,
    file: Blob,
) => {
    const toastId = toast("Processing image...", { autoClose: false });
    toast.update(toastId, {
        render: "Uploading file to S3...",
    });
    console.debug("presignedPostData", presignedPostData);
    console.debug("Uploading file to S3...");

    return new Promise((resolve, reject) => {
        const formData = new FormData();
        Object.keys(presignedPostData.data.fields).forEach((key) => {
            formData.append(key, presignedPostData.data.fields[key]);
        });
        // Actual file has to be appended last.
        formData.append("file", file);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", presignedPostData.data.url, true);
        xhr.send(formData);
        xhr.onload = function () {
            // this.status === 204 ? resolve() : reject(this.responseText);
            if (xhr.status === 204) {
                resolve(xhr.response);
                console.debug("File uploaded successfully", xhr.response);
                toast.update(toastId, {
                    render: "File uploaded successfully",
                    type: "success",
                    autoClose: 3000,
                    isLoading: false,
                });
                return xhr.response.url;
            } else {
                reject(xhr.response);
                console.error("File upload failed:", xhr.response);
                toast.update(toastId, {
                    render: "File upload failed.",
                    type: "error",
                });
            }
        };
    });
};
