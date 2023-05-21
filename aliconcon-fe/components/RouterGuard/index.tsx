import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Splash from '../Splash';
import useProfile from '../../app/hooks/useProfile';
import useLazyQueryProfie from '../../app/hooks/useLazyQueryProfile';

const PRIVATE_ROUTE = ['/my-info', '/cart', '/my-info'];

export default function RouterGuard({ children }) {
  const { fetchData: fetchUserProfile, loading: isFetchingProfile } = useLazyQueryProfie();
  const { removeCurrentUser, currentUser } = useProfile();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

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

  if (isValidating || isFetchingProfile) {
    return <Splash />;
  } else {
    if (!currentUser && PRIVATE_ROUTE.includes(router.pathname)) {
      router.push('/');
      return <Splash />;
    } else {
      return children;
    }
  }
}
