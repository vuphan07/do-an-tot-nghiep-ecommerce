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
    if (isRefresh) window.location.reload();
  }
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isChangingCurrentPw, setIsChangingCurrentPw] = useState(false);
  const { doMutation } = useMutationChangePassword();
  const [error, setError] = useState(null);
  const [errorChangeCurrentPw, setErrorChangeCurrentPw] = useState(null);

  const login = async ({ username, password }: { username: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      const response = await http.post('/api/users/login', { email: username, password: password });
      const { accesstoken, refreshtoken }: any = response;
      localStorage.setItem('_token', accesstoken);
      localStorage.setItem('_refresh_token', refreshtoken);
    } catch ({ response }) {
      setError(response?.data?.msg ?? 'Error');
      setLoading(false);
      throw error;
    }
    setLoading(false);
  };

  const register = async ({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    setError(null);
    setLoading(true);
    try {
      const response = await http.post('/api/users/register', { name, email, phone, password: password });
      const { accesstoken, refreshtoken }: any = response;
      localStorage.setItem('_token', accesstoken);
      localStorage.setItem('_refresh_token', refreshtoken);
    } catch ({ response }) {
      setError(response?.data?.msg ?? 'Error');
      setLoading(false);
      throw error;
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
    register,
    removeExpiredTime,
    isChangingCurrentPw,
    errorChangeCurrentPw,
    changeCurrentPassword,
  };
};

export default useAuth;
