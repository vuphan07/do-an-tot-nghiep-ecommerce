import { useAppDispatch, useAppSelector } from '.';
import AddOptionModalTypeEnum from '../../interfaces/enums/AddOptionModalTypeEnum';
import {
  addOptionModalIsVisible as addOptionModalIsVisibleSelector,
  addOptionModalType as addOptionModalTypeSelector,
  changeTypeAddOptionModal as changeTypeAddOptionModalAction,
  toggleAddOptionModal as toggleAddOptionModalAction,
} from '../redux/slices/uiSlice';

const useGlobalModal = () => {
  const dispatch = useAppDispatch();

  const addOptionModalType = useAppSelector(addOptionModalTypeSelector);
  const addOptionModalIsVisible = useAppSelector(addOptionModalIsVisibleSelector);
  const turnOffAddOptionModal = () => {
    dispatch(toggleAddOptionModalAction(false));
  };
  const turnOnAddOptionModal = (type: AddOptionModalTypeEnum | undefined = AddOptionModalTypeEnum.PRODUCT_CATEGORY) => {
    dispatch(toggleAddOptionModalAction(true));
    dispatch(changeTypeAddOptionModalAction(type));
  };

  return {
    addOptionModalIsVisible,
    addOptionModalType,
    turnOnAddOptionModal,
    turnOffAddOptionModal,
  };
};

export default useGlobalModal;
