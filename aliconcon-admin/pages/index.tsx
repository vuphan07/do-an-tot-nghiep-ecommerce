import MainLayout from '../components/MainLayout';
import Dashboard from '../containers/Dashboard';

const IndexPage = () => {
  return (
    <MainLayout title="Trang chủ">
      <Dashboard />
    </MainLayout>
  );
};

export default IndexPage;
