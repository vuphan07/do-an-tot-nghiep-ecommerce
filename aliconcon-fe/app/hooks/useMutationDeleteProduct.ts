import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationDeleteProduct = () => {
  const mutationFn = async (id) => await http.delete(`/api/products/${id}`);

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (id) => mutationFn(id),
  });

  const doMutation = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync(id as never);
        resolve(result as any);
      } catch (error) {
        reject((error));
      }
    });
  };

  return { doMutation, loading };
};

export default useMutationDeleteProduct;
