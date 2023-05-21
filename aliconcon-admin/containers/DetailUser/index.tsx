import React, { useEffect } from 'react';
import useLazyQueryProfile from '../../app/hooks/useLazyQueryProfile';
import useMutationCreateUser from '../../app/hooks/useMutationCreateUser';
import useMutationUpdateUser from '../../app/hooks/useMutationUpdateUser';
import UserFormInfomation from '../../components/UserFormInfomation';
import useMutationUpload from '../../app/hooks/useMutationUpload';
import { showErrorMsg, showSuccessMsg } from '../../utils/helper';

function DetailUser({ defautValues = null, loading = false, ...props }) {
  const { doMutation: update, loading: updating } = useMutationUpdateUser();
  const { doMutation: create, loading: creating } = useMutationCreateUser();
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
    if (value._id) {
      update(value)
        .then(() => {
          showSuccessMsg('Cập nhật thành công');
          fetchData();
        })
        .catch(() => showErrorMsg('Cập nhật thất bại'));
    } else {
      create(value)
        .then(() => showSuccessMsg('Đăng kí thành công'))
        .catch(() => showErrorMsg('Đăng kí thất bại'));
    }
  };
  return (
    <UserFormInfomation
      data={defautValues}
      loading={loading || updating || creating || uploading}
      onFinish={onFinish}
      {...props}
    />
  );
}

export default DetailUser;
