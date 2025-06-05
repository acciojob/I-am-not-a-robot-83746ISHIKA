const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");

let selected = [];
let actualImages = [];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Helper function to assign class names .img1 to .img5 based on URL
function getImageClass(src) {
  if (src.includes("id/237")) return "img1";
  if (src.includes("seed/picsum")) return "img2";
  if (src.includes("grayscale")) return "img3";
  if (src === "https://picsum.photos/200/300/") return "img4"; // Fixed this line
  if (src.includes("200/300.jpg")) return "img5";
  return "";
}


// Load images
function loadImages() {
  let temp = [...images];
  const duplicateIndex = Math.floor(Math.random() * temp.length);
  const duplicateImage = temp[duplicateIndex];

  actualImages = [...temp, duplicateImage];
  actualImages = shuffle(actualImages);

  imageContainer.innerHTML = "";
  para.innerText = "";
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  selected = [];

  actualImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    const className = getImageClass(src);
    if (className) img.classList.add(className);
    img.classList.add("tile");
    img.setAttribute("data-src", src);
    img.addEventListener("click", () => handleClick(img));
    imageContainer.appendChild(img);
  });
}

// Handle image click
function handleClick(img) {
  if (selected.length >= 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selected.push(img);

  if (selected.length > 0) {
    resetButton.style.display = "inline-block";
  }

  if (selected.length === 2) {
    verifyButton.style.display = "inline-block";
  }
}

// Reset everything
resetButton.addEventListener("click", () => {
  selected.forEach((img) => img.classList.remove("selected"));
  selected = [];
  verifyButton.style.display = "none";
  resetButton.style.display = "none";
  para.innerText = "";
});

// Verify selection
verifyButton.addEventListener("click", () => {
  const src1 = selected[0].getAttribute("data-src");
  const src2 = selected[1].getAttribute("data-src");

  if (src1 === src2) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyButton.style.display = "none";
});

window.onload = loadImages;
