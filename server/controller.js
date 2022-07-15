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
let randomPlace = null;


const createName = (req, res) => {
    potatoName = req.body.nameInput;
    console.log(potatoName);
    res.status(200).send(potatoName);
}

//this grabs a random place from my database
const gameNamePlace = (req, res) => {
    // console.log(potatoName)
    sequelize.query(`SELECT * FROM places;`)
        .then((dbResult) => {
            const placesArr = dbResult[0];
            let randomPlaceIndex = Math.floor(Math.random() * placesArr.length);
            randomPlace = placesArr[randomPlaceIndex];
            const resBody = {
                potatoName,
                randomPlace
            }
            res.status(200).send(resBody);
        })
        .catch((err) => {
            console.log(err);
            res.status(403)
        })
}

//this grabs the accessories from my database
const gameAccessories = (req, res) => {
    sequelize.query(`SELECT * FROM accessories;`)
        .then((dbResult) => {
            const accessoriesArr = dbResult[0];
            res.status(200).send(accessoriesArr);
        })
        .catch((err) => {
            console.log(err)
            res.status(403);
        })
}

//win message 
const winMessage = (req, res) => {
    const resBody = {
        potatoName,
        randomPlace,
    }
    res.status(200).send(resBody)
}



module.exports = { createName, gameNamePlace, gameAccessories, winMessage }