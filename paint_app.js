const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const penColor = document.querySelector("#penColor");
const saveBtn = document.querySelector(".btn--save");
const clearBtn = document.querySelector(".btn--clear");
const imagePreview = document.querySelector(".imagePreview");

// Set canvas dimensions using CSS properties
canvas.style.width = "600px"; // Set the width as desired
canvas.style.height = "400px"; // Set the height as desired



const coordinate = {
    draw: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
}

const canvasRect = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", (e) => {
    coordinate.lastX = coordinate.x;
    coordinate.lastY = coordinate.y;
    coordinate.x = e.clientX - canvasRect.left;
    coordinate.y = e.clientY - canvasRect.top;

    draw();
});
canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    coordinate.draw = true;
});
canvas.addEventListener("mouseup", () => {
    coordinate.draw = false;
});
canvas.addEventListener("mouseout", () => {
    coordinate.draw = false;
});

clearBtn.addEventListener("click", clearCanvas);
saveBtn.addEventListener("click", saveImg);

function draw() {
    if(coordinate.draw) {
        
        ctx.beginPath();
        ctx.moveTo(coordinate.lastX, coordinate.lastY);
        ctx.lineTo(coordinate.x, coordinate.y);
        ctx.strokeStyle = penColor.value;
        ctx.lineWidth = penWidth.value;
        ctx.lineCap = "round"
        ctx.stroke();
        ctx.closePath();
    }
}
function clearCanvas(){
        let clearStatus = confirm("Clear canvas?");
        if(clearStatus){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            imagePreview.innerHTML = "";
        }
    }
function saveImg() {
        const dataURL = canvas.toDataURL();
        // console.log(dataURL);
        const img = document.createElement("img"); // create an image element
        imagePreview.prepend(img); // add the image element as the first element of the 'output' div
        img.setAttribute("src", dataURL);
        const link = document.createElement("a");
        imagePreview.append(link);
        let userFileName = prompt("Enter your file name", "Name");
        let fileName = userFileName + ".png";
        link.setAttribute("download", fileName);
        link.href = dataURL;
        link.click();
        imagePreview.removeChild(link);
        imagePreview.removeChild(img);
      }