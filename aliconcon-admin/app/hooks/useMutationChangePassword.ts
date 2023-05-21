import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationChangePassword = () => {
  const mutationFn = async (body: { newPass: string; oldPass: string }) =>
    await http.post('/api/users/change_pass', body);

  const {
    isLoading: loading,
    mutateAsync,
    error,
  } = useMutation({
    mutationFn: (body: { newPass: string; oldPass: string }) => mutationFn(body),
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

export default useMutationChangePassword;
