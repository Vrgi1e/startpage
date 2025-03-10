let currentIndex = localStorage.getItem("currentIndex") || document.currentScript.getAttribute('currentIndex');
currentIndex = parseInt(currentIndex);

const images = ["cover1.jpg", "cover2.jpg"];
const colorSets = [
	{
		"--text-color": "#458588",
		"--hover-color": "#98971a",
		"--accent-color": "#d79921",
		"--accent-color-2": "#cc241d",
		"--background-color": "#1d2021C8",
		"--great": "You are (not) welcome",
		"--font": "EVA-Matisse_Standard",
		"--scale": 0.7,
		"--font-size": "3.5em"
	},
	{
		"--text-color": "#8E917E",
		"--hover-color": "#8C7F3F",
		"--accent-color": "#A3BCC3",
		"--accent-color-2": "#8F894B",
		"--background-color": "#262621D3",
		"--great": "Welcome back",
		"--font": "SpaceMono Nerd Font",
		"--scale": 1,
		"--font-size": "3em"
	}
];

function preloadImages() {
	for (let i = 0; i < images.length; i++) {
		const img = new Image();
		img.src = "../src/images/" + images[i];
	}
}

function nextImage() {
	currentIndex = (currentIndex + 1) % images.length;
	localStorage.setItem("currentIndex", currentIndex); // Update currentIndex in localStorage
	const imageElement = document.getElementById("carouselImage");
	imageElement.style.opacity = 0;
	updateColors(currentIndex);
	updateGreeting();
	setTimeout(() => {
		imageElement.src = "./images/" + images[currentIndex];
		imageElement.style.opacity = 1;
	}, 200); // Match the transition duration in style.css
}
function updateGreeting() {
	// Sélectionner l'élément où le texte doit apparaître
	const greetingElement = document.getElementById("greeting");

	// Récupérer la valeur de `--great` depuis le DOM
	const greatText = getComputedStyle(document.documentElement).getPropertyValue("--great").trim();

	// Mettre à jour dynamiquement le texte
	greetingElement.textContent = greatText;

	// Réinitialiser les animations pour rejouer l'effet
	greetingElement.classList.remove("loaded");
	setTimeout(() => greetingElement.classList.add("loaded"), 50);
}
function updateColors() {
	const colorSet = colorSets[currentIndex];
	// Iterate through the colorSet and set the CSS variables
	for (const [property, value] of Object.entries(colorSet)) {
		document.documentElement.style.setProperty(property, value);
	}
}

// Set colors with current index first
updateColors(currentIndex);

// Set the initial image
document.getElementById("carouselImage").src = "./images/" + images[currentIndex];

// Image is opacity 0 and text is translated off screen by default
// Add the loaded class to the image and text to animate them in
window.onload = function() {
	document.getElementById("image").classList.add('loaded');
	document.getElementById("text").classList.add('loaded');
	// Preload the remaining images
	preloadImages();
};
