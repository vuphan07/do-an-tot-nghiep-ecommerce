import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationCreateUser = () => {
  const mutationFn = async (body) => await http.post('/api/users/register', body);

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body) => mutationFn(body),
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

export default useMutationCreateUser;
