import { Card, Rate, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatMonney } from '../../utils/helper';
import style from './style.module.less';
import Image from 'next/image';
import useProfile from '../../app/hooks/useProfile';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import useMutationLikeAndDislikeProduct from '../../app/hooks/useMutationLikeAndDislikeProduct';
import useGlobalModal from '../../app/hooks/useGlobalModal';
const { Meta } = Card;

const CardProduct = ({
  title,
  images,
  discount_price,
  sale_price,
  sold,
  onClick,
  rate,
  rateNumber,
  isRelate = false,
  likes = [],
  product_id,
}) => {
  const [isLike, setIsLike] = useState(false);
  const { turnOnPopupAuth } = useGlobalModal();
  const { currentUser } = useProfile();
  const { doMutation: like, loading: liking } = useMutationLikeAndDislikeProduct('like');
  const { doMutation: unlike, loading: unliking } = useMutationLikeAndDislikeProduct('unlike');
  const handleLike = async (e) => {
    if (!currentUser) {
      turnOnPopupAuth();
      return;
    }
    e.stopPropagation();
    if (isLike) {
      await unlike({ product_id });
      setIsLike(false);
    } else {
      await like({ product_id });
      setIsLike(true);
    }
  };
  useEffect(() => {
    setIsLike(!!likes?.includes(currentUser?._id));
  }, [currentUser?._id, likes]);
  return (
    <Card
      onClick={onClick}
      className={style.cardItemProduct}
      style={{ backgroundColor: '#f3fbf7', minHeight: isRelate ? 394 : 434 }}
      hoverable
      cover={<Image src={images[1]} alt="" width={304} height={310} />}
    >
      <div className="p-4 bg-white">
        <Meta
          style={{ backgroundColor: '#fff', minHeight: 132 }}
          title={<span className={style.titleCart}>{title}</span>}
          description={
            <div>
              <Space>
                <Rate style={{ fontSize: 14 }} allowHalf value={rate} disabled />
                <span className="font-bold ">{rateNumber} Đánh giá</span>
                <span className="font-bold " onClick={handleLike}>
                  {isLike ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                </span>
              </Space>
              <div className="font-bold text-base flex justify-between items-center mt-2 text-sm flex-wrap">
                <span className="line-through">{formatMonney(sale_price)}</span>
                <span>{formatMonney(sale_price - discount_price)}</span>
                {!!sold && <span className="text-xs ">{sold} đã bán.</span>}
              </div>
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default CardProduct;
