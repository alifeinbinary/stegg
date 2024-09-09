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

import fs from "fs";
import { gql } from "@apollo/client";
import FormData from "form-data";
import { toast } from "react-toastify";

// This is the Webiny API token, described in the previous section of the article.
const TOKEN = import.meta.env.VITE_TOKEN; // <---- Make sure you replace this value with your own!
const API_URL = import.meta.env.VITE_MANAGE_API_URL; // <---- Make sure you replace this value with your own!

// For demo purposes, this contains the path to a physical file which we'll be uploading.
// const FILE_PATH = __dirname + "/video.mp4";

// This GraphQL query is used to create pre-signed POST payloads using the basic file information (name, type, and size).
const GetPreSignedPostPayload = gql`
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
const CreateFile = gql`
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

// This GraphQL mutation is used to delete the file entry from the database
const DeleteFile = gql`
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

const toastId = "post";

// Create operations

async function getPreSignedPostPayload(data: {
  name: string;
  type: string;
  size: number;
}) {
  toast.update(toastId, {
    autoClose: 4000,
    pauseOnHover: false,
    isLoading: true,
    toastId: toastId,
    type: "info",
    render: "Creating image reference in database...",
  });

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query: GetPreSignedPostPayload,
      variables: {
        data,
      },
    }),
  }).then((r) => r.json());

  return response.data.fileManager.getPreSignedPostPayload.data;
}

async function createFileInFileManager(file: unknown) {
  toast.update(toastId, {
    autoClose: 4000,
    pauseOnHover: false,
    isLoading: false,
    toastId: toastId,
    type: "info",
    render: "Updating image reference in database...",
  });

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query: CreateFile,
      variables: {
        data: file,
      },
    }),
  }).then((r) => r.json());

  return response.data.fileManager.createFile.data;
}

function uploadFileToS3(
  buffer: Buffer,
  preSignedPostPayload: {
    fields: { [x: string]: unknown };
    url: URL | RequestInfo;
  }
) {
  toast.update(toastId, {
    render: "Putting the bits in a bucket...",
    autoClose: 4000,
    type: "info",
    pauseOnHover: false,
  });

  // Create a form object, which we'll send to the AWS S3.
  const formData = new FormData();
  // Add all pre-signed payload fields to "FormData".
  Object.keys(preSignedPostPayload.fields).forEach((key) => {
    formData.append(key, preSignedPostPayload.fields[key]);
  });
  // Add file content to "FormData".
  formData.append("file", buffer);

  // Finally make the upload request to S3.
  return fetch(preSignedPostPayload.url, {
    method: "POST",
    body: formData,
  });
}

// Delete operations

function deleteFileFromFileManager(id: string) {
  toast.update(toastId, {
    render: "Deleting file record from the database...",
    type: "info",
    autoClose: 4000,
    pauseOnHover: false,
  });

  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query: DeleteFile,
      variables: {
        id,
      },
    }),
  }).then((r) => r.json());
}

function deleteFileFromS3(key: string) {
  toast.update(toastId, {
    autoClose: 4000,
    pauseOnHover: false,
    render: "Deleting file from the server...",
    type: "info",
  });

  return fetch(
    `https://s3.amazonaws.com/${import.meta.env.VITE_BUCKET_NAME}/${key}`,
    {
      method: "DELETE",
      headers: {},
    }
  );
}

export const CreateBinaryFeedImage = async (
  name: string,
  file_path: string
) => {
  toast.update(toastId, {
    autoClose: 4000,
    pauseOnHover: false,
    isLoading: true,
    toastId: toastId,
    type: "info",
    render: "Posting translated image to the feed...",
  });

  // Read the size of the file, so we can request a pre-signed POST payload.
  const { size } = fs.statSync(file_path);

  // `data` represents S3 related data; `file` represents File Manager related information.
  const { data, file } = await getPreSignedPostPayload({
    name: name,
    type: "image/png",
    size,
  });

  // Read the file from the filesystem.
  const buffer = fs.readFileSync(file_path);

  // Upload the file binary data to AWS S3, using the pre-signed POST payload.
  await uploadFileToS3(buffer, data);

  const fileInput = {
    ...file,
    // Optionally, set file aliases. This allows you to set SEO friendly file paths.
    // aliases: ["/binary-images/alifeinbinary_com-.png"],
    // Optionally, tag your file with some tags, for easier filtering in the File Manager UI.
    tags: ["binaryimage"],
    // Optionally, specify an exact `folderId` to store the file into a specific folder.
    location: {
      folderId: "66dab7609c00420008532f90#0001",
    },
  };

  try {
    const createdFile = await createFileInFileManager(fileInput);
    toast.update(toastId, {
      autoClose: 4000,
      pauseOnHover: false,
      isLoading: false,
      toastId: toastId,
      type: "success",
      render: `Your file is now accessible at the following URL:\n${createdFile.src}`,
    });
    return createdFile.src;
  } catch (error) {
    toast.update(toastId, {
      render: `Error: ${error}`,
      type: "error",
      autoClose: 4000,
      pauseOnHover: false,
    });
    return;
  }
};

export const DeleteBinaryFeedImage = async (id: string) => {
  await deleteFileFromFileManager(id);
  await deleteFileFromS3(id);

  toast.update(toastId, {
    render: "File deleted successfully",
    type: "success",
    autoClose: 4000,
    pauseOnHover: false,
  });
};
