import Icon from '@ant-design/icons';

const userIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.16699 16.6667V15.8333C4.16699 12.6117 6.77866 10 10.0003 10V10C13.222 10 15.8337 12.6117 15.8337 15.8333V16.6667"
      stroke="#A9A9A9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.0003 9.99967C11.8413 9.99967 13.3337 8.50729 13.3337 6.66634C13.3337 4.82539 11.8413 3.33301 10.0003 3.33301C8.15938 3.33301 6.66699 4.82539 6.66699 6.66634C6.66699 8.50729 8.15938 9.99967 10.0003 9.99967Z"
      stroke="#A9A9A9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = (props) => <Icon component={userIconSvg} {...props} />;

export default UserIcon;
