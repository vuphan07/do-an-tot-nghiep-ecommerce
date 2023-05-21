import { useMutation, useQueryClient } from 'react-query';
import http from '../api/axiosCustom';

const useMutationDeleteProductCategory = () => {
  const mutationFn = async (id) => await http.delete(`/api/categories/${id}`);
  const queryClient = useQueryClient();

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (id) => mutationFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries('useQueryProductsCategory');
    },
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

export default useMutationDeleteProductCategory;
