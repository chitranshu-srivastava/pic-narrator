import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Generate Image Caption</h1>
    <div class="card">
    <form id="upload-form" enctype="multipart/form-data">
      <label for="image">Choose an image:</label>
      <input type="file" id="image" name="image" accept="image/*" required />
      <canvas id="imageCanvas" style="display: none;"></canvas>
      <button type="button" onclick="generateImageCaption()" id="upload-btn">Upload Image</button>
    </form>
    </div>
  </div>
`
