import { useQuery } from 'react-query';
import http from '../api/axiosCustom';

const useQueryCheckIsOrderedProduct = (productId) => {
  const query = async (productId) => await http.get(`/api/orders/checkIsOrdered/${productId}`);

  const {
    data: result,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ['useQueryCheckIsOrderedProduct', productId],
    queryFn: () => query(productId),
  });

  return {
    refetch,
    data: result?.data,
    loading,
    error,
  };
};

export default useQueryCheckIsOrderedProduct;
