const express = require('express');
const reservasRouter = require('./routes/reservas')

const app = express()
const port = process.env.PORT|| 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(reservasRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.listen(port, () => {
    console.log(`API de reservas rodando na porta ${port}`)
})