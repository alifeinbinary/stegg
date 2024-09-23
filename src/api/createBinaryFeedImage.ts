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
import { CREATE_BINARYFEEDIMAGE } from "./api";
// import { useGetPreSignedPostPayload } from "./getPreSignedPostPayload";
// import { uploadFileToS3 } from "./uploadFileToS3";

interface FmFileResponse {
    file: any;
    data: {
        id: string;
        createdOn: string;
        savedOn: string;
        createdBy: string;
        modifiedBy: string;
        savedBy: string;
        src: string;
        location: {
            folderId: string;
        };
        name: string;
        key: string;
        type: string;
        size: number;
        meta: {
            private: boolean;
            width: number;
            height: number;
            originalKey: string;
        };
        tags: string[];
        aliases: string[];
    };
    error: string;
}

export const useCreateBinaryFeedImage = () => {
    // const preSignedData = useGetPreSignedPostPayload();

    const [createFileMutation] = useMutation(CREATE_BINARYFEEDIMAGE, {
        context: {
            apiName: "main",
        },
    });

    // useEffect(() => {
    //   if (preSignedData) {
    //     console.log("preSignedData", preSignedData);
    //     const data = preSignedData;
    //     createFileMutation({
    //       variables: {
    //         name: data.data.name,
    //         type: data.data.type,
    //         size: 0,
    //         ...data,
    //       },
    //     });
    //   }
    // }, [createFileMutation, preSignedData]);

    // useEffect(() => {
    //   if (createFileError) {
    //     console.log("createFileError", createFileError);
    //   } else if (createFileData) {
    //     console.log(
    //       "createFileData",
    //       createFileData.fileManager.createFile.data.src
    //     );
    //     //   setFeedImageUrl(createFileData.fileManager.createFile.data.src);
    //     console.log(
    //       `Your file is now accessible at the following URL:\n${createFileData.fileManager.createFile.data.src}`
    //     );
    //   }
    // }, [createFileData, createFileError]);

    // Fetch the blob and get its size
    // const fetchBlobAndGetSize = async (url: string) => {
    //     const response = await fetch(url);
    //     const blob = await response.blob();
    //     return { blob, size: blob.size };
    // };

    const createBinaryFeedImage = async (
        fileInput: string[],
    ): Promise<FmFileResponse> => {
        await createFileMutation({
            variables: {
                data: fileInput,
            },
        });

        // if (fileName && fileUrl) {

        //     // const { blob, size } = await fetchBlobAndGetSize(fileUrl);

        //     // const fileType = "image/png";

        //     // Trigger the query with the actual size
        //     // const { data, loading, error } = await preSignedData.refetch({
        //     //     data: {
        //     //         name: fileName,
        //     //         type: fileType,
        //     //         size: size,
        //     //     },
        //     // });

        //     if (loading) {
        //         console.debug("loading");
        //     } else if (error) {
        //         console.debug("error", error);
        //     } else {
        //         console.debug("data", data);
        //     }

        //     if (data) {
        //         const preSignedPostPayload =
        //             data?.fileManager.getPreSignedPostPayload.data;
        //         console.debug("preSignedPostPayload", preSignedPostPayload);
        //         if (preSignedPostPayload !== undefined && blob !== undefined) {
        //             // Upload file to S3
        //             //
        //             // Args:
        //             // presignedPostData: PreSignedPostPayloadProps,
        //             // file: Blob
        //             const imageUrl = await uploadFileToS3(
        //                 preSignedPostPayload,
        //                 blob,
        //             );
        //             console.debug("preSignedPostPayload", preSignedPostPayload);
        //             console.debug("imageUrl", imageUrl);

        //             // const fileInput = {
        //             //     ...preSignedPostPayload.file,
        //             //     tags: ["binary-image"],
        //             //     aliases: [],
        //             //     location: { folderId: "66dab76c9c00420008532f91" },
        //             // };
        //             console.debug("fileInput", fileInput);
        //             delete fileInput.__typename;
        //             // Create file record in file manager
        //             await createFileMutation({
        //                 variables: {
        //                     data: {
        //                         name: fileInput.name,
        //                         type: fileInput.type,
        //                         size: fileInput.size,
        //                         ...fileInput,
        //                     },
        //                 },
        //             });
        //             console.debug("File record created in the file manager");
        //             return preSignedPostPayload;
        //         }

        //         // processFileUpload(fileName, url);
        //     } else {

        //     }
        // }
        return new Promise((resolve) => {
            resolve({} as FmFileResponse);
        });
    };
    return { createBinaryFeedImage };
};
