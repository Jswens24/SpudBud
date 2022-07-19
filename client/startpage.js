const nameInput = document.querySelector('#name-input');
const playBtn = document.querySelector('#play-btn');

playBtn.addEventListener('click', () => {
    axios.post('http://localhost:4004/api/name', { nameInput: nameInput.value })
        .then((res) => {
            const gamePageUrl = `./gamepage.html?id=${res.data.users_id}&name=${res.data.users_name}`
            window.location.href = gamePageUrl;
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err)
        });
});