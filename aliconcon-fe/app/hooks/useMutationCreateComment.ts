import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationCreateComment = () => {
  const mutationFn = async (body) => await http.post('/api/products/comment', body);

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
        const result = await mutateAsync({ ...params } as never);
        resolve(result as any);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { doMutation, loading, error };
};

export default useMutationCreateComment;
