// import React, { useState, useEffect } from "react";
// import millify from "millify";
// import { Link } from "react-router-dom";
// import { Card, Row, Col, Input } from "antd";
// import Loader from "./Loader";

// const CryptoCurrencies = ({ simplified }) => {
//     const count = simplified ? 10 : 100;
//     // const { data, isFetching } = useGetCryptosQuery(count);
//     const [cryptos, setCryptos] = useState(data?.data?.coins);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const filteredData = data?.data?.coins.filter((elem) => elem.name.toLowerCase().includes(searchTerm))
//         setCryptos(filteredData)
//     }, [data, searchTerm])

//     // console.log(cryptos);

    

//     if (isFetching) return <Loader />;

//     return (
//         <>
//             {!simplified && (
//                 <div className='search-crypto'>
//                     <Input placeholder='Search Cryptocurencies' onChange={(e) => setSearchTerm(e.target.value)} />
//                 </div>
//             )}
//             <Row gutter={[32, 32]} className="crypto-card-container">
//                 {cryptos?.map((elem) => (
//                     <Col xs={24} sm={12} lg={6} className="crypto-card" key={elem.id}>
//                         <Link to={`/crypto/${elem.id}`}>
//                             <Card
//                                 title={`${elem.rank}. ${elem.name}`}
//                                 extra={<img className='crypto-image' src={elem.iconUrl} />}
//                                 hoverable
//                             >
//                                 <p>Price: {millify(elem.price)}</p>
//                                 <p>Market Cap: {millify(elem.marketCap)}</p>
//                                 <p>Change: {millify(elem.change)}%</p>
//                             </Card>
//                         </Link>
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     );
// };

// export default CryptoCurrencies;
