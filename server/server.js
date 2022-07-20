require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const { createName, gameNamePlace, gameAccessories, winMessage, savePotatoFunc, deleteLocation } = require('./controller');

app.post('/api/name', createName);

app.get('/api/gameNamePlace', gameNamePlace);
app.get('/api/gameAccessories', gameAccessories);
app.get('/api/winscreen', winMessage);
app.post('/api/winscreen', savePotatoFunc);
app.delete('/api/winscreen', deleteLocation)


app.listen(4004, () => console.log('Vibin on 4004'));