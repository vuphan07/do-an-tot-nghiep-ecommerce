import SettingAvatarButton from '../SettingAvatarButton';

export default function SettingAvatarContainer({ onChange, ...props }) {
  const onChangeHandler = (info) => {
    info.file.originFileObj && onChange(info.file.originFileObj);
  };
  return <SettingAvatarButton onChange={onChangeHandler} {...props} />;
}
