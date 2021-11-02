var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo')

/* POST compra */
router.post('/', function(req, res, next) {
    cielo.compra(req.body).then((result) => {
        const PaymentId = result.Payment.PaymentId 
        
        cielo.captura(PaymentId).then((result) => {
            let resposta = cielo.resposta(result.Status);
            resposta.PaymentId = PaymentId;
            res.send(resposta);
        });
    });
});

//GET consulta
router.get('/:saleId/status', function(req, res, next) {
    cielo.consulta(req.params.saleId).then(result => {
        let resposta = cielo.resposta(result.Payment.Status);
        res.send(resposta);
    });
});

//PUT cancelamento
router.put('/:saleId/cancelamento', function(req, res, next) {
    cielo.cancelamento(req.params.saleId, req.query.amount).then(result => {
        res.send(result);
    });
});

module.exports = router;
