import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Col, Row } from 'antd';
import ProductDetail from '../../containers/ProductDetail';

type Props = {};

const ProductDetails = (props: Props) => {
  return (
    <MainLayout title="home">
      <ProductDetail/>
    </MainLayout>
  );
};

export default ProductDetails;
