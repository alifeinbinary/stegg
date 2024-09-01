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

import { useRef, useEffect, useState, useCallback } from 'react'
import { convertBinary, plot } from '../utils/translate';
import { handleEncrypt, handleDecrypt } from '../utils/encryption';
import { Dropzone } from './Dropzone';
import { TextArea } from './TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { Hook, Unhook } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component';
import { LogsContainer } from './LogsContainer';

const Translate: React.FC<React.CanvasHTMLAttributes<HTMLCanvasElement>> = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [input, setInput] = useState<string>(""); // textarea value
    const [output, setOutput] = useState<string[]>([]); // textarea value converted to array of binary strings
    const [canvasHeight, setCanvasHeight] = useState<number>(32); // height of the canvas
    const [canvasWidth, setCanvasWidth] = useState<number>(1024); // width of the canvas
    const [size, setSize] = useState<number>(12); // size of the nodes

    const [encryptionEnabled, setEncryptionEnabled] = useState<boolean>(false); // encryption toggle
    const [stringToDecrypt, setStringToDecrypt] = useState<string>(''); // text extracted from PNG
    const [password, setPassword] = useState<string>(''); // password value
    const [encryptedText, setEncryptedText] = useState<string>(''); // textarea value encrypted if enabled
    const [decryptedText, setDecryptedText] = useState<string>(''); // string extracted from PNG decrypted if enabled
    const [debugMode, setDebugMode] = useState<boolean>(false);
    const [logs, setLogs] = useState<Message[]>([]);

    const DEBUG = debugMode ? debugMode : import.meta.env.MODE === 'development';

    // Handlers
    // Resize the canvas when more data is added
    const handleResize = useCallback(() => {
        const canv = canvasRef.current;
        if (!canv) return;

        const contx = canv.getContext('2d');

        if (contx) {
            if (canvasHeight === canvasHeight) {
                plot(output, canvasRef, size);
            }
            setCanvasHeight(Math.ceil(output.length / 4) * (34 + size));
            setCanvasWidth(1024 + (size * 5));

            if (canv.width !== canvasWidth || canv.height !== canvasHeight) {
                canv.width = canvasWidth;
                canv.height = canvasHeight;
            }
        }
    }, [canvasHeight, canvasWidth, output, size]);

    const handleDebugMode = () => {
        setDebugMode(!debugMode);
    }

    // Side effects
    // Loading the console
    useEffect(() => {
        function handleCallback(logItems: Message[]) {
            setLogs(logItems);
        }
        function transpose(matrix: Message[][]) {
            if (!matrix || matrix.length === 0) return [];
            const table = matrix[0]
            return table
        }
        const hookedConsole = Hook(
            window.console,
            (logItems) => handleCallback([{ ...logItems, data: [transpose(logItems.data as Message[][])] }] as Message[]),
            false
        )

        return () => {
            if (hookedConsole) {
                Unhook(hookedConsole)
            }
        }
    }, [])

    // Keeping it fresh in the console
    useEffect(() => {
        console.clear();
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
            decryptedText: [decryptedText]
        }
        if (DEBUG) {
            console.table(items);
        }
    }, [DEBUG, input, size, encryptionEnabled, stringToDecrypt, password, encryptedText, decryptedText, output, canvasHeight, canvasWidth])

    // Paint the canvas
    useEffect(() => {
        const canv = canvasRef.current;
        if (!canv) return;

        plot(output, canvasRef, size);
    }, [canvasHeight, canvasWidth, output, size])

    // Change the canvas height if necessary
    useEffect(() => {
        handleResize();
    }, [handleResize, output])


    useEffect(() => {
        if (input && encryptionEnabled && password) {
            handleEncrypt(input, password, setEncryptedText);
        }
        if (input.length > 0) {
            setStringToDecrypt('')
            setDecryptedText('')
        }
    }, [encryptionEnabled, input, password])

    useEffect(() => {
        if (encryptionEnabled && password) {
            handleDecrypt(stringToDecrypt, password, setDecryptedText);
        }
        if (stringToDecrypt && !encryptionEnabled) {
            setDecryptedText(stringToDecrypt)
        }
        convertBinary(stringToDecrypt, setOutput);
    }, [encryptionEnabled, password, stringToDecrypt])

    useEffect(() => {
        if (input.length !== 0 || encryptedText.length !== 0) {
            if (encryptionEnabled) {
                convertBinary(encryptedText, setOutput);
            } else {
                convertBinary(input, setOutput);
            }
        }
    }, [input, password, encryptionEnabled, encryptedText]);

    return (
        <section className="px-6 sm:px-2 xs:px-1">
            <div className="pt-8 pb-1 md:px-4 sm:px-0 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
                <div className='max-w-5xl mx-auto'>
                    <div className='grid grid-cols-4 sm:grid-cols-4 xs:grid-cols-1 gap-4 sm:gap-0 xs:gap-0'>
                        <div className='col-span-3 md:col-span-3 sm:col-span-3 xs:col-span-1'>
                            <TextArea encryptionEnabled={encryptionEnabled} password={password} setPassword={setPassword} encryptedText={encryptedText} setEncryptedText={setEncryptedText} setDecryptedText={setDecryptedText} input={input} setInput={setInput} setOutput={setOutput} setEncryptionEnabled={setEncryptionEnabled} canvasRef={canvasRef} handleDecrypt={handleDecrypt} decryptedText={decryptedText} size={size} setSize={setSize} />
                        </div>
                        <div className='col-span-1 md:col-span-1 sm:col-span-1 xs:col-span-1'>
                            <Dropzone setInput={setInput} setEncryptionEnabled={setEncryptionEnabled} setStringToDecrypt={setStringToDecrypt} password={password} setPassword={setPassword} setDecryptedText={setDecryptedText} />
                        </div>
                    </div>
                    <canvas id="canvas" ref={canvasRef} height={canvasHeight} width={canvasWidth} className='w-full rounded-lg xs:mt-4 sm:mt-4 bg-slate-100' />
                    <div className=''>
                        {debugMode && <LogsContainer logs={logs} />}
                        <button className='text-sm font-light text-gray-100 hover:text-gray-300 hover:underline' onClick={handleDebugMode}><FontAwesomeIcon icon={faTerminal} className='text-sm pr-2 font-light text-gray-100 hover:text-gray-300 hover:underline' />{debugMode ? 'Disable' : 'Enable'} debug console</button>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Translate