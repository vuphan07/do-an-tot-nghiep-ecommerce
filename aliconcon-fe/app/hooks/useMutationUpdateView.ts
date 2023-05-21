import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationUpdateView = () => {
  const mutationFn = async (body) => await http.post(`/api/products/view`, body);

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body) => mutationFn(body),
    onSuccess: (xxx) => {
      console.log(xxx);
    },
  });

  const doMutation = (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync(body as never);
        resolve(result as any);
      } catch (error) {
        reject(error);
      }
    });
  };
  return { doMutation, loading };
};

export default useMutationUpdateView;
