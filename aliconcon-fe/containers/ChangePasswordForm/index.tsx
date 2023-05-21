import { useRouter } from 'next/router';

import useAuth from '../../app/hooks/useAuth';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import { showSuccessMsg } from '../../utils/helper';

export default function ChangePasswordFormContainer() {
  const router = useRouter();
  const { changeCurrentPassword, isChangingCurrentPw, errorChangeCurrentPw } = useAuth();
  const onSubmit = async (formData: any) => {
    changeCurrentPassword(formData.currentPassword, formData.newPassword).then(() => {
      showSuccessMsg('Đổi mật khẩu thành công');
      router.push('/');
    })
  };

  return <ChangePasswordForm loading={isChangingCurrentPw} errorMsg={errorChangeCurrentPw} onSubmit={onSubmit} />;
}
