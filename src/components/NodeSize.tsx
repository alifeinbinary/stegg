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

import { useImageState } from '../utils/stores';
import { useTranslation } from 'react-i18next';

const Slider: React.FC = () => {

    const { t } = useTranslation();

    const [size, setSize] = useImageState(state => [state.size, state.setSize]);

    function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSize(Math.floor(Number(event.target.value)));
    }
    return (
        <div className="relative lg:w-60 md:w-40 sm:w-48 mb-6 mx-3">
            <label htmlFor="labels-range-input" className="xs:sr-only text-left block mb-0 text-xs font-medium text-gray-900 dark:text-white">{t('nodesize.label')}</label>
            <input id="labels-range-input" tabIndex={0} type="range" min="36" max="66" value={size} step="10" onChange={(e) => handleSliderChange(e)} className="w-full h-1 mb-1 range-sm text-blue-900 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute start-0 -bottom-4">sm</span>
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">md</span>
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-4">lg</span>
            <span className="text-xs uppercase text-gray-500 dark:text-gray-400 absolute end-0 -bottom-4">xl</span>
        </div>
    )
}

export default Slider