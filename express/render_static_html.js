

const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const app = express();

console.log(publicPath);

app.use(express.static(publicPath));  // it helps to show static html file

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});





