const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/ball-game', (req, res) => {
    res.render('ball-game');
})

app.get('/flappy-bird', (req, res) => {
    res.render('flappy-bird');
})

app.get('/pacman', (req, res) => {
    res.render('pacman');
})

app.get('/ticTacToe', (req, res) => {
    res.render('tic-tac-toe');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
