import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationUpdateProduct = () => {
  const mutationFn = async ({ id, product }) => await http.put(`/api/products/${id}`, product);

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: any) => mutationFn(body),
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

  return { doMutation, loading };
};

export default useMutationUpdateProduct;
