var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function (req, res) {
	pool.query('Select * from Dispositivos', function (err, result, fields) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result);
	});
});

routerDispositivo.get('/:idDispositivo', function (req, res) {
	pool.query('Select * from Dispositivos where dispositivoId=?', [req.params.idDispositivo], function (
		err,
		result,
		fields
	) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result[0]);
	});
});

module.exports = routerDispositivo;
