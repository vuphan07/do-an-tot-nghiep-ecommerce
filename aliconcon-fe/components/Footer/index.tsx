import React from 'react';
import { Layout, Row, Col } from 'antd';
import style from './styles.module.less';
import Logo from '../../assets/images/Logo1.png';
import Image from 'next/image';

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className={style.footer}>
      <div className={style.footer__content}>
        <Row gutter={[16, 16]} justify="center" align="middle" className="w-full">
          <Col xs={24} md={6}>
            <div className="logo-container">
              <Image src={Logo} alt="Logo" width={50} height={48} />
              <div className="company-name">My E-commerce</div>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div>
              <div>Thông tin liên hệ</div>
              <div>
                <div>Địa chỉ: Thanh Xuân, Hà Nội</div>
                <div>SĐT: 034-xxx-xxxx</div>
                <div>Email: xxx@gmail.com</div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div>
              <div>Chính sách</div>
              <div>
                <div>Chính sách vận chuyển</div>
                <div>Chính sách đổi trả</div>
                <div>Chính sách bảo mật</div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div>
              <div>Kết nối với chúng tôi</div>
              <div>
                <div>Facebook</div>
                <div>Instagram</div>
                <div>Twitter</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterComponent;
