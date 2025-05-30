
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

const imagePaths = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg"
];

let selectedImages = [];
let shuffledImages = [];

// Shuffle array helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate the image set with one duplicate
function generateImages() {
  let images = [...imagePaths];
  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate);
  shuffle(images);
  shuffledImages = images;
  imageContainer.innerHTML = "";

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = `images/${src}`;
    img.dataset.index = index;
    img.dataset.src = src;
    img.addEventListener("click", handleImageClick);
    imageContainer.appendChild(img);
  });
}

// Handle image click
function handleImageClick(e) {
  const img = e.target;

  if (selectedImages.includes(img)) {
    img.classList.remove("selected");
    selectedImages = selectedImages.filter(i => i !== img);
  } else if (selectedImages.length < 2) {
    img.classList.add("selected");
    selectedImages.push(img);
  }

  // Show reset when at least 1 image selected
  resetBtn.style.display = selectedImages.length > 0 ? "inline-block" : "none";

  // Show verify only when exactly 2 different images selected
  if (selectedImages.length === 2 && selectedImages[0] !== selectedImages[1]) {
    verifyBtn.style.display = "inline-block";
  } else {
    verifyBtn.style.display = "none";
  }
}

// Reset selection
function resetAll() {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent = "";
}

// Verify logic
function verifySelection() {
  if (selectedImages.length !== 2) return;

  const [img1, img2] = selectedImages;

  if (img1.dataset.src === img2.dataset.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
}

// Event Listeners
resetBtn.addEventListener("click", resetAll);
verifyBtn.addEventListener("click", verifySelection);

// Initialize on page load
generateImages();
