import React, {useState} from 'react';
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
    const { data: currencies, isLoading } = useQuery(['currencies', count], () => fetchCurrencies(count)
    )
    const [searchTerm, setSearchTerm] = useState('');

    // const currencies = currencies?.data?.data?.coins
    console.log(currencies?.data?.data?.coins)

    
    
    return (
        <div>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurencies' onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {currencies?.data?.data?.coins.map((elem) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={elem.id}>
                        <Link to={`/crypto/${elem.id}`}>
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
