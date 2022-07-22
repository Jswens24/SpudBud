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
    sequelize.query(`INSERT INTO users_places (users_id, places_id)
    VALUES ('${id}', '${randomPlaceId}');`)
        .then((dbResult) => {
            sequelize.query(`
            SELECT users_places.places_id, places.places_id, places.places_name, places.places_url
                    FROM users_places 
                    JOIN places ON users_places.places_id=places.places_id
            WHERE users_id = '${id}';`)
                .then((savedPlacesData) => {
                    let usersPlacesData = savedPlacesData[0]
                    console.log(savedPlacesData);
                    res.status(200).send(usersPlacesData);
                })
        })
}

const deleteLocation = (req, res) => {
    const id = req.params.id;
    sequelize.query(`
    DELETE
    FROM users_places
    WHERE users_places_id = ${id};`)
    sequelize.query(`
    SELECT users_places.places_id, places.places_id, places.places_name, places.places_url
                    FROM users_places 
                    JOIN places ON users_places.places_id=places.places_id
    WHERE users_id = '${id}';`)
        .then((dbResult) => {
            let newSavedPlaces = dbResult[0];
        })
    res.status(200).send()

}


module.exports = { createName, gameNamePlace, gameAccessories, winMessage, savePotatoFunc, deleteLocation }