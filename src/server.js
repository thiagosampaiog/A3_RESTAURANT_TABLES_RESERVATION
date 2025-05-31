const express = require('express');
const reservasRouter = require('./routes/reservas')

const app = express()
const port = process.env.PORT|| 3000;

app.use(express.json());
app.use(reservasRouter);

app.get('/', (req, res) => {
    res.send('API de reservas online!')
})

app.listen(port, () => {
    console.log(`API de reservas rodando na porta ${port}`)
})