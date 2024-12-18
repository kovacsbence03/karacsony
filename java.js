const gifts = [
    { id: 1, name: "Karácsonyi bögre", image: "bogre.jpg", votes: 0 },
    { id: 2, name: "Plüss maci", image: "plussmaci.jpg", votes: 0 },
    { id: 3, name: "Csokoládé ajándékcsomag", image: "csoki.jpg", votes: 0 },
    { id: 4, name: "Karácsonyi dísz", image: "disz.jpg", votes: 0 },
    { id: 5, name: "Pókember figura", image: "pokember.jpg", votes: 0 },
    { id: 6, name: "Angry Birds", image: "birds.jpg", votes: 0 },
    { id: 7, name: "Kedvenc könyv", image: "konyv.jpg", votes: 0 },
    { id: 8, name: "Foci labda", image: "foci.jpg", votes: 0 },
    { id: 9, name: "Téli csizma", image: "csizma.jpg", votes: 0 },
    { id: 10, name: "Zsák Pénz", image: "penz.jpg", votes: 0 },
    { id: 11, name: "auto", image: "auto.jpg", votes: 0 },
    { id: 12, name: "Karácsonyi zenelejátszó", image: "zenelejatszo.jpg", votes: 0 }
];



function displayGifts() {
    const giftList = document.getElementById("gift-list");
    giftList.innerHTML = "";
    
    gifts.forEach(gift => {
        const giftCard = document.createElement("div");
        giftCard.className = "col-md-3 gift-card";
        giftCard.innerHTML = `
            <div class="card text-center">
                <img src="${gift.image}" class="card-img-top" alt="${gift.name}">
                <div class="card-body">
                    <h5 class="card-title">${gift.name}</h5>
                    <p class="vote-count text-success">Szavazatok: ${gift.votes}</p>
                    <button class="btn btn-primary" onclick="vote(${gift.id})">Szavazok</button>
                </div>
            </div>
        `;
        giftList.appendChild(giftCard);
    });
}


function vote(id) {
    const gift = gifts.find(g => g.id === id);
    if (gift) {
        gift.votes += 1;
        displayGifts();
    }
}
displayGifts();
const snowflakes = [];
const numSnowflakes = 50; 


function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄'; 
    document.body.appendChild(snowflake);

  
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();

    snowflakes.push(snowflake);

   
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}


setInterval(createSnowflake, 150);

const uploadedImages = [];

function uploadImage() {
    const nameInput = document.getElementById('imageName');
    const fileInput = document.getElementById('imageUpload');
    const name = nameInput.value.trim();
    const file = fileInput.files[0];

    if (!name) {
        alert('Kérlek add meg a kép nevét!');
        return;
    }

    if (!file) {
        alert('Kérlek válassz egy képet!');
        return;
    }

    const reader = new FileReader();

    
    reader.onload = function(event) {
        const imagePreview = document.getElementById('imagePreview');
        const imageData = {
            name: name,
            imageUrl: event.target.result,
            votes: 0
        };

        
        uploadedImages.push(imageData);

        
        displayUploadedImages();
    };

    reader.readAsDataURL(file); 

   
    nameInput.value = '';
    fileInput.value = '';
}

function displayUploadedImages() {
    const imagesList = document.getElementById('imagesList');
    imagesList.innerHTML = '';

    uploadedImages.forEach((imageData, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'col-md-4 mb-3';
        imageCard.innerHTML = `
            <div class="card text-center">
                <img src="${imageData.imageUrl}" alt="${imageData.name}" class="card-img-top" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${imageData.name}</h5>
                    <p>Szavazatok: <span id="votes-${index}">${imageData.votes}</span></p>
                    <button class="btn btn-success" onclick="vote(${index})">Szavazok</button>
                </div>
            </div>
        `;
        imagesList.appendChild(imageCard);
    });
}

function vote(index) {
    const votesElement = document.getElementById(`votes-${index}`);
    uploadedImages[index].votes += 1;
    votesElement.textContent = uploadedImages[index].votes;
}
