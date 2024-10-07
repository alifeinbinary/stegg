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

import { useState, useEffect } from 'react'
import { LoaderFunction, LoaderFunctionArgs, useParams, useLocation } from "react-router-dom";
import { PostProps } from "../types";
import { useGetBinaryImagePost } from "../hooks/useGetBinaryImagePost";
import Post from "../components/Post";

const PostPage: React.FC = () => {

    const { id: postId = '' } = useParams();
    const { getBinaryImagePost } = useGetBinaryImagePost(postId);
    const [data, setData] = useState<{ getBinaryImagePost: { data: PostProps } | null }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBinaryImagePost(postId);
                setData(result.data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [location, postId, getBinaryImagePost]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (data) {

    }
    if (data && data.getBinaryImagePost && data.getBinaryImagePost.data) {
        const { id, entryId, author, posted, image, width, height, key } = data.getBinaryImagePost.data;
        console.log("data", data);
        return <Post key={key} id={id} entryId={entryId} author={author} posted={posted} image={image} width={width} height={height} />;
    }
}

export const postPageLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    return { id: params.id };
}

export default PostPage