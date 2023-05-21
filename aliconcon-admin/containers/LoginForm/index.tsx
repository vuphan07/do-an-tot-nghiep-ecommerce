import { useRouter } from 'next/router';
import useAuth from '../../app/hooks/useAuth';
import LoginForm, { FormValueType } from '../../components/LoginForm';
import { HOME_PATH } from '../../constants';

export default function LoginFormContainer() {
  const router = useRouter();

  const { login, loading, error } = useAuth();

  const handleOnSubmit = (formValues: FormValueType) => {
    login({ username: formValues.username, password: formValues.password, remember: formValues.remember })
      .then((user: any) => {
        window.location.replace(HOME_PATH);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return <LoginForm onSubmit={handleOnSubmit} loading={loading} errorMsg={error} />;
}
