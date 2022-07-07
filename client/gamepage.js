const nameHeader = document.querySelector('#name-header');
const accessoriesContainer = document.querySelector('#accessories-container')

axios.get('http://localhost:4004/api/gameNamePlace')
    .then((res) => {
        console.log(res.data)
        const { potatoName, randomPlace } = res.data;
        nameHeader.innerHTML = `<h3>Hello ${potatoName} let's go to the ${randomPlace.places_name} </h3>`
    })
    .catch((err) => console.log(err));

axios.get('http://localhost:4004/api/gameAccessories')
    .then((res) => {
        console.log(res.data);

    })

