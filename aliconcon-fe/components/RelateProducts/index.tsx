import React from 'react';
import CardProduct from '../CardProduct';
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';
import { Product } from '../../app/type';
import { getRateAVG } from '../../utils/helper';

type Props = {
  products: Array<Product>;
};

const RelateProducts = ({ products = [] }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <h1>Sản phẩm liên quan</h1>
      <Row gutter={[8, 8]} className="h-screen overflow-scroll">
        {products?.map((item, index) => (
          <Col key={index} span={24}>
            <CardProduct
              product_id={item._id}
              likes={item.likes}
              isRelate={true}
              title={item?.title}
              sale_price={item?.sale_price}
              discount_price={item?.discount_price}
              images={item?.images}
              sold={item?.sold}
              rate={getRateAVG(item)}
              rateNumber={item?.comments?.length}
              onClick={() => router.push(`/product/${item?._id}`)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default RelateProducts;
