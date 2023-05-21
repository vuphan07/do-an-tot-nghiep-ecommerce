import ImgCrop from 'antd-img-crop';
import { Upload, Button, UploadProps, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import 'antd/lib/slider/style';
import { RcFile } from 'antd/lib/upload';

export default function SettingAvatarButton({ ...props }) {
  const beforeCrop = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('File sai định dạng');
    }
    const isLt5M = file.size / 1024 / 1024 < 10;
    if (!isLt5M) {
      message.error('File không được vượt quá 10mb');
    }
    return isLt5M && isJpgOrPng;
  };

  return (
    <ImgCrop
      beforeCrop={beforeCrop}
      shape={props?.shape ?? 'round'}
      quality={1}
      rotate
      modalTitle="Chỉnh ảnh"
      modalCancel="Hủy"
    >
      <Upload {...props} showUploadList={false} accept="image/jpg, image/png, image/jpeg">
        <Button className={styles.btnUpload} icon={<EditOutlined />}></Button>
      </Upload>
    </ImgCrop>
  );
}
