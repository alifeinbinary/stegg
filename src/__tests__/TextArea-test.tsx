/**
 * @jest-environment jsdom
 */

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
import { jest, expect } from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextArea } from '../components/Encrypt';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
  },
}));

jest.spyOn(React, 'useState').mockReturnValue(['', jest.fn()]);


describe('TextArea Component', () => {
  const defaultProps = {
    encryptionEnabled: false,
    password: '',
    setPassword: jest.fn(),
    encryptedText: '',
    setEncryptedText: jest.fn(),
    setDecryptedText: jest.fn(),
    stringToDecrypt: '',
    setStringToDecrypt: jest.fn(),
    input: '',
    setInput: jest.fn(),
    setOutput: jest.fn(),
    setEncryptionEnabled: jest.fn(),
    canvasRef: { current: null },
    handleDecrypt: jest.fn(),
    decryptedText: '',
    size: 50,
    setSize: jest.fn(),
  };

  it('should render the component correctly', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.getByPlaceholderText('Type your thoughts')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-encryption')).toBeInTheDocument();
  });

  it('should toggle encryption on checkbox change', () => {
    render(<TextArea {...defaultProps} />);

    const toggle = screen.getByTestId('toggle-encryption');
    fireEvent.click(toggle);

    expect(defaultProps.setEncryptionEnabled).toHaveBeenCalledWith(true);
    expect(toast.info).toHaveBeenCalledWith(expect.stringContaining('Encryption enabled'), {
      autoClose: 4000,
      pauseOnHover: true,
    });
  });

  it('should update password input when encryption is enabled', () => {
    render(<TextArea {...defaultProps} encryptionEnabled={true} />);

    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'secret' } });

    expect(defaultProps.setPassword).toHaveBeenCalledWith('secret');
  });

  it('should clear encrypted and decrypted text when input is empty', () => {
    render(<TextArea {...defaultProps} />);

    const textInput = screen.getByTestId('text-input');
    fireEvent.change(textInput, { target: { value: '' } });

  });
});
