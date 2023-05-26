import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationUpdateOrder = () => {
  const mutationFn = async ({ id, order }) => await http.put(`/api/orders/${id}`, order);

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body: any) => mutationFn(body),
  });

  const doMutation = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync({ ...params } as never);
        resolve(result as any);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { doMutation, loading };
};

export default useMutationUpdateOrder;
