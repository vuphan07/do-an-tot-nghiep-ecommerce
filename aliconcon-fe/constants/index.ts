export const COMPLETE_PW_PATH = '/complete-password';
export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const FORGOT_PW_PATH = '/forgot-password';
export const RESET_PW_PATH = '/reset-password';
export const PRODUCTS_PATH = '/products';
export const PRODUCTS_CREATE_PATH = `${PRODUCTS_PATH}/create`;
export const SUBCRIPTION_PATH = '/subcriptions';

export const ON_UPDATE_PROFILE_SUCCESS = 'onUpdateProfileSuccess';

export const ALERT_DEFAULT_SETTING = true;
export const ALERT_DEFAULT_DAYS = 5;
export const REPORT_TABLE_HEIGHT = { y: 600 };
export const WORKING_DAY_PER_MONTH = 20;
export const WORKING_HOUR_PER_DAY = 8;
export const EXPIRED_TIME_TOKEN = '@CMF/expiredTimeOfToken';
export const USER_PROFILE_STORAGE_KEY = '@CMF/profile';
export const USER_PERMISSION_STORAGE_KEY = '@CMF/permission';
export const USER_PROFILE_VERSION_STORAGE_KEY = 1;
export const USER_PERMISSION_VERSION_STORAGE_KEY = 2;
export const SHORT_TIME_KEEP_LOGIN = [1, 'days'];
export const LONG_TIME_KEEP_LOGIN = [60, 'days'];
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_WITH_SLASH = 'YYYY/MM/DD';
export const DATE_WITHOUT_DAY_FORMAT = 'YYYY/MM';
export const DATE_WITHOUT_DAY_FORMAT_SECONDARY = 'YYYY-MM';
export const TIME_FORMAT = 'HH:mm';
export const FULL_TIME_FORMAT = 'HH:mm:ss';
export const CURRENCY = '¥';
export const PAGE_SIZE_OPTIONS = ['5', '10', '20', '50'];
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_10 = 10;

export const NO_DATA = 'Không có dư liệu';

// Error message
export const DENIED_PESSMISSION_ERROR_CODE = 40003;
export const MAINTAIN_ERROR_CODE = 70000;
// Others
export const PRICE_PATTERN = '^([-]?[1-9][0-9]*|0)$';

export const AVATAR_SIZE = {
  SMALL: 25,
  LARGE: 140,
};

export const REGEX_PHONE = /^[0-9]{10,11}$/;

export const ruleFormCommon = {
  email: [
    { whitespace: true },
    { type: 'email', message: 'Email không hợp lệ.' },
    { required: true, message: 'Vui lòng nhập email' },
  ],
  phone: [
    {
      message: 'Số điện thoại không đúng',
      pattern: new RegExp(REGEX_PHONE),
    },
  ],
};

export const MAX_ZIP_CODE_CHARACTER = 7;
export const ZIP_CODE_CHARACTER_FIRST = 3;
