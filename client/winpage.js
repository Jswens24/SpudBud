const winHeader = document.querySelector('.win-header');



// axios.get('http://localhost:4004/api/gameNamePlace')
//     .then((res) => {
//         console.log(res.data)
//         const { potatoName, randomPlace } = res.data;
//         randomPlaceId = randomPlace.places_id;
//         winHeader.innerHTML = `<h3>YAY! You helped ${potatoName} Potato go ${randomPlace.places_name}! </h3>`
//     })


axios.get('http://localhost:4004/api/winscreen')
    .then((res) => {
        const { potatoName, randomPlace } = res.data;
        console.log(randomPlace)
        winHeader.innerHTML = `<h3>YAY! You helped ${potatoName} Potato go ${randomPlace.places_name}! </h3>
        <style> body {
            background-image: url(${randomPlace.places_url})
        }
        </style>`
    })