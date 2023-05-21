import React from 'react';
import MyBreadcrumb from '../../../components/Breadcrumb';
import MainLayout from '../../../components/MainLayout';
import DetailUserContainer from '../../../containers/DetailUser';
function DetailUser(props) {
  return (
    <MainLayout isGoBack>
      <MyBreadcrumb paths={[{ url: '/', name: 'Trang chủ' }, { url: '/user/create', name: 'Tạo mới' }]} />
      <DetailUserContainer />
    </MainLayout>
  );
}

export default DetailUser;
