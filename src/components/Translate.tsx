import { useRef, useEffect, useState, useCallback } from 'react'
import { convertBinary, plot } from '../utils/translate';
import { handleEncrypt, handleDecrypt } from '../utils/encryption';
import { Dropzone } from './Dropzone';
import { TextArea } from './TextArea';
const Translate: React.FC<React.CanvasHTMLAttributes<HTMLCanvasElement>> = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [input, setInput] = useState<string>(""); // textarea value
    const [output, setOutput] = useState<string[]>([]); // textarea value converted to array of binary strings
    const [canvasHeight, setCanvasHeight] = useState<number>(32); // height of the canvas
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth); // width of the canvas

    const [encryptionEnabled, setEncryptionEnabled] = useState<boolean>(false); // encryption toggle
    const [textToDecrypt, setTextToDecrypt] = useState<string>(''); // text extracted from PNG
    const [password, setPassword] = useState<string>(''); // password value
    const [encryptedText, setEncryptedText] = useState<string>(''); // textarea value encrypted if enabled
    const [decryptedText, setDecryptedText] = useState<string>(''); // string extracted from PNG decrypted if enabled

    // Resize the canvas when more data is added
    const handleResize = useCallback(() => {
        if (canvasRef.current) {
            // Calculate the height of the canvas based on the number of binary strings
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

    // Side effects
    useEffect(() => {
        // Paint the canvas
        plot(output, canvasRef);
    }, [canvasHeight, canvasWidth, output])

    useEffect(() => {
        handleResize();
    }, [handleResize, output])

    useEffect(() => {
        if (input && encryptionEnabled) {
            handleEncrypt(input, password, setEncryptedText);
        }
    }, [encryptionEnabled, input, password])

    useEffect(() => {
        if (textToDecrypt) {
            handleDecrypt(textToDecrypt, password, setDecryptedText)
        }
    }, [password, textToDecrypt])

    useEffect(() => {
        function handleTranslate() {
            if (input.length !== 0 || encryptedText.length !== 0) {
                if (encryptionEnabled) {
                    convertBinary(encryptedText, setOutput);
                } else {
                    convertBinary(input, setOutput);
                }
            }
        }
        handleTranslate();
    }, [input, password, encryptionEnabled, encryptedText]);

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