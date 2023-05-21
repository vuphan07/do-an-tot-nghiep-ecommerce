import { message } from "antd";

export const formatMonney = (number) => {
  if (!number || Number.isNaN(parseInt(number)))
    return (0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const getRateAVG = (product) => {
  const sum = product?.comments.reduce((partialSum, comment) => partialSum + comment?.rate, 0);
  const avg = sum / product?.comments.length;
  return isNaN(avg) ? 0 : avg;
};


export const showSuccessMsg = (msg) => message.success(msg);
export const showErrorMsg = (msg) => message.error(msg);
