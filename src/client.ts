import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;

const videoEl = document.querySelector<HTMLVideoElement>('video');
const canvasEl = document.querySelector<HTMLCanvasElement>('canvas');

export async function initiateWebcam() {
  if (!videoEl) return;
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  videoEl.srcObject = stream;
  videoEl.play();
}

function drawWebcam() {
  const ctx = canvasEl?.getContext('2d');
  if (!videoEl || !canvasEl || !ctx) return '';
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;
  console.log(canvasEl.width, canvasEl.height);
  ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
  const data = canvasEl.toDataURL('image/jpeg');
  return data;
}

export async function generateImageCaption() {
  try {
    const dataUrl:any = drawWebcam();

    const img = new Image();
    img.src = dataUrl;


    let captioner = await pipeline(
      "image-to-text",
      "Xenova/vit-gpt2-image-captioning"
    );

    const output = await captioner(img.src);

    console.log(output);
  } catch (error) {
    console.error("Error:", error);
  }
}
