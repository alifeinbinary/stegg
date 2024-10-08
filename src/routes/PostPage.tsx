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

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useParams, useLocation } from "react-router-dom";
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
    const [contentHeight, setContentHeight] = useState<string | number>('auto');
    const [isHeightTransitionDone, setIsHeightTransitionDone] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const spring = {
        type: "spring",
        damping: 10,
        stiffness: 50
    }

    useEffect(() => {
        const contentElement = contentWrapperRef.current;
        if (contentElement) {
            // Reset state to hide content and prepare for height animation
            setIsContentVisible(true);
            setIsHeightTransitionDone(false);

            // Measure new content height without showing it
            const height = contentElement.scrollHeight;
            setContentHeight(`${height}px`);

            // Once height animation completes, show content
            setTimeout(() => {
                setIsHeightTransitionDone(true); // Height animation done, now show content
                setIsContentVisible(true); // Trigger the fade-in
            }); // Match this duration to the height animation timing
        }
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
        return (
            <div>
                <motion.div
                    initial={{ height: 0, opacity: 0, visibility: 'visible' }}
                    animate={{ height: contentHeight, opacity: 1 }}
                    style={{ height: contentHeight }} // Animate height change
                    transition={spring}
                    exit={{ opacity: 0, visibility: 'hidden' }}
                >
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={location.pathname}
                            ref={contentWrapperRef}
                            initial={{ opacity: 0 }} // Start hidden and off-layout
                            animate={
                                isHeightTransitionDone && isContentVisible
                                    ? { opacity: 1 } // Only after height transition, show content
                                    : {}
                            }
                            transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
                        >
                            {isContentVisible ? <Post key={key} id={id} entryId={entryId} author={author} posted={posted} image={image} width={width} height={height} /> : null}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        );
    }
}

export default PostPage