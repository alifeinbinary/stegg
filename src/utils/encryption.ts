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
import { toast } from "react-toastify";

const handleEncrypt = (
  input: string,
  password: string,
  setEncryptedText: React.Dispatch<string>
) => {
  const encrypted = AES.encrypt(input, password).toString();
  setEncryptedText(encrypted);
};

function handleDecrypt(
  stringToDecrypt: string,
  password: string,
  setDecryptedText: React.Dispatch<string>
) {
  try {
    const bytes = AES.decrypt(stringToDecrypt, password);
    const originalText = bytes.toString(enc.Utf8);

    if (originalText.length === 0) {
      setDecryptedText(stringToDecrypt);
    } else {
      setDecryptedText(originalText);
      toast.success("Decryption successful");
    }
  } catch (error) {
    console.info("Decryption failed", error);
    return;
  }
}

export { handleEncrypt, handleDecrypt };
