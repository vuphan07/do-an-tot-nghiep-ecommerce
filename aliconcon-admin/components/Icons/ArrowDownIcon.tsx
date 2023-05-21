import Icon from '@ant-design/icons';

export const ArrowDownSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.49 4.10156H2.51035C2.24102 4.10156 2.09063 4.38594 2.25742 4.58008L6.74727 9.78633C6.87578 9.93535 7.12324 9.93535 7.25313 9.78633L11.743 4.58008C11.9098 4.38594 11.7594 4.10156 11.49 4.10156Z"
      fill="#FF4D4F"
    />
  </svg>
);

const ArrowDownIcon = (props) => <Icon component={ArrowDownSvg} {...props} />;

export default ArrowDownIcon;
