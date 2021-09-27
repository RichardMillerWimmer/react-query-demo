import React from 'react';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Row, Col, Card, Button } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';



const fetchPortfolio = async () => {
    const res = axios.get('/api/portfolio')
    // console.log(res)
    return res
}
const removeCoin = async (id) => {
    // console.log('remove hit')
    const res = await axios.delete(`/api/portfolio/${id}`)
    console.log('mutation res', res)
    return res
}

const Portfolio = () => {
    const queryClient = useQueryClient();
    const {data: portfolio, status} = useQuery('portfolio', () => fetchPortfolio())
    const mutation = useMutation(removeCoin, {
        onSuccess: data => {
            queryClient.setQueryData(['portfolio', data])
            queryClient.invalidateQueries('portfolio')
        }
    })
    
    // console.log('portfolio', portfolio)
    // console.log('portfolio', status)

    

    return (
        <div>
            <Row gutter={[32, 32]} className="crypto-card-container">
                {portfolio?.data?.map((elem) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={elem.id}>
                        {/* <Link to={{pathname: `/crypto/${elem.id}`, state: {coin: elem}}}> */}
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
                        {/* </Link> */}
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default Portfolio
