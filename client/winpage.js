const winHeader = document.querySelector('.win-header');
const accessoriesContainer = document.querySelector('.accessories-container');
const savePotatoBtn = document.querySelector('.save-potato-btn');
const savedPotContainer = document.querySelector('.saved-pot-container')
const savedPotatoPlaceName = document.querySelectorAll('.saved-place-p');

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
            console.log(res.data);
            const savedPotatos = res.data;
            savedPotatos.forEach((savedPlace) => {
                const savedPlacePTag = document.createElement('p');
                savedPlacePTag.textContent = `${savedPlace.places_name}`
                savedPlacePTag.classList.add('saved-place-p');
                const deleteBtn = addDeleteBtn(`${savedPlace.places_id}`)
                // savedPlacePTag.append(deleteBtn)
                // savedPlacePTag.addEventListener('click', displayPreviousLocation)
                savedPotContainer.appendChild(savedPlacePTag)
            })
        });
})

// change potato location from previous
// const displayPreviousLocation = (evt) => {
//     const selectLocation = evt.target;
//     console.log(selectLocation);
// }





//delete potato from location 
const addDeleteBtn = (id) => {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';

    deleteBtn.addEventListener('click', () => {
        axios.delete(`http://localhost:4004/api/winscreen/${id}`)
            .then((res) => {
                alert('location deleted')
                return deleteBtn
            })
            .catch((err) => console.log(err))
    })
}
