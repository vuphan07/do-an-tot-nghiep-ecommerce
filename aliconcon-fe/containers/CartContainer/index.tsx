import React, { useState } from 'react';
import useProfile from '../../app/hooks/useProfile';
import { Col, Form, Input, Row, Table } from 'antd';
import FormWrapper from '../../components/FormWrapper';
import Image from 'next/image';
import ListCart from '../../components/ListCart';
import useMutationDeleteCart from '../../app/hooks/useMutationDeleteCart';
import useLazyQueryProfile from '../../app/hooks/useLazyQueryProfile';
import useMutationUpdateCart from '../../app/hooks/useMutationUpdateCart';
import FormCheckout from '../../components/FormCheckout';
import { PAYMENT_METHOD } from '../../interfaces/enums/paymentMethod';
import useMutationCreateOrder from '../../app/hooks/useMutationCreateOrder';
import { useRouter } from 'next/router';

type Props = {};

const CartContainer = (props: Props) => {
  const { currentUser } = useProfile();
  const { doMutation: deleteCart } = useMutationDeleteCart();
  const { doMutation: updateCart } = useMutationUpdateCart();
  const { doMutation: createOrder, loading: ordering } = useMutationCreateOrder();
  const { fetchData } = useLazyQueryProfile();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.PAYMENT_ON_DELIVERY);
  const router = useRouter();
  const handlePaymentMethod = (val) => {
    setPaymentMethod(val);
  };

  const handleFinishPayment = async (values) => {
    try {
      const requestBody = {
        products: currentUser?.cart.map(
          ({ _id, count, title, size, color, sale_price, discount_price, description, images }) => ({
            productId: _id,
            quantity: count,
            title,
            size,
            color,
            sale_price,
            discount_price,
            description,
            image: images[0],
          }),
        ),
        ...values,
        amount: getTotal(),
      };
      await createOrder(requestBody);
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCart = (id) => {
    deleteCart(id).then(() => fetchData());
  };
  const handleUpdateCart = (id, count) => {
    updateCart({ id, count }).then(() => fetchData());
  };
  if (!currentUser.cart.length) {
    return <div className="w-full h-full flex justify-center items-center">Giỏ hàng trống</div>;
  }

  const getTotal = () => {
    return currentUser?.cart?.reduce((total, item) => {
      const totalPerItem = item?.count * (item?.sale_price - item?.discount_price);
      return totalPerItem + total;
    }, 0);
  };

  return (
    <div>
      <Row className="mt-6" gutter={12}>
        <Col span={16}>
          <h1> Danh sách giỏ hàng ({currentUser?.cart.length})</h1>
          <ListCart updateCart={handleUpdateCart} deleteCart={handleDeleteCart} carts={currentUser?.cart} />
        </Col>
        <Col span={8}>
          <h1> Địa chỉ</h1>
          <FormCheckout
            loading={ordering}
            onChangePaymentMethod={handlePaymentMethod}
            paymentMethod={paymentMethod}
            amount={parseFloat((getTotal() / 23000).toFixed(2))}
            onFinish={handleFinishPayment}
          />
        </Col>
      </Row>
    </div>
  );
};
export default CartContainer;
