// import React, {useState} from 'react';
// import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
// import moment from 'moment';



// const { Title, Text } = Typography;
// const { Option } = Select;
// const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

// const News = ({ simplified }) => {
//     const count = simplified ? 6 : 12;
//     const [newsCategory, setNewsCategory] = useState();
//     // const { data } = useGetCryptoNewsQuery({ newsCategory, count});
//     // const { data: cryptos } = useGetCryptosQuery(100);

//     // console.log(data)

//     if(!data?.value) return <div>Loading...</div>;

//     return (
//         <Row gutter={[24, 24]}>
//         {!simplified && (
//           <Col span={24}>
//             <Select
//               showSearch
//               className="select-news"
//               placeholder="Select a Crypto"
//               optionFilterProp="children"
//               onChange={(value) => setNewsCategory(value)}
//               filterOption={(input, option) => option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//             >
//               <Option value="Cryptocurency">Cryptocurrency</Option>
//               {cryptos?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
//             </Select>
//           </Col>
//         )}
//         {data.value.map((news, i) => (
//           <Col xs={24} sm={12} lg={8} key={i}>
//             <Card hoverable className="news-card">
//               <a href={news.url} target="_blank" rel="noreferrer">
//                 <div className="news-image-container">
//                   <Title className="news-title" level={4}>{news.name}</Title>
//                   <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{maxwidth: '200px', maxHeight: '100px'}}/>
//                 </div>
//                 <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
//                 <div className="provider-container">
//                   <div>
//                     <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
//                     <Text className="provider-name">{news.provider[0]?.name}</Text>
//                   </div>
//                   <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
//                 </div>
//               </a>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     )
// }

// export default News
