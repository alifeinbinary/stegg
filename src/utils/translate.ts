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

/**
 * Converts a given string to a binary representation.
 *
 * @param {string} input - The string to be converted to binary.
 * @param {React.Dispatch<string[]>} setOutput - A state setter that updates a state variable with the binary representation of the input string.
 *
 * @returns {void}
 */
function convertBinary(input: string, setOutput: React.Dispatch<string[]>) {
    if (input !== input) {
        return;
    }
    const binaryOutput: string[] = [];
    for (let i = 0; i < input.length; i++) {
        const binaryString = "0" + input[i].charCodeAt(0).toString(2);
        binaryOutput.push(binaryString);
    }
    setOutput(binaryOutput);
}

/**
 * Draws a shape on a canvas.
 *
 * This function draws a shape with the given number of points on a canvas. The shape is
 * centered at (x, y) and has a radius of radius1 and radius2. The shape is rotated by
 * alpha0 radians.
 *
 * The points of the shape alternate between the two radii. The first point is drawn at
 * radius1, the second at radius2, the third at radius1, and so on.
 *
 * @param ctx - The canvas context to draw on.
 * @param x - The x-coordinate of the center of the shape.
 * @param y - The y-coordinate of the center of the shape.
 * @param points - The number of points on the shape.
 * @param radius1 - The radius of the first point.
 * @param radius2 - The radius of the second point.
 * @param alpha0 - The angle of rotation of the shape in radians.
 */
const drawShape = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    points: number,
    radius1: number,
    radius2: number,
    alpha0: number,
) => {
    for (let i = 0; i <= points; i++) {
        const angle = (i * 2 * Math.PI) / points - Math.PI / 2 + alpha0;
        const radius = i % 2 === 0 ? radius1 : radius2;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer between min and max.
 */
const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Clears a canvas context.
 *
 * This function takes a canvas reference and clears its context. If the canvas
 * reference is null, the function does nothing.
 *
 * @param {React.RefObject<HTMLCanvasElement | null>} canvasRef - The
 *     canvas reference to clear.
 */
const clearContx = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const canv = canvasRef.current;
    if (!canv) return;

    const contx = canv.getContext("2d");
    contx?.clearRect(0, 0, canv.width, canv.height);
};

function memoise<T extends (...args: any[]) => any>(fn: T) {
    const cache: { [key: string]: any } = {};

    return ((...args: Parameters<T>) => {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    }) as T;
}

/**
 * Draws a binary image on a canvas.
 *
 * This function takes a binary string array and draws it on the canvas as a
 * series of shapes. The size of the shapes and the spacing between them is
 * determined by the size parameter. The encryptionEnabled parameter
 * determines which set of drawing parameters to use.
 *
 * @param {string[]} output - The binary string array to draw.
 * @param {React.RefObject<HTMLCanvasElement | null>} canvasRef - The canvas
 * to draw on.
 * @param {number} size - The size of the shapes to draw.
 * @param {boolean} encryptionEnabled - Whether to use the encryption drawing
 * parameters.
 */
function plot(
    output: string[],
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    size: number,
    encryptionEnabled: boolean,
) {
    const colours: string[] = [
        "#ffeedd",
        "#ddeecc",
        "#aaddcc",
        "#99aabb",
        "#88aa99",
        "#aabb99",
        "#bb9988",
        "#eebbaa",
        "#ff8866",
        "#ccaabb",
        "#886677",
        "#887766",
        "#554433",
        "#667755",
        "#557777",
        "#223311",
        "#442233",
        "#331111",
        "#330011",
    ];

    const canv = canvasRef?.current;
    if (!canv) return;

    const contx = canv.getContext("2d");
    if (!contx) return;
    contx.imageSmoothingEnabled = true;
    contx.imageSmoothingQuality = "high";

    clearContx(canvasRef);

    const memoisedDoLoop = memoise(doLoop);

    let iter = 0;
    let sizeMultiplier = 87;
    let sizeModifier = 0;
    let columnWidth = 779;
    let seedOffset = 30;
    let lineHeight = 98;
    let columnDivider = 4;

    /**
     * Draw the translated binary image on the canvas.
     *
     * @param contx The canvas context to draw on.
     * @param sizeModifier The size modifier to use for the calculation.
     * @param sizeMultiplier The size multiplier to use for the calculation.
     * @param columnWidth The width of each column.
     * @param seedOffset The offset of the seed.
     * @param lineHeight The height of each line.
     * @param columnDivider The number of columns to divide the output into.
     */
    async function doLoop(
        contx: CanvasRenderingContext2D,
        sizeModifier: number,
        sizeMultiplier: number,
        columnWidth: number,
        seedOffset: number,
        lineHeight: number,
        columnDivider: number,
    ) {
        const calculatedSize = size - sizeModifier;
        // Calculate rows
        for (let row = 0; row < Math.ceil(output.length / 4); row++) {
            let top = calculatedSize + seedOffset;

            if (row > 0) {
                top += (calculatedSize + lineHeight) * row;
            }
            // Calculate columns
            for (let col = 0; col < columnDivider; col++) {
                const str = output[iter];
                const left = calculatedSize + (seedOffset + 4);
                let column = 0;

                if (!str) {
                    break;
                }

                if (col > 0) {
                    column += (calculatedSize + columnWidth) * col;
                }
                // Draw nodes
                for (let string = 0; string < str.length; string++) {
                    contx.beginPath();
                    drawShape(
                        contx,
                        column + left + sizeMultiplier * string,
                        top,
                        getRandomInt(3, 12),
                        calculatedSize,
                        calculatedSize,
                        Math.PI,
                    );
                    contx.moveTo(300, 20);
                    contx.lineWidth = size / (sizeModifier * 0.7);

                    if (str[string] === "1") {
                        contx.fillStyle =
                            colours[Math.floor(Math.random() * colours.length)];
                        contx.fill();
                    } else {
                        contx.strokeStyle =
                            colours[Math.floor(Math.random() * colours.length)];
                        contx.stroke();
                    }
                }
                iter++;
            }
        }
    }

    if (
        (output.length > 64 && encryptionEnabled) ||
        (output.length > 128 && !encryptionEnabled)
    ) {
        sizeModifier = 20;
        sizeMultiplier = 45;
        columnWidth = 405;
        seedOffset = 10;
        lineHeight = 60;
        columnDivider = 8;
        memoisedDoLoop(
            contx,
            sizeModifier,
            sizeMultiplier,
            columnWidth,
            seedOffset,
            lineHeight,
            columnDivider,
        );
    } else {
        sizeModifier = 10;
        sizeMultiplier = 90;
        columnWidth = 800;
        seedOffset = 10;
        lineHeight = 90;
        columnDivider = 4;
        memoisedDoLoop(
            contx,
            sizeModifier,
            sizeMultiplier,
            columnWidth,
            seedOffset,
            lineHeight,
            columnDivider,
        );
    }
}

export { clearContx, convertBinary, plot };
