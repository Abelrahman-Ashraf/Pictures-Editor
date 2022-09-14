// get elements
let upload = document.getElementById("btnUpload");
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let huoRotate = document.getElementById("huoRotate");
let download = document.getElementById("download");
let reset = document.getElementById("reset");
let image = document.getElementById("image");
let imageBox = document.getElementById("imageBox");
// canvas 
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");




window.onload = function() {
    download.style.display = "none";
    reset.style.display = "none";
    c.style.display = "none";
}

upload.onchange = function() {
    resetFilters()
    download.style.display = "block";
    reset.style.display = "block";
    c.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
        image.src = file.result;
    }
    image.onload = function() {
        c.width = image.width;
        c.height = image.height;
        ctx.drawImage(image, 0, 0, c.width, c.height);
        image.style.display = "none";
    }
}

// start filters

let filters = document.querySelectorAll(".editing input");
filters.forEach(filter => {
    filter.addEventListener("input", function() {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${huoRotate.value}deg)`
        ctx.drawImage(image, 0, 0, c.width, c.height);
    })
})



// reset function 

function resetFilters() {
    ctx.filter = "none";
    ctx.drawImage(image, 0, 0, c.width, c.height);
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    blur.value = "0";
    grayscale.value = "0";
    huoRotate.value = "0";
}



// download function

download.onclick = function() {
    download.href = c.toDataURL();
}