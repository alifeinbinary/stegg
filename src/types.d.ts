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

import { Message } from "console-feed/lib/definitions/Component";

export interface DropzoneProps {
    setInput: (input: string) => void;
    setEncryptionEnabled: (enabled: boolean) => void;
    setStringToDecrypt: (text: string) => void;
    password: string;
    setPassword: (password: string) => void;
    setDecryptedText: (text: string) => void;
}

export interface LogConainterProps {
    logs: Message[];
}

export interface CreatePngWithMetadataResult {
    payloadImage: Blob;
    filename: string;
    outputWidth: number;
    outputHeight: number;
}

export interface PostProps {
    key: Key | null | undefined;
    id: string;
    entryId: string;
    author: string;
    posted: Date;
    image: string;
    width: number;
    height: number;
}

export interface PasswordProps {
    password: string;
    setPassword: (value: string) => void;
    setEncryptionEnabled: (value: boolean) => void;
    encryptionEnabled: boolean;
    setOutput: (value: string[]) => void;
    setDecryptedText: (value: string) => void;
    decryptedText: string;
    setStringToDecrypt: (value: string) => void;
    stringToDecrypt: string;
    setEncryptedText: (value: string) => void;
}

export interface PreSignedPostPayloadProps {
    data: {
        fields: {
            [key: string]: string;
            "Content-Type": string;
            policy: string;
            "x-amz-algorithm": string;
            "x-amz-credential": string;
            "x-amz-date": string;
            "x-amz-signature": string;
        };
        url: string;
    };
    file: {
        id: string;
        key: string;
        name: string;
        size: number;
        type: string;
    };
}

export type Dimensions = {
    width: number;
    height: number;
};
