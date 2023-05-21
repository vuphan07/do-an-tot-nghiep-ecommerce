import React from 'react';
import MainLayout from '../components/MainLayout';
import CartContainer from '../containers/CartContainer';

type Props = {};

const Cart = (props: Props) => {
  return (
    <MainLayout title="cart">
      <CartContainer />
    </MainLayout>
  );
};
export default Cart;
