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
import { CREATE_BINARYIMAGEPOST, PUBLISH_BINARYIMAGEPOST } from "../api/api";

/**
 * Provides a mutation that can be used to create a binary image post in the database.
 * @returns An object containing two functions: createBinaryImagePost and publishBinaryImagePost.
 * createBinaryImagePost creates a binary image post in the database and returns the ID of the newly created post.
 * publishBinaryImagePost publishes a binary image post.
 */
export const useCreateBinaryImagePost = () => {
    const [createFileMutation] = useMutation(CREATE_BINARYIMAGEPOST, {
        context: {
            apiName: "manage",
        },
    });

    const [publishMutation] = useMutation(PUBLISH_BINARYIMAGEPOST, {
        context: {
            apiName: "manage",
        },
    });

    /**
     * Creates a binary image post for the feed.
     * @param author The author of the post
     * @param imageUrl The URL of the image to be posted
     * @param width The width of the image
     * @param height The height of the image
     * @returns The ID of the newly created post
     */
    const createBinaryImagePost = async (
        author: string,
        imageUrl: string,
        width: number,
        height: number,
    ) => {
        const timestamp = Date.now();
        const datePosted = new Date(timestamp).toISOString();
        console.log("width", width, "height", height);
        const result = await createFileMutation({
            variables: {
                author,
                image: imageUrl,
                posted: datePosted,
                width: width,
                height: height,
            },
        });
        return result.data.createBinaryImagePost.data.id;
    };

    /**
     * Publishes a binary image post.
     * @param id The ID of the post to be published
     * @returns The result of the mutation
     */
    const publishBinaryImagePost = async (id: string) => {
        return publishMutation({
            variables: {
                id,
                meta: {
                    status: "published",
                },
            },
        });
    };

    return { createBinaryImagePost, publishBinaryImagePost };
};
