import React from 'react';
import MainLayout from '../../components/MainLayout';
import CreateOrganinationContainer from '../../containers/CreateProductForm';
import MyBreadcrumb from '../../components/Breadcrumb';
import { useRouter } from 'next/router';
import useQueryProductDetail from '../../app/hooks/useQueryProductDetail';

function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQueryProductDetail(id);
  return (
    <MainLayout isGoBack title="Chi tiết sản phẩm">
      <MyBreadcrumb
        paths={[
          { url: '/products', name: 'Danh sách sản phẩm' },
          { url: `/products/${id}`, name: `${data?.title}` },
        ]}
      />
      <CreateOrganinationContainer defaultValues={data} loading={loading} />
    </MainLayout>
  );
}

export default ProductDetail;
