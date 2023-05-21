import { Modal } from 'antd';

import style from './styles.module.less';
import AddCommonOptionForm from '../../containers/AddCommonoptionForm';
import useGlobalModal from '../../app/hooks/useGlobalModal';

export default function PopupAddOption() {
  const { addOptionModalIsVisible, turnOffAddOptionModal } = useGlobalModal();
  const onCancel = () => {
    turnOffAddOptionModal();
  };

  return (
    <Modal
      onCancel={onCancel}
      centered
      closable={false}
      visible={addOptionModalIsVisible}
      footer={null}
      title={null}
      destroyOnClose
      width="674px"
      className={style.popupAddCustomer}
    >
      <AddCommonOptionForm />
    </Modal>
  );
}
