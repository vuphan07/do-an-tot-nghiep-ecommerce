import React, { useEffect } from 'react';
import { Button, Card, Col, Input, Rate, Row, Space } from 'antd';
import CardProduct from '../../components/CardProduct';
import InfiniteScroll from 'react-infinite-scroll-component';
import Splash from '../../components/Splash';
import { useState } from 'react';
import useProfile from '../../app/hooks/useProfile';
import useQueryProducts from '../../app/hooks/useQueryProducts';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { useRouter } from 'next/router';
import { getRateAVG } from '../../utils/helper';
const { Search } = Input;

const Home = () => {
  const router = useRouter();
  const { currentUser } = useProfile();
  const [param, setParam] = useState<any>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    searchKey: '',
  });
  const { data: result, loading, isRefetching, refetch } = useQueryProducts(param);

  const handleSearch = (val) => {
    setParam({ ...param, searchKey: val });
  };

  const loadMore = () => {
    setParam({ ...param, limit: param.limit + DEFAULT_PAGE_SIZE });
  };

  useEffect(() => {
    refetch();
  }, [currentUser?._id]);

  return (
    <>
      <Row>
        <Search
          placeholder="Tìm kiếm"
          onSearch={handleSearch}
          className="mt-6 mr-auto ml-auto"
          style={{ width: '40%' }}
        />
      </Row>
      <div className="overflow-x-hidden" style={{ paddingTop: 38 }}>
        <InfiniteScroll
          style={{ overflowX: 'hidden' }}
          dataLength={result.length}
          next={null}
          hasMore={false}
          loader={null}
        >
          <Row className="w-full" gutter={[14, 14]}>
            {result?.map((item, index) => (
              <Col key={item?._id} md={6} xs={24} sm={12}>
                <CardProduct
                  likes={item.likes}
                  title={item?.title}
                  sale_price={item?.sale_price}
                  discount_price={item?.discount_price}
                  images={item?.images}
                  sold={item?.sold}
                  rate={getRateAVG(item)}
                  rateNumber={item?.comments?.length}
                  product_id={item._id}
                  onClick={() => router.push(`/product/${item?._id}`)}
                />
              </Col>
            ))}
          </Row>
          {(loading || isRefetching ) && <Splash />}
        </InfiniteScroll>
        <div className="h-4"> &nbsp;</div>
        {param.page * param.limit === result.length && (
          <Row className="flex justify-center" onClick={loadMore}>
            <Button>Xem thêm</Button>
          </Row>
        )}
      </div>
    </>
  );
};

export default Home;
