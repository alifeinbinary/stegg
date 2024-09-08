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

import { gql, useQuery, useMutation } from "@apollo/client";

const LIST_BINARYIMAGEPOSTS = gql`
  query ListBinaryImagePosts {
    listBinaryImagePosts {
      data {
        id
        author
        image
        posted
      }
    }
  }
`;

// Mutation to post a new entry
export const CREATE_BINARYIMAGEPOST = gql`
  mutation CreateBinaryImagePost(
    $author: String!
    $image: String!
    $posted: String!
  ) {
    createBinaryImagePost(
      data: { author: $author, image: $image, posted: $posted }
    ) {
      data {
        id
        author
        image
        posted
      }
    }
  }
`;

// Mutation to delete an entry
export const DELETE_BINARYIMAGEPOST = gql`
  mutation DeleteBinaryImagePost($id: ID!) {
    deleteBinaryImagePost(id: $id) {
      data {
        id
        author
        image
        posted
      }
    }
  }
`;

// Example of how to use the LIST query
export const useListBinaryImagePosts = () => {
  return useQuery(LIST_BINARYIMAGEPOSTS);
};

// Example of how to use the CREATE mutation
export const useCreateBinaryImagePost = (user: string, image: string) => {
  return useMutation(CREATE_BINARYIMAGEPOST, {
    variables: {
      author: user,
      image: image,
      posted: new Date().toISOString(),
    },
  });
};

// Example of how to use the DELETE mutation
export const useDeleteBinaryImagePost = () => {
  return useMutation(DELETE_BINARYIMAGEPOST);
};
