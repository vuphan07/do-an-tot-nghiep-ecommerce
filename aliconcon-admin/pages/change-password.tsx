import React from 'react';
import CardWrapper from '../components/CardWrapper';
import MainLayout from '../components/MainLayout';
import ChangePasswordFormContainer from '../containers/ChangePasswordForm';

type Props = {};

const ChangePassword = (props: Props) => {
  return (
    <MainLayout title="Đổi mật khẩu">
      <ChangePasswordFormContainer />
    </MainLayout>
  );
};

export default ChangePassword;
