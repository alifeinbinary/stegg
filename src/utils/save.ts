import { addMetadata } from "meta-png";

function saveBlob(blob: Blob, fileName: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

async function addMetadataToPng(
  blob: Blob,
  encryptedText: string,
  encryptionEnabled: string,
  password: string
): Promise<Blob> {
  const buffer = await blob.arrayBuffer();
  const pngData = new Uint8Array(buffer);
  const inputText = (document.getElementById("text-input") as HTMLInputElement)
    .value;

  if (inputText && password && encryptedText) {
    const withMessage = addMetadata(pngData, "Message", encryptedText);
    const withBoolean = addMetadata(
      withMessage,
      "Encrypted",
      encryptionEnabled.toString()
    );
    return new Blob([withBoolean], { type: "image/png" });
  } else {
    const withMessage = addMetadata(pngData, "Message", inputText);
    const withBoolean = addMetadata(
      withMessage,
      "Encrypted",
      encryptionEnabled.toString()
    );
    return new Blob([withBoolean], { type: "image/png" });
  }
}

function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, "image/png");
  });
}

async function createPngWithMetadata(
  canvas: HTMLCanvasElement,
  encryptedText: string,
  encryptionEnabled: boolean,
  password: string
) {
  const croppedCanvas = cropImageFromCanvas(
    canvas.getContext("2d") as CanvasRenderingContext2D
  );
  const blob = await getCanvasBlob(croppedCanvas);
  const blobWithMetadata = await addMetadataToPng(
    blob,
    encryptedText,
    encryptionEnabled.toString(),
    password
  );
  saveBlob(
    blobWithMetadata,
    `alifeinbinary_com-${encryptedText.slice(7, 15)}.png`
  );
}

function cropImageFromCanvas(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  let w = canvas.width;
  let h = canvas.height;
  const pix = { x: [] as number[], y: [] as number[] };
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height, {
    colorSpace: "srgb",
  });

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const index = (y * w + x) * 4;
      if (imageData.data[index + 3] > 0) {
        pix.x.push(x);
        pix.y.push(y);
      }
    }
  }

  pix.x.sort((a, b) => a - b);
  pix.y.sort((a, b) => a - b);
  const n = pix.x.length - 1;

  w = 1 + pix.x[n] - pix.x[0];
  h = 1 + pix.y[n] - pix.y[0];
  const cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(cut, 0, 0);

  const image = canvas;
  return image;
}

export { saveBlob, createPngWithMetadata };
