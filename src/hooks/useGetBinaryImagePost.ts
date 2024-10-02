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
import { GET_BINARYIMAGEPOST } from "../api/api";

/**
 * Provides a function to fetch a single binary image post
 * @param id The id of the post to fetch
 * @returns An object containing the function to fetch the post
 */
export const useGetBinaryImagePost = (entryId: string) => {
    const { refetch } = useQuery(GET_BINARYIMAGEPOST, {
        context: {
            apiName: "read",
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        returnPartialData: false,
        variables: {
            entryId: entryId,
        },
    });

    /**
     * Fetches a single binary image post
     * @param id The id to use when fetching the post
     * @returns An object with three properties: data, loading, and error.
     * data is the list of binary image posts, loading is a boolean indicating whether the data is being fetched,
     * and error is an object containing any error message.
     */
    const getBinaryImagePost = async (
        entryId: string,
    ): Promise<{
        data: any;
        loading: boolean;
        error: any;
    }> => {
        const {
            data: refetchedData,
            loading: refetchedLoading,
            error: refetchedError,
        } = await refetch({ entryId: entryId });
        return {
            data: refetchedData,
            loading: refetchedLoading,
            error: refetchedError,
        } as any;
    };
    return { getBinaryImagePost };
};
