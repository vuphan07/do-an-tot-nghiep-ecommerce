import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useLazyQueryGetMemberDetail from '../../app/hooks/useLazyQueryGetMemberDetail';
import MyBreadcrumb from '../../components/Breadcrumb';
import MainLayout from '../../components/MainLayout';
import DetailUserContainer from '../../containers/DetailUser';
function DetailUser(props) {
  const router = useRouter();
  const { id } = router.query;
  const { fetchData, data, loading, error } = useLazyQueryGetMemberDetail();
  useEffect(() => {
    fetchData(id);
  }, [id]);
  return (
    <MainLayout isGoBack>
      <MyBreadcrumb
        paths={[
          { url: '/', name: 'Danh sách người dùng' },
          { url: `/user/${id}`, name: 'chi tiết' },
          { url: `/user/${id}`, name: `${data?.name}` },
        ]}
      />
      <DetailUserContainer defautValues={data} loading={loading} title="Chỉnh sửa người dùng" />
    </MainLayout>
  );
}

export default DetailUser;
