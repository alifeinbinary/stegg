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

import { useMutation } from "@apollo/client";
import { CREATE_BINARYFEEDIMAGE } from "./api";

interface FmFileResponse {
    file: any;
    data: {
        id: string;
        createdOn: string;
        savedOn: string;
        createdBy: string;
        modifiedBy: string;
        savedBy: string;
        src: string;
        location: {
            folderId: string;
        };
        name: string;
        key: string;
        type: string;
        size: number;
        meta: {
            private: boolean;
            width: number;
            height: number;
            originalKey: string;
        };
        tags: string[];
        aliases: string[];
    };
    error: string;
}

/*
 * Create a binary image for the post
 */
export const useCreateBinaryFeedImage = () => {
    const [createFileMutation] = useMutation(CREATE_BINARYFEEDIMAGE, {
        context: {
            apiName: "main",
        },
    });

    const createBinaryFeedImage = async (
        fileInput: string[],
    ): Promise<FmFileResponse> => {
        await createFileMutation({
            variables: {
                data: fileInput,
            },
        });

        return new Promise((resolve) => {
            resolve({} as FmFileResponse);
        });
    };
    return { createBinaryFeedImage };
};
