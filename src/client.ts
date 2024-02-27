import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;

export function setupCounter(element: HTMLButtonElement) {
  console.log(import.meta.env.VITE_HUGGINGFACEHUB_API_TOKEN);

  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };

  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

export async function generateImageCaption() {
  
  try {
    const imageInput:any = document.getElementById('image');
    const file = imageInput.files[0];


    const canvas:any = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
      img.onload = function () {
        // Set canvas size to match the image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.style.display = 'block';

        // // Get the data URL from the canvas
        // const dataUrl = canvas.toDataURL();

      };

      img.src = URL.createObjectURL(file);


    let captioner = await pipeline(
      "image-to-text",
      "Xenova/vit-gpt2-image-captioning"
    );

    // const url = "/Screenshot_20191211-044600_Photos.jpg"
    const output = await captioner(img.src);

    console.log(output);
  } catch (error) {
    console.error("Error---", error);
  }
}
