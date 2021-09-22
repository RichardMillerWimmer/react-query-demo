const currencies = [];

module.exports = {
    getCurrencies: (req, res) => {
        res.status(200).send(currencies)
    },
    addCurrency: (req, res) => {
        const {newCurrency} = req.body;
        currencies.push(newCurrency);
        res.status(200).send(currencies);
    },
    deleteCurrency: (req, res) => {
        const {id} = req.params;
        const currencyRemove = currencies.findIndex(coin => coin.id === +id);
        currencies.splice(currencyRemove, 1);
        res.status(200).send(currencies);
    }
};