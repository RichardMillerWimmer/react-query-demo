require("dotenv").config();
const axios = require("axios");

const { REACT_APP_RAPID_API_HOST, REACT_APP_RAPID_API_KEY } = process.env;

const portfolio = ["razxDUgYGNAdQ&", "Qwsogvtv82FCd"];

async function callPortfolio() {
    // portArr = `uuids[]=${portfolio.join('uuids[]=')}`
    // let fullPorfolio = axios.get(`https://api.coinranking.com/v2/coins?${portArr}`)
    // .then((res) => {
    //     console.log(res)
    // })
    // return fullPorfolio

    
    // let mapped = (
    //     portfolio.map((coin) => {
    //         return axios.get(`https://coinranking.p.rapidapi.com/coin/${coin}`, {
    //             headers: {
    //                 "x-rapidapi-host": REACT_APP_RAPID_API_HOST,
    //                 "x-rapidapi-key": REACT_APP_RAPID_API_KEY,
    //             },
    //         });
    //     })
    // );
    // const fullPorfolio = await Promise.all(mapped)
    // return fullPorfolio
    // let fullPortfolio = portfolio.map(coin => {
    //     axios.get(`https://coinranking.p.rapidapi.com/coin/${coin}`, {headers: {
    //         'x-rapidapi-host': REACT_APP_RAPID_API_HOST,
    //         'x-rapidapi-key': REACT_APP_RAPID_API_KEY
    //     }})
    //     .then((res) => {
    //         console.log('fullPorfolio call', res.data.data)
    //         fullPortfolio.push(res.data.data)
    //     })
    // })
    // Promise.all(fullPortfolio)
    // .then(res => {
    //     console.log('fullPorfolio', res)

    // })
    // return fullPortfolio
}

module.exports = {
    getPortfolio: async (req, res) => {
        const portfolioRes = await callPortfolio();
        // console.log("getPortfolio call", portfolioRes);
        res.status(200).send(portfolioRes);
    },
    addCurrency: (req, res) => {
        const { newCurrency } = req.body;
        portfolio.push(newCurrency);
        res.status(200).send(portfolio);
    },
    deleteCurrency: (req, res) => {
        const { id } = req.params;
        const currencyRemove = portfolio.findIndex((coin) => coin.id === +id);
        portfolio.splice(currencyRemove, 1);
        res.status(200).send(portfolio);
    },
};
