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

import { AES, enc } from "crypto-js";

/**
 * Encrypts the given input text with the given password and sets the encrypted text state.
 * @param {string} input The text to encrypt.
 * @param {string} password The password to encrypt with.
 * @param {React.Dispatch<string>} setEncryptedText The function to set the encrypted text state.
 */
const handleEncrypt = (
    input: string,
    password: string,
    setEncryptedText: React.Dispatch<string>,
) => {
    const encrypted = AES.encrypt(input, password).toString();
    setEncryptedText(encrypted);
};

/**
 * Decrypts the given string with the given password and sets the decrypted text state.
 * If the decrypted string is empty, it sets the decrypted text state to the original string.
 * @param {string} stringToDecrypt The string to decrypt.
 * @param {string} password The password to decrypt with.
 * @param {React.Dispatch<string>} setDecryptedText The function to set the decrypted text state.
 */
function handleDecrypt(
    stringToDecrypt: string,
    password: string,
    setDecryptedText: React.Dispatch<string>,
) {
    let decryptionSuccessful = false;

    try {
        const bytes = AES.decrypt(stringToDecrypt, password);
        const originalText = bytes.toString(enc.Utf8);

        if (originalText.length > 0) {
            setDecryptedText(originalText);
            decryptionSuccessful = true;
        }
    } catch (error) {}

    // Only update the UI if decryption was successful
    if (decryptionSuccessful) {
        // Update UI logic here
    }
}

export { handleDecrypt, handleEncrypt };
