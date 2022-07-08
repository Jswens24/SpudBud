const nameHeader = document.querySelector('#name-header');
const accessoriesContainer = document.querySelector('#accessories-container')

axios.get('http://localhost:4004/api/gameNamePlace')
    .then((res) => {
        console.log(res.data)
        const { potatoName, randomPlace } = res.data;
        nameHeader.innerHTML = `<h3>${potatoName} Potato is going to the ${randomPlace.places_name} </h3>`
    })
    .catch((err) => console.log(err));

axios.get('http://localhost:4004/api/gameAccessories')
    .then((res) => {
        // console.log(res.data[0]);
        res.data.forEach((accessories) => {
            const accessoriesImg = document.createElement('img');
            accessoriesImg.src = accessories.accessories_url;
            accessoriesImg.classList.add('accessories-pic');
            accessoriesContainer.appendChild(accessoriesImg);
        })
    })

