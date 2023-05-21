import React, { useEffect } from 'react';
import useLazyQueryProfile from '../../app/hooks/useLazyQueryProfile';
import useMutationUpdateUser from '../../app/hooks/useMutationUpdateUser';
import UserFormInfomation from '../../components/UserFormInfomation';
import useMutationUpload from '../../app/hooks/useMutationUpload';
import { showErrorMsg, showSuccessMsg } from '../../utils/helper';

function DetailUser({ defautValues = null, loading = false, ...props }) {
  const { doMutation: update, loading: updating } = useMutationUpdateUser();
  const { doMutation: upload, loading: uploading } = useMutationUpload();

  const { fetchData } = useLazyQueryProfile();
  const onFinish = async (values) => {
    let avtUrl = '';
    const { avtFile, ...value } = values;
    if (avtFile) {
      const response: any = await upload(avtFile);
      console.log(response);
      avtUrl = response.data;
    }
    if (avtUrl) {
      value.avatar = avtUrl;
    }
    update(value)
      .then(() => {
        showSuccessMsg('Cập nhật thành công');
        fetchData();
      })
      .catch(() => showErrorMsg('Cập nhật thất bại'));
  };
  return (
    <UserFormInfomation data={defautValues} loading={loading || updating || uploading} onFinish={onFinish} {...props} />
  );
}

export default DetailUser;
