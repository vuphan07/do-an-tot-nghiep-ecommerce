import useGlobalModal from '../../app/hooks/useGlobalModal';
import useMutationCreateProductCategory from '../../app/hooks/useMutationCreateProductCategory';
import useMutationDeleteProductCategory from '../../app/hooks/useMutationDeleteProductCategory';
import useProductCategory from '../../app/hooks/useProductCategory';
import AddCommonOptionForm from '../../components/AddCommonOptionForm';
import AddOptionModalTypeEnum from '../../interfaces/enums/AddOptionModalTypeEnum';
import _ from 'lodash';
import { showErrorMsg, showSuccessMsg } from '../../utils/helper';
import { showConfirm } from '../../utils/helperMessage';
export default function AddCommonOptionFormContainer() {
  const { turnOffAddOptionModal, addOptionModalType } = useGlobalModal();

  const addMutation = {
    [AddOptionModalTypeEnum.PRODUCT_CATEGORY]: useMutationCreateProductCategory,
  };

  const deleteMutation = {
    [AddOptionModalTypeEnum.PRODUCT_CATEGORY]: useMutationDeleteProductCategory,
  };

  const { categoryOptions } = useProductCategory();

  const options = {
    [AddOptionModalTypeEnum.PRODUCT_CATEGORY]: categoryOptions,
  };

  const label = {
    [AddOptionModalTypeEnum.PRODUCT_CATEGORY]: 'Thể loại',
  };

  const msgConfirmDelete = {
    [AddOptionModalTypeEnum.PRODUCT_CATEGORY]: 'Bạn có chắc muốn xóa thể loại này?',
  };

  const { doMutation: add, loading: adding } = addMutation[addOptionModalType]();
  const { doMutation: deleteCategory, loading: deleting } = deleteMutation[addOptionModalType]();

  const onFinish = (values, onSuccess) => {
    let body = values;
    add(body)
      .then(() => {
        showSuccessMsg(`Tạo mới thành công`);
        onSuccess();
      })
      .catch(() => {
        showErrorMsg(`Tạo mới thất bại`);
      });
  };

  const onDelete = (id) => {
    let body: any = id; 
    showConfirm(msgConfirmDelete[addOptionModalType], () => {
      deleteCategory(body)
        .then(() => {
          showSuccessMsg(`Xóa thành công`);
        })
        .catch((err) => {
          showErrorMsg('Xóa thất bại');
        });
    });
  };

  return (
    <AddCommonOptionForm
      label={label[addOptionModalType]}
      onDelete={onDelete}
      onCancel={turnOffAddOptionModal}
      onAdd={onFinish}
      loading={adding || deleting}
      options={options[addOptionModalType]}
    />
  );
}
