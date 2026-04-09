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

// import { useEffect, useRef, useState } from "react";
// import { Canvas as Fabric } from 'fabric';
// import { useImageState } from "../utils/stores";
// import { plot } from "../utils/translate";
// const Canvas: React.FC = () => {
//     const { setCanvasRef, canvas, setCanvas, output, size, encryptionEnabled, canvasHeight, canvasWidth } = useImageState();
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);

//     // useEffect(() => {
//     //     if (canvasRef.current) {
//     //         setCanvasRef(canvasRef);
//     //     }
//     // }, [canvasRef, setCanvasRef]);
//     // useEffect(() => {
//     //     const canv = canvasRef.current;
//     //     if (!canv) return;

//     //     plot(output, canvasRef, size, encryptionEnabled);
//     // }, [canvasHeight, canvasRef, canvasWidth, encryptionEnabled, output, size])

//     useEffect(() => {
//         if (canvasRef.current) {
//             const initCanvas = new Fabric(canvasRef.current, {
//                 width: canvasWidth, height: canvasHeight
//             });

//             initCanvas.backgroundColor = "#000"
//             initCanvas.renderAll();

//             setCanvas(initCanvas);

//             return () => {
//                 initCanvas.dispose();
//             }
//         }
//     }, []);
//     return (
//         <>
//             <canvas id="canvas" ref={canvasRef} height={canvasHeight} width={canvasWidth} className='w-full rounded-lg xs:mt-4 sm:mt-4 bg-slate-100 dark:bg-slate-700 min-h-4' />
//         </>
//     )
// }

// export default Canvas;