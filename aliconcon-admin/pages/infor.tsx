import useProfile from "../app/hooks/useProfile";
import MyBreadcrumb from "../components/Breadcrumb";
import MainLayout from "../components/MainLayout";
import DetailUserContainer from '../containers/DetailUser';

export default function Infor() {
    const { currentUser } = useProfile()
    return (
        <MainLayout title="profile">
            <MyBreadcrumb paths={[{ url: '/', name: 'Trang chủ' }, { url: '/infor', name: 'Thông tin cá nhân' }]} />
            <DetailUserContainer defautValues={currentUser} loading={false} title="Thông tin của tôi" />
        </MainLayout>
    );
}
