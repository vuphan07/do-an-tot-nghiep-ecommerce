import { MinusCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

export default function StatusCheckbox({ isActive }) {
  return isActive ? (
    <CheckCircleOutlined style={{ fontSize: '21px', color: '#3864ca' }} />
  ) : (
    <MinusCircleFilled style={{ fontSize: '21px', color: '#3864ca' }} />
  );
}
