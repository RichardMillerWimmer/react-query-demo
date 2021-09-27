import React from 'react';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Row, Col, Card, Button } from 'antd';
import millify from 'millify';
import { useQueryClient } from 'react-query';
import Loader from './Loader';



const fetchPortfolio = async () => {
    const res = axios.get('/api/portfolio')
    return res
}
const removeCoin = async (id) => {
    const res = await axios.delete(`/api/portfolio/${id}`)
    return res
}

const Portfolio = () => {
    const queryClient = useQueryClient();
    const {data: portfolio, isFetching} = useQuery('portfolio', () => fetchPortfolio())
    const mutation = useMutation(removeCoin, {
        onSuccess: data => {
            queryClient.invalidateQueries('portfolio')
            queryClient.setQueryData(['portfolio', data])
        }
    })
    
    if(isFetching) return <Loader />

    return (
        <div>
            <Row gutter={[32, 32]} className="crypto-card-container">
                {portfolio?.data?.map((elem) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={elem.id}>
                            <Card
                                title={`${elem.rank}. ${elem.name}`}
                                extra={<img className='crypto-image' src={elem.iconUrl} alt='crypto coin' />}
                                hoverable
                            >
                                <p>Price: {millify(elem.price)}</p>
                                <p>Market Cap: {millify(elem.marketCap)}</p>
                                <p>Change: {millify(elem.change)}%</p>
                                <Button onClick={() => mutation.mutateAsync(elem.id)}>Remove</Button>
                            </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Portfolio
