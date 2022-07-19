const winHeader = document.querySelector('.win-header');
const accessoriesContainer = document.querySelector('.accessories-container');
const savePotatoBtn = document.querySelector('.save-potato-btn');

let randomPlaceId = null;

//win screen with congrats text and bkg-img showing 
axios.get('http://localhost:4004/api/winscreen')
    .then((res) => {
        const { potatoName, randomPlace } = res.data;
        randomPlaceId = randomPlace.places_id;
        console.log(randomPlace)
        winHeader.innerHTML = `<h3>YAY! You helped ${potatoName} Potato go ${randomPlace.places_name}! </h3>
        <style> body {
            background-image: url(${randomPlace.places_url});
            background-size: cover;
            background-repeat: no-repeat;
        }
        </style>`
    });

//displaying accessories with the winning potato 
axios.get('http://localhost:4004/api/gameAccessories')
    .then((res) => {
        const sqlAccessories = res.data;
        correctArr = sqlAccessories.filter(element => element.places_id === randomPlaceId);
        correctArr = correctArr.map(element => element.accessories_url)
        console.log(correctArr)
        correctArr.forEach((accessories) => {
            const accessoriesImg = document.createElement('img');
            accessoriesImg.src = accessories
            accessoriesImg.classList.add('accessories-pic');
            accessoriesContainer.appendChild(accessoriesImg);
        })
    });




//need to make a post request to save a potato 
savePotatoBtn.addEventListener('click', () => {
    let url_string = (window.location.href);
    let url = new URL(url_string);
    let name = url.searchParams.get("name");
    let id = url.searchParams.get("id");
    const reqBody = {
        randomPlaceId,
        name,
        id
    }
    axios.post('http://localhost:4004/api/winscreen', reqBody)
        .then((res) => {

        });
    //i think i need to do something with params here 
})