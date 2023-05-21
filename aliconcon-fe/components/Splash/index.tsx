import { Spin } from 'antd';

export default function Splash() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Spin tip="Loading" />
    </div>
  );
}
