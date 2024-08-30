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
  const croppedCanvas = cropImageFromCanvas(canvas);
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

function cropImageFromCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  const width = canvas.width;
  const height = canvas.height;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  let top = height,
    left = width,
    right = 0,
    bottom = 0;

  // Loop through each pixel to find the bounding box of non-transparent pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3]; // Get alpha value of the pixel
      if (alpha > 0) {
        // If the pixel is not fully transparent
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }

  // Calculate the trimmed width and height
  const trimmedWidth = right - left + 1;
  const trimmedHeight = bottom - top + 1;

  // Create a new canvas to store the trimmed content
  const trimmedCanvas = document.createElement("canvas");
  trimmedCanvas.width = trimmedWidth;
  trimmedCanvas.height = trimmedHeight + 50;
  const trimmedCtx = trimmedCanvas.getContext("2d");
  if (!trimmedCtx) throw new Error("Failed to get trimmed canvas context");

  // Draw a watermark onto the trimmed canvas
  trimmedCtx.font = "100 18px Tahoma";
  trimmedCtx.fontKerning = "none";
  trimmedCtx.fillStyle = "#ffeedd";
  trimmedCtx.fillText(
    "Decode this image at alifeinbinary.com",
    trimmedWidth - 345,
    trimmedHeight + 40
  );
  // Draw the trimmed content onto the new canvas
  trimmedCtx.putImageData(
    ctx.getImageData(left, top, trimmedWidth, trimmedHeight),
    0,
    0
  );

  return trimmedCanvas;
}

export { saveBlob, createPngWithMetadata, cropImageFromCanvas };
