import { useState } from 'react';
import http from '../api/axiosCustom';

const useLazyQueryGetMemberDetail = () => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const result = await http.get(`/api/users/${id}`);
      setData((result as any) || {});
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, fetchData, error };
};

export default useLazyQueryGetMemberDetail;
