import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const ShowListingCard = ({ image, title, description }) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt={title} src={image} />}
  >
    <Meta title={title} description={description} />
  </Card>
);

export default ShowListingCard;
