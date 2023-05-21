import { Col, Row, Tag } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import CardWrapper from '../../components/CardWrapper';
import useQueryOrderDetail from '../../app/hooks/useQueryOrderDetail';
import { PAYMENT_METHOD } from '../../interfaces/enums/paymentMethod';
import Image from 'next/image';

type Props = {};

const OrderDetailContainer = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQueryOrderDetail(id);
  return (
    <CardWrapper>
      <div className="p-4">
        <h1>ORDER {id}</h1>
        <h2>
          <Tag color="gold">{data?.status}</Tag>
        </h2>
        <h3>Họ và tên: {data?.name}</h3>
        <h3>Email: {data?.email}</h3>
        <h3>Số điện thoại: {data?.phone}</h3>
        <h3>Địa chỉ: {data?.address}</h3>
        {data?.paymentMethod === PAYMENT_METHOD.PAYPAL ? (
          <h2>
            <Tag color="lime">Đã thanh toán</Tag>
          </h2>
        ) : (
          <h2>
            <Tag color="red">Chưa thanh toán</Tag>
          </h2>
        )}
        <h1>Orders Items</h1>
        {data?.products?.map((item, index) => (
          <Row className="flex items-center" gutter={20} key={index}>
            <Col>{item?.title}</Col>
            <Col>
              <Image src={item?.image} alt="" width={80} height={80} />
            </Col>
            <Col>{item?.sale_price - item?.discount_price}</Col>
            <Col>x</Col>
            <Col>{item?.quantity}</Col>
            <Col>=</Col>
            <Col>{(item?.sale_price - item?.discount_price) * item?.quantity}</Col> 
          </Row>
        ))}
      </div>
    </CardWrapper>
  );
};
export default OrderDetailContainer;
