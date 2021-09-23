require('dotenv').config();
const axios = require("axios");

const {REACT_APP_RAPID_API_HOST,  REACT_APP_RAPID_API_KEY} = process.env;

const portfolio = ['1'];

const callPortfolio = () => {
    let fullPortfolio = [];
    portfolio.forEach(coin => {
        axios.get(`https://coinranking.p.rapidapi.com/coin/${coin}`, {headers: {
            'x-rapidapi-host': REACT_APP_RAPID_API_HOST,
            'x-rapidapi-key': REACT_APP_RAPID_API_KEY
        }})
        .then((res) => {
            console.log('fullPorfolio call', res.data)
            fullPortfolio.push(res.data)
        })
    })
    return fullPortfolio
}

module.exports = {
    getPortfolio: async (req, res) => {
        const portfolioRes = await callPortfolio();
        console.log('getPortfolio call', portfolioRes)
        res.status(200).send(portfolioRes)
    },
    addCurrency: (req, res) => {
        const {newCurrency} = req.body;
        portfolio.push(newCurrency);
        res.status(200).send(portfolio);
    },
    deleteCurrency: (req, res) => {
        const {id} = req.params;
        const currencyRemove = portfolio.findIndex(coin => coin.id === +id);
        portfolio.splice(currencyRemove, 1);
        res.status(200).send(portfolio);
    }
};