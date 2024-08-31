import { useRef, useEffect, useState, useCallback } from 'react'
import { convertBinary, plot } from '../utils/translate';
import { handleEncrypt, handleDecrypt } from '../utils/encryption';
import { Dropzone } from './Dropzone';
import { TextArea } from './TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

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

    const DEBUG = debugMode ? import.meta.env.MODE === 'development' : false;


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

    // Keeping it fresh
    useEffect(() => {
        console.clear();
        // Debug console
        const items = {
            input: input,
            outputLength: output.length, // output,
            canvasHeight: `${canvasHeight}px`, // canvasHeight,
            canvasWidth: `${canvasWidth}px`,
            size: size,
            encryptionEnabled: encryptionEnabled,
            stringToDecrypt: stringToDecrypt,
            password: password,
            encryptedText: encryptedText,
            decryptedText: decryptedText
        }
        if (DEBUG) {
            console.table(items);
        }
        // console.table([input, size, encryptionEnabled, stringToDecrypt, password, encryptedText, decryptedText]);
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
            <div className='min-h-20'>
                <button className='pt-6 text-sm font-light text-gray-100 hover:text-gray-300 hover:underline' onClick={handleDebugMode}><FontAwesomeIcon icon={faTerminal} className='text-sm pr-2 font-light text-gray-100 hover:text-gray-300 hover:underline' />{debugMode ? 'Disable' : 'Enable'} debug mode</button>
                <br />{debugMode && <span className='mx-auto text-xs font-light text-gray-100'>Please open your browser's console</span>}
            </div>
        </div>
    );
}

export default Translate