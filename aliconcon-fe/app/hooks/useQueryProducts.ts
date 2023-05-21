import { useQuery } from 'react-query';
import http from '../api/axiosCustom';
import useProfile from './useProfile';

export type QuerySubcriptions = {
  limit?: number;
  searchKey?: string;
  page?: number;
  status?: any;
};

const useQueryProducts = (defaultFilter: QuerySubcriptions = { limit: 20, page: 1 }) => {
  const { searchKey, status, ...filters } = defaultFilter;
  const { currentUser } = useProfile();
  const query = async () => {
    if (currentUser && !searchKey && !status) {
      return await http.get(`/api/products/recommend`, {
        params: filters,
      });
    }
    return await http.get(`/api/products?title[regex]=${searchKey}&status[eq]=${status}`, {
      params: filters,
    });
  };

  const {
    data: result,
    isLoading: loading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['useQueryProducts', defaultFilter],
    queryFn: () => query(),
  });

  return {
    refetch,
    isRefetching,
    data: result?.data?.items || [],
    loading,
    pagination: result?.data?.pagination || {},
    error,
  };
};

export default useQueryProducts;
