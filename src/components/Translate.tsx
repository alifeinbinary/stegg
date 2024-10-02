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

import { useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { convertBinary, plot } from '../utils/translate';
import { handleEncrypt, handleDecrypt } from '../utils/encryption';
import { Slide, ToastContainer } from "react-toastify"
// import { Decrypt } from './Decrypt';
// import { TextArea } from './Encrypt';
import 'react-toastify/dist/ReactToastify.css';
import { useImageState } from '../utils/stores';
import { Spinner } from 'flowbite-react/components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';

const Decrypt = lazy(() => import('./Decrypt'));
const Encrypt = lazy(() => import('./Encrypt'));

/**
 * This component is the top-level component for the image translation tool.
 * It contains a text area for inputting text, a decrypt component for decrypting PNG files,
 * and a canvas for rendering the translated image.
 *
 * This component uses the useImageState hook to store and retrieve the canvas reference,
 * the current input text, the output text, the canvas height and width, the size of the canvas,
 * the password for encryption, the encryption state, the string to decrypt, the encrypted text,
 * and the decrypted text.
 *
 * The component also uses the useEffect hook to handle the following side effects:
 * - Send the canvas to the store
 * - Paint the canvas
 * - Change the canvas height if necessary
 * - Encrypt the input text when the encryption state is enabled
 * - Decrypt the input text when the encryption state is disabled
 * - Convert the input text to binary when the encryption state is disabled
 * - Convert the encrypted text to binary when the encryption state is enabled
 * - Convert the decrypted text to binary when the encryption state is disabled
 *
 * The component also uses the useCallback hook to create a memoized version of the handleResize
 * function, which is used to resize the canvas when more data is added.
 */
const Translate: React.FC = () => {
    const { theme } = useTheme();
    const {
        setCanvasRef,
        input, setInput,
        output, setOutput,
        canvasHeight, setCanvasHeight,
        canvasWidth, setCanvasWidth,
        size,
        password, setPassword,
        encryptionEnabled, setEncryptionEnabled,
        stringToDecrypt, setStringToDecrypt,
        encryptedText, setEncryptedText,
        setDecryptedText
    } = useImageState();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Handlers
    // Resize the canvas when more data is added
    const handleResize = useCallback(() => {
        const canv = canvasRef.current;
        if (!canv) return;

        const contx = canv.getContext('2d');

        if (contx) {
            if (canvasHeight === canvasHeight) {
                plot(output, canvasRef, size, encryptionEnabled);
            }
            if ((output.length > 64 && encryptionEnabled) ||
                (output.length > 128 && !encryptionEnabled)) {
                setCanvasHeight(Math.ceil(output.length / 8) * (40 + size));
            } else {
                setCanvasHeight(Math.ceil(output.length / 4) * (80 + size));
            }
            if (
                (output.length > 64 && encryptionEnabled) ||
                (output.length > 128 && !encryptionEnabled)
            ) {
                setCanvasWidth(3000 + (size * 9));
            } else {
                setCanvasWidth(3000 + (size * 5));
            }

            if (canv.width !== canvasWidth || canv.height !== canvasHeight) {
                canv.width = canvasWidth;
                canv.height = canvasHeight;
            }
        }
    }, [canvasHeight, canvasWidth, encryptionEnabled, output, setCanvasHeight, setCanvasWidth, size]);

    // Side effects

    // Send the canvas to the store
    useEffect(() => {
        if (canvasRef.current) {
            setCanvasRef(canvasRef);
        }
    }, [canvasRef, setCanvasRef]);

    // Paint the canvas
    useEffect(() => {
        const canv = canvasRef.current;
        if (!canv) return;

        plot(output, canvasRef, size, encryptionEnabled);
    }, [canvasHeight, canvasRef, canvasWidth, encryptionEnabled, output, size])

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
    }, [encryptionEnabled, input, password, setDecryptedText, setEncryptedText, setStringToDecrypt])

    useEffect(() => {
        if (encryptionEnabled && password) {
            handleDecrypt(stringToDecrypt, password, setDecryptedText);
        }
        if (stringToDecrypt && !encryptionEnabled) {
            setDecryptedText(stringToDecrypt)
        }
        if (stringToDecrypt.length > 0) {
            convertBinary(stringToDecrypt, setOutput);
        }
    }, [encryptionEnabled, password, setDecryptedText, setOutput, stringToDecrypt])

    useEffect(() => {
        if (input.length !== 0 || encryptedText.length !== 0) {
            if (encryptionEnabled) {
                convertBinary(encryptedText, setOutput);
            } else {
                convertBinary(input, setOutput);
            }
        }
    }, [input, password, encryptionEnabled, encryptedText, setOutput]);

    return (
        <section id="translate" className="px-6 sm:px-2 xs:px-1">
            <div className="pt-8 pb-1 md:px-4 sm:px-0 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
                <div className='max-w-5xl mx-auto'>
                    <div className='grid grid-cols-4 sm:grid-cols-4 xs:grid-cols-1 gap-4 sm:gap-0 xs:gap-0'>
                        <div className='col-span-3 md:col-span-3 sm:col-span-3 xs:col-span-1'>
                            <Suspense fallback={<Spinner />}>
                                <Encrypt />
                            </Suspense>
                        </div>
                        <div className='col-span-1 md:col-span-1 sm:col-span-1 xs:col-span-1'>
                            <Suspense fallback={<Spinner />}>
                                <Decrypt setInput={setInput} setEncryptionEnabled={setEncryptionEnabled} setStringToDecrypt={setStringToDecrypt} password={password} setPassword={setPassword} setDecryptedText={setDecryptedText} />
                            </Suspense>
                        </div>
                    </div>
                    <h4 className="transition duration-500 mb-2 h4 sm:hidden xs:hidden text-2xl text-left font-bold dark:text-white"><FontAwesomeIcon icon={faCrow} inverse /></h4>
                    <canvas id="canvas" ref={canvasRef} height={canvasHeight} width={canvasWidth} className='w-full rounded-lg xs:mt-4 sm:mt-4 bg-slate-100 dark:bg-slate-700 min-h-4' />
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                theme={theme}
                pauseOnHover={false}
                transition={Slide}
            />
        </section>
    );
}

export default Translate