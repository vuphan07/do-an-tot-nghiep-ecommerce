import { Button, Form, Input, InputNumber, Radio, Rate, Space, Tag } from 'antd';
import React from 'react';
import style from './style.module.less';
import { formatMonney, getRateAVG } from '../../utils/helper';
import FormWrapper from '../FormWrapper';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { Product } from '../../app/type';
import Options from './Options';
type Props = {
  product: Product;
  onAddToCart: (data) => void;
};

const DesProduct = ({ product, onAddToCart }: Props) => {
  return (
    <div className={style.container}>
      <h1 className="block">{product?.title}</h1>
      <div className="flex items-center mb-4 bg-white p-3">
        <div className="flex items-center">
          <span className="underline mt-1 mr-1 font-bold">{getRateAVG(product)}</span>
          <Rate className="ml-1" style={{ fontSize: 14 }} allowHalf value={getRateAVG(product)} disabled />
        </div>
        <div style={{ width: 1, height: 18, backgroundColor: '#D9D9D9', marginLeft: 2, marginRight: 2 }}>&nbsp;</div>
        <div className="ml-1">
          <span className="underline mt-1 mr-1 font-bold">{product?.comments?.length}</span>
          <span>Đánh giá</span>
        </div>
        <div style={{ width: 1, height: 18, backgroundColor: '#D9D9D9', marginLeft: 2, marginRight: 2 }}>&nbsp;</div>
        <div className="ml-1">
          <span className="underline mt-1 mr-1 font-bold">{product?.sold}</span>
          <span>Đã bán</span>
        </div>
      </div>

      <span>{product?.description}</span>
      <div className="text-base flex items-center mt-4">
        <span>Giá: </span>
        <span className="line-through ml-4">{formatMonney(product?.sale_price)}</span>
        <span className="ml-4 font-bold ">{formatMonney(product?.sale_price - product?.discount_price)}</span>
      </div>
      <Form onFinish={onAddToCart}>
        <div className="mt-4 flex">
          <span className="mr-4">Số lượng:</span>
          <Form.Item name="count">
            <InputNumber min={1} defaultValue={1} />
          </Form.Item>
          <span className="ml-4"> Còn lại: {product.quantity}</span>
        </div>
        {product?.options?.map((option, index) => (
          <Form.Item
            label={option.key}
            key={index}
            name={option.key}
            rules={[{ required: true, message: `Vui lòng chọn ${option.key}` }]}
          >
            <Radio.Group>
              {option.value?.split(',')?.map((item, index) => (
                <Radio key={index} value={item}>
                  {item}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ))}
        <div className="mt-4">
          <Form.Item>
            <Button htmlType="submit">Thêm vào giỏ hàng</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default DesProduct;
