import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import FormCreateProduct from '../../components/FormCreateProduct';
import useMutationCreateProduct from '../../app/hooks/useMutationCreateProduct';
import { useRouter } from 'next/router';
import { MAX_ZIP_CODE_CHARACTER, PRODUCTS_PATH, ZIP_CODE_CHARACTER_FIRST } from '../../constants';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import useMutationUpload from '../../app/hooks/useMutationUpload';
import useMutationUpdateProduct from '../../app/hooks/useMutationUpdateProduct';
import { showSuccessMsg } from '../../utils/helper';
function CreateProductForm({ defaultValues, loading: defaultLoading = false }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { doMutation, error, loading } = useMutationCreateProduct();
  const { doMutation: update, loading: updating } = useMutationUpdateProduct();
  const { doMutation: upload, loading: uploading } = useMutationUpload();
  const handleSubmit = (values) => {
    const { files, _id, ...dataCreate } = values;
    const fileUploaded = files.filter((file) => file.uploaded)?.map((file) => file.url);
    const fileWithoutUploaded = files.filter((file) => !file.uploaded);
    setIsLoading(true);
    Promise.all(fileWithoutUploaded.map((file) => upload(file.originFileObj)))
      .then((response) => {
        const images = response.map((image) => image.data);
        const originalDataCreate = {
          ...dataCreate,
          sold: dataCreate.sold ?? 0,
          images: [...fileUploaded, ...images],
        };
        if (!_id) {
          doMutation({ ...originalDataCreate })
            .then(() => {
              setIsLoading(false);
              showSuccessMsg('Tạo thành công');
              router.push(PRODUCTS_PATH);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        } else {
          update({ id: _id, product: { ...dataCreate, images: [...fileUploaded, ...images] } })
            .then(() => {
              setIsLoading(false);
              showSuccessMsg('Chỉnh sửa thành công thành công');
              router.push(PRODUCTS_PATH);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <FormCreateProduct
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      loading={loading || uploading || isLoading || defaultLoading || updating}
    />
  );
}

export default CreateProductForm;
