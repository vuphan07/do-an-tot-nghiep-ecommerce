import { InputNumber, Table } from 'antd';
import React from 'react';
import { formatMonney } from '../../utils/helper';
import Image from 'next/image';
import { DeleteOutlined } from '@ant-design/icons';
import { showConfirm } from '../../utils/helperMessage';
type Props = {
  carts: Array<any>;
  deleteCart: (id) => void;
  updateCart: (id, count) => void;
};

const ListCart = ({ carts, deleteCart, updateCart }: Props) => {
  const handleDeleteCart = (cartId) => {
    showConfirm('Bạn có chắc muốn xóa sản phẩm ra khỏi giỏ hàng?', () => {
      deleteCart(cartId);
    });
  };

  const columns = [
    { key: 'title', dataIndex: 'title', title: 'Tên' },
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      render: (val) => <Image alt="" src={val} width={100} height={100} />,
    },
    {
      key: 'count',
      dataIndex: 'count',
      title: 'Số lượng',
      render: (val, record) => (
        <InputNumber size="small" min={1} defaultValue={val} onChange={(value) => updateCart(record?.cartId, value)} />
      ),
    },
    { key: 'price', dataIndex: 'price', title: 'Giá', render: (val) => formatMonney(val) },
    { key: 'total', dataIndex: 'total', title: 'Thành tiền', render: (val) => formatMonney(val) },
    {
      key: 'action',
      dataIndex: 'action',
      title: '',
      render: (_, record) => <DeleteOutlined onClick={() => handleDeleteCart(record?.cartId)} />,
    },
  ];

  const dataSource = carts?.map((cart) => {
    const total = cart?.count * (cart?.sale_price - cart?.discount_price);
    return { ...cart, image: cart.images[0], total, price: cart?.sale_price - cart?.discount_price };
  });
  return (
    <Table
      scroll={{ y: 500 }}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      summary={(pageData) => {
        let totalPayment = 0;
        pageData.forEach(({ total }) => {
          totalPayment += total;
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={1}>Tổng cộng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{formatMonney(totalPayment)}</Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
};

export default ListCart;
