import { FC, useCallback } from 'react';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from 'antd';

import { CipherProps } from './@types';
import { caesarCipher } from './utils/caesar';

const { Option } = Select;

export const Dashboard: FC = () => {
  const [form] = Form.useForm();

  const handleOnFinish = useCallback(
    (data: CipherProps) => {
      const outputText = caesarCipher(data);

      form.setFieldsValue({ outputText });
    },
    [form],
  );

  return (
    <Form
      name="crypto"
      form={form}
      autoComplete="off"
      layout="vertical"
      onFinish={handleOnFinish}
    >
      <Row>
        <Col span={9}>
          <Card>
            <Form.Item
              label="Texto de entrada"
              name="inputText"
              rules={[
                { required: true, message: 'Informe o texto de entrada!' },
              ]}
            >
              <Input.TextArea rows={10} />
            </Form.Item>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Form.Item
              label="Tipo"
              name="type"
              rules={[{ required: true, message: 'Informe o tipo!' }]}
            >
              <Select>
                <Option value="cipher">Criptografar</Option>
                <Option value="decipher">Descriptografar</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Cifra"
              name="cipher"
              rules={[{ required: true, message: 'Informe a cifra!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Button htmlType="submit">Encriptar</Button>
          </Card>
        </Col>

        <Col span={9}>
          <Card>
            <Form.Item label="Texto de saída" name="outputText">
              <Input.TextArea rows={10} disabled />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};
