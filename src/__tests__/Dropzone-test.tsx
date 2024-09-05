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


import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploader } from '../components/Dropzone';
import { useDropzone } from 'react-dropzone';
import { getMetadata } from 'meta-png';

jest.mock('react-dropzone', () => ({
    useDropzone: jest.fn(),
}));

jest.mock('meta-png', () => ({
    getMetadata: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        info: jest.fn(),
    },
}));

describe('FileUploader Component', () => {
    const mockSetInput = jest.fn();
    const mockSetEncryptionEnabled = jest.fn();
    const mockSetStringToDecrypt = jest.fn();
    const mockSetPassword = jest.fn();
    const mockSetDecryptedText = jest.fn();

    const defaultProps = {
        setInput: mockSetInput,
        setEncryptionEnabled: mockSetEncryptionEnabled,
        setStringToDecrypt: mockSetStringToDecrypt,
        password: '',
        setPassword: mockSetPassword,
        setDecryptedText: mockSetDecryptedText,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component correctly', () => {
        (useDropzone as jest.Mock).mockReturnValue({
            getRootProps: jest.fn(() => ({})),
            getInputProps: jest.fn(() => ({})),
            acceptedFiles: [],
        });

        render(<FileUploader {...defaultProps} />);

        expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
        expect(screen.getByText(/PNG format only/i)).toBeInTheDocument();
    });

    it('should call setInput and setPassword when a file is dropped and no password is set', async () => {
        const mockFile = new File([new ArrayBuffer(8)], 'test.png', { type: 'image/png' });
        const mockOnDrop = jest.fn();

        (useDropzone as jest.Mock).mockReturnValue({
            getRootProps: jest.fn(() => ({})),
            getInputProps: jest.fn(() => ({})),
            acceptedFiles: [mockFile],
            onDrop: mockOnDrop,
        });

        (getMetadata as jest.Mock).mockReturnValueOnce('Test message').mockReturnValueOnce('false'); // Mock metadata

        render(<FileUploader {...defaultProps} />);

        const dropzoneInput = screen.getByLabelText(/Click to upload/i);
        fireEvent.change(dropzoneInput, {
            target: {
                files: [mockFile],
            },
        });

        expect(mockSetInput).toHaveBeenCalledWith('');
        expect(mockSetPassword).toHaveBeenCalledWith('');
        expect(mockSetDecryptedText).toHaveBeenCalledWith('');
    });

    it('should display error toast if metadata extraction fails', async () => {
        const mockFile = new File([new ArrayBuffer(8)], 'test.png', { type: 'image/png' });

        (useDropzone as jest.Mock).mockReturnValue({
            getRootProps: jest.fn(() => ({})),
            getInputProps: jest.fn(() => ({})),
            acceptedFiles: [mockFile],
            onDrop: jest.fn(),
        });

        render(<FileUploader {...defaultProps} />);

        const dropzoneInput = screen.getByLabelText(/Click to upload/i);
        fireEvent.change(dropzoneInput, {
            target: {
                files: [mockFile],
            },
        });
    });
});
