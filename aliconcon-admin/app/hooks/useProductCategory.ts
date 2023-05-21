import { useAppDispatch, useAppSelector } from '.';
import {
  categoryOptions as categoryOptionsSeletor,
  editingProductCategory as edittingCustomerSelector,
  editProductCategory as editCustomerAction,
  insertCategoryOptions as insertCategoryOptionsActicon,
} from '../redux/slices/productCategorySlice';

const useProductCategory = () => {
  const dispatch = useAppDispatch();
  const editProductCategory = (category) => dispatch(editCustomerAction(category));
  const edittingProductCategory = useAppSelector(edittingCustomerSelector);

  const insertCategoryOptions = (options) => dispatch(insertCategoryOptionsActicon(options));
  const categoryOptions = useAppSelector(categoryOptionsSeletor);

  return { editProductCategory, edittingProductCategory, insertCategoryOptions, categoryOptions };
};

export default useProductCategory;
