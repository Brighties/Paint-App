const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const penColor = document.querySelector("#penColor");
const saveBtn = document.querySelector(".btn--save");
const clearBtn = document.querySelector(".btn--clear");
const imagePreview = document.querySelector(".imagePreview");

// Set internal dimensions for the canvas
canvas.width = 600;
canvas.height = 400;

const coordinate = {
    draw: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
};

canvas.addEventListener("mousemove", (e) => {
    coordinate.lastX = coordinate.x;
    coordinate.lastY = coordinate.y;
    coordinate.x = e.clientX - canvas.getBoundingClientRect().left;
    coordinate.y = e.clientY - canvas.getBoundingClientRect().top;
    draw();
});

canvas.addEventListener("mousedown", () => {
    coordinate.draw = true;
});

canvas.addEventListener("mouseup", () => {
    coordinate.draw = false;
});

canvas.addEventListener("mouseout", () => {
    coordinate.draw = false;
});

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    coordinate.draw = true;
    coordinate.x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    coordinate.y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("touchmove", (e) => {
    if (coordinate.draw) {
        coordinate.lastX = coordinate.x;
        coordinate.lastY = coordinate.y;
        coordinate.x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        coordinate.y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
        draw();
    }
});

canvas.addEventListener("touchend", () => {
    coordinate.draw = false;
});

clearBtn.addEventListener("click", clearCanvas);
saveBtn.addEventListener("click", saveImg);

function draw() {
    if (coordinate.draw) {
        ctx.beginPath();
        ctx.moveTo(coordinate.lastX, coordinate.lastY);
        ctx.lineTo(coordinate.x, coordinate.y);
        ctx.strokeStyle = penColor.value;
        ctx.lineWidth = penWidth.value;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
    }
}

function clearCanvas() {
    let clearStatus = confirm("Clear canvas?");
    if (clearStatus) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imagePreview.innerHTML = "";
    }
}

function saveImg() {
    const dataURL = canvas.toDataURL();
    const img = document.createElement("img");
    imagePreview.prepend(img);
    img.setAttribute("src", dataURL);
    const link = document.createElement("a");
    imagePreview.append(link);
    let userFileName = prompt("Enter your file name", "Name");
    if (userFileName == null || userFileName == undefined) {
        return;
    }
    let fileName = userFileName + ".png";
    link.setAttribute("download", fileName);
    link.href = dataURL;
    link.click();
    imagePreview.removeChild(link);
    imagePreview.removeChild(img);
}
