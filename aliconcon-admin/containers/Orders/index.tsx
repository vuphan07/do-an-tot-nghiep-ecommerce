import React, { useState } from 'react';
import styles from './styles.module.less';
import FormFilter from '../../components/FormFilter';
import FilterPayment from '../../components/FilterPayment';
import FormWrapper from '../../components/FormWrapper';
import clsx from 'clsx';
import { Button, Form, Select, Typography } from 'antd';
import TableCommon from '../../components/TableCommon';
import type { ColumnsType } from 'antd/es/table';
import { PAGE_SIZE_10 } from '../../constants';
import useQueryOrders from '../../app/hooks/useQueryOrders';
import useMutationUpdateOrder from '../../app/hooks/useMutationUpdateOrder';
import { showErrorMsg, showSuccessMsg } from '../../utils/helper';

const { Title } = Typography;
function OrderContainer() {
  const [param, setParam] = useState<any>({
    page: 1,
    limit: PAGE_SIZE_10,
    searchKey: '',
  });
  const [newStatus, setNewStatus] = useState<any>('');
  const { data: payments, pagination, loading } = useQueryOrders(param);
  const { doMutation: update, loading: updating } = useMutationUpdateOrder();
  const handleFilter = (value) => {
    setParam({
      ...param,
      page: 1,
      searchKey: value.searchKey,
      status: value.status,
    });
  };

  const onTableChange = (pagination, extra) => {
    if (extra.action === 'paginate') {
      setParam((currentParams) => ({
        ...currentParams,
        limit: pagination.pageSize,
        page: pagination.current,
      }));
    }
  };
  const handleChange = (value: string) => {
    console.log(value);
    setNewStatus(value);
  };

  const handleSubmit = (oldValue: any) => {
    const a = { ...oldValue, status: newStatus };
    console.log(a);
    update({ id: oldValue._id, order: { ...oldValue, status: newStatus } })
      .then(() => {
        showSuccessMsg('Chỉnh sửa thành công thành công');
      })
      .catch((err) => {
        showErrorMsg('Cập nhật thất bại');
        console.log(err);
      });
  };
  const renderColumns = () => {
    let columns: ColumnsType = [
      {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Địa chỉ ',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'amount',
        key: 'peramountiod',
      },
      {
        title: 'Ngày',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (_, record: any) => (
          <div>
            {' '}
            <Select
              defaultValue={record.status}
              style={{ width: 150, marginRight: '20px' }}
              onChange={handleChange}
              options={[
                { value: 'pending', label: 'pending' },
                { value: 'processing', label: 'processing' },
                { value: 'delivered', label: 'delivered' },
                { value: 'cancelled', label: 'cancelled' },
              ]}
            />
            <Button style={{ marginLeft: '10px' }} type="primary" onClick={() => handleSubmit(record)}>
              Submit
            </Button>
          </div>
        ),
      },
    ];
    return columns;
  };
  return (
    <div className={styles.root}>
      <Title className="title">Danh sách đơn hàng</Title>
      <div className={clsx('mt4', 'form-container')}>
        <FormWrapper loading={false}>
          <FormFilter
            onFinish={handleFilter}
            labelSearch="Tìm kiếm theo tên user"
            placeholder="Tên user"
            actionFilter={<FilterPayment />}
            nameInputSearch="searchKey"
          />
        </FormWrapper>
      </div>
      <TableCommon
        loading={loading || updating}
        columns={renderColumns()}
        dataSource={payments}
        textTotal={`${pagination.totalItems}`}
        onChange={(pagination, _, __, extra) => {
          onTableChange(pagination, extra);
        }}
        pagination={{
          pageSize: param.limit,
          current: param.page,
          total: pagination?.totalItems || 0,
        }}
      />
    </div>
  );
}

export default OrderContainer;
