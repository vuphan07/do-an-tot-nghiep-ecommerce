import React from 'react';
import CreateOrganinationContainer from '../../containers/CreateProductForm';
import MainLayout from '../../components/MainLayout';
import MyBreadcrumb from '../../components/Breadcrumb';

function CreateOrganization(props) {
  return (
    <MainLayout isGoBack title="Tạo sản phẩm">
      <MyBreadcrumb
        paths={[
          { url: '/products', name: 'Danh sách sản phẩm' },
          { url: `/products/create`, name: `Tạo mới sản phẩm` },
        ]}
      />
      <CreateOrganinationContainer defaultValues={undefined} />
    </MainLayout>
  );
}

export default CreateOrganization;
