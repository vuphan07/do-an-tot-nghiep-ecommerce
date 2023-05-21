import { useMutation, useQueryClient } from 'react-query';
import http from '../api/axiosCustom';

const useMutationDeleteCart = () => {
  const mutationFn = async (id) => await http.patch('/api/users/deletecart', { cartId: id });

  const {
    isLoading: loading,
    mutateAsync,
    error,
  } = useMutation({
    mutationFn: (body) => mutationFn(body),
  });

  const doMutation = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync(params);
        resolve(result as any);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { doMutation, loading, error };
};

export default useMutationDeleteCart;
