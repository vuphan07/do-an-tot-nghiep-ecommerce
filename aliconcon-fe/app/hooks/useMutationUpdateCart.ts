import { useMutation, useQueryClient } from 'react-query';
import http from '../api/axiosCustom';

const useMutationUpdateCart = () => {
  const mutationFn = async ({ id, count }) => await http.patch('/api/users/updatecart', { cartId: id, count });

  const {
    isLoading: loading,
    mutateAsync,
    error,
  } = useMutation({
    mutationFn: (body: { id; count }) => mutationFn(body),
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

export default useMutationUpdateCart;
