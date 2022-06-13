//The application will run on this file

const express = require('express');
const app = express();
const port = 8001;
const cors = require("cors");
const bodyparser = require("body-parser");
const helmet = require("helmet");

//app.use(express.json()); //Does same as body-parser

app.listen(port, () => {
  console.log(`Salsa steps app running on port ${port}.`);
});

const api = require('./api');

app.use(cors());
app.use(bodyparser.json());
app.use(helmet());

app.get('/steps/', api.getAllSteps);
app.get('/steps/:id', api.getStepById);
app.post('/steps/', api.addStep);
app.put('/steps/edit/:id', api.editStep);
app.delete('/delete/:id', api.deleteStep);

app.get('/levels/', api.getAllLevels);
app.get('/levels/:id', api.getLevelById);