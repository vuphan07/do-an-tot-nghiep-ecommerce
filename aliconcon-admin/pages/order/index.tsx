import React from 'react';
import MainLayout from '../../components/MainLayout';
import PaymentContainer from '../../containers/Orders';

function Payment(props) {
  return (
    <MainLayout title="支払管理">
      <PaymentContainer />
    </MainLayout>
  );
}

export default Payment;
