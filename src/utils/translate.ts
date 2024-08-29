// Converting text input to an array of binary strings
function convertBinary(
  input: string,
  setOutput: React.Dispatch<React.SetStateAction<string[]>>
) {
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

// Draw nodes on the canvas
const drawShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  points: number,
  radius1: number,
  radius2: number,
  alpha0: number
) => {
  for (let i = 0; i <= points; i++) {
    const angle = (i * 2 * Math.PI) / points - Math.PI / 2 + alpha0;
    const radius = i % 2 === 0 ? radius1 : radius2;
    ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
};

// Use a random number generator to select node colours
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// Clear the canvas
const clearContx = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const canv = canvasRef.current;
  if (!canv) return;

  const contx = canv.getContext("2d");
  contx?.clearRect(0, 0, canv.width, canv.height);
};

// Draw the nodes on the canvas
function plot(
  output: string[],
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const size = 12;

  const colours: string[] = [
    "#ffeedd",
    "#ddeecc",
    "#aaddcc",
    "#99aabb",
    "#88aa99",
    "#aabb99",
    "#bb9988",
    "#ccaabb",
    "#eebbaa",
    "#ff8866",
    "#886677",
    "#887766",
    "#667755",
    "#557777",
    "#554433",
    "#442233",
    "#223311",
    "#331111",
    "#330011",
  ];

  const canv = canvasRef?.current;
  if (!canv) return;

  const contx = canv.getContext("2d");
  if (!contx) return;

  clearContx(canvasRef);

  let iter = 0;

  for (let row = 0; row < Math.ceil(output.length / 4); row++) {
    let top = 16;

    if (row > 0) {
      top += 32 * row;
    }

    for (let col = 0; col < 4; col++) {
      const str = output[iter];
      const left = 14;
      let column = 0;

      if (!str) {
        break;
      }

      if (col > 0) {
        column += 264 * col;
      }

      for (let string = 0; string < str.length; string++) {
        contx.beginPath();
        drawShape(
          contx,
          column + left + 29 * string,
          top,
          getRandomInt(3, 12),
          size,
          size,
          Math.PI
        );
        contx.moveTo(300, 20);
        contx.lineWidth = 2;

        if (str[string] === "1") {
          contx.fillStyle = colours[Math.floor(Math.random() * colours.length)];
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

export { convertBinary, plot };
