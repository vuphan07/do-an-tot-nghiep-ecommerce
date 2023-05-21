import OrganizationIcon from '../components/Icons/OrganizationNavIcon';
import PaymentNavIcon from '../components/Icons/PaymentNavIcon';
import PlansIcon from '../components/Icons/PlansNavIcon';
import SubcriptionNavIcon from '../components/Icons/SubcriptionNavIcon';
import UserIcon from '../components/Icons/userNavIcon';
import Icon, { HomeOutlined, HomeFilled } from '@ant-design/icons';
import { AiOutlineDollar } from 'react-icons/ai';
import { HiOutlineShoppingBag, HiOutlineUsers } from 'react-icons/hi';
import { MdProductionQuantityLimits } from 'react-icons/md';
export const NAVBAR_ITEM: Array<{
  href: string;
  icon: any;
  iconFocus: any;
  text: string;
}> = [
  {
    href: '/',
    icon: <HomeOutlined style={{ width: 20, height: 20 }} />,
    iconFocus: <HomeFilled style={{ width: 20, height: 20 }} />,
    text: 'Trang chủ',
  },
  {
    href: '/users',
    icon: <UserIcon style={{ width: 20, height: 20 }} />,
    iconFocus: <UserIcon style={{ width: 20, height: 20 }} />,
    text: 'Quản lý người dùng',
  },
  {
    href: '/products',
    icon: <OrganizationIcon style={{ width: 20, height: 20 }} />,
    iconFocus: <OrganizationIcon style={{ width: 20, height: 20 }} />,
    text: 'Quản lý sản phẩm',
  },
  {
    href: '/orders',
    icon: <PlansIcon style={{ width: 20, height: 20 }} />,
    iconFocus: <PlansIcon style={{ width: 20, height: 20 }} />,
    text: 'Quản lý đơn hàng',
  },
];

export const LIST_ITEM_DASHBOARD: Array<{
  icon: any;
  text: string;
  value?: any;
}> = [
  {
    icon: <AiOutlineDollar size={40} />,
    text: 'Tổng số tiền bán',
  },
  {
    icon: <HiOutlineShoppingBag size={40} />,
    text: 'Tổng số đơn',
  },
  {
    icon: <MdProductionQuantityLimits size={40} />,
    text: 'Tổng số sản phẩm',
  },
  {
    icon: <HiOutlineUsers size={40} />,
    text: 'Tổng số người dùng',
  },
];
