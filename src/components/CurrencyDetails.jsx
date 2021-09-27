import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import millify from 'millify';
import { Col, Typography, Button } from 'antd';


import { DollarCircleOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart';

const { Title, Text } = Typography;

const fetchCurrencies = async (coinId) => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history/7d`, {
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }
    )
    return res
};

const CurrencyDetails = (props) => {
    const coin = props.location.state.coin;
    const coinId = props.location.state.coin.id;
    const { data: coinHistory } = useQuery(['coinHistory', coinId], () => fetchCurrencies(coinId), { staleTime: Infinity, chacheTime: 90000000000, keepPreviousData: true }
    )

    const stats = [
        { title: 'Price to USD', value: `$ ${coin.price && millify(coin.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coin.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${coin.volume && millify(coin.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coin.marketCap && millify(coin.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(coin.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const addToPortfolio = () => {
        axios.post('/api/portfolio', coin)
        .then((res) => {
            // console.log(res)
        })
    }

    return (
        <div>
            <Button onClick={() => addToPortfolio()}>Add to Portolfio</Button>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {coin.name} ({coin.slug})
                </Title>
                <p>{coin.name} live price in US Dollars. View value statistics, market and supply</p>
            </Col>
            <Col className='stats-container'>
                <Col className='coin-value-container'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {coin.name} Value Statistics
                        </Title>
                        <p>An overview showing the stats of {coin.name}.</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <LineChart coinHistory={coinHistory} currentPrice={millify(coin.price)} coinName={coin.name}/>
        </div>
    )
}

export default CurrencyDetails
