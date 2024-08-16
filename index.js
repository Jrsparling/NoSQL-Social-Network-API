const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = 3001;
const app = express();
// Not sure if lines 10 and 11 are required
const traffic = cwd.includes('NoSQL-Social-Network-API')
? cwd.split('NoSQL-Social-Network-API')[1]
: cwd;
// 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${traffic} running on port ${PORT}!`)
    });
});