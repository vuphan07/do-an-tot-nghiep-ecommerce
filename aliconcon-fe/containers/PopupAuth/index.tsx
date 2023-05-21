import { Modal } from 'antd';
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/router';
import useAuth from '../../app/hooks/useAuth';
import { HOME_PATH } from '../../constants';
import RegisterForm from '../../components/RegisterForm';
import useGlobalModal from '../../app/hooks/useGlobalModal';
import useLazyQueryProfile from '../../app/hooks/useLazyQueryProfile';
import { showSuccessMsg } from '../../utils/helper';

type Props = {};

const PopupAuth = (props: Props) => {
  const { fetchData, loading: fetchingInfo } = useLazyQueryProfile();
  const { isOpenPopupAuth, turnOffPopupAuth } = useGlobalModal();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleChangeStateAuth = () => setIsLogin(!isLogin);

  const { login, register, loading, error } = useAuth();

  const handleOnSubmit = (formValues) => {
    if (isLogin) {
      login({
        username: formValues.email,
        password: formValues.password,
      })
        .then((user) => {
          fetchData().then((data) => {
            showSuccessMsg('Đăng nhập thành công');
            turnOffPopupAuth();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      register({
        name: formValues.name,
        phone: formValues.phone,
        email: formValues.email,
        password: formValues.password,
      })
        .then((user) => {
          fetchData().then((data) => {
            showSuccessMsg('Đăng nhập thành công');
            turnOffPopupAuth();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Modal footer={null} visible={isOpenPopupAuth} onCancel={turnOffPopupAuth} width={500}>
      <div>
        {isLogin && (
          <LoginForm
            onChangeState={handleChangeStateAuth}
            onSubmit={handleOnSubmit}
            loading={loading || fetchingInfo}
            errorMsg={error}
            onCancel={turnOffPopupAuth}
          />
        )}
      </div>
      <div>
        {!isLogin && (
          <RegisterForm
            onChangeState={handleChangeStateAuth}
            onSubmit={handleOnSubmit}
            loading={loading || fetchingInfo}
            errorMsg={error}
            onCancel={turnOffPopupAuth}
          />
        )}
      </div>
    </Modal>
  );
};
export default PopupAuth;
