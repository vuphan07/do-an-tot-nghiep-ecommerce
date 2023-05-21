import AuthLayout from '../components/AuthLayout';
import LoginForm from '../containers/LoginForm';

export default function Login() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}
