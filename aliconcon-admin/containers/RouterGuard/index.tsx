import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Splash from '../../components/Splash';
import { LOGIN_PATH, FORGOT_PW_PATH, RESET_PW_PATH } from '../../constants';
import useProfile from '../../app/hooks/useProfile';
import useLazyQueryProfie from '../../app/hooks/useLazyQueryProfile';
import LoginForm from '../LoginForm';
import AuthLayout from '../../components/AuthLayout';

export default function RouterGuard({ children }: PropsWithChildren<{}>) {
  const { fetchData: fetchUserProfile, loading: isFetchingProfile } = useLazyQueryProfie();
  const { removeCurrentUser, currentUser } = useProfile();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const PUBLIC_PATHS = [LOGIN_PATH, FORGOT_PW_PATH, RESET_PW_PATH];

  useEffect(() => {
    const token = window.localStorage.getItem('_token');
    if (token) {
      setIsValidating(true);
      fetchUserProfile().then(() => {
        setIsValidating(false);
      });
    } else {
      setIsValidating(false);
      removeCurrentUser();
    }
  }, [router.pathname]);

  return (
    <>
      {isValidating ? (
        <Splash />
      ) : !currentUser && !PUBLIC_PATHS.includes(router.pathname) ? (
        <AuthLayout title="Login">
          <LoginForm />
        </AuthLayout>
      ) : (
        children
      )}
    </>
  );
}
