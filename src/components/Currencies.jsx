import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Row, Col, Card, Input } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { useQuery } from 'react-query';

const fetchCurrencies = async (count) => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coins?limit=${count}`, {
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }
    )
    console.log('fetch')
    return res
};

const Currencies = ({simplified}) => {
    const count = simplified ? 5 : 15;
    const { data: currencies, isLoading } = useQuery(['currencies', count], () => fetchCurrencies(count), { staleTime: Infinity, chacheTime: 90000000000, keepPreviousData: true}
    )
    const [cryptos, setCryptos] = useState(currencies?.data?.data?.coins);

    const [searchTerm, setSearchTerm] = useState('');

    // const currencies = currencies?.data?.data?.coins
    console.log(currencies?.data?.data?.coins)

    useEffect(() => {
        const filteredData = currencies?.data?.data?.coins.filter((elem) => elem.name.toLowerCase().includes(searchTerm))
        setCryptos(filteredData)
    }, [currencies, searchTerm])
    
    
    return (
        <div>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurencies' onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((elem) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={elem.id}>
                        <Link to={{pathname: `/crypto/${elem.id}`, state: {coin: elem}}}>
                            <Card
                                title={`${elem.rank}. ${elem.name}`}
                                extra={<img className='crypto-image' src={elem.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(elem.price)}</p>
                                <p>Market Cap: {millify(elem.marketCap)}</p>
                                <p>Change: {millify(elem.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Currencies
