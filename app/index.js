'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = 4000;

app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, 'public/')))

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
