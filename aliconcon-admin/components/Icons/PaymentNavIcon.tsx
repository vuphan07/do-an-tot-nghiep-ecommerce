import Icon from '@ant-design/icons';

const PaymentNavIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 16.9V3.1C2.5 2.76863 2.76863 2.5 3.1 2.5H16.9C17.2314 2.5 17.5 2.76863 17.5 3.1V16.9C17.5 17.2314 17.2314 17.5 16.9 17.5H3.1C2.76863 17.5 2.5 17.2314 2.5 16.9Z"
      stroke="#9E9E9E"
      strokeWidth="1.5"
    />
    <path
      d="M12.5 7.08301C11.9292 6.51218 10.9239 6.11514 10 6.09027M7.5 12.4997C8.03707 13.2158 9.03564 13.6242 10 13.6588M10 6.09027C8.90073 6.06069 7.91667 6.55799 7.91667 7.91635C7.91667 10.4163 12.5 9.16635 12.5 11.6663C12.5 13.0922 11.2801 13.7048 10 13.6588M10 6.09027V4.58301M10 13.6588V15.4163"
      stroke="#9E9E9E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PaymentNavIcon = (props) => <Icon component={PaymentNavIconSvg} {...props} />;

export default PaymentNavIcon;
