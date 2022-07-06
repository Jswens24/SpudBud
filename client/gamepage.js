const nameHeader = document.querySelector('#name-header');

axios.get('http://localhost:4004/api/nameInGame')
    .then((res) => {
        console.log(res.data)
        nameHeader.innerHTML = `<h3>Hello ${res.data} let's go to the </h3>`
    })
    .catch((err) => console.log(err));

