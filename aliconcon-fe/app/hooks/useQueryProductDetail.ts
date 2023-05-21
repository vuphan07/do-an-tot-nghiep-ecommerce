import { useQuery } from 'react-query';
import http from '../api/axiosCustom';

const useQueryProductDetail = (id) => {
  const query = async (id) => await http.get(`/api/products/${id}`);

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ['useQueryProductDetail', id],
    queryFn: () => query(id),
    enabled: !!id,
  });

  return {
    refetch,
    data: result?.data || null,
    loading,
    error,
  };
};

export default useQueryProductDetail;
