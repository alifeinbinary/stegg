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
// import { Message } from "console-feed/lib/definitions/Component";

// export interface DownloadImageButtonProps {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   // input: string;
//   // setInput: React.Dispatch<React.SetStateAction<string>>;
//   password: string;
//   setPassword: React.Dispatch<React.SetStateAction<string>>;
//   encryptedText: string;
//   setEncryptedText: React.Dispatch<React.SetStateAction<string>>;
//   setDecryptedText: React.Dispatch<React.SetStateAction<string>>;
//   encryptionEnabled: boolean;
//   setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   setOutput: React.Dispatch<React.SetStateAction<string[]>>;
// }

// export interface PostImageButtonProps {
//   user: string;
//   setUser: React.Dispatch<React.SetStateAction<string>>;
// }

export interface DropzoneProps {
  setInput: (input: string) => void;
  setEncryptionEnabled: (enabled: boolean) => void;
  setStringToDecrypt: (text: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setDecryptedText: (text: string) => void;
}

export interface LogConainterProps {
  logs: Message[];
}

// export interface SliderProps {
//   size: number;
//   setSize: React.Dispatch<React.SetStateAction<number>>;
// }

// export interface TextAreaProps {
//   encryptionEnabled: boolean;
//   password: string;
//   setPassword: React.Dispatch<React.SetStateAction<string>>;
//   encryptedText: string;
//   setEncryptedText: React.Dispatch<React.SetStateAction<string>>;
//   setDecryptedText: React.Dispatch<React.SetStateAction<string>>;
//   stringToDecrypt: string;
//   setStringToDecrypt: React.Dispatch<React.SetStateAction<string>>;
//   // input: string;
//   // setInput: React.Dispatch<React.SetStateAction<string>>;
//   setOutput: React.Dispatch<React.SetStateAction<string[]>>;
//   setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
//   handleDecrypt: (
//     encryptedText: string,
//     password: string,
//     setDecryptedText: React.Dispatch<React.SetStateAction<string>>
//   ) => void;
//   decryptedText: string;
//   size: number;
//   setSize: React.Dispatch<React.SetStateAction<number>>;
//   user: string;
//   setUser: React.Dispatch<React.SetStateAction<string>>;
// }

export interface PostProps {
  id: string;
  author: string;
  posted: Date;
  image: string;
}

// export interface PasswordProps {
//   canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
//   encryptionEnabled: boolean;
//   setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   setEncryptionEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   password: string;
//   setPassword: React.Dispatch<React.SetStateAction<string>>;
//   setOutput: React.Dispatch<React.SetStateAction<string[]>>;
//   setEncryptedText: React.Dispatch<React.SetStateAction<string>>;
//   decryptedText: string;
//   setDecryptedText: React.Dispatch<React.SetStateAction<string>>;
//   stringToDecrypt: string;
//   setStringToDecrypt: React.Dispatch<React.SetStateAction<string>>;
// }

export interface PasswordProps {
  password: string;
  setPassword: (value: string) => void;
  setEncryptionEnabled: (value: boolean) => void;
  encryptionEnabled: boolean;
  setOutput: (value: string[]) => void;
  setDecryptedText: (value: string) => void;
  decryptedText: string;
  setStringToDecrypt: (value: string) => void;
  stringToDecrypt: string;
  setEncryptedText: (value: string) => void;
}
