import { message } from 'antd';
import moment from 'moment';

export function formatDate(date: Date = new Date(), format = 'DD/MM/YYYY') {
  return date ? moment(date).format(format) : '';
}

export const formatMonney = (number) => {
  if (!number || Number.isNaN(parseInt(number)))
    return (0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const showSuccessMsg = (msg) => message.success(msg);
export const showErrorMsg = (msg) => message.error(msg);



export const getNameFromLink = (link: string): string => {
  if (!link || typeof link !== 'string') return '';
  const splitPath = decodeURIComponent(link)?.split('/')?.[link?.split('/')?.length - 1];
  const nameFiles = splitPath?.split('-');
  nameFiles?.shift();
  const nameFile = nameFiles?.join('_');
  return nameFile;
};

export const createFileUload = (path: string) => {
  return {
    uid: Math.random().toString,
    name: getNameFromLink(path),
    url: path,
    status: 'success',
    percent: 100,
    thumbUrl: path,
    preview: path,
    uploaded: true,
  };
};