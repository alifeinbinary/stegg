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
import { DELETE_BINARYIMAGEPOST } from "../api/api";

/**
 * Provides a mutation that can be used to delete a binary image post from the database.
 * @returns An object containing the mutation function and a function to track the mutation's loading state.
 */
export const useDeleteBinaryImagePost = () => {
    return useMutation(DELETE_BINARYIMAGEPOST);
};
