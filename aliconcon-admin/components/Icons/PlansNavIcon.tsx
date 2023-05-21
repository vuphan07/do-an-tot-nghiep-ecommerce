import Icon from '@ant-design/icons';

const PlansIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 15H7C6.45 15 6 14.55 6 14C6 13.45 6.45 13 7 13H11C11.55 13 12 13.45 12 14C12 14.55 11.55 15 11 15ZM17 15H15C14.45 15 14 14.55 14 14C14 13.45 14.45 13 15 13H17C17.55 13 18 13.45 18 14C18 14.55 17.55 15 17 15ZM20 16C20 16.551 19.552 17 19 17H5C4.448 17 4 16.551 4 16V11H20V16ZM4 8C4 7.449 4.448 7 5 7H19C19.552 7 20 7.449 20 8V9H4V8ZM19 5H5C3.346 5 2 6.346 2 8V16C2 17.654 3.346 19 5 19H19C20.654 19 22 17.654 22 16V8C22 6.346 20.654 5 19 5Z"
      fill="#231F20"
    />
    <mask id="mask0_103_18017"  maskUnits="userSpaceOnUse" x="2" y="5" width="20" height="14">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 15H7C6.45 15 6 14.55 6 14C6 13.45 6.45 13 7 13H11C11.55 13 12 13.45 12 14C12 14.55 11.55 15 11 15ZM17 15H15C14.45 15 14 14.55 14 14C14 13.45 14.45 13 15 13H17C17.55 13 18 13.45 18 14C18 14.55 17.55 15 17 15ZM20 16C20 16.551 19.552 17 19 17H5C4.448 17 4 16.551 4 16V11H20V16ZM4 8C4 7.449 4.448 7 5 7H19C19.552 7 20 7.449 20 8V9H4V8ZM19 5H5C3.346 5 2 6.346 2 8V16C2 17.654 3.346 19 5 19H19C20.654 19 22 17.654 22 16V8C22 6.346 20.654 5 19 5Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_103_18017)">
      <rect width="24" height="26" fill="#9E9E9E" />
    </g>
  </svg>
);

const PlansIcon = (props) => <Icon component={PlansIconSvg} {...props} />;

export default PlansIcon;
