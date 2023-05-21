import React, { useEffect, useState } from 'react';
import FormWrapper from '../../components/FormWrapper';
import FormFilter from '../../components/FormFilter';
import Table from '../../components/TableCommon';
import { Typography, Button } from 'antd';
import styles from './styles.module.less';
import clsx from 'clsx';
import { DEFAULT_PAGE_SIZE, PRODUCTS_CREATE_PATH } from '../../constants';
import { useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';
import PopupConfirm from '../../components/PopupConfirm';
import { PRODUCTS_PATH } from '../../constants';
import useQueryProducts from '../../app/hooks/useQueryProducts';
import useMutationDeleteProduct from '../../app/hooks/useMutationDeleteProduct';
import { formatDate, showErrorMsg, showSuccessMsg } from '../../utils/helper';

const { Title, Text } = Typography;

function ListProducts() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [param, setParam] = useState<any>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    searchKey: '',
  });
  const { data: products, loading, pagination, refetch } = useQueryProducts(param);
  const { doMutation: deleteOrganozation, loading: loadingDelete } = useMutationDeleteProduct();
  console.log(products);
  const showModal = (id: string) => {
    setProductId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteOrganozation(productId)
      .then(() => {
        showSuccessMsg('Xóa thành công');
        refetch();
      })
      .catch(() => {
        showErrorMsg('Xảy ra lỗi');
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (value) => {
    setParam({
      ...param,
      page: 1,
      searchKey: value.searchKey,
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

  const renderColumns = () => {
    const columns: ColumnsType = [
      {
        title: 'title',
        key: 'title',
        dataIndex: 'title',
        render: (name, record: any) => (
          <Text className="link" onClick={() => router.push(`/products/${record._id}`)}>
            {name}
          </Text>
        ),
      },
      {
        title: 'Thể loại',
        key: 'category',
        dataIndex: 'category',
        render: (val) => val?.name,
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'quantity',
      },
      {
        title: 'Đã bán',
        key: 'sold',
        dataIndex: 'sold',
      },
      {
        title: 'Giá mua',
        key: 'purchase_price',
        dataIndex: 'purchase_price',
      },
      {
        title: 'Giá bán',
        key: 'sale_price',
        dataIndex: 'sale_price',
      },
      {
        title: 'Giá giảm',
        key: 'discount_price',
        dataIndex: 'discount_price',
      },
      {
        title: 'Ngày tạo',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (val) => formatDate(val, 'YYYY/MM/DD'),
      },
      {
        title: 'action',
        render: (_, record: any) => (
          <Text className="link" onClick={() => showModal(record._id)}>
            Xóa
          </Text>
        ),
      },
    ];
    return columns;
  };

  return (
    <div className={styles.root}>
      <Title className={styles.title} level={4}>
        Danh sách sản phẩm
      </Title>
      <div className={clsx('mt4', styles.formContainer)}>
        <FormWrapper loading={false}>
          <FormFilter
            onFinish={handleFilter}
            labelSearch="Tìm theo tên sản phẩm"
            placeholder="Tên sản phẩm"
            nameInputSearch="searchKey"
          />
        </FormWrapper>
      </div>
      <Table
        loading={loading || loadingDelete}
        columns={renderColumns()}
        dataSource={products}
        textTotal={`${pagination?.totalItems} `}
        onChange={(pagination, _, __, extra) => {
          onTableChange(pagination, extra);
        }}
        pagination={{
          pageSize: param.limit,
          current: param.page,
          total: pagination?.totalItems || 0,
        }}
        rightAdditionBtn={
          <Button type="primary" className="btn-create" onClick={() => router.push(PRODUCTS_CREATE_PATH)}>
            Thêm sản phẩm
          </Button>
        }
      />
      <PopupConfirm
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        description="Bạn có chắc muốn xóa sản phẩm này?"
        cancelText="Hủy"
        okText="Gửi"
      />
    </div>
  );
}

export default ListProducts;
