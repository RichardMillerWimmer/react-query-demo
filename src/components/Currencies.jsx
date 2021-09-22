import React from 'react';
import axios from 'axios';

import { useQuery } from 'react-query';

const fetchCurrencies = async () => {
    const res = await axios.get('https://coinranking1.p.rapidapi.com/coins', {
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }
    )
    return res
}

const Currencies = () => {
    const { data: currencies, isLoading } = useQuery('currencies', () => fetchCurrencies()
    )
    console.log(currencies?.data?.data?.coins)
    // console.log(data)
    return (
        <div>
            <h2>Currencies Component</h2>
        </div>
    )
}

export default Currencies
