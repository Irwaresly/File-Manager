require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});