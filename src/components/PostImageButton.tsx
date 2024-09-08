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

// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { useCreateBinaryImagePost } from "../utils/api";
// import { PostImageButtonProps } from "../types";
// import { clearContx } from "../utils/translate";
// import { createPngWithMetadata } from "../utils/save";
import { usePostState } from "../utils/stores";

const PostImageButton: React.FC = () => {

    const {
        user, setUser
    } = usePostState();

    const handlePost = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(user,);
    }

    return (
        <div tabIndex={0} className='shadow-card p-1 flex h-[46px] items-center justify-center rounded-md text-gray-900 bg-gray-200'>
            <input onChange={(e) => {
                setUser(e.target.value);
            }} data-testid="user-input" value={user} type="text" tabIndex={0} id="user-input" disabled={false} className={`text-base rounded-none rounded-l-lg max-w-40 bg-gray-50 border text-gray-900 focus:ring-sagegreen focus:border-sagegreen block flex-1 min-w-0 w-full border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900`} placeholder={"User"} />

            <button onClick={(e) => {
                handlePost(e)
            }} className="flex h-full w-20 ml-1 items-center justify-center transition ease-in-out duration-300 rounded text-base bg-sagegreen hover:bg-quailegg text-white">
                Post <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 pl-2" aria-hidden="true" />
            </button>
        </div>
    );
};

export default PostImageButton;