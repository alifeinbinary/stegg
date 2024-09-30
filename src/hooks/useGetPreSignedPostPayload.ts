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

import { useQuery } from "@apollo/client";
import { GET_PRE_SIGNED_POST_PAYLOAD } from "../api/api";

/*
 * Get a pre-signed post payload for uploading a file
 * @param file The file to upload
 * @returns The pre-signed post payload
 * @example
 * const { getPreSignedPostPayload } = useGetPreSignedPostPayload();
 */
export const useGetPreSignedPostPayload = () => {
    const { refetch } = useQuery(GET_PRE_SIGNED_POST_PAYLOAD, {
        context: {
            apiName: "main",
        },
    });

    /**
     * Get a pre-signed post payload for uploading a file
     * @param file The file to upload, with properties name, type, and size
     * @returns The pre-signed post payload
     * @example
     * const { getPreSignedPostPayload } = useGetPreSignedPostPayload();
     * const file = {
     *     name: "example.jpg",
     *     type: "image/jpeg",
     *     size: 1024,
     * };
     * const payload = await getPreSignedPostPayload(file);
     */
    const getPreSignedPostPayload = async (file: {
        name: string;
        type: string;
        size: number;
    }) => {
        return refetch({
            data: {
                name: file.name,
                type: file.type,
                size: file.size,
            },
        });
    };

    return { getPreSignedPostPayload };
};
