import React from 'react';
import MainLayout from '../../components/MainLayout';
import OrderDetailContainer from '../../containers/OrderDetail';

type Props = {};

const OrderDetail = (props: Props) => {
  return (
    <MainLayout title="order detail">
      <OrderDetailContainer />
    </MainLayout>
  );
};

export default OrderDetail;
