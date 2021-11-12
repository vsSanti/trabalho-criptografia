import { FC, useCallback, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { CipherProps, FileProps } from './@types';
import {
  caesarCipher,
  desMethod,
  downloadFile,
  hillMethod,
  otpMethod,
  playfairMethod,
  vigenereCipher,
} from './utils';

const { Dragger } = Upload;
const { Option } = Select;

export const Dashboard: FC = () => {
  const [cipherMethod, setCipherMethod] = useState('');
  const [fileData, setFileData] = useState<FileProps>();

  const [form] = Form.useForm();

  const handleOnFinish = useCallback(
    (data: CipherProps) => {
      let outputText = '';

      switch (data.method) {
        case 'caesar':
          outputText = caesarCipher(data);
          break;
        case 'otp':
          outputText = otpMethod(data);
          break;
        case 'playfair':
          outputText = playfairMethod(data);
          break;
        case 'vigenere':
          outputText = vigenereCipher(data);
          break;
        case 'hill':
          outputText = hillMethod(data);
          break;
        case 'des':
        case '3des':
          outputText = desMethod(
            {
              ...data,
              inputText: fileData?.base64 || '',
              fileName: fileData?.fileName || '',
            },
            data.method,
          );
          break;
        default:
          outputText = 'Método não definido';
          break;
      }

      form.setFieldsValue({ outputText });
    },
    [form, fileData],
  );

  const handleDownloadFile = useCallback(async () => {
    const outputText = form.getFieldValue('outputText');
    const type = form.getFieldValue('type');

    const fileName = fileData?.fileName || 'arquivo';

    downloadFile(outputText, fileName, type);
  }, [form, fileData]);

  const handleBeforeUpload = useCallback((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e?.target?.result;
      setFileData({
        base64: String(base64),
        fileName: file.name,
      });
    };

    reader.readAsDataURL(file);

    return false;
  }, []);

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
            {['caesar', 'hill', 'vigenere', 'otp', 'playfair'].includes(
              cipherMethod,
            ) && (
              <Form.Item
                label="Texto de entrada"
                name="inputText"
                rules={[
                  { required: true, message: 'Informe o texto de entrada!' },
                ]}
              >
                <Input.TextArea rows={10} />
              </Form.Item>
            )}

            {['des', '3des'].includes(cipherMethod) && (
              <Form.Item
                label="Arquivo de entrada"
                name="inputFile"
                rules={[
                  {
                    required: true,
                    message: 'Informe o texto de entrada!',
                  },
                ]}
              >
                <Dragger maxCount={1} beforeUpload={handleBeforeUpload}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Clique ou arraste um arquivo para essa área para fazer
                    upload
                  </p>
                  <p className="ant-upload-hint">
                    Somente um arquivo pode ser selecionado.
                  </p>
                </Dragger>
              </Form.Item>
            )}
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
                <Option value="otp">One-time-pad</Option>
                <Option value="playfair">Playfair</Option>
                <Option value="hill">Hill</Option>
                <Option value="des">DES</Option>
                <Option value="3des">3DES</Option>
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

            {['vigenere', 'des', '3des', 'otp', 'playfair', 'hill'].includes(
              cipherMethod,
            ) && (
              <Form.Item
                label="Cifra"
                name="cipher"
                rules={[{ required: true, message: 'Informe a cifra!' }]}
              >
                <Input />
              </Form.Item>
            )}

            {['des', '3des'].includes(cipherMethod) && (
              <Form.Item
                label="Modo"
                name="mode"
                rules={[{ required: true, message: 'Informe o modo!' }]}
              >
                <Select>
                  <Option value="ecb">ECB</Option>
                  <Option value="cbc">CBC</Option>
                  <Option value="cfb">CFB</Option>
                  <Option value="ofb">OFB</Option>
                  <Option value="ctr">CTR</Option>
                </Select>
              </Form.Item>
            )}

            <Button htmlType="submit">Transformar</Button>
          </Card>
        </Col>

        <Col span={9}>
          <Card>
            <Form.Item label="Texto de saída" name="outputText">
              <Input.TextArea rows={10} disabled />
            </Form.Item>
            {['des', '3des'].includes(cipherMethod) && (
              <Button htmlType="button" onClick={handleDownloadFile}>
                Download do arquivo
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </Form>
  );
};
