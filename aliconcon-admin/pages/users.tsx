import MainLayout from '../components/MainLayout';
import UsersManagement from '../containers/UsersManagement';

const IndexPage = () => {
  return (
    <MainLayout title="Danh sách người dùng">
      <UsersManagement />
    </MainLayout>
  );
};

export default IndexPage;
