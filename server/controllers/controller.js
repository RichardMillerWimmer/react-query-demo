// controller for user data - portfolio of cryptocurrencies

const portfolio = [];

module.exports = {
    getPortfolio: async (req, res) => {
        res.status(200).send(portfolio);
    },
    addCurrency: (req, res) => {
        const coin = req.body;
        portfolio.push(coin);
        res.status(200).send(portfolio);
    },
    deleteCurrency: (req, res) => {
        const { id } = req.params;
        const currencyRemove = portfolio.findIndex((coin) => coin.id === +id);
        portfolio.splice(currencyRemove, 1);
        res.status(200).send(portfolio);
    },
};
