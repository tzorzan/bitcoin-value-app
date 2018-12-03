
const axios = require('axios')
const url = 'https://api.coinbase.com/v2/prices/BTC-EUR/buy';
const uuidv4 = require('uuid/v4');
const moment = require('moment');
moment.locale('it');

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const ret = await axios(url)
        const price = ret.data.data.amount;
        const now = new Date();
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                uid: uuidv4(),
                updateDate: now.toISOString(),
                titleText: price,
                mainText: 'Il valore Bitcoin di oggi '+ moment(now).format('dddd D MMMM Y') + ' è: ' + price,
                redirectionUrl: 'https://www.coinbase.com/charts'
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
