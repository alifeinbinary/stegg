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
import { GET_PRE_SIGNED_POST_PAYLOAD } from "./api";

export const useGetPreSignedPostPayload = () => {
    const { refetch } = useQuery(GET_PRE_SIGNED_POST_PAYLOAD, {
        context: {
            apiName: "main",
        },
    });

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
