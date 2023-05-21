import { useQuery } from 'react-query';
import http from '../api/axiosCustom';
import useProductCategory from './useProductCategory';

const useQueryProductsCategory = () => {
  const { insertCategoryOptions } = useProductCategory();
  const query = async () => await http.get('/api/categories');
  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ['useQueryProductsCategory'],
    queryFn: () => query(),
    onSuccess: ({ data }) => {
      insertCategoryOptions(data);
    },
  });

  return {
    refetch,
    data: result?.data,
    loading,
    error,
  };
};

export default useQueryProductsCategory;
