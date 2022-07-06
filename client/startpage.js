const nameInput = document.querySelector('#name-input');
const playBtn = document.querySelector('#play-btn');

playBtn.addEventListener('click', () => {
    axios.post('http://localhost:4004/api/name', { nameInput: nameInput.value })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err)
        });
});