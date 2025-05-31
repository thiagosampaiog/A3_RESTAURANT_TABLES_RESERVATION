const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

router.post('/reserva', reservaController.criarReserva);

router.delete('/reserva/:id', reservaController.cancelarReserva);

router.patch('/reserva/:id/confirmar', reservaController.confirmarReserva);

router.get('/relatorio/periodo', reservaController.relatorioPorPeriodo);

router.get('/relatorio/mesa/:mesa', reservaController.relatorioPorMesa);

router.get('/relatorio/garcom/:garcom', reservaController.relatorioPorGarcom);

module.exports = router;