import React from 'react';
import { Rate } from 'antd';

const StarRating = ({ rating }) => {
  return <Rate disabled defaultValue={rating} />;
};

export default StarRating;
