import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Generate Image Caption</h1>
    <div class="card">
    <video src=""></video>
      <canvas id="imageCanvas" style="display: none;"></canvas>
      <button type="button" onclick="generateImageCaption()" id="upload-btn">Upload Image</button>
    
    </div>
  </div>
`
