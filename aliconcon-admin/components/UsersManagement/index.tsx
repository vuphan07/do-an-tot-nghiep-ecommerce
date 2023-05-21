import React from 'react';
import { Button, Form, Select, Typography } from 'antd';
import styles from './style.module.less';
import Table, { TableCommonType } from '../TableCommon';
import FormWrapper from '../FormWrapper';
import FormFilter from '../FormFilter';
import CustomSelect from '../Select';
import Link from 'next/link';
import MemberStatusEnum from '../../interfaces/enums/MemberStatus';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/helper';
import { ROLE, STATUS_USER } from '../../utils/type';

const { Title } = Typography;

type UsersManagementProps = Omit<TableCommonType, 'title'> & {
  title?: string;
  onFilter: any;
  data: Array<any>;
};

const columns = [
  {
    title: '_id',
    key: '_id',
    dataIndex: '_id',
    render: (val, _record) => <Link href={`/user/${_record._id}`}>{val}</Link>,
  },
  {
    title: 'email',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'tên',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'role',
    key: 'role',
    dataIndex: 'role',
    render: (val)=> ROLE[val]
  },
  {
    title: 'Ngày tham gia',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (val) => formatDate(val, 'YYYY/MM/DD'),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (val)=> STATUS_USER[val]
  },
];

const ActionFilter = () => (
  <div className="input-name">
    <span className="span_description fw6">Trạng thái </span>
    <Form.Item name="status">
      <CustomSelect defaultValue={MemberStatusEnum.ACTIVE}>
        <Select.Option value={MemberStatusEnum.ALL}>Tất cả</Select.Option>
        <Select.Option value={MemberStatusEnum.ACTIVE}>Hoạt động</Select.Option>
        <Select.Option value={MemberStatusEnum.INACTIVE}>Ngừng hoạt động</Select.Option>
      </CustomSelect>
    </Form.Item>
  </div>
);

function UsersManagement({ data, onFilter, title, ...props }: UsersManagementProps) {
  const router = useRouter();
  const onSearch = (value) => {
    onFilter(value);
  };

  return (
    <div>
      <Title className={styles.title} level={4}>
        Danh sách người dùng
      </Title>
      <div className="mt4">
        <FormWrapper loading={false}>
          <FormFilter
            onFinish={onSearch}
            labelSearch="Tìm kiếm theo email"
            placeholder="Tìm kiếm theo email"
            actionFilter={<ActionFilter />}
          />
        </FormWrapper>
        <Table
          textTotal={`${props?.pagination && props?.pagination?.total}`}
          dataSource={data}
          columns={columns}
          {...props}
          rightAdditionBtn={
            <Button type="primary" className="btn-create">
              <Link href="/user/create"> Tạo mới user</Link>
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default UsersManagement;
