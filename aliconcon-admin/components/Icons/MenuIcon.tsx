import Icon from '@ant-design/icons';

const MenuSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.4997 2.56665H1.49966C1.3818 2.56665 1.28537 2.66308 1.28537 2.78094V4.49522C1.28537 4.61308 1.3818 4.70951 1.49966 4.70951H22.4997C22.6175 4.70951 22.7139 4.61308 22.7139 4.49522V2.78094C22.7139 2.66308 22.6175 2.56665 22.4997 2.56665ZM22.4997 19.2809H1.49966C1.3818 19.2809 1.28537 19.3774 1.28537 19.4952V21.2095C1.28537 21.3274 1.3818 21.4238 1.49966 21.4238H22.4997C22.6175 21.4238 22.7139 21.3274 22.7139 21.2095V19.4952C22.7139 19.3774 22.6175 19.2809 22.4997 19.2809ZM22.4997 10.9238H1.49966C1.3818 10.9238 1.28537 11.0202 1.28537 11.1381V12.8524C1.28537 12.9702 1.3818 13.0667 1.49966 13.0667H22.4997C22.6175 13.0667 22.7139 12.9702 22.7139 12.8524V11.1381C22.7139 11.0202 22.6175 10.9238 22.4997 10.9238Z"
      fill="#222731"
    />
  </svg>
);

const MenuIcon = (props) => <Icon component={MenuSvg} {...props} />;

export default MenuIcon;
