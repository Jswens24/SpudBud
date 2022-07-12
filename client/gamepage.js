const nameHeader = document.querySelector('#name-header');
const accessoriesContainer = document.querySelector('#accessories-container');
const accessoriesPic = document.querySelectorAll('img.accessories-pic');
const selectedItemOne = document.querySelector('.item-one');

//gets the name and (place from database)
axios.get('http://localhost:4004/api/gameNamePlace')
    .then((res) => {
        console.log(res.data)
        const { potatoName, randomPlace } = res.data;
        nameHeader.innerHTML = `<h3>${potatoName} Potato is going ${randomPlace.places_name}! </h3>`
    })
    .catch((err) => console.log(err));

//gets accessories from database
axios.get('http://localhost:4004/api/gameAccessories')
    .then((res) => {
        // console.log(res.data[0]);
        res.data.forEach((accessories) => {
            const accessoriesImg = document.createElement('img');
            accessoriesImg.src = accessories.accessories_url;
            accessoriesImg.classList.add('accessories-pic');
            accessoriesContainer.appendChild(accessoriesImg);
        })
    });



//front end functions 

const moveToSelectedItem = (evt) => {
    console.log(evt.target);
}



//add an eventlistener that is looking for a click and moves it to another box

for (i = 0; i < accessoriesPic.length; i++) {
    accessoriesPic.addEventListener('click', (evt) => {
        console.log(evt);
    })
}


