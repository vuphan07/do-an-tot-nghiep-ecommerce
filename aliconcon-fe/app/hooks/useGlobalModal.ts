import { useAppDispatch, useAppSelector } from '.';
import {
  isOpenPopupAuth as isOpenPopupAuthSelector,
  togglePopupAuth as togglePopupAuthAction,
} from '../redux/slices/uiSlice';

const useGlobalModal = () => {
  const dispatch = useAppDispatch();

  const isOpenPopupAuth = useAppSelector(isOpenPopupAuthSelector);
  const turnOffPopupAuth = () => {
    dispatch(togglePopupAuthAction(false));
  };

  const turnOnPopupAuth = () => {
    dispatch(togglePopupAuthAction(true));
  };

  return {
    isOpenPopupAuth,
    turnOffPopupAuth,
    turnOnPopupAuth,
  };
};

export default useGlobalModal;
