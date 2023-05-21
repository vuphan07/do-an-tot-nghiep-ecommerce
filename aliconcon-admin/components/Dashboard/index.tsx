import { Card, Col, Progress, Row, Typography } from 'antd';
import React from 'react';
import CartAlert from './CartAlert';
import { LIST_ITEM_DASHBOARD } from '../../constants/layout';
import OrderSummary from './OrderSummary';
import TotalSummary from './TotalSummary';
import { formatMonney } from '../../utils/helper';

type Props = {
  totalUser;
  totalAmount;
  totalOrder;
  totalProduct;
};

const Dashboard = ({ totalUser, totalAmount, totalOrder, totalProduct }: Props) => {
  const dataMapping = [formatMonney(totalAmount), totalOrder, totalProduct, totalUser];
  return (
    <div>
      <Typography.Title level={2}>Trang chủ</Typography.Title>
      <Row gutter={20}>
        {LIST_ITEM_DASHBOARD.map((item, index) => (
          <Col span={6} key={index}>
            <CartAlert missing={dataMapping[index]} icon={item.icon} text={item.text} loading={false} />
          </Col>
        ))}
      </Row>
      <Row className="mt4" gutter={40}>
        <Col span={24}>
          <Card>
            <Typography.Title level={3}>Biểu đồ đánh giá thu nhập</Typography.Title>
            <TotalSummary />
          </Card>
        </Col>
      </Row>
      <Row className="mt4" gutter={40}>
        <Col span={16}>
          <Card>
            <Typography.Title level={3}>Biểu đồ đánh đơn hàng</Typography.Title>
            <OrderSummary />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Title level={3}>Tổng quan đơn hàng</Typography.Title>
            <div>Tổng số: 5000</div>
            <div className="mt3">
              <div className="flex justify-between w-100 pv3">
                <span>Đơn hàng đã hoàn thành</span>
                <span>1000</span>
              </div>
              <Progress percent={30} />
              <div className="flex justify-between w-100 pv3">
                <span>Đơn hàng đang giao</span>
                <span>1000</span>
              </div>
              <Progress percent={30} />
              <div className="flex justify-between w-100 pv3">
                <span>Đơn hàng Đang xử lý</span>
                <span>1000</span>
              </div>
              <Progress percent={30} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
