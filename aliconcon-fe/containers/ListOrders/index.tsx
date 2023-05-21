import { Table } from 'antd';
import React from 'react';
import useQueryOrders from '../../app/hooks/useQueryOrders';
import moment from 'moment';
import { formatMonney } from '../../utils/helper';
import { PAYMENT_METHOD } from '../../interfaces/enums/paymentMethod';
import Link from 'next/link';

type Props = {};

const ListOrders = (props: Props) => {
  const { data, loading } = useQueryOrders({ limit: 1000, page: 1, searchKey: '' });
  console.log(data);
  return (
    <div style={{ marginTop: 12 }}>
      <Table
        dataSource={data}
        loading={loading}
        columns={[
          {
            key: 'id',
            dataIndex: '_id',
            title: 'id',
            render: (val) => <Link href={`/orders/${val}`}>{val}</Link>,
          },
          {
            key: 'date',
            dataIndex: 'createdAt',
            title: 'Ngày',
            render: (val) => moment(new Date(val)).format('DD/MM/YYYY'),
          },
          {
            key: 'total',
            dataIndex: 'amount',
            title: 'Tổng tiền',
            render: (val) => formatMonney(val),
          },
          {
            key: 'status_pay',
            dataIndex: 'paymentMethod',
            title: 'Trạng thái thanh toán',
            render: (val) => (val === PAYMENT_METHOD.PAYMENT_ON_DELIVERY ? 'Chưa thanh toán' : 'Đã thanh toán'),
          },
          {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái giao hàng',
          },
        ]}
      />
    </div>
  );
};

export default ListOrders;
