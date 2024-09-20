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

import { render, fireEvent, screen } from '@testing-library/react';
import Slider from '../components/NodeSize';

describe('Slider Component', () => {
    const defaultProps = {
        size: 16,
        setSize: jest.fn(),
    };

    it('should render the component correctly', () => {
        render(<Slider />);
        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
        expect(slider).toHaveValue('16');
    });

    it('should update size when slider value changes', () => {
        render(<Slider />);

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '18' } });

        expect(defaultProps.setSize).toHaveBeenCalledWith(18);
    });

    it('should respect the min, max, and step attributes', () => {
        render(<Slider />);

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('min', '12');
        expect(slider).toHaveAttribute('max', '22');
        expect(slider).toHaveAttribute('step', '3.33');
    });
});