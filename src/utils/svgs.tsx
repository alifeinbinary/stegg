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

import { SVGProps } from "react"

export const crackedEgg: React.FC<SVGProps<SVGSVGElement>> = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 677 624" width="677" height="624" className='w-16 h-16 pr-2'>
            <g>
                <path d="M300,20 C400,0 550,150 530,270 C510,390 370,450 290,510 C210,570 60,550 30,440 C10,360 120,300 160,230 C200,160 260,50 300,20 Z" fill="#FFF" />
                <ellipse cx="330" cy="290" rx="90" ry="100" fill="#f2e34c" />
                <path d="M300,260 C310,240 350,240 370,260 C390,280 370,310 340,310 C320,310 310,290 300,260 Z" fill="#FFFFFF" />
            </g>
        </svg>
    )
}

export const wholeEgg: React.FC<SVGProps<SVGSVGElement>> = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-16 h-16 pr-4" fill="#FFFFFF"><path d="M192 496C86 496 0 394 0 288C0 176 64 16 192 16s192 160 192 272c0 106-86 208-192 208zM154.8 134c6.5-6 7-16.1 1-22.6s-16.1-7-22.6-1c-23.9 21.8-41.1 52.7-52.3 84.2C69.7 226.1 64 259.7 64 288c0 8.8 7.2 16 16 16s16-7.2 16-16c0-24.5 5-54.4 15.1-82.8c10.1-28.5 25-54.1 43.7-71.2z" /></svg>
    )
}