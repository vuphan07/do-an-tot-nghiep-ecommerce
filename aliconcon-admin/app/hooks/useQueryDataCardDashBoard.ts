import { useQuery } from 'react-query';
import http from '../api/axiosCustom';

const useQueryDataCardDashBoard = () => {
  const query = async () => await http.get(`/api/admin/dashboard`);

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ['useQueryDataCardDashBoard'],
    queryFn: () => query(),
  });

  return {
    refetch,
    data: result ?? {},
    loading,
    error,
  };
};

export default useQueryDataCardDashBoard;
