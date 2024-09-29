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
import { Dispatch, MutableRefObject } from "react";
import { create } from "zustand";

// Define the store
interface AppState {
    debugMode: boolean;
    setDebugMode: (value: boolean) => void;

    logs: Message[];
    setLogs: (value: Message[]) => void;
}

interface PostState {
    input: string;
    password: string;
    output: string[];
    image: string;
    width: number;
    height: number;
    encryptedText: string;
    decryptedText: string;
    author: string;
    stringToDecrypt: string;
    encryptionEnabled: boolean;
}

interface PostStore {
    posts: Record<string, PostState>;
    setPostState: (id: string, newState: Partial<PostState>) => void;
}

interface ImageState {
    canvasRef: MutableRefObject<HTMLCanvasElement | null> | null;
    setCanvasRef: (ref: MutableRefObject<HTMLCanvasElement | null>) => void;

    input: string;
    setInput: (value: string) => void;

    output: string[];
    setOutput: Dispatch<string[]>;

    canvasHeight: number;
    setCanvasHeight: (value: number) => void;

    canvasWidth: number;
    setCanvasWidth: (value: number) => void;

    size: number;
    setSize: (value: number) => void;

    password: string;
    setPassword: (value: string) => void;

    encryptedText: string;
    setEncryptedText: (value: string) => void;

    encryptionEnabled: boolean;
    setEncryptionEnabled: (value: boolean) => void;

    stringToDecrypt: string;
    setStringToDecrypt: (value: string) => void;

    decryptedText: string;
    setDecryptedText: Dispatch<string>;
}

export const useAppState = create<AppState>((set) => ({
    debugMode: false,
    setDebugMode: (value: boolean) => set({ debugMode: value }),

    logs: [],
    setLogs: (value: Message[]) => set({ logs: value }),
}));

export const usePostState = create<PostStore>((set) => ({
    posts: {},
    setPostState: (id, newState) =>
        set((state) => ({
            posts: {
                ...state.posts,
                [id]: {
                    ...state.posts[id], // spread existing state for this post
                    ...newState, // apply new state
                },
            },
        })),
}));

export const useImageState = create<ImageState>((set) => ({
    canvasRef: null, // Initialize with null
    setCanvasRef: (ref) => set(() => ({ canvasRef: ref })),

    input: "",
    setInput: (value: string) => set({ input: value }),

    output: [],
    setOutput: (value: string[]) => set({ output: value }),

    canvasHeight: 48,
    setCanvasHeight: (value: number) => set({ canvasHeight: value }),

    canvasWidth: 3000,
    setCanvasWidth: (value: number) => set({ canvasWidth: value }),

    size: 46,
    setSize: (value: number) => set({ size: value }),

    password: "",
    setPassword: (value: string) => set({ password: value }),

    encryptedText: "",
    setEncryptedText: (value: string) => set({ encryptedText: value }),

    encryptionEnabled: false,
    setEncryptionEnabled: (value: boolean) => set({ encryptionEnabled: value }),

    stringToDecrypt: "",
    setStringToDecrypt: (value: string) => set({ stringToDecrypt: value }),

    decryptedText: "",
    setDecryptedText: (value: string) => set({ decryptedText: value }),
}));
