import { useMutation } from 'react-query';
import http from '../api/axiosCustom';

const useMutationUpload = () => {
  const mutationFn = async (body) => await http.post('/api/upload/single', body);

  const { isLoading: loading, mutateAsync } = useMutation({
    mutationFn: (body) => mutationFn(body),
  });

  const doMutation = (files) => {
    const formData = new FormData();
    formData.append('file', files);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await mutateAsync(formData as never);
        resolve(result as any);
      } catch (error) {
        reject((error));
      }
    });
  };

  return { doMutation, loading };
};

export default useMutationUpload;
