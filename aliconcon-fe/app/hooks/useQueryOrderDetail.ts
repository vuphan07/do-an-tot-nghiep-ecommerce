import { useQuery } from 'react-query';
import http from '../api/axiosCustom';

const useQueryOrderDetail = (id) => {
  const query = async (id) => await http.get(`/api/orders/${id}`);

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ['useQueryOrderDetail', id],
    queryFn: () => query(id),
    enabled: !!id,
  });

  return {
    refetch,
    data: result?.data,
    loading,
    error,
  };
};

export default useQueryOrderDetail;
