import React, { useEffect, useState } from 'react';
import { Form, Button, Typography, Input, Select, Row, Col, Alert, Upload, Space, InputNumber } from 'antd';
import styles from './styles.module.less';
import MyBreadcrumb from '../Breadcrumb';
import CustomSelect from '../Select';
import FormWrapper from '../FormWrapper';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { MinusCircleOutlined } from '@ant-design/icons';
import useGlobalModal from '../../app/hooks/useGlobalModal';
import useQueryProductsCategory from '../../app/hooks/useQueryProductsCategory';
import useProductCategory from '../../app/hooks/useProductCategory';
import { useForm } from 'antd/lib/form/Form';
import { createFileUload } from '../../utils/helper';
const { TextArea } = Input;
const { Title } = Typography;

const FormCreateProduct = ({ onSubmit, loading, defaultValues = undefined }) => {
  const router = useRouter();
  const [form] = useForm();
  const [files, setFiles] = useState([]);
  const { turnOnAddOptionModal } = useGlobalModal();
  const { data: categories } = useQueryProductsCategory();
  const { categoryOptions } = useProductCategory();
  const onChangeUpload = (file, fileList) => {
    setFiles(fileList);
  };
  const handleSubmit = (values) => {
    onSubmit({ ...values, files });
  };

  useEffect(() => {
    if (defaultValues) {
      const { images, ...dataForm } = defaultValues;
      const listFileAvailable = images?.map((item) => createFileUload(item));
      setFiles(listFileAvailable);
      form.setFieldsValue(dataForm);
    }
  }, [defaultValues]);

  return (
    <div className={styles.root}>
      <MyBreadcrumb />
      <Title className="title">Tạo mới sản phẩm</Title>
      <div className="mt5"></div>
      <FormWrapper loading={loading}>
        <Form form={form} name="organization" onFinish={handleSubmit} colon={false}>
          <Row gutter={20} className="w-100">
            <Col span={12}>
              <Form.Item hidden name="_id"></Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                label="Title"
                name="title"
              >
                <Input type="text" />
              </Form.Item>

              <Row gutter={8}>
                <Col span={23}>
                  <Form.Item
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                    label="Thể loại"
                    name="category"
                  >
                    <CustomSelect>
                      {categoryOptions.map((category) => (
                        <Select.Option value={category?._id} key={category?._id}>
                          {category?.name || ''}
                        </Select.Option>
                      ))}
                    </CustomSelect>
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <Button shape="circle" icon={<PlusOutlined />} size="small" onClick={() => turnOnAddOptionModal()} />
                </Col>
              </Row>
              <Form.Item
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                label="Giá nhập"
                name="purchase_price"
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                label="Giá bán"
                name="sale_price"
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                label="Giá giảm"
                name="discount_price"
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                label="Số lượng"
                name="quantity"
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item label="Đã bán" name="sold">
                <Input readOnly type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <span> Mô tả </span>
              <Form.Item rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]} name="description">
                <TextArea placeholder="Mô tả" autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <span> Ảnh </span>
              <Form.Item
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                valuePropName="fileList"
              >
                <Upload
                  fileList={files}
                  listType="picture-card"
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={({ file, fileList }) => onChangeUpload(file, fileList)}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.List name="options">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Col key={key} span={24}>
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'key']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder="key" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          <Input placeholder="value" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    </Col>
                  ))}
                  <br />
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
            <Button className="ml4" onClick={() => router.back()}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default FormCreateProduct;
