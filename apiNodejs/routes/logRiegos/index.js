var express = require('express');
var routerLogRiegos = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de electrovalvula y devuelve todos sus log
routerLogRiegos.get('/:idElectrovalvula/todas', function(req, res) {
    console.log(req.params)
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.idElectrovalvula], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        console.log('get todos los log EV');

        res.send(result);
    });
});

//Espera recibir por parámetro un id de dispositivo y un valor de medición y lo inserta en base de datos.
routerLogRiegos.post('/agregar', function(req, res) {
    console.log('insertar log EV');
    console.log(req.body.fecha, req.body.apertura, req.body.electrovalvulaId);
    const newFecha = new Date(req.body.fecha);

    pool.query('Insert into Log_Riegos (fecha,apertura,electrovalvulaId) values (?,?,?)', [newFecha, req.body.apertura, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        res.send(result);
    });
});

module.exports = routerLogRiegos;