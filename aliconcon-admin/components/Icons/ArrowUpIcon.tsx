import Icon from '@ant-design/icons';

export const ArrowUpSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.743 9.41958L7.25313 4.21333C7.12461 4.06431 6.87715 4.06431 6.74727 4.21333L2.25742 9.41958C2.09063 9.61372 2.24102 9.8981 2.51035 9.8981H11.49C11.7594 9.8981 11.9098 9.61372 11.743 9.41958Z"
      fill="#52C41A"
    />
  </svg>
);

const ArrowUpIcon = (props) => <Icon component={ArrowUpSvg} {...props} />;

export default ArrowUpIcon;
