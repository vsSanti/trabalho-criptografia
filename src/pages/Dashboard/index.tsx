import { FC, useCallback, useState } from 'react';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from 'antd';

import { CipherProps } from './@types';
import { caesarCipher, vigenereCipher } from './utils';

const { Option } = Select;

export const Dashboard: FC = () => {
  const [cipherMethod, setCipherMethod] = useState('');

  const [form] = Form.useForm();

  const handleOnFinish = useCallback(
    (data: CipherProps) => {
      let outputText = '';

      switch (data.method) {
        case 'caesar':
          outputText = caesarCipher(data);
          break;
        case 'vigenere':
          outputText = vigenereCipher(data);
          break;
        default:
          outputText = 'Método não definido';
          break;
      }

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
              label="Método"
              name="method"
              rules={[{ required: true, message: 'Informe o método!' }]}
            >
              <Select onSelect={(data: string) => setCipherMethod(data)}>
                <Option value="caesar">César</Option>
                <Option value="vigenere">Vigenère</Option>
              </Select>
            </Form.Item>

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

            {['caesar'].includes(cipherMethod) && (
              <Form.Item
                label="Cifra"
                name="cipher"
                rules={[{ required: true, message: 'Informe a cifra!' }]}
              >
                <InputNumber />
              </Form.Item>
            )}

            {['vigenere'].includes(cipherMethod) && (
              <Form.Item
                label="Cifra"
                name="cipher"
                rules={[{ required: true, message: 'Informe a cifra!' }]}
              >
                <Input />
              </Form.Item>
            )}

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
