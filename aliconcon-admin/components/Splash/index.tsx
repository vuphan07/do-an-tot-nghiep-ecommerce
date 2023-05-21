import { Spin } from 'antd';

export default function Splash() {
  return (
    <div className="vw-100 vh-100 flex justify-center items-center">
      <Spin tip="Loading" />
    </div>
  );
}
