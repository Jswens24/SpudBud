const nameHeader = document.querySelector('#name-header');
const accessoriesContainer = document.querySelector('#accessories-container');
const accessoriesPic = document.querySelectorAll('.accessories-pic');
const selectedItem0 = document.querySelector('.item-0');
const selectedItem1 = document.querySelector('.item-1');
const selectedItem2 = document.querySelector('.item-2');
const submitBtn = document.querySelector('.submit-button')

let randomPlaceId = null
let correctArr = []

//gets the name and (place from database)
axios.get('http://localhost:4004/api/gameNamePlace')
    .then((res) => {
        console.log(res.data)
        const { potatoName, randomPlace } = res.data;
        randomPlaceId = randomPlace.places_id;
        nameHeader.innerHTML = `<h3>${potatoName} Potato is going ${randomPlace.places_name}! </h3>`

        //gets accessories from database
        axios.get('http://localhost:4004/api/gameAccessories')
            .then((res) => {
                const sqlAccessories = res.data;
                correctArr = sqlAccessories.filter(element => element.places_id === randomPlaceId);
                correctArr = correctArr.map(element => element.accessories_url)
                console.log(correctArr)
                const shuffledAccessories = sqlAccessories.sort((a, b) => 0.5 - Math.random());
                shuffledAccessories.forEach((accessories) => {
                    const accessoriesImg = document.createElement('img');
                    accessoriesImg.src = accessories.accessories_url;
                    accessoriesImg.classList.add('accessories-pic');
                    accessoriesImg.addEventListener('click', moveToSelectedItem)
                    accessoriesContainer.appendChild(accessoriesImg);
                })
            });

    })
    .catch((err) => console.log(err));



//moves items to the boxes
const selectedArr = [];

const moveToSelectedItem = (evt) => {
    console.log(selectedArr)
    const selectUrl = evt.target.src;
    if (selectedArr.length < 3) {
        selectedArr.push(selectUrl);
    }
    selectedItem0.innerHTML = `<img src='${selectedArr[0] || ''}'>`
    selectedItem1.innerHTML = `<img src='${selectedArr[1] || ''}'>`
    selectedItem2.innerHTML = `<img src='${selectedArr[2] || ''}'>`
    console.dir(selectedItem0);
}

//remove selected items 
const removeSelectedItem = (index) => {
    selectedArr.splice(index, 1);
    selectedItem0.innerHTML = `<img src='${selectedArr[0] || ''}'>`
    selectedItem1.innerHTML = `<img src='${selectedArr[1] || ''}'>`
    selectedItem2.innerHTML = `<img src='${selectedArr[2] || ''}'>`
}

selectedItem0.addEventListener('click', () => removeSelectedItem(0));
selectedItem1.addEventListener('click', () => removeSelectedItem(1));
selectedItem2.addEventListener('click', () => removeSelectedItem(2));



//submit button functionality

const doesPlaceMatchItem = () => {
    selectedArr.sort();
    correctArr.sort();
    let isAMatch = false
    if (selectedArr[0] === correctArr[0] &&
        selectedArr[1] === correctArr[1] &&
        selectedArr[2] === correctArr[2]) {
        isAMatch = true;
    }
    console.log(isAMatch)
    if (isAMatch === true) {

        let url_string = (window.location.href);
        let url = new URL(url_string);
        let name = url.searchParams.get("name");
        let id = url.searchParams.get("id");
        console.log(name, id);
        const winPageUrl = `./winpage.html?id=${id}&name=${name}`
        window.location.href = winPageUrl;
    } else {
        alert('incorrect, try again')
    }
}



submitBtn.addEventListener('click', doesPlaceMatchItem)