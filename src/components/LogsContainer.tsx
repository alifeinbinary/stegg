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

import { Console } from 'console-feed';
import { LogConainterProps } from '../types';
import '../App.css';


const LogsContainer = (logs: LogConainterProps) => {

    return (
        <div className='flex justify-center items-center pt-2'>
            <div data-testid='console-feed' className='w-full max-w-xl h-full text-left'>
                <Console logs={logs.logs} filter={['table']} variant="light" styles={{ BASE_FONT_SIZE: '12px', PADDING: '0px', LOG_BORDER: 'none' }} />
            </div>
        </div>
    )
}

export { LogsContainer }