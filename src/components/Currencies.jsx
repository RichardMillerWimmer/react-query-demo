import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { useQuery } from 'react-query';

const fetchCurrencies = async (count, offset) => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coins?limit=${count}&offset=${offset}`, {
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }
    )
    return res
};

const Currencies = ({ simplified }) => {
    const [offset, setOffset] = useState(0);
    const count = simplified ? 4 : 15;
    const { data: currencies } = useQuery(['currencies', count, offset], () => fetchCurrencies(count, offset), { staleTime: 5000, chacheTime: 300000, keepPreviousData: true }
    )
    const [cryptos, setCryptos] = useState(currencies?.data?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = currencies?.data?.data?.coins.filter((elem) => elem.name.toLowerCase().includes(searchTerm))
        setCryptos(filteredData)
    }, [currencies, searchTerm]);

    const pageUp = () => {
        setOffset(prevOffset => Math.min(prevOffset + 15))
    };

    const pageDown = () => {
        setOffset(prevOffset => Math.min(prevOffset - 15))
    };


    return (
        <div>
            <h2>Cryptocurrencies</h2>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurencies' onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((elem) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={elem.id}>
                        <Link to={{ pathname: `/crypto/${elem.id}`, state: { coin: elem } }}>
                            <Card
                                title={`${elem.rank}. ${elem.name}`}
                                extra={<img className='crypto-image' src={elem.iconUrl} alt='crypto coin' />}
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
            {!simplified && (
                <div>
                    <Button onClick={() => pageDown()} disabled={offset === 0}>Previous</Button>
                    <Button onClick={() => pageUp()}>Next</Button>
                </div>
            )}
        </div>
    )
}

export default Currencies
