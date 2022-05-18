const images = [
    "1.jpg", "2.jpg" , "3.jpg", "4.jpg"
];

const choseImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${choseImage}`;

document.body.appendChild(bgImage);
