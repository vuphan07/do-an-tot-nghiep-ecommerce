import React from 'react';
import MainLayout from '../../components/MainLayout';
import OrdersContainer from '../../containers/Orders';

function Orders(props) {
  return (
    <MainLayout title="Quản lý đơn hàng">
      <OrdersContainer />
    </MainLayout>
  );
}

export default Orders;
