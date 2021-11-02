const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const URL_requisicao = 'https://apisandbox.cieloecommerce.cielo.com.br';
const URL_consulta = 'https://apiquerysandbox.cieloecommerce.cielo.com.br';

const MerchantId = 'ba128934-9134-42ce-a839-d038c71a067f';
const MerchantKey = 'AFKCFGETWTYLTXYNCQPMBYJCKVUWJBQTKXOSCMYX';

class Sale{

    static compra(body){
        return fetch(URL_requisicao + '/1/sales', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'MerchantId': MerchantId,
                'MerchantKey': MerchantKey
            }
        }).then(result => result.json())
    };

    static captura(PaymentId){
        return fetch(URL_requisicao + '/1/sales/' + PaymentId + '/capture', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'MerchantId': MerchantId,
                'MerchantKey': MerchantKey
            }
        }).then(result => result.json())
    };

    static consulta(PaymentId){
        return fetch(URL_consulta + '/1/sales/' + PaymentId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'MerchantId': MerchantId,
                'MerchantKey': MerchantKey
            }
        }).then(result => result.json())
    };

    static cancelamento(PaymentId, amount){
        console.log(URL_requisicao + '/1/sales/' + PaymentId + '/void?amount=' + amount);
        return fetch(URL_requisicao + '/1/sales/' + PaymentId + '/void?amount=' + amount, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'MerchantId': MerchantId,
                'MerchantKey': MerchantKey
            }
        }).then(result => result.json())
    }

    static resposta(status){
        let resposta = {};

        switch(status){
            case 0:
                resposta.status = 'NotFinished';
                resposta.message = 'Aguardando atualização de status';
                break;
            case 1:
                resposta.status = 'Authorized';
                resposta.message = 'Pagamento apto a ser capturado ou definido como pago';
                break;
            case 2:
                resposta.status = 'PaymentConfirmed';
                resposta.message = 'Pagamento confirmado e finalizado';
                break;
            case 3:
                resposta.status = 'Denied';
                resposta.message = 'Pagamento negado por Autorizador';
                break;
            case 10:
                resposta.status = 'Voided';
                resposta.message = 'Pagamento cancelado';
                break;
            case 11:
                resposta.status = 'Refunded';
                resposta.message = 'Pagamento cancelado após 23:59 do dia de autorização';
                break;
            case 12:
                resposta.status = 'Pending';
                resposta.message = 'Aguardando Status de instituição financeira';
                break;
            case 13:
                resposta.status = 'Aborted';
                resposta.message = 'Pagamento cancelado por falha no processamento ou por ação do AF';
                break;
            case 20:
                resposta.status = 'Scheduled';
                resposta.message = 'Recorrência agendada';
                break;
        }

        return resposta;
    }
}

module.exports = Sale;