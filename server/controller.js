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
    sequelize.query(`SELECT * FROM users WHERE LOWER(users_name) = '${req.body.nameInput.toLowerCase()}';`)
        .then((dbResult) => {
            if (dbResult[0].length === 0) {
                sequelize.query(`INSERT INTO users (users_name)
                VALUES ('${req.body.nameInput}') RETURNING *;`)
                    .then((newUserResult) => {
                        console.log(newUserResult);
                        res.status(200).send(newUserResult[0][0]);
                        return;
                    })
            } else {
                res.status(200).send(dbResult[0][0]);
                return;
            }

        })
    // console.log(potatoName);
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

//post request to save the potato and username 
const savePotatoFunc = (req, res) => {
    const { randomPlaceId, name, id } = req.body;
    sequelize.query(`INSERT INTO users_places (users_name, places_id)
    VALUES ('${id}', '${randomPlaceId}');`)
    //how do i send this to my front at the same time? is that a new get request? 
    res.status(200).send(console.log('sent to database'));
}


module.exports = { createName, gameNamePlace, gameAccessories, winMessage, savePotatoFunc }