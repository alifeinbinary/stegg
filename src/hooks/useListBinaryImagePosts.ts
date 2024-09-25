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
import { LIST_BINARYIMAGEPOSTS } from "../api/api";

/*
 * List binary image posts
 * @returns The list of binary image posts
 * @example
 * const { data, loading, error } = useListBinaryImagePosts();
 */
export const useListBinaryImagePosts = (cursor: string) => {
    const { refetch } = useQuery(LIST_BINARYIMAGEPOSTS, {
        context: {
            apiName: "read",
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        returnPartialData: false,
        variables: {
            cursor: cursor,
        },
    });
    const listBinaryImagePosts = async (
        cursor: string,
    ): Promise<{
        data: any;
        loading: boolean;
        error: any;
    }> => {
        const {
            data: refetchedData,
            loading: refetchedLoading,
            error: refetchedError,
        } = await refetch({ cursor: cursor });
        return {
            data: refetchedData,
            loading: refetchedLoading,
            error: refetchedError,
        } as any;
    };
    return { listBinaryImagePosts };
};
