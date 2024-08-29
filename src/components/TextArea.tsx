import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { createPngWithMetadata } from '../utils/save';
interface TextAreaProps {
    encryptionEnabled: boolean;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    encryptedText: string;
    setDecryptedText: React.Dispatch<React.SetStateAction<string>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    handleDecrypt: (encryptedText: string, password: string, setDecryptedText: React.Dispatch<React.SetStateAction<string>>) => void;
    decryptedText: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ encryptionEnabled, password, setPassword, encryptedText, setDecryptedText, input, setInput, setEncryptionEnabled, canvasRef, handleDecrypt, decryptedText }) => {

    const handleCheckboxChange = () => {
        setEncryptionEnabled(!encryptionEnabled)
        if (encryptionEnabled) {
            setPassword('');
        }
    }

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (canvasRef.current) {
            await createPngWithMetadata(canvasRef.current, encryptedText, encryptionEnabled, password);
        }
        handleDecrypt(encryptedText, password, setDecryptedText);
    };

    return (
        <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                            <button type="submit" id="btn-download" onClick={handleSave} disabled={!input.length} className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center rounded-lg ${!input.length ? 'cursor-not-allowed text-gray-600 bg-gray-200 focus:ring-0 hover:ring-transparent' : 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-200 focus:ring-4'}`}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                                <span className='sr-only'>Download</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex">
                        <label className='relative inline-flex cursor-pointer select-none items-center'>
                            <input
                                type='checkbox'
                                checked={encryptionEnabled}
                                onChange={handleCheckboxChange}
                                className='sr-only'
                            />
                            <div className='shadow-card p-1 flex h-[46px] items-center justify-center rounded-md text-gray-900 bg-gray-200'>
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded ${!encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faLock} className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded ${encryptionEnabled ? 'text-sm text-gray-500 bg-gray-200' : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faUnlock} className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" id="password-input" disabled={!encryptionEnabled} className={`ml-1 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={encryptionEnabled ? 'Enter a secret key' : 'Enable encryption'} />

                            </div>
                        </label>
                    </div>
                    <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Enable encryption to secure your message.
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label htmlFor="editor" className="sr-only">Download</label>
                    <textarea rows={7} id="text-input" value={input} onChange={(e) => setInput(e.target.value)} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder={`${decryptedText ? decryptedText : 'Type your thoughts '}`} required ></textarea>
                </div>
            </div>
        </form>
    )
}   