import { useState } from 'react';
import { USER_PROFILE_STORAGE_KEY } from '../../constants';
import http from '../api/axiosCustom';
import useProfile from './useProfile';

const useLazyQueryProfile = () => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useProfile();
  const localStorageKey = USER_PROFILE_STORAGE_KEY;

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await http.get('/api/users/infor');
      const profile = (result as any)?.data || {};
      localStorage.setItem(localStorageKey, JSON.stringify({ ...profile }));
      setCurrentUser(profile);
      setData(profile);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return { data, loading, fetchData, error };
};

export default useLazyQueryProfile;
