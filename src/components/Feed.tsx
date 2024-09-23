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

import { FC, useEffect, useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import { PostProps } from "../types";
import { useListBinaryImagePosts } from "../api/listBinaryImagePosts";
import Post from "./Post";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Feed: FC = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { loading, error, data } = useListBinaryImagePosts();

    useEffect(() => {
        if (data && data.listBinaryImagePosts && data.listBinaryImagePosts.data) {
            setPosts(data.listBinaryImagePosts.data);
        }
    }, [data]);

    if (loading) {
        return (
            <div className="py-12 text-center">
                <Spinner aria-label="Loading" />
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
    if (error) {
        return (
            <Alert color="failure">
                <FontAwesomeIcon icon={faInfo} />
                <span className="font-medium">Oh dang!</span> There was an error loading the posts.
            </Alert>
        );
    }
    if (!data || !data.listBinaryImagePosts || !data.listBinaryImagePosts.data) {
        return <p>No data available</p>;
    }
    return (
        <div id="feed">
            <div className="lg:py-8 px-12 max-w-screen-lg mx-auto w-full xs:px-1 md:px-4 pb-1 pt-8">
                <h4 className="h4 sm:hidden mb-2 text-left text-2xl font-bold dark:text-white xs:hidden">
                    Feed
                </h4>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        author={post.author}
                        posted={post.posted}
                        image={post.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;
