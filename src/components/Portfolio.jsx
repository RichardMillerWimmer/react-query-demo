import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPortfolio = async () => {
    // const res = axios.get('/api/portfolio')
    // .then((res) => {
    //     console.log('fetchPorfolio', res)
    // })
    // console.log(res)
    // return res
}

const Portfolio = () => {
    const {data: portfolio} = useQuery('portfolio', () => fetchPortfolio())
    // console.log('portfolio', portfolio)

    return (
        <div>
            <h2>Portfolio Component</h2>

        </div>
    )
}

export default Portfolio
