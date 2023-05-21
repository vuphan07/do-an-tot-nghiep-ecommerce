import { useMutation, useQueryClient } from 'react-query';
import http from '../api/axiosCustom';

const useMutationAddToCart = () => {
  const mutationFn = async (body) => await http.patch('/api/users/addcart', { cart: body });
  const queryClient = useQueryClient();

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

export default useMutationAddToCart;
