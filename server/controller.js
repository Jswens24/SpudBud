require('dotenv').config();
const Sequelize = require('sequelize');

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

let potatoName = 'p';
// let randomPlaceIndex = Math.floor(Math.random() * 7);

// let places = sequelize.query(`SELECT * FROM places;`)
// console.log(places[randomPlaceIndex()]);

const createName = (req, res) => {
    potatoName = req.body.nameInput;
    console.log(potatoName);
    res.status(200).send(potatoName);
}

const gameName = (req, res) => {
    // console.log(potatoName)
    sequelize.query(`SELECT * FROM places;`)
        .then((dbResult) => {
            console.log(dbResult)
        })
    res.status(200).send(potatoName);
}

// const getRandomPlace = (req, res) => {
//     sequelize.query(`SELECT * FROM places;`)
//         .then((dbResult) => {
//             console.log(dbResult)
//             res.status(200).send(dbResult)
//         })
//         .catch((err) => console.log(err));
// }

module.exports = { createName, gameName }