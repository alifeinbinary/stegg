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

import { useEffect } from 'react';
// import { Console, Hook, Unhook } from 'console-feed';
// import { faTerminal } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Message } from "console-feed/lib/definitions/Component";
import { useAppState, useImageState } from "../utils/stores";
// import '../App.css';

/**
 * A debug console that displays the current state of the application.
 *
 * The console is enabled by default in development mode, but can be
 * disabled by setting the {@link useAppState#debugMode} state to false.
 *
 * The console displays the following information:
 *
 * - The current input string
 * - The length of the output string
 * - The dimensions of the canvas
 * - The size of the image
 * - Whether encryption is enabled
 * - The string to decrypt
 * - The password
 * - The encrypted text
 * - The decrypted text
 *
 * The console also displays a message with a link to the contact page
 * when not in debug mode.
 *
 * The console is updated whenever the application state changes.
 *
 * @returns A React component that displays the debug console.
 */
const DebugConsole = () => {

    // const { debugMode, setDebugMode, logs, setLogs } = useAppState();
    const { debugMode } = useAppState();

    const DEBUG = debugMode ? debugMode : import.meta.env.MODE === "development";

    // const handleDebugMode = () => {
    //     setDebugMode(!debugMode);
    // };

    const {
        input,
        output,
        canvasHeight,
        canvasWidth,
        size,
        password,
        encryptionEnabled,
        stringToDecrypt,
        encryptedText,
        decryptedText,
    } = useImageState();


    // Loading the console
    // useEffect(() => {
    //     function handleCallback(logItems: Message[]) {
    //         setLogs(logItems);
    //     }
    //     function transpose(matrix: Message[][]) {
    //         if (!matrix || matrix.length === 0) return [];
    //         const table = matrix[0];
    //         return table;
    //     }
    //     const hookedConsole = Hook(
    //         window.console,
    //         (logItems) =>
    //             handleCallback([
    //                 { ...logItems, data: [transpose(logItems.data as Message[][])] },
    //             ] as Message[]),
    //         false,
    //     );

    //     return () => {
    //         if (hookedConsole) {
    //             Unhook(hookedConsole);
    //         }
    //     };
    // }, [setLogs]);

    // Keeping it fresh in the console
    useEffect(() => {
        if (!DEBUG) {
            console.clear();
        }

        // Debug console
        const items = {
            input: [input],
            outputLength: [output.length], // output,
            canvasHeight: [`${canvasHeight}px`], // canvasHeight,
            canvasWidth: [`${canvasWidth}px`],
            size: [size],
            encryptionEnabled: [encryptionEnabled],
            stringToDecrypt: [stringToDecrypt],
            password: [password],
            encryptedText: [encryptedText],
            decryptedText: [decryptedText],
        };
        if (!DEBUG) {
            console.table(items);
            const msg = `%c Hi 👋! Hit me up at %s if you want to work together!`;
            const styles = [
                "font-size: 16px",
                "font-family: monospace",
                "background: rgb(68,34,51)",
                "background: linear-gradient(90deg, rgba(68,34,51,1) 0%, rgba(153,170,187,1) 100%)",
                "color: white",
                "border-radius: 0.5rem",
                "padding: 8px 19px",
                "border: 1px dashed black",
            ].join(";");
            const urlString = "alifeinbinary.com/contact";
            console.log(msg, styles, urlString);
        }
    }, [
        DEBUG,
        input,
        size,
        encryptionEnabled,
        stringToDecrypt,
        password,
        encryptedText,
        decryptedText,
        output,
        canvasHeight,
        canvasWidth,
    ]);
    return (
        <div className='flex justify-center items-center pt-2'>
            {/* <button
                className="text-sm font-light text-gray-100 hover:text-gray-300 hover:underline"
                onClick={handleDebugMode}
            >
                <FontAwesomeIcon
                    icon={faTerminal}
                    className="text-sm pr-2 font-light text-gray-100 hover:text-gray-300 hover:underline"
                />
            </button>
            <div data-testid='console-feed' className='w-full max-w-xl h-full text-left'>
                <Console logs={logs} filter={['table']} variant="light" styles={{ BASE_FONT_SIZE: '12px', PADDING: '0px', LOG_BORDER: 'none' }} />
            </div> */}
        </div>
    )
}

export default DebugConsole