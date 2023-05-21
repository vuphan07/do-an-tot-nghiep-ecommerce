import { Col, Rate, Row, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useQueryProductDetail from '../../app/hooks/useQueryProductDetail';
import SwiperSlider from '../../components/SwiperSlider';
import DesProduct from '../../components/DesProduct';
import RelateProducts from '../../components/RelateProducts';
import CommentProduct from '../../components/CommentProduct';
import CommentContainer from '../Comment';
import useGlobalModal from '../../app/hooks/useGlobalModal';
import useProfile from '../../app/hooks/useProfile';
import Splash from '../../components/Splash';
import useMutationAddToCart from '../../app/hooks/useMutationAddToCart';
import useLazyQueryProfile from '../../app/hooks/useLazyQueryProfile';
import useQueryProductsRelate from '../../app/hooks/useQueryProductsRelate';
import useQueryCheckIsOrderedProduct from '../../app/hooks/useQueryCheckIsOrderedProduct';
import { showErrorMsg, showSuccessMsg } from '../../utils/helper';
import { v4 as uuidv4 } from 'uuid';
import useMutationCreateComment from '../../app/hooks/useMutationCreateComment';
import useMutationLikeAndDislikeProduct from '../../app/hooks/useMutationLikeAndDislikeProduct';
import useMutationUpdateView from '../../app/hooks/useMutationUpdateView';
type Props = {};

const ProductDetail = (props: Props) => {
  const { currentUser } = useProfile();
  const router = useRouter();
  const { id } = router.query;
  const { turnOnPopupAuth } = useGlobalModal();
  const { data: product, loading } = useQueryProductDetail(id);
  const { data: productRelate, loading: relating } = useQueryProductsRelate(id);
  const { data: isOrder } = useQueryCheckIsOrderedProduct(id);
  const { fetchData } = useLazyQueryProfile();
  const { doMutation: addToCart, loading: adding } = useMutationAddToCart();
  const { doMutation: createComment } = useMutationCreateComment();
  const { doMutation: view, loading: viewing } = useMutationUpdateView();
  const [comments, setComments] = useState([]);
  let timeOut;
  let isSubmit = false;
  const handleComment = async (values) => {
    const data = {
      ...values,
      user_name: currentUser.name,
      user_avatar: currentUser.avatar,
      product_id: id,
      _id: uuidv4(),
    };
    createComment(data).then(() => {
      setComments((prev) => [...prev, data]);
    });
  };

  const handleAddToCart = async (values) => {
    try {
      if (!currentUser) {
        return turnOnPopupAuth();
      }
      const dataAdd = {
        ...product,
        ...values,
        count: values?.count ?? 1,
        product_id: product._id,
        title: product.title,
        purchase_price: product?.purchase_price,
        sale_price: product?.sale_price,
        discount_price: product?.discount_price,
        description: product?.description,
        cartId: uuidv4(),
      };
      await addToCart([...currentUser?.cart, dataAdd]);
      fetchData();
      showSuccessMsg('Thêm giỏ hàng thành công');
    } catch (error) {
      showErrorMsg('Xảy ra sự cố');
    }
  };

  useEffect(() => {
    setComments(product?.comments ?? []);
    if (product && !isSubmit && currentUser) {
      timeOut = setTimeout(() => {
        view({ product_id: id }).then(() => {
          isSubmit = true;
        });
      }, 15000);
    }
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
        timeOut = undefined;
      }
    };
  }, [product]);

  useEffect(() => {
    const focus = () => {
      console.log('focus');
    };
    const blur = () => {
      console.log('blur');
    };
    window.addEventListener('focus', focus);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('focus', focus);
      window.removeEventListener('blur', blur);
    };
  }, []);

  if (loading) return <Splash />;

  if (!product) {
    return <div className="w-full h-full flex justify-center items-center">Không tìm thấy sản phẩm</div>;
  }

  return (
    <Row style={{ marginTop: 30 }}>
      <Col span={17}>
        <Row>
          <Col span={11}>
            <div className="border-2">
              <SwiperSlider images={product?.images || []} />
            </div>
          </Col>
          <Col span={13}>
            <DesProduct product={product} onAddToCart={handleAddToCart} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="mt-16">
              <CommentContainer
                comments={comments}
                onFinish={handleComment}
                disabled={!isOrder || !!comments?.find((item) => item.user_id === currentUser?._id)}
              />
            </div>
          </Col>
        </Row>
      </Col>

      <Col span={2}></Col>
      <Col span={5}>
        <RelateProducts products={productRelate} />
      </Col>
    </Row>
  );
};

export default ProductDetail;
