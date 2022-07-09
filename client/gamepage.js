const nameHeader = document.querySelector('#name-header');
const accessoriesContainer = document.querySelector('#accessories-container');
const accessoriesPic = document.querySelector('#accessories-pic')

//gets the name and (place from database)
axios.get('http://localhost:4004/api/gameNamePlace')
    .then((res) => {
        console.log(res.data)
        const { potatoName, randomPlace } = res.data;
        nameHeader.innerHTML = `<h3>${potatoName} Potato is going to the ${randomPlace.places_name} </h3>`
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


//add an eventlistener that is looking for a click and moves it to another box



