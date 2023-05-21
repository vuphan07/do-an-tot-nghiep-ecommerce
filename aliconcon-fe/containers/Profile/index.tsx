import React from 'react';
import useProfile from '../../app/hooks/useProfile';
import { Col, Form, Input, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import DetailUser from '../DetailUser';
import ListOrders from '../ListOrders';

type Props = {};

const ProfileContainer = (props: Props) => {
  const [form] = useForm();

  const { currentUser } = useProfile();
  return (
    <Row>
      <Col span={9}>
        <DetailUser defautValues={currentUser} />
      </Col>
      <Col span={1}></Col>
      <Col span={14}>
        <ListOrders />
      </Col>
    </Row>
  );
};

export default ProfileContainer;
