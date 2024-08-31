// import { useCallback } from "react";
import { AES, enc } from "crypto-js";
const handleEncrypt = (
  input: string,
  password: string,
  setEncryptedText: React.Dispatch<React.SetStateAction<string>>
) => {
  const encrypted = AES.encrypt(input, password).toString();
  setEncryptedText(encrypted);
};

function handleDecrypt(
  stringToDecrypt: string,
  password: string,
  setDecryptedText: React.Dispatch<React.SetStateAction<string>>
) {
  // const generateBase64Random = (length: number): string => {
  //   const randomBytes = new Uint8Array(length);
  //   crypto.getRandomValues(randomBytes);
  //   return btoa(String.fromCharCode(...randomBytes));
  // };

  try {
    const bytes = AES.decrypt(stringToDecrypt, password);
    const originalText = bytes.toString(enc.Utf8);

    if (originalText.length === 0) {
      setDecryptedText(stringToDecrypt);
    } else {
      setDecryptedText(originalText);
    }
  } catch (error) {
    console.log(
      "Decryption failed. Check the password or PNG file. Error: " + error
    );
  }
}

export { handleEncrypt, handleDecrypt };
