import React from 'react';
import ListProducts from '../../containers/ListProducts';
import MainLayout from '../../components/MainLayout';

function Organization() {
  return (
    <MainLayout title="Quản lý sản phẩm">
      <ListProducts />
    </MainLayout>
  );
}

export default Organization;
