import React, { useRef, useEffect, useState, useCallback } from 'react'
import { convertBinary, plot } from '../utils/translate';
import { handleEncrypt, handleDecrypt } from '../utils/encryption';
import { Dropzone } from './Dropzone';
import { TextArea } from './TextArea';
const Translate: React.FC<React.CanvasHTMLAttributes<HTMLCanvasElement>> = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string[]>([]);
    const [canvasHeight, setCanvasHeight] = useState<number>(32);
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);

    const [encryptionEnabled, setEncryptionEnabled] = useState<boolean>(false);
    const [textToDecrypt, setTextToDecrypt] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [encryptedText, setEncryptedText] = useState<string>('');
    const [decryptedText, setDecryptedText] = useState<string>('');

    const handleResize = useCallback(() => {
        if (canvasRef.current) {
            setCanvasHeight(Math.ceil(output.length / 4) * 32);
        }
        const canv = canvasRef.current;
        if (!canv) return;

        const contx = canv.getContext('2d');

        if (contx) {
            if (canvasHeight === canvasHeight) {
                plot(output, canvasRef);
            }
            setCanvasHeight(Math.ceil(output.length / 4) * 32)
            setCanvasWidth(window.innerWidth);

            if (canv.width !== canvasWidth || canv.height !== canvasHeight) {
                canv.width = canvasWidth;
                canv.height = canvasHeight;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [output]);

    function handleTranslate() {
        if (input.length !== 0) {
            convertBinary(input, setOutput);
            handleEncrypt(input, password, setEncryptedText);
        }
    }

    // Side effects
    useEffect(() => {
        if (password.length > 0 && textToDecrypt !== "" && encryptionEnabled) {
            handleDecrypt(textToDecrypt, password, setDecryptedText)
        } else if (textToDecrypt !== "" && !encryptionEnabled) {
            setDecryptedText(textToDecrypt)
        } else {
            setDecryptedText("")
        }

    }, [textToDecrypt, password, encryptionEnabled])

    useEffect(() => {
        plot(output, canvasRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasHeight, canvasWidth])

    useEffect(() => {
        handleResize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [output])

    useEffect(() => {
        handleTranslate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])

    return (
        <div>
            <canvas id="canvas" ref={canvasRef} height={canvasHeight} width={canvasWidth} className='pb-2 w-full' />
            <div className='flex gap-4'>
                <div className='flex-1 w-2/3'>
                    <TextArea encryptionEnabled={encryptionEnabled} password={password} setPassword={setPassword} encryptedText={encryptedText} setDecryptedText={setDecryptedText} input={input} setInput={setInput} setEncryptionEnabled={setEncryptionEnabled} canvasRef={canvasRef} handleDecrypt={handleDecrypt} decryptedText={decryptedText} />
                </div>
                <Dropzone setInput={setInput} setEncryptionEnabled={setEncryptionEnabled} setTextToDecrypt={setTextToDecrypt} />
            </div>
        </div>
    );
}

export default Translate