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
    const [canvasWidth, setCanvasWidth] = useState<number>(1024); // width of the canvas
    const [size, setSize] = useState<number>(12); // size of the nodes

    const [encryptionEnabled, setEncryptionEnabled] = useState<boolean>(false); // encryption toggle
    const [textToDecrypt, setTextToDecrypt] = useState<string>(''); // text extracted from PNG
    const [password, setPassword] = useState<string>(''); // password value
    const [encryptedText, setEncryptedText] = useState<string>(''); // textarea value encrypted if enabled
    const [decryptedText, setDecryptedText] = useState<string>(''); // string extracted from PNG decrypted if enabled

    const DEBUG = import.meta.env.MODE === 'development';

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

        if (DEBUG) {
            console.log(`Canvas Height: ${canvasHeight}\nCanvas Width: ${canvasWidth}\nOutput Length: ${output.length}\nNodes Size: ${size}`)
        }
    }, [DEBUG, canvasHeight, canvasWidth, output, size]);

    // Side effects
    useEffect(() => {
        const canv = canvasRef.current;
        if (!canv) return;
        // Paint the canvas
        plot(output, canvasRef, size);

        if (DEBUG) {
            console.log(`Data size: ${output.length} bytes\nNodes size: ${size} pixels`)
        }
    }, [DEBUG, canvasHeight, canvasWidth, output, size])

    useEffect(() => {
        handleResize();
    }, [handleResize, output])

    useEffect(() => {
        if (input && encryptionEnabled) {
            handleEncrypt(input, password, setEncryptedText);
        }

        if (DEBUG) {
            console.log(`Input: ${input}\nPassword: ${password}\nEncryption Enabled: ${encryptionEnabled}`)
        }
    }, [DEBUG, encryptionEnabled, input, password])

    useEffect(() => {
        if (textToDecrypt) {
            handleDecrypt(textToDecrypt, password, setDecryptedText)
        }

        if (DEBUG) {
            console.log(`Text to decrypt: ${textToDecrypt}\nPassword: ${password}`)
        }
    }, [DEBUG, password, textToDecrypt])

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

        if (DEBUG) {
            console.log(`Input: ${input}\nEncrypted Text: ${encryptedText}\nEncryption Enabled: ${encryptionEnabled}`)
        }
    }, [DEBUG, input, password, encryptionEnabled, encryptedText]);

    return (
        <div>
            <div className='flex gap-4'>
                <div className='flex-1 w-2/3'>
                    <TextArea encryptionEnabled={encryptionEnabled} password={password} setPassword={setPassword} encryptedText={encryptedText} setDecryptedText={setDecryptedText} input={input} setInput={setInput} setOutput={setOutput} setEncryptionEnabled={setEncryptionEnabled} canvasRef={canvasRef} handleDecrypt={handleDecrypt} decryptedText={decryptedText} size={size} setSize={setSize} />
                </div>
                <Dropzone setInput={setInput} setEncryptionEnabled={setEncryptionEnabled} setTextToDecrypt={setTextToDecrypt} />
            </div>
            <canvas id="canvas" ref={canvasRef} height={canvasHeight} width={canvasWidth} className='w-full rounded-lg bg-slate-100' />
        </div>
    );
}

export default Translate