import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import moment from 'moment';
import { Row, Col, Typography, Avatar, Card } from 'antd';
import Loader from './Loader';

const { Title, Text } = Typography;

const fetchNews = async () => {
    const res = await axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=5`, {
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPID_API_NEWS_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }
    )
    console.log('fetch')
    return res
};

const News = () => {
    const { data: news, isLoading } = useQuery('news', () => fetchNews(), { staleTime: 600000, keepPreviousData: true, retry: 3 })

    if(isLoading) return <Loader />
    
    return (
        <div>
            <h2>News</h2>
            <Row gutter={[24, 24]}>
                {news?.data?.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img src={news?.image?.thumbnail?.contentUrl} alt="news" style={{ maxwidth: '200px', maxHeight: '100px' }} />
                                </div>
                                <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="news" />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default News
