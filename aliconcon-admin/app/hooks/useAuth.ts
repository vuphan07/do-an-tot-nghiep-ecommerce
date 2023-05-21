import moment from 'moment';
import { useState } from 'react';
import { EXPIRED_TIME_TOKEN, LOGIN_PATH, USER_PROFILE_STORAGE_KEY } from '../../constants';
import http from '../api/axiosCustom';
import useMutationChangePassword from './useMutationChangePassword';

const removeProfie = () => {
  localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
};

const removeExpiredTime = () => {
  localStorage.removeItem(EXPIRED_TIME_TOKEN);
};

const removeToken = () => {
  localStorage.removeItem('_token');
  localStorage.removeItem('_refresh_token');
};

export const logout = async (isRefresh = true) => {
  try {
    await http.get('/api/logout');
  } catch (error) {
    console.error('error signing out: ', error);
  } finally {
    removeExpiredTime();
    removeProfie();
    removeToken();
    if (isRefresh) window.location.replace(LOGIN_PATH);
  }
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isChangingCurrentPw, setIsChangingCurrentPw] = useState(false);
  const { doMutation } = useMutationChangePassword();
  const [error, setError] = useState(null);
  const [errorChangeCurrentPw, setErrorChangeCurrentPw] = useState(null);

  const login = async ({
    username,
    password,
    remember = false,
  }: {
    username: string;
    password: string;
    remember: boolean | undefined;
  }) => {
    setError(null);
    setLoading(true);
    try {
      const response = await http.post('/api/users/login', { email: username, password: password });
      const { accesstoken, refreshtoken }: any = response;
      localStorage.setItem('_token', accesstoken);
      localStorage.setItem('_refresh_token', refreshtoken);
      window.location.href = '/';
    } catch (error) {
      setError('Error');
      return error;
    }
    setLoading(false);
  };

  const changeCurrentPassword = (oldPw, newPw) => {
    setIsChangingCurrentPw(true);
    setErrorChangeCurrentPw(null);
    return new Promise(async (resolve) => {
      try {
        await doMutation({ newPass: newPw, oldPass: oldPw });
      } catch (err) {
        if (err.code === 'NotAuthorizedException') {
          setErrorChangeCurrentPw('Error');
          setIsChangingCurrentPw(false);
          return;
        }
        setErrorChangeCurrentPw('Error');
      }
      setIsChangingCurrentPw(false);
    });
  };

  return {
    loading,
    login,
    error,
    logout,
    removeExpiredTime,
    isChangingCurrentPw,
    errorChangeCurrentPw,
    changeCurrentPassword,
  };
};

export default useAuth;
