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

import { render, screen } from '@testing-library/react';
import { LogsContainer } from '../components/LogsContainer';
import { Message } from 'console-feed/lib/definitions/Component';

describe('LogsContainer Component', () => {
    const items = {
        input: ["test input string"],
        canvasHeight: ["32px"], // canvasHeight,
        canvasWidth: ["50px"],
        size: [15],
        encryptionEnabled: [true],
        stringToDecrypt: ["stringToDecrypt"],
        password: ["password"],
        encryptedText: ["encryptedText"],
        decryptedText: ["decryptedText"]
    }
    const mockLogs: Message[] = [
        {
            method: 'log', data: [items.input],
            id: ''
        },
        {
            method: 'warn', data: [items.canvasHeight],
            id: ''
        },
        {
            method: 'error', data: [items.decryptedText],
            id: ''
        },
    ];

    it('should render the component correctly', () => {
        render(<LogsContainer logs={mockLogs} />);

        const consoleFeed = screen.getByTestId('console-feed');
        expect(consoleFeed).toBeInTheDocument();
    });

    it('should pass logs to the Console component', () => {
        render(<LogsContainer logs={mockLogs} />);
    });
});