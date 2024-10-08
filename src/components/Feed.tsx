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

import { FC, useLayoutEffect, useState, lazy, Suspense, ReactElement } from "react";
import { Spinner } from "flowbite-react/components/Spinner";
import { Alert } from "flowbite-react/components/Alert";
import { PostProps } from "../types";
import { useListBinaryImagePosts } from "../hooks/useListBinaryImagePosts";
import { faCircleChevronDown, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Post = lazy(() => import("./Post"));

/**
 * @description
 * The Feed component renders a list of binary image posts. It fetches the posts
 * from the server and renders them in a list. It also provides a load more button
 * to fetch more posts.
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - The class name to be applied to the container element
 * @returns {ReactElement} The Feed component
 *
 * @example
 * <Feed />
 */
const Feed: FC = (): ReactElement => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [meta, setMeta] = useState<{ hasMoreItems: boolean; cursor: string | null; totalCount: number } | null>(null);
    const [cursor, setCursor] = useState<string | null>(null);
    const { listBinaryImagePosts } = useListBinaryImagePosts("");

    const { t } = useTranslation();

    const handleLoadMore = async (cursor: string) => {

        const { data, loading, error } = await listBinaryImagePosts(cursor);

        if (loading) {
            setLoading(loading)
            return;
        };
        if (error) {
            setError(error);
            return;
        }
        if (data && data.listBinaryImagePosts && data.listBinaryImagePosts.data) {

            const newPosts = data.listBinaryImagePosts.data.map((post: any, index: any) => ({ ...post, key: `${cursor}-${index}` }));
            const existingPostIds = new Set(posts.map((post) => post.key));
            const updatedPosts = [...posts, ...newPosts.filter((post: { key: string; }) => !existingPostIds.has(post.key))];

            setLoading(false);
            setPosts(updatedPosts);
            setMeta(data.listBinaryImagePosts.meta);
            setCursor(data.listBinaryImagePosts.meta.cursor);
        }
    };

    useLayoutEffect(() => {
        const fetchInitialPosts = async () => {
            const { data, loading, error } = await listBinaryImagePosts("");

            if (loading) {
                setLoading(loading)
                return;
            };
            if (error) {
                setError(error);
                return;
            }
            const initialPosts = data.listBinaryImagePosts.data.map((post: any, index: any) => ({ ...post, key: `initial-${index}` }));

            setLoading(false);
            setPosts(initialPosts);
            setMeta(data.listBinaryImagePosts.meta);
            setCursor(data.listBinaryImagePosts.meta.cursor);
        };

        fetchInitialPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return (
        <div className="flex-inline items-center justify-center lg:py-8 px-12 max-w-screen-lg mx-auto w-full xs:px-1 md:px-4 pb-1 pt-8">
            <Post id="loading" entryId="" author="" posted={new Date()} image={""} key={undefined} width={1084} height={506} />
            <span className="sr-only">Loading...</span>
        </div>
    );
    if (error) return (
        <Alert color="failure">
            <FontAwesomeIcon icon={faInfo} />
            <span className="font-medium">Oh dang!</span> There was an error loading more posts.
        </Alert>
    );

    return (
        <div id="feed">
            <div className="flex-inline items-center justify-center lg:py-8 px-12 max-w-screen-lg mx-auto w-full xs:px-1 md:px-4 pb-1 pt-8">
                <h4 className="h4 sm:hidden mb-2 text-left text-2xl font-bold dark:text-white xs:hidden">
                    {t("feed.title")}
                </h4>
                {posts.map((post) => (
                    <Suspense key={post.key} fallback={<span className="w-full xs:h-[386px] sm:h-[430px] md:h-[645px] lg:h-[778px] flex items-center justify-center"><Spinner /></span>}>
                        <Post key={post.key} entryId={post.entryId} id={post.id} author={post.author} posted={post.posted} image={post.image} width={post.width} height={post.height} />
                    </Suspense>
                ))}
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-100 dark:text-gray-300">
                        Showing <span className="font-bold text-gray-100 dark:text-white">{posts.length}</span> of <span className="font-bold text-gray-100 dark:text-white">{meta?.totalCount}</span> Entries
                    </span>
                    <div className="inline-flex mt-2 mb-4 xs:mt-0">
                        {meta && meta.hasMoreItems && meta.cursor !== null && (
                            <button onClick={() => handleLoadMore(cursor as string)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-900 bg-gray-200 border-0 border-s border-gray-700 rounded-md hover:bg-gray-300 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white transition duration-300 ease-in-out">{t("feed.loadmore")}
                                <FontAwesomeIcon icon={faCircleChevronDown} className="ml-2" /></button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Feed;
