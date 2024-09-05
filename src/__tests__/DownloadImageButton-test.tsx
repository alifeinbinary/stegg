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

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DownloadImageButton from '../components/DownloadImageButton';
import { createPngWithMetadata } from '../utils/save';

jest.mock('../utils/save', () => ({
    createPngWithMetadata: jest.fn(),
}));

jest.mock('../utils/translate', () => ({
    clearContx: jest.fn(),
}));

describe('DownloadImageButton Component', () => {
    const mockCanvasRef = { current: document.createElement('canvas') } as React.RefObject<HTMLCanvasElement>;
    const mockSetInput = jest.fn();
    const mockSetPassword = jest.fn();
    const mockSetEncryptedText = jest.fn();
    const mockSetDecryptedText = jest.fn();
    const mockSetEncryptionEnabled = jest.fn();
    const mockSetOutput = jest.fn();

    const defaultProps = {
        canvasRef: mockCanvasRef,
        input: 'Test message',
        setInput: mockSetInput,
        password: 'password123',
        setPassword: mockSetPassword,
        encryptedText: 'encrypted text',
        setEncryptedText: mockSetEncryptedText,
        setDecryptedText: mockSetDecryptedText,
        encryptionEnabled: true,
        setEncryptionEnabled: mockSetEncryptionEnabled,
        setOutput: mockSetOutput,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the button correctly', () => {
        render(<DownloadImageButton {...defaultProps} />);
        const button = screen.getByRole('button', { name: /Download/i });
        expect(button).toBeInTheDocument();
    });

    it('disables the button when input is empty', () => {
        render(<DownloadImageButton {...defaultProps} input="" />);
        const button = screen.getByRole('button', { name: /Download/i });
        expect(button).toBeDisabled();
    });

    it('enables the button when input is provided and encryption is enabled with a password', () => {
        render(<DownloadImageButton {...defaultProps} />);
        const button = screen.getByRole('button', { name: /Download/i });
        expect(button).toBeEnabled();
    });

    it('calls createPngWithMetadata and clearContx on download', async () => {
        render(<DownloadImageButton {...defaultProps} />);

        const button = screen.getByRole('button', { name: /Download/i });
        fireEvent.click(button);

        expect(createPngWithMetadata).toHaveBeenCalledWith(
            mockCanvasRef.current,
            defaultProps.encryptedText,
            true,
            defaultProps.password
        );
    });

    it('uses the input text if encryption is disabled', async () => {
        render(<DownloadImageButton {...defaultProps} encryptionEnabled={false} />);

        const button = screen.getByRole('button', { name: /Download/i });
        fireEvent.click(button);

        expect(createPngWithMetadata).toHaveBeenCalledWith(
            mockCanvasRef.current,
            defaultProps.input,
            false,
            defaultProps.password
        );
    });

    it('does not allow download if password or input is missing when encryption is enabled', () => {
        render(<DownloadImageButton {...defaultProps} input="" password="" />);
        const button = screen.getByRole('button', { name: /Download/i });
        expect(button).toBeDisabled();
    });
});