import { useMutation, useQueryClient } from 'react-query';
import http from '../api/axiosCustom';

const useMutationCreateProductCategory = () => {
  const mutationFn = async (body) => await http.post('/api/categories', body);
  const queryClient = useQueryClient();

  const {
    isLoading: loading,
    mutateAsync,
    error,
  } = useMutation({
    mutationFn: (body) => mutationFn(body),
    onSuccess: () => {
      queryClient.invalidateQueries('useQueryProductsCategory');
    },
  });

  const doMutation = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync({ ...params } as never);
        resolve(result as any);
      } catch (error) {
        reject((error));
      }
    });
  };

  return { doMutation, loading, error };
};

export default useMutationCreateProductCategory;
