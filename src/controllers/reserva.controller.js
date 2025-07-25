const db = require('../database/db')


function criarReserva(req, res) {

    const { data, hora, mesa, pessoas, responsavel } = req.body;

    const errors = [];

    if (!data) errors.push('Campo data não preenchido');

    if (data && !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        errors.push('Data em formato inválido (use YYYY-MM-DD)');
    } else if (data) {
        const dataObj = new Date(data);
        if (isNaN(dataObj.getTime())) {
            errors.push('Data inválida');
        }

        if (dataObj.getFullYear() < 2020 || dataObj.getFullYear() > 2100) {
            errors.push('Ano da data fora do permitido');
        }

        if (!hora) errors.push('Campo hora não preenchido');

        if (hora && !/^\d{2}:\d{2}$/.test(hora)) {
            errors.push('Hora em formato inválido (use HH:MM)');
        }

        if (!mesa) errors.push('Campo mesa não preenchido');

        if (!pessoas) errors.push('Campo pessoas não preenchido');

        if (mesa && (isNaN(mesa) || mesa <= 0)) {
            errors.push('Número da mesa inválido');
        }

        if (mesa && mesa > 50) {
            errors.push('Número da mesa excede o máximo permitido (50)');
        }

        if (pessoas && (isNaN(pessoas) || pessoas <= 0)) {
            errors.push('Quantidade de pessoas inválida');
        }

        if (pessoas && pessoas > 20) {
            errors.push('Quantidade de pessoas excede o máximo permitido (20)');
        }

        if (!responsavel) errors.push('Campo responsavel não preenchido');

        if (responsavel && responsavel.length < 2) {
            errors.push('Nome do responsável muito curto');
        }

        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        db.get(
            `
        SELECT * FROM reservas 
        WHERE data = ? 
        AND hora = ? 
        AND mesa = ?
      `,
            [data, hora, mesa],
            (error, coluna) => {
                if (error) {
                    return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' })
                }
                if (coluna) {
                    return res.status(400).json({ message: 'Já existe uma reserva para esta mesa neste horário.' })
                }

                db.run(
                    `INSERT INTO reservas 
                (data, hora, mesa, pessoas, responsavel, status) 
                VALUES (?, ?, ?, ?, ?, 'pendente')`,
                    [data, hora, mesa, pessoas, responsavel],
                    function (error) {
                        if (error) {
                            return res.status(500).json({ message: 'Erro ao criar reserva.' });
                        }
                        return res.status(201).json({
                            message: 'Reserva criada com sucesso',
                            reservaId: this.lastID
                        });
                    }
                )
            }
        )
    }
}

function cancelarReserva(req, res) {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID da reserva não informado.' });
    }

    db.get(
        `SELECT * FROM reservas 
        WHERE id = ?
        `,
        [id],
        (error, reserva) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' })
            }
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva não encontrada' })
            }

            db.run(
                `DELETE FROM reservas WHERE id = ?`,
                [id],
                function (error) {
                    if (error) {
                        return res.status(500).json({ message: 'Erro ao cancelar reserva.' })
                    }

                    return res.status(200).json({ message: 'Reserva cancelada com sucesso!' })
                }
            )
        }
    )

}


function confirmarReserva(req, res) {

    const { id } = req.params;
    const { garcom } = req.body;

    if (!garcom) {
        return res.status(400).json({ message: 'Garcom não informado.' });
    }

    if (!id) {
        return res.status(400).json({ message: 'ID da reserva não informado.' });
    }

    db.get(
        `SELECT * FROM reservas
         WHERE id = ?
         AND status = 'pendente'
        `,
        [id],
        (error, reserva) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' })
            }
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva não encontrada ou já confirmada' })
            }

            db.run(
                `UPDATE reservas SET status = 'confirmada', garcomResponsavel = ? WHERE id = ?`,
                [garcom, id],
                function (error) {
                    if (error) {
                        return res.status(500).json({ message: 'Erro ao confirmar reserva.' })
                    }

                    return res.status(200).json({ message: 'Reserva confirmada!' })
                }
            )
        }
    )

}

function relatorioPorPeriodo(req, res) {
    const { inicio, fim, status } = req.query;

    if (!inicio || !fim) {
        return res.status(400).json({ message: 'Informe o período (inicio e fim).' });
    }

    let query = `SELECT * FROM reservas WHERE data BETWEEN ? AND ?`;
    let params = [inicio, fim];

    if (status) {
        query += ` AND status = ?`;
        params.push(status);
    }

    db.all(query, params, (error, colunas) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' });
        }
        if (!colunas || colunas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma reserva encontrada para o período.' });
        }
        return res.status(200).json(colunas);
    });
}

function relatorioPorMesa(req, res) {

    const { mesa } = req.params;

    db.all(
        `SELECT * FROM reservas WHERE mesa = ?`,
        [mesa],
        (error, colunas) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao acessar o banco de dados' });
            }
            if (!colunas || colunas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma reserva encontrada para esta mesa' })
            }
            return res.status(200).json(colunas);
        }
    )
}

function relatorioPorGarcom(req, res) {
    const { garcom } = req.params;
    db.all(
        `SELECT * FROM reservas WHERE garcomResponsavel = ? AND status = 'confirmada'`,
        [garcom],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' });
            }
            if (!rows || rows.length === 0) {
                return res.status(404).json({ message: 'Nenhuma mesa confirmada por este garçom.' });
            }
            return res.status(200).json(rows);
        }
    );
}

module.exports = {
    criarReserva,
    cancelarReserva,
    confirmarReserva,
    relatorioPorPeriodo,
    relatorioPorMesa,
    relatorioPorGarcom,
};