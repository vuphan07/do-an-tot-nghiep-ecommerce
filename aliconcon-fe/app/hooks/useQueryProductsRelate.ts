import { useQuery } from 'react-query';
import http from '../api/axiosCustom';

const useQueryProductsRelate = (id) => {
  const query = async (id) => await http.get(`/api/products/relate/${id}`);

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ['useQueryProductsRelate', id],
    queryFn: () => query(id),
    enabled: !!id,
  });

  return {
    refetch,
    data: result?.data || [],
    loading,
    error,
  };
};

export default useQueryProductsRelate;
