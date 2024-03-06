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
    generateStory();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function generateStory() {
  const generator = await pipeline('text-generation', 'Xenova/Qwen1.5-0.5B-Chat');
  
  // Define the prompt and list of messages
  const prompt = "Write a short story in 50 words on a quick brown fox jumping over the lazy dog."
  const messages = [
      { "role": "system", "content": "You are a story teller" },
      { "role": "user", "content": prompt }
  ]
  
  // Apply chat template
  const text:any = generator.tokenizer.apply_chat_template(messages, {
      tokenize: false,
      add_generation_prompt: true,
  });
  
  // Generate text
  const output:any = await generator(text, {
      max_new_tokens: 128,
      do_sample: false,
  });
  console.log(output[0].generated_text);
  
}