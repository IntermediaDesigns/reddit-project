function getRandomProfileImage() {
       const images = ['p1.png', 'p2.png', 'p3.png', 'p4.png', 'p5.png', 'p6.png', 'p7.png', 'p8.png', 'p9.png', 'p10.png', 'p11.png', 'p12.png',]; 
       
       const randomIndex = Math.floor(Math.random() * images.length);
       const selectedImage = images[randomIndex];
       return `/public/profileImgs/${selectedImage}`;
}