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

import { gql } from "@apollo/client";

export const LIST_BINARYIMAGEPOSTS = gql`
    query ListBinaryImagePosts($cursor: String) {
        listBinaryImagePosts(limit: 3, sort: createdOn_DESC, after: $cursor) {
            data {
                id
                author
                image
                width
                height
                posted
            }
            meta {
                cursor
                hasMoreItems
                totalCount
            }
        }
    }
`;

// This GraphQL query is used to create pre-signed POST payloads using the basic file information (name, type, and size).
export const GET_PRE_SIGNED_POST_PAYLOAD = gql`
    query GetPreSignedPostPayload($data: PreSignedPostPayloadInput!) {
        fileManager {
            getPreSignedPostPayload(data: $data) {
                data {
                    data
                    file {
                        id
                        name
                        type
                        size
                        key
                    }
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

// This GraphQL mutation is used to store file information in the File Manager, after the file is uploaded to the S3 bucket.
export const CREATE_BINARYFEEDIMAGE = gql`
    mutation CreateFile($data: FmFileCreateInput!) {
        fileManager {
            createFile(data: $data) {
                data {
                    id
                    createdOn
                    savedOn
                    src
                    name
                    key
                    type
                    size
                    tags
                    location {
                        folderId
                    }
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

// Mutation to post a new entry
export const CREATE_BINARYIMAGEPOST = gql`
    mutation CreateBinaryImagePost(
        $author: String!
        $image: String!
        $posted: DateTime!
        $width: Number!
        $height: Number!
    ) {
        createBinaryImagePost(
            data: {
                author: $author
                image: $image
                width: $width
                height: $height
                posted: $posted
            }
        ) {
            data {
                id
                author
                image
                width
                height
                posted
            }
        }
    }
`;

export const PUBLISH_BINARYIMAGEPOST = gql`
    mutation PublishBinaryImagePost($id: ID!) {
        publishBinaryImagePost(revision: $id) {
            data {
                id
                meta {
                    status
                    revisions {
                        id
                        meta {
                            status
                        }
                    }
                }
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

// This GraphQL mutation is used to delete the file entry from the database
export const DELETE_FILE = gql`
    mutation DeleteFile($id: ID!) {
        fileManager {
            deleteFile(id: $id) {
                data
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;
