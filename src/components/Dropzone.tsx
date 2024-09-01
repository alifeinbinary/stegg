// import { createRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useDropzone } from "react-dropzone"
import { getMetadata } from "meta-png"

interface DropzoneProps {
    setInput: (input: string) => void;
    setEncryptionEnabled: (enabled: boolean) => void;
    setStringToDecrypt: (text: string) => void;
    password: string;
    setPassword: (password: string) => void;
    setDecryptedText: (text: string) => void;
}

export const FileUploader: React.FC<DropzoneProps> = ({ setInput, setEncryptionEnabled, setStringToDecrypt, password, setPassword, setDecryptedText }) => {
    const onDrop = (acceptedFiles: File[]) => {

        const strToBool = (str: string): boolean => {
            if (str.toLowerCase() === 'true') return true;
            if (str.toLowerCase() === 'false') return false;
            throw new Error('Invalid boolean string');
        };

        setInput("");
        if (!password) {
            setPassword('');
            setDecryptedText('');
        }

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onloadend = () => {
                // Get the binary string from the image file and make it a Uint8Array
                const binaryStr = reader.result
                const imageArray = new Uint8Array(binaryStr as ArrayBuffer)

                // Pull metadata values from the png image
                const stringToDecrypt = getMetadata(imageArray as Uint8Array, 'Message')
                const encryptionState = getMetadata(imageArray as Uint8Array, 'Encrypted')?.toLowerCase();

                if (encryptionState !== undefined) {
                    if (strToBool(encryptionState)) {
                        setEncryptionEnabled(true)
                    } else {
                        setEncryptionEnabled(false)
                        setPassword('')
                    }
                } else {
                    // Handle the case where encryptionState is undefined
                    console.log("Encryption state not found. This no longer compatible with the translator.");
                    setEncryptionEnabled(false); // or set it to true, depending on your requirements
                }
                setStringToDecrypt(stringToDecrypt as string)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop, noClick: true, noKeyboard: true, accept: { 'image/png': ['.png'] } })
    return (
        <div className='w-full'>
            <h4 className="mb-2 h4 sm:hidden xs:hidden text-left font-bold dark:text-white">Decrypt</h4>
            <div className="flex items-center justify-center w-full h-52 xs:h-24">
                <label {...getRootProps()} onClick={() => onDrop(acceptedFiles)} tabIndex={0} htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full px-2 border-2 border-gray-300 border-dashed rounded-lg xs:rounded-none xs:rounded-b-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center ">
                        <FontAwesomeIcon icon={faUpload} className="w-10 h-10 mb-3 text-gray-400 sm:hidden xs:hidden" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop to extract message</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG format only</p>
                    </div>
                    <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
        </div>
    )
}
